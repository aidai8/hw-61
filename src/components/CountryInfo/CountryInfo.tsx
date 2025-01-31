import React, { useState, useEffect } from "react";
import axios from "axios";
import {COUNTRY_DETAILS} from "../../globalConstants.ts";
import {Country, CountryDetails} from "../../types";

interface Props {
    country: Country;
}

const CountryInfo: React.FC<Props> = ({country}) => {
    const [details, setDetails] = useState<CountryDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!country) return;
        setLoading(true);
        axios.get(`${COUNTRY_DETAILS}${country.alpha3Code}`)
            .then(response => setDetails(response.data))
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
                    <p className="my-3"><strong>Capital:</strong> {details.capital}</p>
                    <p><strong>Population:</strong> {details.population.toLocaleString()}</p>
                    <p><strong>Borders with:</strong> {details.borders.length ? details.borders.join(", ") : "No neighbours"}</p>
                </div>
            ) : (
                <p>Select a Country</p>
            )}
        </div>
    );
};

export default CountryInfo;