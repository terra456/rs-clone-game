import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;
const host: string = process.env.HOST || 'localhost';

app.listen(port, host, ()=> {
  console.log(`Server ${host} is started on ${port} port`);
});