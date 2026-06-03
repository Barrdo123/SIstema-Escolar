import { ClassController } from "./class.controller";
import { ClassService } from "./class.service";
import { ClassRepository } from "./class.repository";
import  express  from "express";


const repository = new ClassRepository();
const service = new ClassService(repository);
const controller = new ClassController(service);

const classRouter = express.Router()

classRouter.post("/", (req, res, next) => controller.createClass(req, res, next));
classRouter.get("/:id", (req, res, next) => controller.findClassById(req, res, next));
classRouter.get("/", (req, res, next) => controller.findAllClasses(req, res, next));
classRouter.put("/:id", (req, res, next) => controller.updateClass(req, res, next));
classRouter.delete("/:id", (req, res, next) => controller.deleteClass(req, res, next));


export default classRouter;