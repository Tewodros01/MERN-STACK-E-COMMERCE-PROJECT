import { Router } from "express";
import user_routes from "../../controllers/user.controller";

const userRoutes: Router = Router();

user_routes(userRoutes);

export default userRoutes;
