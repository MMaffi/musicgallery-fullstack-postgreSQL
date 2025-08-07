const db = require('../db/conn');

async function checkSuggestionCooldown(req, res, next) {
  const userId = req.user.id;

  try {
    const result = await db.query(
      'SELECT sent_at FROM email_suggestions WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length > 0) {
      const lastSent = new Date(result.rows[0].sent_at);
      const now = new Date();
      const diffInMinutes = (now - lastSent) / (1000 * 60);

      if (diffInMinutes < 10) {
        const remaining = Math.ceil(10 - diffInMinutes);
        return res.status(429).json({
          error: `Você deve esperar mais ${remaining} minuto(s) antes de enviar outra sugestão.`
        });
      }
    }

    next();
  } catch (err) {
    console.error('Erro ao verificar cooldown:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = checkSuggestionCooldown;