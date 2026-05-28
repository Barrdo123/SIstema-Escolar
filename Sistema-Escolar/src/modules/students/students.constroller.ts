import { NextFunction, Response, Request } from "express";
import { AppError } from "../../shared/utils/app.error";
import { StudentService } from "./students.service";
export class StudentController {
    private service: StudentService;

    constructor (service: StudentService) {
        this.service = service;
    }

    async createStudent(req: Request, res: Response, next: NextFunction){
        try{
            const {email, nome, birthDate} = req.body

            const createStudent = await this.service.createStudent({email, nome, birthDate})
            return res.status(201).json(createStudent)

        } catch (error) {
            next(error)
        }
    
    }
    async FindAllStudent(req: Request, res: Response, next: NextFunction){
        try{
            const {email, nome, birthDate} = req.body


        } catch (error) {
            next(error)
        }
    
    }
    async FindById(req: Request, res: Response, next: NextFunction){
        try{
            const {email, nome, birthDate} = req.body


        } catch (error) {
            next(error)
        }
    
    }

    async updateStudent(req: Request, res: Response, next: NextFunction){
        try{
            const id =  Number(req.params.id);
            const {email, nome, birthDate} = req.body


            const studentUpdate = await this.service.update(id, {email, nome, birthDate})
            return res.status(200).json(studentUpdate)



        } catch (error) {
            next(error)
        }
    
    }

    async deleteStudent(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.id)


            const deletedStudent = await this.service.delete(id);
            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    
    }
}