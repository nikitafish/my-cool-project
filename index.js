import { getWeatherByCityForecast } from './modules/api.js';
import { getWeatherByCityCurrent } from './modules/api.js';
import { updateWeatherUI, updateCityIcon } from './modules/dom.js';
import { addCity } from './modules/cities.js';

import { getForecastWeather } from './modules/forecast.js';

const searchCityForm = document.querySelector(".form__search");
const cityPoint = document.querySelector(".city__text");
const addedBlock = document.querySelector(".added__block");
const buttonAddedLocation = document.querySelector(".add__locations__list");
const weatherDegress = document.querySelector(".temperature__text");

export let favoriteCities = []


const storageItem = localStorage.getItem('cities');
if (storageItem) {
  try {
    const savedCities = JSON.parse(storageItem);
    if (Array.isArray(savedCities)) {
      favoriteCities = savedCities;
      savedCities.forEach(cityName => {
        addCity(cityName, addedBlock, favoriteCities);
      });
    }
  } catch(e) {
    console.error('Ошибка при чтении localStorage:', e);
  }
}


searchCityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector(".input__search");
 getWeatherByCityForecast(input.value).then(info => {
    getForecastWeather(info)
    
 })

  getWeatherByCityCurrent(input.value)
    .then(info => {
      updateWeatherUI(info);
      updateCityIcon(info.main.temp);
      cityPoint.textContent = input.value;
    })
    .catch(err => {
      console.error(err);
      input.style.borderColor = "red";
      input.placeholder = "а вы правильно ввели город?";
      setTimeout(() => {
        input.style.borderColor = "#ccc";
        input.placeholder = "Попробуйте ещё раз!";
      }, 3000);
    });
});

buttonAddedLocation.addEventListener("click", () => {
  const cityName = cityPoint.textContent 
  if (cityName !== "город" && !favoriteCities.includes(cityName)) {
    addCity(cityName, addedBlock);

    if (!favoriteCities.includes(cityName)) {
      favoriteCities.push(cityName);
      localStorage.setItem('cities', JSON.stringify(favoriteCities));
    }
  }
});
