const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ecosortai",
    password: "postgresql",
    port: 5432,
});

module.exports = pool;