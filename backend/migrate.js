require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pool = require('./db/conn');

async function runMigrations() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [rows] = await pool.query('SELECT name FROM migrations');
  const applied = new Set(rows.map(row => row.name));

  const migrationFiles = fs.readdirSync(path.join(__dirname, 'migrations'))
    .filter(file => file.endsWith('.js'))
    .sort();

  for (const file of migrationFiles) {
    if (applied.has(file)) {
      continue;
    }

    console.log(`➡️ Aplicando: ${file}`);
    const migration = require(`./migrations/${file}`);
    await migration.up(pool);
    await pool.query('INSERT INTO migrations (name) VALUES (?)', [file]);
    console.log(`✅ Feito: ${file}`);
  }

  console.log('🎉 Todas as migrations foram aplicadas!');
  process.exit();
}

runMigrations().catch(err => {
  console.error('❌ Erro ao aplicar migrations:', err);
  process.exit(1);
});