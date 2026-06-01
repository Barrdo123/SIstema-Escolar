import { TeacherController } from "./teachers.controller";
import { TeacherService } from "./teachers.service";
import { TeacherRepository } from "./teachers.repository";
import  express  from "express";


const repository = new TeacherRepository();
const service = new TeacherService(repository);
const controller = new TeacherController(service);

const teacherRouter = express.Router()

teacherRouter.post("/", (req, res, next) => controller.createTeacher(req, res, next));
teacherRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
teacherRouter.get("/", (req, res, next) => controller.findAllTeachers(req, res, next));
teacherRouter.put("/:id", (req, res, next) => controller.updateTeacher(req, res, next));
teacherRouter.delete("/:id", (req, res, next) => controller.deleteTeacher(req, res, next));


export default teacherRouter;