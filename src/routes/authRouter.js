import { Router } from 'express';
import { createUser, loginUser } from '../controllers/authControllers.js';

const authRouter = Router();

authRouter.post('/cadastro', createUser); // Verificar se o nome da rota vai ficar "cadastro" mesmo, ou um "sign-up" ou coisa parecida
authRouter.post('/login', loginUser);

export default authRouter;