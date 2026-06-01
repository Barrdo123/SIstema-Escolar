import Express from "express";
import { errorMiddleware } from "./shared/middlewares/error.middleware";
import studentRouter from "./modules/students/students.routes"
import teacherRouter from "./modules/teachers/teachers.routes";

const app = Express();
app.use(Express.json());
app.use("/students", studentRouter)
app.use("/teachers", teacherRouter)
app.use(errorMiddleware);


export default app;