import { getTime } from "./utils.js";

export function getForecastWeather(info) {


{ //время 
    const time = document.querySelector('.time1') 
    const time2 = document.querySelector('.time2') 
    const time3 = document.querySelector('.time3') 
    
    
  
    time.textContent = info.list[2].dt_txt
    time2.textContent = info.list[3].dt_txt
    time3.textContent = info.list[4].dt_txt
}
  

{ // ощущается как пенис в жопе
        const feel__likes1 = document.querySelector('.feel__likes1')
        feel__likes1.textContent = info.list[2].main.feels_like
        const feel__likes2 = document.querySelector('.feel__likes2')
        feel__likes2.textContent = info.list[3].main.feels_like
        const feel__likes3 = document.querySelector('.feel__likes3')
        feel__likes3.textContent = info.list[4].main.feels_like
}

{  // моё очко горит - это температура
        const temperatureText1 = document.querySelector('.temperature__text1')
        temperatureText1.textContent = info.list[2].main.temp
        const temperatureText2= document.querySelector('.temperature__text2')
        temperatureText2.textContent = info.list[3].main.temp
        const temperatureText3 = document.querySelector('.temperature__text3')
        temperatureText3.textContent = info.list[4].main.temp
}
}