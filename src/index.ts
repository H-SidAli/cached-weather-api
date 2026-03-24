import express from "express";
import dotenv from "dotenv";
import { connectRedis, redisClient } from "./config/redis";
import { getCache, setCache } from "./services/cache.service";
import { fetchWeather } from "./services/weather.service";
import { WeatherResponse } from "./types/weather";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city.trim().toLowerCase();

  try {
    // Check cache
    const cached = await getCache(city);
    if (cached) {
      if (typeof cached === "string") {
      const data : WeatherResponse = await getCache(cached);

      if (data) {
        return res.json({ source: "cache", data });
      }

      // Broken key → treat as MISS
    console.log("Broken cache key, refetching.");

    await redisClient.del(city);
  } else {
    return res.json({ source: "cache", data: cached });
  }
}

    // Cache Miss: Fetch from API
    console.log("Cache MISS: Fetching from API");
    const weather = await fetchWeather(city);

    const resolvedAddress = weather.resolvedAddress.toLowerCase();
    console.log("Resolved address:", resolvedAddress);

    // 3. Store canonical data
    await setCache(resolvedAddress, weather);

    // 4. Map input → canonical
    if (city !== resolvedAddress) {
      await setCache(city, resolvedAddress);
    }

    res.json({
      source: "api",
      data: weather,
    });

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, async () => {
  await connectRedis();
  console.log(`Server running on port ${PORT}`);
});