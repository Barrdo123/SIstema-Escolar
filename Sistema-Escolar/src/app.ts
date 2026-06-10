import Express from "express";
import { errorMiddleware } from "./shared/middlewares/error.middleware";
import studentRouter from "./modules/students/students.routes"
import teacherRouter from "./modules/teachers/teachers.routes";
import classRouter from "./modules/class/class.routes";
import enrollmentRouter from "./modules/enrollments/enrollments.routes";
import gradesRouter from "./modules/grades/grades.routes";

const app = Express();
app.use(Express.json());
app.use("/students", studentRouter)
app.use("/teachers", teacherRouter)
app.use("/classes", classRouter)
app.use("/enrollments", enrollmentRouter)
app.use("/grades", gradesRouter)
app.use(errorMiddleware);


export default app;