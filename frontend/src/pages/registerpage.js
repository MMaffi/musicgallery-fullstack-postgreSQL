import React, { useState, useRef, useEffect } from 'react';
import '../styles/register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState(null);

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Variavel do DotEnv
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        toast.success('Usuário registrado com sucesso! Redirecionando para login...');
        setFormData({ name: '', email: '', password: '' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        let errorMsg = 'Erro ao registrar';
        try {
          const data = await res.json();
          if (data.message) errorMsg = data.message;
        } catch {
          const text = await res.text();
          if (text) errorMsg = text;
        }
        setStatus('error');
        toast.error(errorMsg);
      }
    } catch (err) {
      setStatus('error');
      toast.error('Erro na conexão');
    }
  };

  return (
    <>
      <main className='register-container'>
        <div className="register-page">
          <h2>Cadastrar-se</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome:</label>
            <input
            ref={nameInputRef}
              id="name"
              name="name"
              type="text"
              placeholder='Ex: João'
              value={formData.name}
              onChange={handleChange}
              autoComplete='off'
              required
            />

            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Ex: joao@email.com'
              value={formData.email}
              onChange={handleChange}
              autoComplete='off'
              required
            />

            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder='Ex: 123456'
              value={formData.password}
              onChange={handleChange}
              autoComplete='off'
              required
            />

            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Registrando...' : 'Registrar'}
            </button>
          </form>

          <p className='linklogin'>
            Já tem cadastro? Faça <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </main>
    </>
  );
}

export default RegisterPage;