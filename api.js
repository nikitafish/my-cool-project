

const apiKeyCurrent = "f660a2fb1e4bad108d6160b7f58c555f";
const serverUrlCurrent = "http://api.openweathermap.org/data/2.5/weather";

export function getWeatherByCityCurrent(city) {
  const url = `${serverUrlCurrent}?q=${city}&appid=${apiKeyCurrent}&units=metric`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    return response.json();
  });
}

const apiKeyForecast = "6788c76280033f6e69cb2251cf891230"
const serverUrlForecast = "http://api.openweathermap.org/data/2.5/forecast";

export function getWeatherByCityForecast(city) {
  const url = `${serverUrlForecast}?q=${city}&appid=${apiKeyForecast}&units=metric`;
  return fetch(url)
  .then ((response) => {
    if(!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    return response.json()
  })
}

getWeatherByCityForecast('Chelyabinsk')
  .then((info) => {
    console.log(info);
  })
  .catch((error) => {
    console.error(error);
  });
