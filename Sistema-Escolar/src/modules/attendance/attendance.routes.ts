import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "./attendance.service";
import { AttendanceRepository } from "./attendance.repository";
import  express  from "express";


const repository = new AttendanceRepository();
const service = new AttendanceService(repository);
const controller = new AttendanceController(service);

const attendanceRouter = express.Router()

attendanceRouter.post("/", (req, res, next) => controller.createAttendance(req, res, next));
attendanceRouter.get("/student/:studentId", (req, res, next) => controller.findByStudent(req, res, next));
attendanceRouter.get("/class/:classId", (req, res, next) => controller.findByClass(req, res, next));
attendanceRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
attendanceRouter.get("/", (req, res, next) => controller.findAllAttendances(req, res, next));
attendanceRouter.put("/:id", (req, res, next) => controller.updateAttendance(req, res, next));
attendanceRouter.delete("/:id", (req, res, next) => controller.deleteAttendance(req, res, next));


export default attendanceRouter;