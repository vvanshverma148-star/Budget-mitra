const mysql = require('mysql2/promise');

async function test() {
  try {
    const conn = await mysql.createConnection({host: 'localhost', user: 'root', password: ''});
    await conn.query('CREATE DATABASE IF NOT EXISTS antigravity');
    console.log('Database created/exists');
    process.exit(0);
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
}
test();
