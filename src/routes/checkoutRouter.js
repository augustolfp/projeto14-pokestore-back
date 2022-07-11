import { Router } from "express";
import validateToken from "../middlewares/authCheckMiddleware.js";
import { makeTransaction } from "../controllers/checkoutController.js";

const checkoutRouter = Router();

checkoutRouter.post("/checkout", makeTransaction);

export default checkoutRouter;