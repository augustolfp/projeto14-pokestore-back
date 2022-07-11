import { Router } from "express";
import { getCart, updateCart, clearCart } from "../controllers/navigationController.js";
import validateToken from "../middlewares/authCheckMiddleware.js";

const navigationRouter = Router();

navigationRouter.get("/carrinho", validateToken, getCart);
navigationRouter.post("/carrinho", validateToken, updateCart);
navigationRouter.post("/carrinho", validateToken, clearCart);


export default navigationRouter;