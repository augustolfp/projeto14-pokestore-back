import { Router } from 'express';
import { getProducts } from '../controllers/prodController.js';

const prodRouter = Router();

prodRouter.get('/products', getProducts); 

export default prodRouter;