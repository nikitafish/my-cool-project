// cities.js
import { createDomElement } from './utils.js';
import { getWeatherByCityForecast, getWeatherByCityCurrent } from './api.js';
import { updateWeatherUI, updateCityIcon } from './dom.js';
import { getForecastWeather} from './forecast.js';

// Счётчик id и массив городов остаются такими же
let id = 0;
 const arrCityWeather = {
  city: []
};

// Оставляем функцию‑конструктор как у тебя было
function City(name, degrees) {
  this.name = name;
  this.degrees = degrees;
  this.id = id++;
}

// Экспортируем основную функцию для добавления города
export function addCity(name, temperature, container) {
  // Проверка: если уже добавлен – не добавляем повторно
  const isAlreadyInArray = arrCityWeather.city.some(c => c.name === name);
  if (isAlreadyInArray) return;

  // Создаём новый объект города через конструктор
  const newCity = new City(name, temperature);
  
  arrCityWeather.city.push(newCity);
  localStorage.setItem('cities', JSON.stringify(newCity))
  console.log(localStorage.getItem('cities'));

 

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
    container.removeChild(locationAdded);
    const index = arrCityWeather.city.findIndex(c => c.id === newCity.id);
    if (index !== -1) arrCityWeather.city.splice(index, 1);
      
  });
}

// Если хочешь, можем ещё экспортировать массив arrCityWeather для отладки
export { arrCityWeather};
