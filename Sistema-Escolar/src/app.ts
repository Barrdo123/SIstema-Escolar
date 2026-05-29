import Express from "express";
import { errorMiddleware } from "./shared/middlewares/error.middleware";
import studentRouter from "./modules/students/students.routes"

const app = Express();
app.use(Express.json());
app.use("/students", studentRouter)
app.use(errorMiddleware);


export default app;