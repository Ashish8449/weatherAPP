/*================================================================================
                             elements                                                   
================================================================================*/

const searchBtn = document.querySelector(".searchBtn");

const leftSideDiv = document.querySelector(".leftSide");
const searchDiv = document.querySelector(".searchDiv");
const crossBtn = document.querySelector(".fa-times");
const searchData = document.querySelector(".searchData");
const searchCity = document.querySelector(".searchCity");
const fiveDays = document.querySelector(".fiveDays");
const tem = document.querySelector(".tem");

const days = fiveDays.querySelectorAll(".col-2");
const weatherIcon = document.querySelector("#weatherIcon");

const lastsearch = [];
const todaytem = document.querySelector(".tem");
const weather = document.querySelector(".weather");

const Humidity = document.querySelector(".Humidity");
const progress = document.querySelector("#windSpeed");
const currntDate = document.querySelector("p");

const windStaus = document.querySelector(".windStaus");
const visibility = document.querySelector(".visibility");
const airPressure = document.querySelector(".airPressure");
console.log(visibility);
console.log(windStaus);

const months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/*================================================================================
                             funtions                                                   
================================================================================*/

async function getData(cityName) {
  const cnt = 5;
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=7&appid=ebd7b2e73b4cd4b0a7b5931e071e7688`
  );
  if (response.ok) {
    return response.json();
  }

  throw new Error(`Failed to fetch weather`);
}
function changeImg(element, value) {
  if (value == "Clear") {
    element.src = `./img/Clear.png`;
  } else if ((value = "Rain")) {
    element.src = `./img/LightRain.png`;
  } else if ((value = "Light Cloud")) {
    element.src = `./img/LightCloud.png`;
  } else if (value == "Shower") {
    element.src = `./img/Shower.png`;
  } else if (value == "Heavy Cloud") {
    element.src = `./img/HeavyCloud.png`;
  } else {
    element.src = `./img/Thunderstorm.png`;
  }
}

function toggler(e) {
  leftSideDiv.classList.toggle("hidden");
  searchDiv.classList.toggle("hidden");
}
function searchDataFunc(e) {
  const cityName = searchCity.value;
  getData(cityName)
    .then((data) => {
      tem.innerHTML = Math.round(data.list[0].main.temp) + `<span>&degc</span>`;
      changeImg(weatherIcon, data.list[0].weather[0].main);
      weather.innerHTML = data.list[0].weather[0].main;
      Humidity.innerHTML = data.list[0].main.humidity + `%`;
      windSpeed.value = data.list[0].main.humidity;

      windStaus.innerHTML = `${data.list[0].wind.speed} Mph`;
      visibility.innerHTML = `${data.list[0].visibility / 1000} miles`;
      airPressure.innerHTML = `${data.list[0].main.pressure}mb`;
      console.log(data);
      currntDate.innerHTML = `Today • <span class="todayDate"> ${
        new Date().getDate() + " " + months[new Date().getMonth()]
      } </span>`;

      const arr = data.list;
      arr.splice(5);
      arr.forEach((item, i) => {
        changeValue(days[i], i, item);
      });
    })
    .catch((err) => {
      alert(err.message);
    });
  toggler();
}
function pressEnter(e) {
  if (e.key == "Enter") {
    searchDataFunc();
  }
}
function changeValue(element, index, array) {
  console.log(element);
  const lefttem = element.querySelector(".maxTemp");
  const righttem = element.querySelector(".minTemp");
  const img = element.querySelector("img");
  const day = element.querySelector(".day");
  const date = new Date();
  day.innerHTML = `${date.getDate() - index}  ${months[date.getMonth()]}`;
  changeImg(img, array.weather[0].main);
  lefttem.innerHTML = ` ${Math.round(array.main.temp_min)}&deg`;
  righttem.innerHTML = `${Math.round(array.main.temp_max)}&deg`;
}

/*================================================================================
                             eventlistner                                                   
================================================================================*/
searchBtn.addEventListener("click", toggler);
searchData.addEventListener("click", searchDataFunc);
crossBtn.addEventListener("click", toggler);
searchCity.addEventListener("keydown", pressEnter);
