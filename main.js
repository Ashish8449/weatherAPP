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
const lastSearchs = document.querySelector(".lastSearchs");
const currentLocation = document.querySelector(".currentLocation");
const lastSearchArr = localStorage.getItem("lastSearchArr")
  ? JSON.parse(localStorage.getItem("lastSearchArr"))
  : [];
// Array.from(lastSearchArr);

// console.log(typeof lastSearchArr);

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
    // `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=16&appid=ebd7b2e73b4cd4b0a7b5931e071e7688`
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=ebd7b2e73b4cd4b0a7b5931e071e7688`
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
function renderli(lastSearchArr) {
  lastSearchArr = lastSearchArr.slice(0, 8);

  const liEements = lastSearchArr.map((item) => {
    return `<li>${item}</li>`;
  });
  lastSearchs.innerHTML = liEements.join("");
  const allLi = lastSearchs.querySelectorAll("li");
  allLi.forEach((item) => {
    item.addEventListener("click", searchFromLi);
  });
}
function searchDataFunc(city) {
  const cityName = searchCity.value || city;
  getData(cityName)
    .then((data) => {
      console.log(data);
      tem.innerHTML =
        Math.round(data.list[0].main.temp - 273) + `<span>&degc</span>`;
      changeImg(weatherIcon, data.list[0].weather[0].main);
      weather.innerHTML = data.list[0].weather[0].main;
      Humidity.innerHTML = data.list[0].main.humidity + `%`;
      windSpeed.value = data.list[0].main.humidity;

      windStaus.innerHTML = `${data.list[0].wind.speed} Mph`;
      visibility.innerHTML = `${data.list[0].visibility / 1000} miles`;
      airPressure.innerHTML = `${data.list[0].main.pressure}mb`;
      // console.log(data);
      currentLocation.innerHTML = ` <i class="fa fa-map-marker" aria-hidden="true"></i> ${data.city.name}`;
      currntDate.innerHTML = `Today • <span class="todayDate"> ${
        new Date().getDate() + " " + months[new Date().getMonth()]
      } </span>`;

      const arr = data.list.filter((value, i) => {
        if (!(i % 8)) return 1;
      });
      console.log(arr);

      arr.forEach((item, i) => {
        changeValue(days[i], i, item);
      });
    })
    .catch((err) => {
      alert(err.message);
    });
  toggler();
  searchCity.value = "";
  let check = 0;
  lastSearchArr.forEach((value, i) => {
    if (value == cityName) check = 1;
  });
  if (!check) lastSearchArr.push(cityName);
  renderli(lastSearchArr);
  localStorage.setItem("lastSearchArr", JSON.stringify(lastSearchArr));
}
function pressEnter(e) {
  if (e.key == "Enter") {
    searchDataFunc();
  }
}
function changeValue(element, index, array) {
  const lefttem = element.querySelector(".maxTemp");
  const righttem = element.querySelector(".minTemp");
  const img = element.querySelector("img");
  const day = element.querySelector(".day");
  const date = new Date();
  day.innerHTML = `${date.getDate() - index}  ${months[date.getMonth()]}`;
  changeImg(img, array.weather[0].main);
  lefttem.innerHTML = ` ${Math.round(array.main.temp_min) - 273}&deg`;
  righttem.innerHTML = `${Math.round(array.main.temp_max) - 273}&deg`;
}
function searchFromLi(e) {
  console.log(e.target.innerHTML);
  searchDataFunc(e.target.innerHTML);
}

renderli(lastSearchArr);
/*================================================================================
                             eventlistner                                                   
================================================================================*/
searchBtn.addEventListener("click", toggler);
searchData.addEventListener("click", searchDataFunc);
crossBtn.addEventListener("click", toggler);
searchCity.addEventListener("keydown", pressEnter);
