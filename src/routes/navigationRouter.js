import { Router } from "express";
import { getShoppingCart } from "../controllers/navigationController.js";
import validateToken from "../middlewares/authCheckMiddleware.js";

const navigationRouter = Router();

navigationRouter.get("/carrinho", validateToken, getShoppingCart);

export default navigationRouter;