import { Router } from "express";
import categoryRoutes from "./api/category.api";
import productRoutes from "./api/product.api";
import sliderRoutes from "./api/slider.rout";
import userRoutes from "./api/user.api";

const router: Router = Router();

router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/slider", sliderRoutes);

export default router;
