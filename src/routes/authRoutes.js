import { Router } from 'express';
import { createUser } from '../controllers/authControllers';

const router = Router();

router.post('/cadastro', createUser); // Verificar se o nome da rota vai ficar "cadastro" mesmo, ou um "sign-up"

export default router;