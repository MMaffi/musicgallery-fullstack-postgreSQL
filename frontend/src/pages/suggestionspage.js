import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

// Variavel do DotEnv
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function SuggestionsPage() {
  const { t } = useTranslation();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const hasWarnedRef = useRef(false);

  useEffect(() => {
    if (!loading && !user && !hasWarnedRef.current) {
      toast.warning('Você precisa estar logado para acessar esta página.');
      hasWarnedRef.current = true;
      navigate('/login');
    }
  }, [user, loading, navigate, t]);

  const [formData, setFormData] = useState({
    song: '',
    artist: '',
    suggestion: ''
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/suggestions/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          name: user.name,
          email: user.email
        })
      });

      if (res.ok) {
        toast.success(t('suggestions.success_message'));
        setFormData({ song: '', artist: '', suggestion: '' });
      } else {
        toast.error(t('suggestions.error_message'));
      }
    } catch (err) {
      console.error(err);
      toast.error(t('suggestions.connection_error'));
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) {
    return <main className="suggestions-main"><p>{t('suggestions.loading')}</p></main>;
  }

  return (
    <main className="suggestions-main">
      <section className="suggestion-form">
        <h2>{t('suggestions.title')}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="song">{t('suggestions.song_label')}</label>
          <input
            id="song"
            type="text"
            name="song"
            placeholder={t('suggestions.song_placeholder')}
            value={formData.song}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label htmlFor="artist">{t('suggestions.artist_label')}</label>
          <input
            id="artist"
            type="text"
            name="artist"
            placeholder={t('suggestions.artist_placeholder')}
            value={formData.artist}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label htmlFor="suggestion">{t('suggestions.comment_label')}</label>
          <textarea
            id="suggestion"
            name="suggestion"
            placeholder={t('suggestions.comment_placeholder')}
            value={formData.suggestion}
            onChange={handleChange}
            autoComplete="off"
          ></textarea>

          <button type="submit" disabled={loadingSubmit}>
            {loadingSubmit ? t('suggestions.sending') : t('suggestions.submit')}
          </button>
        </form>
      </section>
    </main>
  );
}

export default SuggestionsPage;