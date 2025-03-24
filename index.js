const pictureEl = document.getElementById('picEl');
const inlocationEl = document.getElementById('inputlocation');
const searchEl = document.getElementById('search');
const idState = document.getElementById('idState');
const tempEl = document.getElementById('temp');
const locationEl = document.getElementById('location');
const rainfallEl = document.getElementById('rainfall');

const humidityEl = document.getElementById('humidity');
const weatherEl = document.querySelector('States');
const generalSituation = document.querySelector('.generalSituation');
const updatetime = document.getElementById('updatetime');

const urlHK = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=tc`;
const urlLocation = `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=tc`;

const weatherMatching = {
    "50": "陽光充沛",
    "51": "間有陽光",
    "52": "短暫陽光",
    "53": "間有陽光幾陣驟雨",
    "54": "短暫陽光有驟雨",
    "60": "多雲",
    "61": "密雲",
    "62": "微雨",
    "63": "雨",
    "64": "大雨",
    "65": "雷暴",
    "70": "天色良好",
    "71": "天色良好",
    "72": "天色良好",
    "73": "天色良好",
    "74": "天色良好",
    "75": "天色良好",
    "76": "大致多雲",
    "77": "天色大致良好",
    "80": "大風",
    "81": "乾燥",
    "82": "潮濕",
    "83": "霧",
    "84": "薄霧",
    "85": "煙霞",
    "90": "熱",
    "91": "暖",
    "92": "涼",
    "93": "冷"
}
  

function fetchWeather() {
    locationEl.innerText = "地點：" + inlocationEl.value;
    fetch(urlHK)
        .then(response => response.json())
        .then(data => {
            generalSituation.innerHTML = `<p>天氣情況：${data.generalSituation}</p>`;
            const updateTime = new Date(data.updateTime);
            const hours = updateTime.getHours().toString().padStart(2, '0');
            const minutes = updateTime.getMinutes().toString().padStart(2, '0');
            updatetime.innerHTML = `更新時間: ${hours}:${minutes}`;


        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });

    fetch(urlLocation)
        .then(response => response.json())
        .then(data => {
            let iconid = data.icon[0];
            pictureEl.src = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${iconid}.png`;
            idState.innerHTML = `天氣狀況：${weatherMatching[iconid]}`;
            rainfallEl.innerText = "雨量：" + data.rainfall.data.find(item => item.place === inlocationEl.value).max + "mm";
            humidityEl.innerText = "濕度：" + data.humidity.data[0].value + "%";
            tempEl.innerText = "氣溫：" + data.temperature.data.find(item => item.place === "香港天文台").value + "度";
            }
        )
        
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });

}

searchEl.addEventListener('click',fetchWeather)