import express, {json} from 'express';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(json());

server.use(router);

server.listen(5000);