import { EnrollmentsController } from "./enrollments.controller";
import { EnrollmentsService } from "./enrollments.service";
import { EnrollmentsRepository } from "./enrollments.repository";
import  express  from "express";


const repository = new EnrollmentsRepository();
const service = new EnrollmentsService(repository);
const controller = new EnrollmentsController(service);

const enrollmentRouter = express.Router()

enrollmentRouter.post("/", (req, res, next) => controller.createEnrollment(req, res, next));
enrollmentRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
enrollmentRouter.get("/", (req, res, next) => controller.findAllEnrollments(req, res, next));
enrollmentRouter.delete("/:id", (req, res, next) => controller.deleteEnrollment(req, res, next));


export default enrollmentRouter;