import * as express from "express";
import * as path from "path";
import router from "./routes/index";
import logger from "./middlewares/logger";
import * as cors from "cors";

const app: express.Application = express();
const port = process.env.PORT || 4500;
const address = `127.0.0.1:${port}`;

app.use(express.json());
app.use(cors());

app.use("/api", logger, router);
// Public
app.use("/uploads", express.static(path.resolve("uploads")));

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
