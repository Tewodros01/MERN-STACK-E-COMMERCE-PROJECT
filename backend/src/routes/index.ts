import * as express from "express";
import userRoutes from "./api/user_route";

const router: express.Router = express.Router();

router.use("/user", userRoutes);

export default router;
