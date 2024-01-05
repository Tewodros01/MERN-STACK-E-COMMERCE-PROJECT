import { Router } from "express";
import category_router from "../../controllers/categories.controller";

const categoryRoutes: Router = Router();

category_router(categoryRoutes);

export default categoryRoutes;
