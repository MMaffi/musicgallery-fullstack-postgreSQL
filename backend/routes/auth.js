const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/conn');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';
const isProduction = (process.env.NODE_ENV || 'production') === 'production';

// Registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Dados incompletos' });

  try {
    const hash = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
    await db.query(sql, [name, email, hash]);

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);

    if (error.code === '23505') {
      return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Credenciais inválidas' });

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      SECRET,
      { expiresIn: '15d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 dias
    });

    res.json({ name: user.name });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });

  res.json({ message: 'Logout efetuado' });
});

// Middleware de autenticação
const authenticate = require('../middleware/auth');

// Perfil do usuário autenticado
router.get('/me', authenticate, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

module.exports = router;