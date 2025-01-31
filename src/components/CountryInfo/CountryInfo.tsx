import React, { useState, useEffect } from "react";
import axios from "axios";
import {COUNTRY_DETAILS} from "../../globalConstants.ts";
import {Country, CountryDetails} from "../../types";

interface Props {
    country: Country;
}

const CountryInfo: React.FC<Props> = ({country}) => {
    const [details, setDetails] = useState<CountryDetails | null>(null);
    const [borderNames, setBorderNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!country) return;
        setLoading(true);
        setDetails(null);
        setBorderNames([]);

        axios.get(`${COUNTRY_DETAILS}${country.alpha3Code}`)
            .then(response => {
                setDetails(response.data);
                if (response.data.borders && response.data.borders.length) {
                    return axios.get(`https://restcountries.com/v2/alpha?codes=${response.data.borders.join(",")}&fields=name`);
                }
                return null;
            })
            .then(response => {
                if (response) {
                    setBorderNames(response.data.map((c: {name: string}) => c.name));
                }
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));

    }, [country]);


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : details ? (
                <div>
                    <h3>{details.name}</h3>
                    <img src={details.flag} alt={`Flag ${details.name}`} width={200} />
                    <p className="my-3"><strong>Capital:</strong> {details.capital}</p>
                    <p><strong>Population:</strong> {details.population.toLocaleString()}</p>
                    <p><strong>Borders with:</strong> {borderNames.length ? borderNames.join(", ") : "No neighbours"}</p>
                </div>
            ) : (
                <p>Select a Country</p>
            )}
        </div>
    );
};

export default CountryInfo;