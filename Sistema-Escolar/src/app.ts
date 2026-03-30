import Express from "express";
import { errorMiddleware } from "./shared/middlewares/error.middleware";

const app = Express();
app.use(Express.json());
app.use(errorMiddleware);


export default app;