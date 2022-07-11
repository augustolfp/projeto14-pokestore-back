import { Router } from "express";
import { getCart, updateCart, deleteFromCart } from "../controllers/navigationController.js";
import validateToken from "../middlewares/authCheckMiddleware.js";

const navigationRouter = Router();

navigationRouter.get("/carrinho", validateToken, getCart);
navigationRouter.post("/carrinho", validateToken, updateCart);
navigationRouter.delete("/carrinho", validateToken, deleteFromCart)


export default navigationRouter;