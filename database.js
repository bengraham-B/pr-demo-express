const { Pool } = require('pg');

const connectionString = 'postgresql://bengraham-B:3ft1lmhGMpFk@ep-green-sky-a2h65t2h.eu-central-1.aws.neon.tech/neons?sslmode=require';
// const connectionString = 'postgresql://root:root@10.2.6.149:5428/RRS';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;
