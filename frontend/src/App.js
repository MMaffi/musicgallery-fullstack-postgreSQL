import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SettingsModal from './components/SettingsModal';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SettingsContext } from './context/SettingsContext';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import Home from './pages/home';
import VideosPage from './pages/videospage';
import AboutPage from './pages/aboutpage';
import SuggestionsPage from './pages/suggestionspage';
import RegisterPage from './pages/registerpage';
import LoginPage from './pages/loginpage';

const mockVideos = [
  {
    id: 'F8yG_Pe9y6o',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/F8yG_Pe9y6o/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=F8yG_Pe9y6o',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 9999999
  },
  {
    id: '3JZ_D3ELwOQ',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    artist: 'Mark Ronson',
    thumbnail_url: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    publishedAt: '2014-11-19T00:00:00Z',
    views: 8888888
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 9999999
  },
  {
    id: 'zOIND7DFRg4',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    artist: 'Mark Ronson',
    thumbnail_url: 'https://img.youtube.com/vi/zOIND7DFRg4/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=zOIND7DFRg4',
    publishedAt: '2014-11-19T00:00:00Z',
    views: 8888888
  },
  {
    id: '814SoGI3Nus',
    title: 'Rick Astley - Never Gonna Give You Up',
    artist: 'Rick Astley',
    thumbnail_url: 'https://img.youtube.com/vi/814SoGI3Nus/hqdefault.jpg',
    video_url: 'https://www.youtube.com/watch?v=814SoGI3Nus',
    publishedAt: '1987-10-25T00:00:00Z',
    views: 9999999
  }
];

function App() {
  const { t } = useTranslation();
  const { settings } = useContext(SettingsContext);

  const [videos] = useState(mockVideos);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerVideo, setPlayerVideo] = useState(null);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const theme = settings.theme || 'system';
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(systemPref ? 'dark' : 'light');
      root.classList.remove(systemPref ? 'light' : 'dark');
    }
  }, [settings]);

  useEffect(() => {
    if (videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      setFeatured(videos[randomIndex]);
    }
  }, [videos]);

  useEffect(() => {
    document.body.style.overflow = showPlayer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPlayer]);

  const openPlayer = (video) => {
    setPlayerVideo(video);
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setPlayerVideo(null);
  };

  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar videos={videos} />
          <Routes>
            <Route
              path="/"
              element={
                <Home videos={videos} openPlayer={openPlayer} featured={featured} />
              }
            />
            <Route
              path="/videos"
              element={
                <VideosPage videos={videos} openPlayer={openPlayer} />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/suggestions" element={<SuggestionsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>

          {showPlayer && playerVideo && (
            <div id="player-modal" className="modal">
              <div className="modal-content">
                <span className="close-button" onClick={closePlayer}>
                  &times;
                </span>
                <h2 id="player-title">{playerVideo.title}</h2>
                <div id="player-meta">
                  <span id="player-views">
                    {playerVideo.views} {t('player.views')}
                  </span>
                  <span id="player-date" className="modal-date">
                    {playerVideo.publishedAt
                      ? new Date(playerVideo.publishedAt).toLocaleDateString(i18n.language, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : ''}
                  </span>
                </div>
                <div className="responsive-iframe-container">
                  <iframe
                    id="videoPlayer"
                    src={`https://www.youtube.com/embed/${playerVideo.id}`}
                    frameBorder="0"
                    allowFullScreen
                    title={playerVideo.title}
                  />
                </div>
              </div>
            </div>
          )}

          <Footer />
          <SettingsModal />
          <ToastContainer 
            position="top-right" 
            autoClose={3000}
            style={{ zIndex: 99999 }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;