const API_BASE = "http://192.168.0.214:3000";

export async function fetchVideos() {
  const res = await fetch(`${API_BASE}/api/youtube`);
  if (!res.ok) throw new Error('Erro ao buscar vídeos');
  return res.json();
}

export async function fetchSuggestions() {
  const res = await fetch(`${API_BASE}/api/suggestions`);
  if (!res.ok) throw new Error('Erro ao buscar sugestões');
  return res.json();
}

export async function fetchSettings(token) {
  const res = await fetch(`${API_BASE}/api/settings`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Erro ao buscar configurações');
  return res.json();
}