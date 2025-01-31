import React, {useState, useEffect} from "react";
import axios from "axios";
import {ALL_COUNTRIES} from "../../globalConstants.ts";
import {Country} from "../../types";

interface Props {
    onSelectCountry: (country: Country) => void;
}

const CountryList: React.FC<Props> = ({ onSelectCountry }) => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        axios.get(ALL_COUNTRIES)
            .then(response => setCountries(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <ul className="list-group overflow-auto" style={{ maxHeight: "400px" }}>
            {countries.map(country => (
                <li key={country.alpha3Code}
                    className="list-group-item"
                    onClick={() => onSelectCountry(country)}>
                    {country.name}
                </li>
            ))}
        </ul>
    );
};

export default CountryList;