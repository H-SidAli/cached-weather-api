import axios from "axios"
import { WeatherResponse } from "../types/weather"

const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

function mapWeatherResponse(apiData : any): WeatherResponse{
  return {
    resolvedAddress: apiData.resolvedAddress,
    days: apiData.days.map((day: any) => ({
      datetime: day.datetime,
      temp: day.temp,
      conditions: day.conditions
    }))
  }
}

export const fetchWeather = async (city: string): Promise<WeatherResponse> => {
  const response = await axios.get(
    `${BASE_URL}/${city}?key=${process.env.WEATHER_API_KEY}`
  );

  return mapWeatherResponse(response.data);
};