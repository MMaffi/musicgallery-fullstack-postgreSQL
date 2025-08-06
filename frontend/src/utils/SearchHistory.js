import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const LOCAL_STORAGE_KEY = 'search_history';
const MAX_HISTORY = 10;

/**
 * Obtém o histórico de busca.
 * Visitantes usam localStorage; usuários autenticados usam o banco de dados.
 */
export async function getSearchHistory(user) {
  if (!user) {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/api/history`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error('Erro ao buscar histórico do banco:', error);
    return [];
  }
}

/**
 * Adiciona um novo termo ao histórico, respeitando o limite de 10 itens.
 */
export async function addSearchTerm(term, user) {
  if (!term || !term.trim()) return;

  term = term.trim();

  if (!user) {
    const current = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

    // Remove duplicatas (case insensitive)
    const updated = [term, ...current.filter(t => t.toLowerCase() !== term.toLowerCase())];

    // Limita a 10 entradas
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated.slice(0, MAX_HISTORY)));
    return;
  }

  try {
    await axios.post(`${API_BASE_URL}/api/history`, { term }, { withCredentials: true });
  } catch (error) {
    console.error('Erro ao salvar termo no banco:', error);
  }
}

/**
 * Limpa o histórico de busca.
 */
export async function clearSearchHistory(user) {
  if (!user) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return;
  }

  try {
    await axios.delete(`${API_BASE_URL}/api/history`, { withCredentials: true });
  } catch (error) {
    console.error('Erro ao limpar histórico do banco:', error);
  }
}