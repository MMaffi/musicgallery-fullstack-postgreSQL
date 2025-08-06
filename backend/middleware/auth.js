const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Não autenticado' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
}

module.exports = authenticate;