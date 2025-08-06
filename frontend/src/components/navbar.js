import React, { useRef, useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/style.css';

// Variavel do DotEnv
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Navbar({ title = "Music Gallery", videos = [] }) {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: currentUser } = useContext(AuthContext);

  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q')?.trim();

  const fuse = new Fuse(videos, {
    keys: ['title', 'description'],
    threshold: 0.3,
  });

  // Função para buscar histórico do usuário
  async function fetchUserHistory() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/history`, { withCredentials: true });
      setHistory(res.data || []);
    } catch (err) {
      console.error('Erro ao buscar histórico do usuário:', err);
      setHistory([]);
    }
  }

  // Carrega histórico ao montar, e quando currentUser muda
  useEffect(() => {
    if (!currentUser) {
      const stored = localStorage.getItem('searchHistory');
      setHistory(stored ? JSON.parse(stored) : []);
    } else {
      fetchUserHistory();
    }
  }, [currentUser]);

  // Atualiza histórico quando o evento 'historyCleared' for disparado (ex: após limpar histórico)
  useEffect(() => {
    function onHistoryCleared() {
      if (!currentUser) {
        localStorage.removeItem('searchHistory');
        setHistory([]);
      } else {
        fetchUserHistory();
      }
    }

    window.addEventListener('historyCleared', onHistoryCleared);
    return () => {
      window.removeEventListener('historyCleared', onHistoryCleared);
    };
  }, [currentUser]);

  // Salva termos no localStorage ou no banco
  function saveSearch(term) {
    if (!term.trim()) return;
    if (currentUser) {
      saveSearchToDB(term);
    } else {
      const prev = localStorage.getItem('searchHistory');
      const parsed = prev ? JSON.parse(prev) : [];
      const updated = [term, ...parsed.filter(i => i !== term)].slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
      setHistory(updated);
    }
  }

  // Salva termo no banco via API
  async function saveSearchToDB(term) {
    try {
      await axios.post(`${API_BASE_URL}/api/history`, { term }, { withCredentials: true });
      fetchUserHistory();
    } catch (err) {
      console.error('Erro ao salvar no banco:', err);
    }
  }

  // Fecha input ao clicar fora ou pressionar ESC
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
        setQuery('');
        setResults([]);
      }
    }
    function handleEsc(event) {
      if (event.key === 'Escape') {
        setShowInput(false);
        setQuery('');
        setResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Atualiza resultados de busca a cada digitação
  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === '') {
      setResults([]);
      return;
    }
    const matches = fuse.search(value).map(res => res.item);
    setResults(matches);
  };

  // Submete busca no Enter
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/videos?q=${encodeURIComponent(query.trim())}`);
      saveSearch(query.trim());
      setShowInput(false);
      setQuery('');
      setResults([]);
    }
  };

  // Clica em histórico para navegar
  const handleHistoryClick = (term) => {
    navigate(`/videos?q=${encodeURIComponent(term)}`);
    saveSearch(term);
    setShowInput(false);
    setQuery('');
    setResults([]);
  };

  const subtitlesMap = {
    '/': '',
    '/videos': t('navbar.videos'),
    '/about': t('navbar.about'),
    '/suggestions': t('navbar.suggestions'),
  };

  let subtitle = subtitlesMap[pathname] || '';
  if (pathname === '/videos' && q) {
    subtitle = t('navbar.results_for', { query: q });
  }

  return (
    <header>
      <div className="header-left">
        <h1>
          {title}
          {subtitle && (
            <>
              <span className="separator"> | </span>
              <span className="navbar-subtitle">{subtitle}</span>
            </>
          )}
        </h1>
      </div>
      <div className="header-right">
        <nav className="menu">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.home')}
          </NavLink>
          {' | '}
          <NavLink to="/videos" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.videos')}
          </NavLink>
          {' | '}
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.about')}
          </NavLink>
          {' | '}
          <NavLink to="/suggestions" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.suggestions')}
          </NavLink>
        </nav>
        <div className="search-wrapper" ref={inputRef}>
          <button
            id="searchToggle"
            className="search-icon"
            onClick={() => setShowInput((v) => !v)}
            aria-label={t('navbar.search_aria_label')}
          >
            🔍
          </button>
          {showInput && (
            <div style={{ position: 'relative', width: '250px' }}>
              <input
                type="text"
                id="searchInput"
                placeholder={t('navbar.search_placeholder')}
                autoComplete="off"
                spellCheck="false"
                autoFocus
                value={query}
                onChange={handleInput}
                onKeyDown={handleSearchSubmit}
              />
              {results.length > 0 && (
                <div id="suggestions">
                  {results.slice(0, 5).map(video => (
                    <div
                      key={video.id}
                      className="suggestion-item"
                      onClick={() => {
                        navigate(`/videos?q=${encodeURIComponent(video.title)}`);
                        saveSearch(video.title);
                        setShowInput(false);
                        setQuery('');
                        setResults([]);
                      }}
                    >
                      {video.title}
                    </div>
                  ))}
                </div>
              )}
              {results.length === 0 && history.length > 0 && (
                <div id="suggestions">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleHistoryClick(item)}
                    >
                      <span className='suggestion-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                          <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                          <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                          <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;