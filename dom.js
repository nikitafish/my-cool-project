import { getTime } from "./utils.js";

export function updateWeatherUI(info) {
  const feelLikes = document.querySelector(".feel__likes");
  const weatherDegress = document.querySelector(".temperature__text");
  const sunset = document.querySelector(".sunset");
  const sunrise = document.querySelector(".sunrise");

  feelLikes.textContent = "ощущается как: " + info.main.feels_like.toFixed(1);
  weatherDegress.textContent = info.main.temp.toFixed(1);

  const timeSunrise = getTime(info.sys.sunrise);
  const timeSunset = getTime(info.sys.sunset);

  sunrise.textContent = `Рассвет: ${timeSunrise.getHours()} : ${timeSunrise.getMinutes()}`;
  sunset.textContent = `Закат: ${timeSunset.getHours()} : ${timeSunset.getMinutes()}`;
}

export function updateCityIcon(temp) {
  const i = document.querySelector(".temperature__block i");
  if (temp <= 15) {
    i.className = "fa-solid fa-snowflake";
    i.style = "color: #2796f1;";
  } else if (temp >= 16) {
    i.className = "wi wi-day-sunny";
    i.style = "color: #ffaa00;";
  }
}
