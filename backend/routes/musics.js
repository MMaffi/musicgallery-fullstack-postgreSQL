const express = require('express');
const router = express.Router();
const db = require('../db/conn');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM musics ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar músicas:', err);
      res.status(500).json({ error: 'Erro ao buscar músicas' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;