import './App.css'
import CountryList from "./components/CountryList/CountryList.tsx";
import {useState} from "react";
import {Country} from "./types";
import CountryInfo from "./components/CountryInfo/CountryInfo.tsx";

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <>
      <div className="container">
        <h1 className="m-4 text-center">Countries Information</h1>
          <div className="row row-col-2 border-top border-bottom border-black">
              <div className="w-25 p-2 border-end border-start border-black">
                  <h3>Country List:</h3>
                  <CountryList onSelectCountry={setSelectedCountry} />
              </div>
              <div className="w-75 p-2 border-end border-black bg-secondary-subtle">
                  <h3 className="pb-2 border-bottom border-black">Information about the country:</h3>
                  {selectedCountry ? <CountryInfo country={selectedCountry}/> : <p>Select a Country from the list</p>}
              </div>
          </div>
      </div>
    </>
  )
};

export default App
