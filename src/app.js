import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import authRouter from './routes/authRouter.js'
import prodRouter from './routes/prodRouter.js'
import navigationRouter from './routes/navigationRouter.js'

dotenv.config();


const server = express();
server.use(cors());
server.use(json());

server.use(router, authRouter, prodRouter, navigationRouter);

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });