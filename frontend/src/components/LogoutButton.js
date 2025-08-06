import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { logout } from '../services/authService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function LogoutButton({ className }) {
  const { setUser } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      toast.success(t('logout.success'));

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      console.error('Erro ao fazer logout', err);
      toast.error(t('logout.error'));
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      {t('logout.button')}
    </button>
  );
}

export default LogoutButton;