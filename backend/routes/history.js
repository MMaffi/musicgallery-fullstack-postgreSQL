const express = require('express');
const router = express.Router();
const pool = require('../db/conn');

// Middleware de autenticação
const requireAuth = require('../middleware/auth');

// GET: histórico do usuário
router.get('/', requireAuth, async (req, res) => {
  const { id } = req.user;

  try {
    const { rows } = await pool.query(
      'SELECT term FROM search_history WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 10',
      [id]
    );

    res.json(rows.map(row => row.term));
  } catch (err) {
    console.error('Erro ao buscar histórico:', err);
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
});

// POST: adicionar novo termo ao histórico
router.post('/', requireAuth, async (req, res) => {
  const { id } = req.user;
  const { term } = req.body;

  if (!term || term.trim().length < 2) {
    return res.status(400).json({ error: 'Termo de busca muito curto' });
  }

  const trimmedTerm = term.trim();

  try {
    // Verifica se o último termo é igual ao atual
    const { rows: lastSearch } = await pool.query(
      'SELECT term FROM search_history WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 1',
      [id]
    );

    if (lastSearch.length > 0 && lastSearch[0].term.toLowerCase() === trimmedTerm.toLowerCase()) {
      return res.status(200).json({ message: 'Termo já foi salvo recentemente' });
    }

    // Insere novo termo
    await pool.query(
      'INSERT INTO search_history (user_id, term) VALUES ($1, $2)',
      [id, trimmedTerm]
    );

    // Remove termos antigos se passar de 10
    await pool.query(
      `
      DELETE FROM search_history
      WHERE user_id = $1
      AND id NOT IN (
        SELECT id FROM search_history
        WHERE user_id = $1
        ORDER BY timestamp DESC
        LIMIT 10
      )
      `,
      [id]
    );

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Erro ao salvar histórico:', err);
    res.status(500).json({ error: 'Erro ao salvar histórico' });
  }
});

// DELETE: limpar todo o histórico do usuário
router.delete('/', requireAuth, async (req, res) => {
  const { id } = req.user;

  try {
    await pool.query('DELETE FROM search_history WHERE user_id = $1', [id]);
    res.status(200).json({ message: 'Histórico apagado com sucesso' });
  } catch (err) {
    console.error('Erro ao apagar histórico:', err);
    res.status(500).json({ error: 'Erro ao apagar histórico' });
  }
});

module.exports = router;