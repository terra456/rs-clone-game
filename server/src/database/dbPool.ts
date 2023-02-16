import { Client } from 'pg';
 
const db: Client = new Client({
  host: 'postgres://rs_platformer_db_user:wj4jSY2mBsasszjqZZPMiXACkxBx9xgU@dpg-cfmv7sla499f2885rorg-a/rs_platformer_db',
  port: 5432,
  user: 'rs_platformer_db_user',
  password: 'wj4jSY2mBsasszjqZZPMiXACkxBx9xgU',
  database: 'rs_platformer_db'
});
db.connect((err) => {
  if (err) {
    console.error('connection fail', err.stack);
  } else {
    console.log('connected');
  }
});

export default db;