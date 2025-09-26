const weatherData = {
  "Ahmedabad": { temperature: "40°C" },
  "Delhi": { temperature: "38°C" },
  "Mumbai": { temperature: "34°C" },
  "Bangalore": { temperature: "30°C" }
};

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (weatherData[city]) {
    resultDiv.textContent = `The weather in ${city} is ${weatherData[city].temperature}`;
  } else {
    resultDiv.textContent = "Weather data not available for the entered city.";
  }
});


// document.getElementById("getWeatherBtn").addEventListener("click", () => {
//     const city = document.getElementById("cityInput").value.trim();
//     const resultDiv = document.getElementById("weatherResult");
    
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
//         .then(response => {
//         if (!response.ok) {
//             throw new Error("City not found");
//         }
//         return response.json();
//         })
//         .then(data => {
//         const temperature = data.main.temp;
//         resultDiv.textContent = `The weather in ${city} is ${temperature}°C`;
//         })
//         .catch(error => {
//         resultDiv.textContent = error.message;
//         });
//     });