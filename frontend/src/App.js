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

function App() {
  const { t } = useTranslation();
  const { settings } = useContext(SettingsContext);

  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
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
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/youtube`);
        if (!res.ok) throw new Error('Erro ao buscar vídeos da API');
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error('Erro ao buscar vídeos da API:', err);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (!loadingVideos && videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      setFeatured(videos[randomIndex]);
    }
  }, [loadingVideos, videos]);

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

          {loadingVideos ? (
            <main style={{ padding: '2rem', textAlign: 'center' }}>
              <p>{t('loading.videos') || 'Carregando vídeos...'}</p>
            </main>
          ) : (
            <>
              <Routes>
                <Route
                  path="/"
                  element={<Home videos={videos} openPlayer={openPlayer} featured={featured} />}
                />
                <Route
                  path="/videos"
                  element={<VideosPage videos={videos} openPlayer={openPlayer} />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/suggestions" element={<SuggestionsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </>
          )}

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
                          day: 'numeric',
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
          <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 99999 }} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;