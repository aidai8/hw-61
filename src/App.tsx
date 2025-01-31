import './App.css'
import CountryList from "./components/CountryList/CountryList.tsx";
import {useState} from "react";
import {Country} from "./types";

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <>
      <div className="container">
        <h1 className="m-4 text-center">Countries Information</h1>
          <div className="row row-col-2 border-top border-black">
              <div className="w-25 p-2 border-end border-start border-black">
                  <h3>Country List:</h3>
                  <CountryList onSelectCountry={setSelectedCountry} />
              </div>
              <div className="w-75 p-2 border-end border-black">
                  <h3>Information about the country:</h3>
                  {selectedCountry ? <strong>{selectedCountry.name}</strong> : <p>Select a Country from the list</p>}
              </div>
          </div>
      </div>
    </>
  )
};

export default App
