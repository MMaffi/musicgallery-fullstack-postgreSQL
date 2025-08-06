const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, async (req, res) => {
  const userId = req.user.id;

  const checkExisting = `
    SELECT s.key_name AS \`key\`, us.value
    FROM user_settings us
    JOIN settings s ON us.setting_id = s.id
    WHERE us.user_id = ?`;

  try {
    const [results] = await db.query(checkExisting, [userId]);

    if (results.length > 0) {
      const settings = {};
      results.forEach(row => settings[row.key] = row.value);
      return res.json(settings);
    }

    const defaultValues = {
      theme: 'dark',
      language: 'pt',
      notifications: 'disable',
    };

    const [settingRows] = await db.query('SELECT id, key_name FROM settings');

    const insertValues = settingRows.map(row => {
      const value = defaultValues[row.key_name] || '';
      return [userId, row.id, value];
    });

    const insertQuery = 'INSERT INTO user_settings (user_id, setting_id, value) VALUES ?';

    await db.query(insertQuery, [insertValues]);

    // Buscar novamente as configs já criadas para devolver
    const [newResults] = await db.query(checkExisting, [userId]);
    const settings = {};
    newResults.forEach(row => settings[row.key] = row.value);
    res.json(settings);

  } catch (err) {
    console.error('Erro ao carregar ou criar configurações:', err);
    res.status(500).json({ error: 'Erro ao processar configurações' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { key, value } = req.body;

  try {
    const [results] = await db.query('SELECT id FROM settings WHERE `key_name` = ?', [key]);
    if (results.length === 0) {
      return res.status(400).json({ error: 'Configuração inválida' });
    }

    const settingId = results[0].id;
    const upsert = `
      INSERT INTO user_settings (user_id, setting_id, value)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE value = ?`;

    await db.query(upsert, [userId, settingId, value, value]);

    res.json({ message: 'Configuração salva com sucesso' });

  } catch (err) {
    console.error('Erro ao salvar configuração:', err);
    res.status(500).json({ error: 'Erro ao salvar configuração' });
  }
});

module.exports = router;