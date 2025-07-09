// cities.js
import { createDomElement } from './utils.js';
import { getWeatherByCityForecast, getWeatherByCityCurrent } from './api.js';
import { updateWeatherUI, updateCityIcon } from './dom.js';
import { getForecastWeather} from './forecast.js';
import { favoriteCities } from '../index.js';
// Счётчик id и массив городов остаются такими же


// Экспортируем основную функцию для добавления города
export function addCity(name, container) {
  // Проверка: если уже добавлен – не добавляем повторно

  
 
 

  // Создаём DOM-элементы
  const locationAdded = createDomElement("div", { id: "location__block__js" }, container);
  const span = createDomElement("span", { id: "span__in__added__location", textContent: name }, locationAdded);
  const removeButton = createDomElement("button", {
    id: "remove__button__js",
    innerHTML: '<i class="fas fa-times"></i>'
  }, locationAdded);

  // Клик по блоку – обновляем данные о погоде
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

  // Клик по кнопке удаления – удаляем из DOM и массива
removeButton.addEventListener("click", (e) => {
  e.stopPropagation();

  // Получаем имя города из span внутри locationAdded
  const cityName = locationAdded.querySelector("span").textContent;

  // Ищем индекс в массиве
  const index = favoriteCities.indexOf(cityName);

  // Если нашли, удаляем из массива
  if (index !== -1) {
    favoriteCities.splice(index, 1);
    // Сохраняем обновленный массив в localStorage, если нужно
    localStorage.setItem('cities', JSON.stringify(favoriteCities));
  }

  // Удаляем элемент из DOM
  container.removeChild(locationAdded);
})}
