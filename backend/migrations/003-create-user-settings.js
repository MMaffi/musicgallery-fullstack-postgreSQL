module.exports.up = async (pool) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      setting_id INT NOT NULL,
      value VARCHAR(100) NOT NULL,
      UNIQUE KEY unique_user_setting (user_id, setting_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (setting_id) REFERENCES settings(id) ON DELETE CASCADE
    )
  `);
};