# 🌦️ Weather API with Caching (TypeScript + Redis)

A backend project built with **Node.js, Express, and TypeScript** that fetches weather data from an external API and optimizes performance using **Redis caching**.

---

## 🚀 Features

- 🌍 Fetch real-time weather data from an external API
- ⚡ Redis in-memory caching for fast responses
- 🧠 Smart cache strategy using canonical keys
- 🔁 Cache-aside pattern implementation
- ⏱️ TTL (Time-To-Live) for automatic cache expiration
- 🛡️ Basic error handling and fallback logic
- 🧩 TypeScript for type safety

---

## 🏗️ Project Structure

```
src/
├── config/
│   └── redis.ts
├── services/
│   ├── weather.service.ts
│   └── cache.service.ts
├── types/
│   └── weather.ts
└── index.ts
```

---

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables (.env)
```env
PORT=3000
WEATHER_API_KEY=your_api_key_here
REDIS_URL=redis://localhost:6379
```

### 3. Run Redis (Docker)
```bash
docker run -d -p 6379:6379 redis
```

### 4. Start the server
```bash
npm run dev
```

---

## 📡 API Endpoint

### GET /weather/:city

Example:
```bash
http://localhost:3000/weather/paris
```

---

## 🧠 Caching Strategy

### Cache-Aside Pattern

1. Check cache
2. If miss → fetch from API
3. Store in cache
4. Return result

---

### Canonical Key Strategy

```
"paris, france" → weather data
"paris" → "paris, france"
```

- Avoid duplicate cache entries
- Normalize different inputs
- Improve cache hit rate

---

### Handling References

- If cached value is an object → return it
- If cached value is a string → treat as reference and resolve it

---

### Broken Cache Case

```
"paris" → "paris, france"
"paris, france" → expired ❌
```

Solution:
- Detect missing data
- Treat as cache miss
- Refetch from API

---

## ⏱️ TTL (Time-To-Live)

```ts
EX: 60 * 60 * 12 // 12 hours
```

- Prevent stale data
- Auto cleanup
- Control memory usage

---

## 🧠 What I Learned

### TypeScript
- Interfaces for API responses
- Typing async functions
- Better code safety

### Redis & Caching
- In-memory key-value storage
- TTL expiration
- Fast data access

### Cache Strategies
- Cache-aside pattern
- Canonical keys
- Alias/reference caching
- Trade-offs: memory vs performance

### Backend Design
- Handling edge cases
- Cache inconsistency
- Scalability thinking

### Performance Optimization
- Reduce API calls
- Faster responses
- Efficient system design

---

## ⚠️ Limitations

- No input validation
- No rate limiting
- No logging system
- Possible cache inconsistency

---

## 🧠 Key Takeaway

Cache is not just about storing data, 
it's about designing systems that balance speed, memory, and consistency.

---

## 👨‍💻 Author

Learning project covering:
- TypeScript
- Backend development
- Redis caching (Most important thing in this project)
- System design basics
