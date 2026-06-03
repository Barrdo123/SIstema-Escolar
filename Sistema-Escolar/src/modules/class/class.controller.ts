import { NextFunction, Response, Request } from "express";
import { AppError } from "../../shared/utils/app.error";
import { ClassService } from "./class.service";

export class ClassController {
    private service: ClassService;

    constructor (service: ClassService) {
        this.service = service;
    }

    async createClass(req: Request, res: Response, next: NextFunction){
        try{
            const {name, period, teacherId} = req.body

            const createClass = await this.service.createClass({
                name,
                period,
                teacher: {
                    connect: {id: teacherId}
                }
            })
            return res.status(201).json(createClass)

        } catch (error) {
            next(error)
        }
    
    }
    async findAllClasses(req: Request, res: Response, next: NextFunction){
        try{
            
            const allClasses = await this.service.findAllClasses()
            return res.status(200).json(allClasses);

        } catch (error) {
            next(error)
        }
    
    }
    async findClassById(req: Request, res: Response, next: NextFunction){
        try{

            const id = Number(req.params.id)

            const classById = await this.service.findClassById(id)
            return res.status(200).json(classById);

        } catch (error) {
            next(error)
        }
    
    }

    async updateClass(req: Request, res: Response, next: NextFunction){
    try{
        const id = Number(req.params.id);
        const { name, period, teacherId } = req.body

        const data: any = {}
        if(name) data.name = name
        if(period) data.period = period
        if(teacherId) data.teacher = { connect: { id: teacherId } }

        const classUpdate = await this.service.update(id, data)
        return res.status(200).json(classUpdate)

    } catch (error) {
        next(error)
    }
    }

    async deleteClass(req: Request, res: Response, next: NextFunction){
        try{
            const id = Number(req.params.id)


            const deletedClass = await this.service.delete(id);
            return res.status(204).send()

        } catch (error) {
            next(error)
        }
    
    }
}