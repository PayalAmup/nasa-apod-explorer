# 🌌 NASA APOD Explorer

*Payal Amup — Final Year EnTC
Government College of Engineering & Research, Avasari, Pune*

A simple full-stack web application that lets users explore NASA’s **Astronomy Picture of the Day (APOD)**.
The project uses a **Node.js backend** to fetch and cache data from NASA’s API and a **React frontend** to display images, descriptions, and date-based APOD history.

---

## 🚀 Features

* Browse the *Astronomy Picture of the Day* (APOD)
* Search images by **date**
* High-resolution APOD images with description & metadata
* **Backend caching** to reduce API calls
* Clean and responsive React UI
* Simple to run locally (only Node + npm needed)

---

## 📁 Project Structure

```
/ (root)
├─ backend/               # Node.js API server
│  ├─ server.js
│  ├─ routes.js
│  ├─ apodCache.js
│  ├─ package.json
│  └─ .env.example
│
├─ frontend/              # React user interface
│  ├─ index.html
│  ├─ package.json
│  └─ src/
│     ├─ main.jsx
│     ├─ App.jsx
│     └─ components/
│        ├─ DatePickerView.jsx
│        ├─ DetailView.jsx
│        └─ Gallery.jsx
│
├─ docs/                  # Optional architecture & notes
├─ .gitignore
└─ README.md
```

## ⚙️ Backend Setup (Node.js + Express)

```bash
cd backend
cp .env.example .env
# Edit .env and set:
# NASA_API_KEY=YOUR_KEY_HERE   (Get free key from https://api.nasa.gov)

npm install
npm start
```

## 💻 Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

## 📐 How It Works

1. **Frontend (React)**

   * Sends requests like: `/api/apod?date=YYYY-MM-DD`
   * Shows APOD image, title, and explanation

2. **Backend (Node.js)**

   * Contacts NASA API
   * Stores responses in memory (cache)
   * Serves cached data immediately next time

3. **NASA APOD API**

   * Free public API from NASA (requires API key)
   * Provides daily astronomy images and descriptions

---

##  Acknowledgments

* NASA APOD API — [https://api.nasa.gov](https://api.nasa.gov)
* React & Vite
* Node.js + Express

