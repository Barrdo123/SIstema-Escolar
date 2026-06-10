import { NextFunction, Response, Request } from "express";
import { AppError } from "../../shared/utils/app.error";
import { GradesService } from "./grades.service";

export class GradesController {
    private service: GradesService;

    constructor (service: GradesService) {
        this.service = service;
    }

    async createGrade(req: Request, res: Response, next: NextFunction){
        try{
            const {studentId, classId, value, valueType} = req.body

            const createGrade = await this.service.createGrade(
                {value, valueType},
                studentId,
                classId)
            return res.status(201).json(createGrade)

        } catch (error) {
            next(error)
        }
    
    }
    async findAllGrades(req: Request, res: Response, next: NextFunction){
        try{
            
            const allGrades = await this.service.findAllGrades()
            return res.status(200).json(allGrades);

        } catch (error) {
            next(error)
        }
    
    }
    async findById(req: Request, res: Response, next: NextFunction){
        try{

            const id = Number(req.params.id)

            const gradeById = await this.service.findGradeById(id)
            return res.status(200).json(gradeById);

        } catch (error) {
            next(error)
        }
    
    }

    async findGradesByStudent(req: Request, res: Response, next: NextFunction){
        try{
            const studentID = Number(req.params.studentId)
            const gradeByStudent = await this.service.findGradesByStudent(studentID)
            return res.status(200).json(gradeByStudent);
        } catch (error) {
            next(error)
        }
    }

    async updateGrade(req: Request, res: Response, next: NextFunction){
        try{
            const id =  Number(req.params.id);
            const {value, valueType} = req.body


            const gradesUpdate = await this.service.update(id, {value, valueType})
            return res.status(200).json(gradesUpdate)



        } catch (error) {
            next(error)
        }
    
    }

    async deleteGrade(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.id)


            const deletedGrade = await this.service.delete(id);
            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    
    }
}