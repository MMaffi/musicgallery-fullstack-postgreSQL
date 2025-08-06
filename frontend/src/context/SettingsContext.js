import { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import i18n from '../i18n';

export const SettingsContext = createContext();

// Variavel do DotEnv
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function SettingsProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    if (!user) {
      // Usuário deslogado força idioma para português
      setSettings({});
      i18n.changeLanguage('pt');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/settings`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);

        // Aplica idioma salvo no banco
        if (data.language) {
          i18n.changeLanguage(data.language);
        }
      } else {
        setSettings({});
        i18n.changeLanguage('pt');
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
      setSettings({});
      i18n.changeLanguage('pt');
    } finally {
      setLoading(false);
    }
  };

  // Atualiza uma configuração e salva no backend
  const updateSetting = async (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));

    // Se a configuração for de idioma, muda imediatamente no i18n
    if (key === 'language') {
      i18n.changeLanguage(value);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json();
        console.error('Erro ao salvar configuração:', data);
      }
    } catch (err) {
      console.error('Erro ao salvar configuração (fetch error):', err);
    }
  };

  // Recarrega as configurações quando usuário mudar (login/logout)
  useEffect(() => {
    setLoading(true);
    fetchSettings();
  }, [user]);

  // Aplica tema no body
  useEffect(() => {
    const theme = settings.theme || 'dark';
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.body.setAttribute('data-theme', theme);
    }
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}