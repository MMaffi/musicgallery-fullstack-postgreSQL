const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const nodemailer = require('nodemailer');

router.post('/send', authenticate, async (req, res) => {
  const { song, artist, suggestion } = req.body;
  const { name, email } = req.user;

  if (!name || !email || !song || !artist) {
    return res.status(400).json({ error: 'Nome, email, música e artista são obrigatórios.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Sugestão do site Music Gallery" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Nova sugestão de música de ${name}`,
    text: `
📨 Sugestão enviada pelo site Music Gallery

👤 Nome: ${name}
📧 Email: ${email}

🎵 Música: ${song}
🎤 Artista: ${artist}

📝 Comentário:
${suggestion || 'Nenhum comentário'}
    `.trim()
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Sugestão enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar sugestão:', error);
    res.status(500).json({ error: 'Erro ao enviar sugestão' });
  }
});

module.exports = router;