import { StudentController } from "./students.controller";
import { StudentService } from "./students.service";
import { StudentsRepository } from "./students.repository";
import  express  from "express";


const repository = new StudentsRepository();
const service = new StudentService(repository);
const controller = new StudentController(service);

const studentRouter = express.Router()

studentRouter.post("/", (req, res, next) => controller.createStudent(req, res, next));
studentRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
studentRouter.get("/", (req, res, next) => controller.findAllStudent(req, res, next));
studentRouter.put("/:id", (req, res, next) => controller.updateStudent(req, res, next));
studentRouter.delete("/:id", (req, res, next) => controller.deleteStudent(req, res, next));


export default studentRouter;