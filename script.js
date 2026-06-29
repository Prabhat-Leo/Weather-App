async function getWeather() {
  const location = document.getElementById("locationInput").value;
  const resultBox = document.getElementById("weatherResult");
  const errorText = document.getElementById("error");

  if (location === "") {
    errorText.innerText = "⚠ Please enter a city name";
    return;
  }

  const apiKey = "e18645b353e8480e84d50452261804";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    errorText.innerText = "";
    resultBox.classList.add("hidden");

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      errorText.innerText = "❌ City not found!";
      return;
    }

    document.getElementById("city").innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temp").innerText = `${data.current.temp_c}°C`;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("humidity").innerText = `${data.current.humidity}%`;
    document.getElementById("wind").innerText = `${data.current.wind_kph} km/h`;

    resultBox.classList.remove("hidden");

  } catch (error) {
    errorText.innerText = "⚠ Error fetching data";
    console.error(error);
  }
}