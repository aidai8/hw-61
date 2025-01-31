export interface Country {
    alpha3Code: string;
    name: string;
}

export interface CountryDetails {
    name: string;
    capital: string;
    population: number;
    borders: string[];
    flag: string;
}