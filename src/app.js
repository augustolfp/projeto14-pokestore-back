import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import router from './routes/index.js';

dotenv.config();


const server = express();
server.use(cors());
server.use(json());

server.use(router);
server.use(authRoutes)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });