// ✅ Weather Icons Configuration
const weatherIcons = {
    sunny: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="20" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
        <g stroke="#FFD700" stroke-width="3" stroke-linecap="round">
            <line x1="50" y1="10" x2="50" y2="20"/>
            <line x1="50" y1="80" x2="50" y2="90"/>
            <line x1="10" y1="50" x2="20" y2="50"/>
            <line x1="80" y1="50" x2="90" y2="50"/>
            <line x1="21.21" y1="21.21" x2="28.28" y2="28.28"/>
            <line x1="71.72" y1="71.72" x2="78.79" y2="78.79"/>
            <line x1="78.79" y1="21.21" x2="71.72" y2="28.28"/>
            <line x1="28.28" y1="71.72" x2="21.21" y2="78.79"/>
        </g>
    </svg>`,
    'partly-cloudy': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="15" fill="#FFD700" stroke="#FFA500" stroke-width="1.5"/>
        <g stroke="#FFD700" stroke-width="2" stroke-linecap="round">
            <line x1="35" y1="8" x2="35" y2="15"/>
            <line x1="8" y1="35" x2="15" y2="35"/>
            <line x1="18.93" y1="18.93" x2="23.64" y2="23.64"/>
            <line x1="55" y1="35" x2="62" y2="35"/>
            <line x1="46.36" y1="23.64" x2="51.07" y2="18.93"/>
        </g>
        <path d="M45 55 Q38 45 28 45 Q18 45 18 55 Q18 65 28 65 L65 65 Q75 65 75 55 Q75 45 65 45 Q58 45 55 50 Q52 45 45 45 Q45 50 45 55 Z" 
              fill="#E0E0E0" stroke="#CCCCCC" stroke-width="1"/>
    </svg>`,
    cloudy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 55 Q18 45 28 45 Q38 45 45 55 Q52 45 55 45 Q65 45 65 55 Q75 45 75 55 Q75 65 65 65 L28 65 Q18 65 18 55 Z" 
              fill="#E0E0E0" stroke="#CCCCCC" stroke-width="2"/>
        <path d="M35 45 Q28 35 38 35 Q48 35 55 45 Q62 35 65 35 Q75 35 75 45 Q75 55 65 55 L38 55 Q28 55 28 45 Z" 
              fill="#F0F0F0" stroke="#DDDDDD" stroke-width="1"/>
    </svg>`,
    rainy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 45 Q18 35 28 35 Q38 35 45 45 Q52 35 55 35 Q65 35 65 45 Q75 35 75 45 Q75 55 65 55 L28 55 Q18 55 18 45 Z" 
              fill="#8E8E93" stroke="#6D6D70" stroke-width="2"/>
        <g stroke="#4A90E2" stroke-width="2" stroke-linecap="round">
            <line x1="30" y1="65" x2="32" y2="75"/>
            <line x1="40" y1="60" x2="42" y2="70"/>
            <line x1="50" y1="65" x2="52" y2="75"/>
            <line x1="60" y1="60" x2="62" y2="70"/>
            <line x1="35" y1="70" x2="37" y2="80"/>
            <line x1="55" y1="70" x2="57" y2="80"/>
        </g>
    </svg>`,
    stormy: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 40 Q18 30 28 30 Q38 30 45 40 Q52 30 55 30 Q65 30 65 40 Q75 30 75 40 Q75 50 65 50 L28 50 Q18 50 18 40 Z" 
              fill="#4A4A4A" stroke="#333333" stroke-width="2"/>
        <path d="M48 55 L42 70 L50 70 L45 85 L58 65 L50 65 L55 55 Z" 
              fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
        <g stroke="#4A90E2" stroke-width="2" stroke-linecap="round">
            <line x1="25" y1="60" x2="27" y2="70"/>
            <line x1="35" y1="65" x2="37" y2="75"/>
            <line x1="65" y1="60" x2="67" y2="70"/>
        </g>
    </svg>`
};

// ✅ API Configuration (your Spring Boot app)
const API_CONFIG = {
    baseUrl: 'http://localhost:8080',
    endpoint: '/weather/forecast'
};

// ✅ Current search state
let currentSearch = { city: '', days: 7 };

// ✅ Utility Functions
function getWeatherIcon(condition) {
    const text = condition.toLowerCase();
    if (text.includes('sunny') || text.includes('clear')) return weatherIcons.sunny;
    if (text.includes('partly') || text.includes('partial')) return weatherIcons['partly-cloudy'];
    if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) return weatherIcons.rainy;
    if (text.includes('storm') || text.includes('thunder')) return weatherIcons.stormy;
    if (text.includes('cloud') || text.includes('overcast')) return weatherIcons.cloudy;
    return weatherIcons['partly-cloudy'];
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });
}

function getCurrentTime() {
    return new Date().toLocaleString('en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true });
}

// ✅ Build API URL
function buildApiUrl(city, days) {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoint}?city=${encodeURIComponent(city)}&days=${days}`;
}

// ✅ Loading and Error UI
function showLoading() {
    document.getElementById('weather-content').innerHTML = `<div class="loading">Loading weather data...</div>`;
}

function showError(message) {
    document.getElementById('weather-content').innerHTML = `
        <div class="error">
            <h3>⚠️ Error loading weather data</h3>
            <p>${message}</p>
            <button onclick="refreshCurrentSearch()">Try Again</button>
        </div>`;
}

// ✅ Render weather data
function renderWeatherData(data) {
    const { weatherResponse, dayTemp } = data;
    document.getElementById('weather-content').innerHTML = `
        <button class="refresh-btn" onclick="refreshCurrentSearch()">Refresh</button>
        <div class="header">
            <h1>${weatherResponse.city}, ${weatherResponse.region}</h1>
            <p>${getCurrentTime()} — ${weatherResponse.condition}</p>
        </div>
        <div class="main-weather">
            <div class="weather-icon">${getWeatherIcon(weatherResponse.condition)}</div>
            <div class="temperature">${Math.round(weatherResponse.temperature)}°C</div>
        </div>
        <div class="forecast-container">
            ${dayTemp.map(day => `
                <div class="forecast-day">
                    <div class="day">${formatDate(day.date)}</div>
                    <div class="forecast-icon">${getWeatherIcon(day.condition || weatherResponse.condition)}</div>
                    <div class="temp-range">${Math.round(day.maxTemp)}° / ${Math.round(day.minTemp)}°</div>
                </div>
            `).join('')}
        </div>`;
}

// ✅ Fetch Weather Data
async function loadWeatherData(city, days) {
    try {
        if (!city.trim()) throw new Error('City name is required');
        if (days < 1 || days > 14) throw new Error('Days must be between 1 and 14');
        
        showLoading();
        const url = buildApiUrl(city, days);
        console.log('🌦 Fetching:', url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
        const data = await response.json();
        if (!data.weatherResponse) throw new Error('Invalid API data format');
        
        renderWeatherData(data);
        currentSearch = { city, days };
    } catch (err) {
        console.error(err);
        showError(err.message || 'Unknown error occurred.');
    }
}

// ✅ Refresh Button
function refreshCurrentSearch() {
    if (currentSearch.city) loadWeatherData(currentSearch.city, currentSearch.days);
}

// ✅ Form Handler
function handleFormSubmit(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value.trim();
    const days = parseInt(document.getElementById('days-input').value);
    loadWeatherData(city, days);
}

// ✅ Initialize
function initializeApp() {
    document.getElementById('weather-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('city-input').focus();
}

document.addEventListener('DOMContentLoaded', initializeApp);
