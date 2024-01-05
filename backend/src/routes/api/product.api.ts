import { Router } from "express";
import product_router from "../../controllers/product.controller";

const productRoutes: Router = Router();

product_router(productRoutes);

export default productRoutes;
