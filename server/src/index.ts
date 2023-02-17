import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port,'0.0.0.0', ()=> {
  console.log(`Server is started on ${port} port`);
});