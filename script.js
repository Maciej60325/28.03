const search = document.querySelector('.search')
const input = document.querySelector('input')
const button = document.querySelector('button')
const error_message = document.querySelector('.error_message')
const city_name = document.querySelector('.city_name')
const temp = document.querySelector('.temp')
const description = document.querySelector('.description')
const weather_bottom = document.querySelector('.weather_bottom')
const feels_like = document.querySelector('.feels_like')
const pressure = document.querySelector('.pressure')
const humidity = document.querySelector('.humidity')
const wind_speed = document.querySelector('.wind_speed')
const clouds = document.querySelector('.clouds')
const visibility = document.querySelector('.visibility')

const apiInfo = {
    link :"",
    key :"",
    units :"",
    lang :""
}

function getWeattherInfo(){
    const apiInfoCity = input.value;
    const URL = `${apiInfo.link} ${apiInfoCity} ${apiInfo.key} ${apiInfo.units} ${apiInfo.lang}`;
    

    axios.get(URL).then((response) => {
        console.log(response);

        weatherIMG.src = `link do ikony${response.data.weather[0].icon}@2x.png`;
        city_name = `${response.data.name}, ${response.data.sys.country}`;
        temp.textContent = `${response.data.main.temp} stopni`;
        description.textContent = `${response.data.weather[0].description}`;
        feels_like.textContent = `${response.data.main.feels_like} stopni`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        wind_speed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km / h`;
        clouds.textContent = `${response.data.clouds.all} %`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
        error_message.textContent = "";


        
    }).catch((error) =>{
        console.log(error);
        error_message.textContent = `${error.response.data.cod} - ${error.response.data.message}`;
        weatherImg.src = '';
        [city_name, temp, description, feels_like, wind_speed, humidity, pressure, visibility, cloud].forEach(el => el.textContent = '');




    }).finally(() => {
        input.value = "";
    })
}


function getWeattherInfoByEnter(e){
    if(e.key === 'Enter'){
        getWeattherInfo();
    }
}

button.addEventListener('click', getWeattherInfo);
input.addEventListener('keypress', getWeattherInfoByEnter);
