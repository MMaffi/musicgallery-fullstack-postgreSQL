module.exports.up = async (pool) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      key_name VARCHAR(50) NOT NULL UNIQUE,
      description VARCHAR(255)
    )
  `);

  await pool.query(`
    INSERT IGNORE INTO settings (key_name, description) VALUES
    ('theme', 'Tema do site (dark, light, system)'),
    ('language', 'Idioma preferido do usuário'),
    ('notifications', 'Receber notificações (enabled, disable)')
  `);
};