import { Router } from "express";
import navigationRouter from "./navigationRouter.js";

const router = Router();
router.use(navigationRouter);

export default router;