import { GradesController } from "./grades.controller";
import { GradesService } from "./grades.service";
import { GradesRepository } from "./grades.repository";
import  express  from "express";


const repository = new GradesRepository();
const service = new GradesService(repository);
const controller = new GradesController(service);

const gradesRouter = express.Router()

gradesRouter.post("/", (req, res, next) => controller.createGrade(req, res, next));
gradesRouter.get("/student/:studentId", (req, res, next) => controller.findGradesByStudent(req, res, next));
gradesRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
gradesRouter.get("/", (req, res, next) => controller.findAllGrades(req, res, next));
gradesRouter.put("/:id", (req, res, next) => controller.updateGrade(req, res, next));
gradesRouter.delete("/:id", (req, res, next) => controller.deleteGrade(req, res, next));


export default gradesRouter;