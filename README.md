# 🎵 Music Gallery Fullstack

> An interactive gallery of music videos, focused on high-quality covers, built with a modern fullstack architecture.

[![GitHub License](https://img.shields.io/github/license/MMaffi/musicgallery-fullstack?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=fff&style=flat-square)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=fff&style=flat-square)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=fff&style=flat-square)](https://www.mysql.com/)

---

## 📸 Overview

**Music Gallery Fullstack** is the advanced version of the static website [Music Gallery](https://mmaffi.github.io/MusicGallery), now with complete features such as:

- User authentication and Google login
- Personalized settings persisted in the database
- Light/dark theme with per-user preferences
- Multilanguage support (i18n with `react-i18next`)
- Integration with the YouTube API (featured & latest videos)
- Music suggestion form
- Modern and responsive interface

---

## 🧠 Key Features

### 🔐 Authentication
- Register and Login authentication
- Route protection based on user authentication

### ⚙️ User Settings
- Preferences stored in the database (theme, language, notifications)
- Elegant settings modal using CSS variables for theming

### 🎬 Video Display
- Highlighted featured video section
- Dynamic video gallery powered by the YouTube API
- View count display in the video modal
- Infinite scroll and "Load More" functionality

### 🌐 Internationalization
- Support for Portuguese, English, and Spanish
- JSON-based translations integrated with `react-i18next`

### 💬 Music Suggestions
- Suggestion page with email delivery via backend
- Real-time feedback on form submission

---

## 📁 Project Structure

```bash
musicgallery-fullstack/
│
├── backend/                # Node.js + Express API
│   ├── controllers/        # API endpoint logic
│   ├── db/                 # Database models (Users, Settings, etc.)
│   ├── middleware          # auth.js
│   ├── routes/             # API routes
│   └── index.js            # Server entry point

├── frontend/               # React application
│   ├── public/             # Public assets (manifest, icons, etc.)
│   ├── src/
│   │   ├── components/     # Reusable components (Navbar, Footer, etc.)
│   │   ├── context/        # React contexts (auth, settings, etc.)
│   │   ├── i18n/           # i18n config and translation files
│   │   ├── pages/          # Application pages (Home, Suggestions, etc.)
│   │   ├── styles/         # Modular and responsive CSS
│   │   └── main.jsx        # React app entry point
│   └── vite.config.js      # Vite build configuration
```

## 🚀 Technologies Used

```
| Layer         | Stack                                                                  |
|---------------|------------------------------------------------------------------------|
| Frontend      | React, Vite, CSS, i18next                                              |
| Backend       | Node.js, Express, Nodemailer                                           |
| Database      | MySQL                                                                  |
| External APIs | YouTube Data API v3                                                    |
```

---

## 🛠️ Installation & Setup

### 🔧 Prerequisites

- Node.js ≥ 18  
- MySQL ≥ 8  

### 📦 Installation

```bash
git clone https://github.com/MMaffi/musicgallery-fullstack.git
cd musicgallery-fullstack
```

### 🔙 Backend

```bash
cd backend
cp .env.example .env
npm install
npm run build
```

### 🎨 Frontend

```bash
cd frontend
npm install
npm run build
```

## 🌐 Environment Variables

### Backend (`.env`)

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=YOUR_PASSWORD
DB_NAME=YOUR_DB_NAME
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
YOUTUBE_CHANNEL_ID=YOUR_YOUTUBE_CHANNEL_ID
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
JWT_SECRET=your_secret_key
```

## 🧪 Future Improvements

- Favorite system and user-created playlists  
- Admin dashboard to manage suggestions  
- Advanced search and filtering by genre/artist  
- Custom video uploads by users

---

## 🤝 Contributing

Contributions are welcome! Feel free to open **issues**, **fork** the repository, and submit **pull requests**.

```bash
# Create your branch
git checkout -b my-feature

# Commit your changes
git commit -m "Add new feature"

# Push to remote
git push origin my-feature
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 Developed by

**Mateus Maffi**  
[GitHub](https://github.com/MMaffi) • [LinkedIn](https://www.linkedin.com/in/mateusmaffi)

---

## ⭐ Give a Star!

If you like this project, consider giving it a ⭐ on the repository. It really helps!
