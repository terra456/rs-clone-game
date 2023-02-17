import { Client } from 'pg';
 
const db: Client = new Client('postgresql://postgres:eICvs2ij7GXyGAGYBgeJ@containers-us-west-199.railway.app:6884/railway');
db.connect((err) => {
  if (err) {
    console.error('connection fail', err.stack);
  } else {
    console.log('connected');
  }
});

export default db;