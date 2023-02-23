import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();
const port: number = Number(process.env.PORT) || 3001;
const host: string = process.env.HOST || 'localhost';

app.listen(port, ()=> {
  console.log(`Server is started on ${port} port`);
});