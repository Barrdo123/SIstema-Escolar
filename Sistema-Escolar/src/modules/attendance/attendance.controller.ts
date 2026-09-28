import { NextFunction, Response, Request } from "express";
import { AppError } from "../../shared/utils/app.error";
import { AttendanceService } from "./attendance.service";

export class AttendanceController {
    private service: AttendanceService;

    constructor (service: AttendanceService) {
        this.service = service;
    }

    async createAttendance(req: Request, res: Response, next: NextFunction){
        try{
            const {studentId, classId, date, status} = req.body

            const createAttendance = await this.service.createAttendance(classId, studentId, {
                date,
                status
            })
            return res.status(201).json(createAttendance)

        } catch (error) {
            next(error)
        }
    
    }
    async findAllAttendances(req: Request, res: Response, next: NextFunction){
        try{
            
            const allAttendances = await this.service.findAllAttendances()
            return res.status(200).json(allAttendances);

        } catch (error) {
            next(error)
        }
    
    }

    async findById(req: Request, res: Response, next: NextFunction){
        try{

            const id = Number(req.params.id)

            const attendanceById = await this.service.findAttendanceById(id)
            return res.status(200).json(attendanceById);

        } catch (error) {
            next(error)
        }
    
    }

    async findByStudent(req: Request, res: Response, next: NextFunction){
        try{
            const studentID = Number(req.params.studentId)
            const attendanceByStudent = await this.service.findAttendanceByStudent(studentID)

            return res.status(200).json(attendanceByStudent);

        } catch (error) {

            next(error)
        }
    }

    async findByClass(req: Request, res: Response, next: NextFunction){
        try{

            const classId = Number(req.params.classId)
            const attendanceByClass = await this.service.findAttendanceByClassId(classId)

            return res.status(200).json(attendanceByClass);

        } catch (error) {

            next(error)
        }
    }

    async updateAttendance(req: Request, res: Response, next: NextFunction){
            try{
                
                const id = Number(req.params.id);
                const {date, status} = req.body

                const attendanceUpdated = await this.service.update(id, {date, status})
                return res.status(200).json(attendanceUpdated);
            } catch (error) {
                next(error)
            }
    }

    async deleteAttendance(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.id)


            const deletedAttendance = await this.service.delete(id);
            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    
    }
}