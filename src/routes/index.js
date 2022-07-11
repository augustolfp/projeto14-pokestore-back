import { Router } from "express";
import navigationRouter from "./navigationRouter.js";
import authRouter from './authRouter.js';
import prodRouter from "./prodRouter.js";
import checkoutRouter from "./checkoutRouter.js";

const router = Router();
router.use(navigationRouter);
router.use(authRouter);
router.use(prodRouter);
router.use(checkoutRouter);


export default router;