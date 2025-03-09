import React, { useEffect, useState, useCallback } from "react";
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react";
import { useTranslation } from "react-i18next";

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=16.93&longitude=121.77&current_weather=true&hourly=temperature_2m,windspeed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia/Manila";

const WeatherDisplay = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tips, setTips] = useState({ sunny: false, rain: false, temperature: false });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        setWeather({
          temperature: data.current_weather.temperature,
          windSpeed: data.current_weather.windspeed,
          weatherCode: data.current_weather.weathercode,
        });

        setForecast(
          data.daily.time.map((date, index) => ({
            date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
            minTemp: data.daily.temperature_2m_min[index],
            maxTemp: data.daily.temperature_2m_max[index],
            precipitation: data.daily.precipitation_sum[index],
          }))
        );

        setHourlyForecast(
          data.hourly.time.slice(0, 24).map((time, index) => ({
            hour: new Date(time).getHours(),
            temperature: data.hourly.temperature_2m[index],
            windSpeed: data.hourly.windspeed_10m[index],
            precipitation: data.hourly.precipitation[index],
          }))
        );
      } catch (err) {
        setError(err.message || "Failed to fetch weather data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = useCallback((temp, precipitation) => {
    if (precipitation > 5) return <CloudRain className="text-blue-500 dark:text-blue-400" />;
    if (temp > 30) return <Sun className="text-yellow-500 dark:text-yellow-400" />;
    return <Cloud className="text-gray-500 dark:text-gray-400" />;
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-12 w-12 border-b-2 border-green-500 dark:border-green-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center space-x-4">
        {getWeatherIcon(weather.temperature, 0)}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t("Current Weather")} {new Date().toLocaleDateString()}
          </h2>
          <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{weather.temperature}°C</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed: {weather.windSpeed} km/h</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("Hourly Forecast")}</h2>
        <div className="flex overflow-x-auto space-x-4 p-2">
          {hourlyForecast.map((hourData, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-w-[80px]">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{hourData.hour}:00</p>
              {getWeatherIcon(hourData.temperature, hourData.precipitation)}
              <p className="text-sm text-gray-900 dark:text-gray-100">{hourData.temperature}°C</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{hourData.windSpeed} km/h</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{hourData.precipitation} mm</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("7-Day Forecast")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {getWeatherIcon(day.maxTemp, day.precipitation)}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{day.date}</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{day.maxTemp}°C</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Min: {day.minTemp}°C</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Precipitation: {day.precipitation} mm</p>
            </div>
          ))}
        </div>

        <div className="p-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('weather.farmingTips')}</h3>
            <ul className="space-y-3 mt-4">
              <li className="flex items-center cursor-pointer" onClick={() => setTips({ ...tips, sunny: !tips.sunny })}>
                <Sun className="text-yellow-500 dark:text-yellow-400 mr-2" /> {t('Weather Tips for Dry Seasons 🌞')}
              </li>
              {tips.sunny && (
                <p className="ml-6 text-gray-700 dark:text-gray-300">
                  <li><strong>Plant Drought-Resistant Crops:</strong> Opt for varieties like PSB Rc14 (Rio Grande) & PSB Rc68 (Sacobia).🌾</li>
                  <li><strong>Use Water-Saving Irrigation:</strong> Apply AWD or Low-Cost Drip Systems to conserve water.💧</li>
                  <li><strong>Diversify Crops:🌽</strong> Grow short-gestation, low-water crops like corn, beans, & root vegetables.</li>
                </p>
              )}

              <li className="flex items-center cursor-pointer" onClick={() => setTips({ ...tips, rain: !tips.rain })}>
                <CloudRain className="text-blue-500 dark:text-blue-400 mr-2" /> {t('Weather Tips for Rainy Seasons 🌧️')}
              </li>
              {tips.rain && (
                <p className="ml-6 text-gray-700 dark:text-gray-300">
                  <li><strong>Flood-Tolerant Crops:</strong> Choose resilient rice varieties like PSB Rc18 (Ala) & NSIC Rc194 (Submarino 1).🌾</li>
                  <li><strong>Improve Drainage:</strong> Use ditches or furrows to prevent waterlogging and root diseases.🌊</li>
                  <li><strong>Utilize Cover Crops:</strong> Grow legumes like cowpeas & mung beans to prevent soil erosion.🌿</li>
                  <li><strong>Employ Protective Structures:</strong> Use shade nets & windbreakers to shield crops from rain & wind.🚜</li>
                </p>
              )}

              <li className="flex items-center cursor-pointer" onClick={() => setTips({ ...tips, temperature: !tips.temperature })}>
                <Thermometer className="text-red-500 dark:text-red-400 mr-2" /> {t('Weather Tips for Changing Temperatures 🌡️')}
              </li>
              {tips.temperature && (
                <p className="ml-6 text-gray-700 dark:text-gray-300">
                  <li><strong>Monitor Weather Forecasts:</strong> Stay updated to anticipate temperature fluctuations.🌦️</li>
                  <li><strong>Implement Mulching Practices:</strong> Use mulch to regulate soil temperature & retain moisture.🍂</li>
                  <li><strong>Choose Climate-Resilient Crops:</strong> Opt for varieties adaptable to temperature variations.🌾</li>
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center italic">
        © 2025 James Bryan Aquino Tababa @ ISU CYN | Master of Information Technology
      </p>
    </div>
  );
};

export default WeatherDisplay;