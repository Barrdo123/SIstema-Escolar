import { NextFunction, Response, Request } from "express";
import { AppError } from "../../shared/utils/app.error";
import { TeacherService } from "./teachers.service";

export class TeacherController {
    private service: TeacherService;

    constructor (service: TeacherService) {
        this.service = service;
    }

    async createTeacher(req: Request, res: Response, next: NextFunction){
        try{
            const {email, nome, subject} = req.body

            const createTeacher = await this.service.createTeacher({email, nome, subject})
            return res.status(201).json(createTeacher)

        } catch (error) {
            next(error)
        }
    
    }
    async findAllTeachers(req: Request, res: Response, next: NextFunction){
        try{
            
            const allTeachers = await this.service.findAllTeachers()
            return res.status(200).json(allTeachers);

        } catch (error) {
            next(error)
        }
    
    }
    async findById(req: Request, res: Response, next: NextFunction){
        try{

            const id = Number(req.params.id)

            const teacherById = await this.service.findbyId(id)
            return res.status(200).json(teacherById);

        } catch (error) {
            next(error)
        }
    
    }

    async updateTeacher(req: Request, res: Response, next: NextFunction){
        try{
            const id =  Number(req.params.id);
            const {email, nome, subject} = req.body


            const teacherUpdate = await this.service.update(id, {email, nome, subject})
            return res.status(200).json(teacherUpdate)



        } catch (error) {
            next(error)
        }
    
    }

    async deleteTeacher(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.id)


            const deletedTeacher = await this.service.delete(id);
            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    
    }
}