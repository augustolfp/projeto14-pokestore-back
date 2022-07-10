import { Router } from 'express';
import { createUser, loginUser } from '../controllers/authControllers.js';

const router = Router();

router.post('/cadastro', createUser); // Verificar se o nome da rota vai ficar "cadastro" mesmo, ou um "sign-up" ou coisa parecida
router.post('/login', loginUser);

export default router;