import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import indexRoutes from "./routes/index";
import connectDB from "./config/db.conn";
import errorHandler from "./middleware/error";

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", indexRoutes);

app.use(errorHandler);

app.use("/uploads", express.static(path.resolve("uploads")));

async function startServer() {
  try {
    await connectDB();
    app.listen(app.get("port"), () => {
      console.log(`Server on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
