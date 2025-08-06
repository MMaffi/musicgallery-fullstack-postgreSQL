import React, { useEffect, useRef, useState, useContext, useMemo } from 'react';
import '../styles/configstyle.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { SettingsContext } from '../context/SettingsContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import { clearSearchHistory } from '../utils/SearchHistory';

function SettingsModal() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { settings, updateSetting } = useContext(SettingsContext);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const langRef = useRef(null);
  const themeRef = useRef(null);

  const languageOptions = useMemo(() => ({
    pt: { code: 'pt', label: t('languages.pt'), flag: './assets/flags/br.svg' },
    en: { code: 'en', label: t('languages.en'), flag: './assets/flags/us.svg' },
    es: { code: 'es', label: t('languages.es'), flag: './assets/flags/es.svg' },
  }), [t]);

  const themeOptions = useMemo(() => ({
    dark: { code: 'dark', label: t('themes.dark') },
    light: { code: 'light', label: t('themes.light') },
    system: { code: 'system', label: t('themes.system') },
  }), [t]);

  const [selectedLang, setSelectedLang] = useState(languageOptions.pt);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions.dark);

  useEffect(() => {
    if (settings.language && languageOptions[settings.language]) {
      setSelectedLang(languageOptions[settings.language]);
    }
    if (settings.theme && themeOptions[settings.theme]) {
      setSelectedTheme(themeOptions[settings.theme]);
    }
  }, [settings, languageOptions, themeOptions]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (langOpen && langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (themeOpen && themeRef.current && !themeRef.current.contains(e.target)) setThemeOpen(false);
    }
    if (langOpen || themeOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen, themeOpen]);

  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setLangOpen(false);
    updateSetting('language', lang.code);
    i18n.changeLanguage(lang.code);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setThemeOpen(false);
    updateSetting('theme', theme.code);
  };

  const handleLoginClick = () => {
    setOpen(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    setOpen(false);
    navigate('/register');
  };

  const handleClearHistory = async () => {
    const success = await clearSearchHistory(user);
    if (success !== false) {
      toast.success(t('settings.history_cleared') || 'Histórico limpo!');
      window.dispatchEvent(new Event('historyCleared'));
    } else {
      toast.error(t('settings.history_clear_failed') || 'Falha ao limpar histórico');
    }
  };

  return (
    <>
      <button id="configBtn" title={t('settings.title')} onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
        </svg>
      </button>

      {open && (
        <div id="settings-modal" className="settings-modal">
          <div className={`settings-content ${!user ? 'compact' : ''}`}>
            <span className="close-settings" onClick={() => setOpen(false)}>×</span>

            {!user ? (
              <>
                <h2>Configurações</h2>
                <p className="login-required-msg">
                  ⚠️ Para acessar as configurações, é necessário estar logado.
                </p>

                <div className="setting-group auth-buttons">
                  <button className="login-btn" onClick={handleLoginClick}>Login</button>
                  <button className="register-btn" onClick={handleRegisterClick}>Registrar</button>
                </div>
              </>
            ) : (
              <>
                <h2>{t('settings.title')}</h2>
                <div className="setting-row">
                  <div className="setting-item">
                    <label>{t('settings.language')}:</label>
                    <div className={`language-dropdown${langOpen ? ' open' : ''}`} ref={langRef}>
                      <button className="dropdown-toggle" onClick={() => setLangOpen(v => !v)} type="button">
                        <img src={selectedLang.flag} alt={selectedLang.label} />
                        <span>{selectedLang.label}</span>
                      </button>
                      <ul className="dropdown-options">
                        {Object.values(languageOptions).map(lang => (
                          <li key={lang.code} onClick={() => handleLangSelect(lang)}>
                            <img src={lang.flag} alt={lang.label} />
                            <span>{lang.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="setting-item">
                    <label>{t('settings.theme')}:</label>
                    <div className={`theme-dropdown${themeOpen ? ' open' : ''}`} ref={themeRef}>
                      <button className="dropdown-toggle" onClick={() => setThemeOpen(v => !v)} type="button">
                        <span>{selectedTheme.label}</span>
                      </button>
                      <ul className="dropdown-options">
                        {Object.values(themeOptions).map(theme => (
                          <li key={theme.code} onClick={() => handleThemeSelect(theme)}>
                            <span>{theme.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="setting-group">
                  <label>{t('settings.notifications')}</label>
                  <button>{t('settings.enable_notifications')}</button>
                  <br /><br />
                  <button>{t('settings.disable_notifications')}</button>
                </div>

                <div className="setting-group">
                  <label>{t('settings.history')}:</label>
                  <button onClick={handleClearHistory}>{t('settings.clear_history')}</button>
                </div>

                <div className="setting-group auth-buttons">
                  <p className="user_label">{t('settings.greeting')}, {user.name}!</p>
                  <LogoutButton className="logout-btn" />
                </div>

                <div className="setting-group about">
                  <p><strong>Music Gallery</strong> v<span id="siteVersion">1.0.0</span></p>
                  <p>{t('settings.by')} <a href="https://github.com/mmaffi" target="_blank" rel="noopener noreferrer">mmaffi</a></p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsModal;