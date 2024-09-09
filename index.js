// Event listener for the Submit button
document.getElementById('submit').addEventListener('click', () => {
    const locationInput = document.getElementById('location').value;
    if (locationInput) {
        fetchWeatherData(locationInput);
    }
});

// Event listener for Enter key press in the input field
document.getElementById('location').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission
        const locationInput = document.getElementById('location').value;
        if (locationInput) {
            fetchWeatherData(locationInput);
        }
    }
});

async function fetchWeatherData(location) {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b3497dfc87mshc6f2630050b128cp1119d2jsn7d4b255babdd',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <div class="weather-part">
            <h4>Location Information</h4>
            <p>Location: ${data.location.name}</p>
            <p>Region: ${data.location.region}</p>
            <p>Country: ${data.location.country}</p>
            <p>Lat: ${data.location.lat}</p>
            <p>Lon: ${data.location.lon}</p>
            <p>Time Zone: ${data.location.tz_id}</p>
        </div>
        <div class="weather-part">
            <p>Last updated: ${data.current.last_updated}</p>
            <p>Temperature in Celsius: ${data.current.temp_c}°C</p>
            <p>Temperature in Fahrenheit: ${data.current.temp_f}°F</p>
            <p>Wind Speed: ${data.current.wind_kph} kph</p>
            <p>Wind Direction: ${data.current.wind_dir}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Cloud: ${data.current.cloud}%</p>
        </div>
        <div class="weather-part">
            <h4>Condition</h4>
            <p>${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="Weather Icon" class="weather-icon">
        </div>
    `;
}

// Add weather symbol animation on click anywhere in the page
document.body.addEventListener('click', (e) => {
    const symbol = document.createElement('div');
    symbol.className = 'weather-symbol';
    
    const size = Math.random() * 50 + 20;
    symbol.style.width = `${size}px`;
    symbol.style.height = `${size}px`;
    symbol.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1163/1163624.png')";
    symbol.style.backgroundSize = 'cover';
    symbol.style.left = `${e.pageX - size / 2}px`;
    symbol.style.top = `${e.pageY - size / 2}px`;

    document.body.appendChild(symbol);
    setTimeout(() => symbol.remove(), 3000);
});
