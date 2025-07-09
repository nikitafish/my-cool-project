// cities.js
import { createDomElement } from './utils.js';
import { getWeatherByCityForecast, getWeatherByCityCurrent } from './api.js';
import { updateWeatherUI, updateCityIcon } from './dom.js';
import { getForecastWeather} from './forecast.js';
import { favoriteCities } from '../index.js';


export function addCity(name, container) {

  
 
 

  const locationAdded = createDomElement("div", { id: "location__block__js" }, container);
  const span = createDomElement("span", { id: "span__in__added__location", textContent: name }, locationAdded);
  const removeButton = createDomElement("button", {
    id: "remove__button__js",
    innerHTML: '<i class="fas fa-times"></i>'
  }, locationAdded);

locationAdded.addEventListener("click", () => {
getWeatherByCityForecast(name).then(info => {
    getForecastWeather(info)
    
 })

    getWeatherByCityCurrent(name)
      .then(info => {
        updateWeatherUI(info);
        updateCityIcon(info.main.temp);
       
      })
      .catch(err => console.error(err));
  });

 
removeButton.addEventListener("click", (e) => {
  e.stopPropagation();

  
  const cityName = locationAdded.querySelector("span").textContent;

  const index = favoriteCities.indexOf(cityName);

  if (index !== -1) {
    favoriteCities.splice(index, 1);
    localStorage.setItem('cities', JSON.stringify(favoriteCities));
  }

  container.removeChild(locationAdded);
})}
