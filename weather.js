let get_city = document.querySelector('.search_city')
let put_city = document.querySelector('#city_name')
let date_time = document.querySelector('.city_date_time')
let weather_forecast =  document.querySelector('.weather_forecast')
let weather_icon = document.querySelector('.icon')
let temperature = document.querySelector('.temperature')
let min_temperature = document.querySelector('.min_temp')
let max_temperature = document.querySelector('.max_temp')
let feels_like = document.querySelector('.feels_like')
let humidity = document.querySelector('.humidity')
let winds = document.querySelector('.wind')
let pressure = document.querySelector('.pressure')
let city='biratnagar'


get_city.addEventListener('submit',(event)=>{
    event.preventDefault()
    let cityName = document.querySelector('#city') 
    city = cityName.value.trim()
    fetchWeather(city)
    cityName.value = ''
})

const getCountry = (countryCode)=>{
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNamesInEnglish.of(countryCode)
}

const fetchWeather = async ()=>{
    let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15ea46a14f270fb231641e0b56bcb220`
    try {
        let response = await fetch(weatherApi)
        let data = await response.json()
        
        let { name, main, dt, sys, weather, wind}=data

        put_city.innerText=`${name}, ${getCountry(sys.country)}`
        date_time.innerText = `Last updated: ${new Date(dt*1000).toLocaleString()}`
        weather_forecast.innerText = `${weather[0].main}`
        weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="">`
        temperature.innerText = `Temperature: ${main.temp}°K`
        min_temperature.innerText = `Min: ${main.temp_min}°K`
        max_temperature.innerText = `Max: ${main.temp_max}°K`
        feels_like.innerText = `${main.feels_like}°K`
        humidity.innerText = `${main.humidity}%`
        winds.innerText = `${wind.speed} m/s`
        pressure.innerText = `${main.pressure} hPa`
    } catch (error) {
        console.log(error);
    }
}
document.body.addEventListener('load', fetchWeather())
