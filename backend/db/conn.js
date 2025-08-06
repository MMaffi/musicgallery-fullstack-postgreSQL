const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log('✅ Conectado ao PostgreSQL via Neon'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

module.exports = pool;