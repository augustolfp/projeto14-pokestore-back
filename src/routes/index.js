import { Router } from "express";
import navigationRouter from "./navigationRouter.js";
import authRouter from './authRouter.js';

const router = Router();
router.use(navigationRouter);
router.use(authRouter);


export default router;