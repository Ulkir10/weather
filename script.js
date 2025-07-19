async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "ae7ffb8a73e5ecfc2afbf2079dede50d";

  if (!city) {
    alert("Введите название города.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
    );
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML =
        `<div class="weather-card">Город не найден</div>`;
    } else {
      const icon = data.weather[0].icon;
      const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      document.getElementById("weatherResult").innerHTML =
        `<div class="weather-card">
          <div class="location">${data.name}</div>
          <img src="${imageUrl}" alt="Weather icon" class="weather-icon">
          <div class="temp">${Math.round(data.main.temp)}°C</div>
          <div class="desc">${data.weather[0].description}</div>
        </div>`;
    }
  } catch (error) {
    document.getElementById("weatherResult").innerHTML =
      `<div class="weather-card">Ошибка загрузки данных</div>`;
    console.error(error);
  }
}
