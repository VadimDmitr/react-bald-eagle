import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TodoListItem.module.css";
import '@fortawesome/fontawesome-free/css/all.css';

function Header() {
  const [date, setDate] = useState(new Date().toLocaleString());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=Cary,US&units=imperial&appid=ca43d0bfb5297127adffa606ce89666b")
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <header className={styles.header}>
      <button className={styles.button}>

      <span className={styles.actualText}>&nbsp;My <span style={{ fontFamily: 'Brush Script MT', fontSize: '25px' }}>MODERN</span> ToDo {date}&nbsp;</span>

      </button>

      {weather && (
        <span className={styles.weather}>{Math.round(weather.main.temp)}°F, {weather.weather[0].description}
        </span>
      )}

    </header>
  );
}

export default Header;
