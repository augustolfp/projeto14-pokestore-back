import { Router } from "express";
import navigationRouter from "./navigationRouter.js";
import authRouter from './authRouter.js';
import prodRouter from "./prodRouter.js";

const router = Router();
router.use(navigationRouter);
router.use(authRouter);
router.use(prodRouter);


export default router;