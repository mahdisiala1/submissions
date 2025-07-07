import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const [value, setValue] = useState("");
  const [alldata, setAlldata] = useState([]);
  const [Filter, setFilter] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [weather, setWeather] = useState(null);

  // Fetch country data once
  useEffect(() => {
    axios.get(url).then((response) => {
      setAlldata(response.data);
    });
  }, []);

  // Filter countries when input value changes
  useEffect(() => {
    const filtered = alldata.filter((c) =>
      c.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilter(filtered);
  }, [value, alldata]);

  // If exactly one match, show it and fetch weather
  useEffect(() => {
    if (Filter.length === 1) {
      setSelectedCountry(Filter[0]);
    }
  }, [Filter]);

  // Fetch weather info when selectedCountry changes
  useEffect(() => {
    setWeather(null); // Clear old weather
    if (selectedCountry) {
      const capital = selectedCountry.capital?.[0];
      if (!capital) return;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        )
        .then((res) => {
          setWeather(res.data);
        })
        .catch((err) => {
          console.log("Weather fetch failed:", err);
        });
    }
  }, [selectedCountry, api_key]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedCountry(null); // Clear old selection
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        find countries: <input value={value} onChange={handleChange} />
      </form>

      <div>
        {Filter.length > 10 && <p>Too many matches, specify another filter</p>}

        {Filter.length <= 10 &&
          Filter.length > 1 &&
          Filter.map((c) => (
            <li key={c.cca3}>
              {c.name.common}{" "}
              <button onClick={() => setSelectedCountry(c)}>Show</button>
            </li>
          ))}

        {selectedCountry && (
          <div>
            <h1>{selectedCountry.name.common}</h1>
            <div>Capital: {selectedCountry.capital?.join(", ")}</div>
            <div>Area: {selectedCountry.area}</div>
            <h1>Languages</h1>
            <ul>
              {Object.values(selectedCountry.languages || {}).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <img src={selectedCountry.flags.png} alt="flag" />

            {weather && (
              <div>
                <h2>Weather in {selectedCountry.capital?.[0]}</h2>
                <div>Temperature: {weather.main.temp} °C</div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <div>Wind: {weather.wind.speed} m/s</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
