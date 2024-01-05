import { Router } from "express";
import slider_router from "../../controllers/slider.controller";

const sliderRoutes: Router = Router();

slider_router(sliderRoutes);

export default sliderRoutes;
