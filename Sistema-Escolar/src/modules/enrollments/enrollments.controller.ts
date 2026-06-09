import { NextFunction, Response, Request } from "express";
import { AppError } from "../../shared/utils/app.error";
import { EnrollmentsService } from "./enrollments.service";

export class EnrollmentsController {
    private service: EnrollmentsService;

    constructor (service: EnrollmentsService) {
        this.service = service;
    }

    async createEnrollment(req: Request, res: Response, next: NextFunction){
        try{
            const {studentId, classId} = req.body

            const createEnrollment = await this.service.createEnrollment(studentId, classId, {
                student: {connect: {id: studentId}},
                class: {connect: {id: classId}}
            })
            return res.status(201).json(createEnrollment)

        } catch (error) {
            next(error)
        }
    
    }
    async findAllEnrollments(req: Request, res: Response, next: NextFunction){
        try{
            
            const allEnrollments = await this.service.findAllEnrollments()
            return res.status(200).json(allEnrollments);

        } catch (error) {
            next(error)
        }
    
    }
    async findById(req: Request, res: Response, next: NextFunction){
        try{

            const id = Number(req.params.id)

            const enrollmentById = await this.service.findEnrollmentById(id)
            return res.status(200).json(enrollmentById);

        } catch (error) {
            next(error)
        }
    
    }

    async deleteEnrollment(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.id)


            const deletedEnrollment = await this.service.delete(id);
            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    
    }
}