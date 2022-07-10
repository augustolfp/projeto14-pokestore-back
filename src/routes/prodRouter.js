import { Router } from 'express';
import { getProducts, getOneProduct } from '../controllers/prodController.js';

const prodRouter = Router();

prodRouter.get('/products', getProducts); 
prodRouter.get('/products/:id', getOneProduct); 


export default prodRouter;