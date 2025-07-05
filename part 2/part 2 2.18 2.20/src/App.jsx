import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const [country, setCountry] = useState(null);
  const [value, setValue] = useState("");
  const [alldata, setAlldata] = useState([]);
  const [Filter, setFilter] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setAlldata(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setCountry(value);
    setSelectedCountry(null);
  };

  useEffect(() => {
    if (country) {
      const filtered = alldata.filter((c) =>
        c.name.common.toLowerCase().includes(country.toLowerCase())
      );
      setFilter(filtered);
    }
  }, [country]);

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries:
        <input value={value} onChange={handleChange} />
      </form>

      <div>
        {Filter.length > 10 && <p>Too many matches, specify another filter</p>}

        {Filter.length < 10 &&
          Filter.length > 1 &&
          Filter.map((c) => (
            <li key={c.tld}>
              {c.name.common}{" "}
              <button onClick={() => setSelectedCountry(c)}>Show</button>
            </li>
          ))}

        {selectedCountry && (
          <div>
            <h1>{selectedCountry.name.common}</h1>
            <div>Capital: {selectedCountry.capital}</div>
            <div>Area: {selectedCountry.area}</div>
            <h1>Languages</h1>
            <ul>
              {Object.values(selectedCountry.languages).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <img src={selectedCountry.flags.png} alt="flag" />
          </div>
        )}

        {Filter.length === 1 && (
          <div>
            <h1>{Filter[0].name.common}</h1>
            <div>Capital: {Filter[0].capital}</div>
            <div>Area: {Filter[0].area}</div>
            <h1>Languages</h1>
            <ul>
              {Object.values(Filter[0].languages).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <img src={Filter[0].flags.png} alt="flag" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
