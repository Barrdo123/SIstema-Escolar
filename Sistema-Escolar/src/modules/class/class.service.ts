import { ClassRepository } from "./class.repository";
import { AppError } from "../../shared/utils/app.error";
import { Prisma } from "../../generated/prisma"



export class ClassService {
    private ClassRepository: ClassRepository;


    constructor (ClassRepository: ClassRepository) {
        this.ClassRepository = ClassRepository;
    }

    async createClass(data: Prisma.ClassCreateInput) {

           const classCreated = await this.ClassRepository.createClass(data)
            return classCreated;

    }

    async findAllClasses() {
        const allClasses = await this.ClassRepository.findAllClasses()
        return allClasses;
    }

    async findClassById(id: number) {

        const classId = await this.ClassRepository.findClassById(id)

        if(!classId){ throw new AppError ('class ID not found')

        } else {
            return classId;
        }
    }

    async update(id: number, data: Prisma.ClassUpdateInput) {

        const classId = await this.ClassRepository.findClassById(id)

        if(!classId){
            throw new AppError ('Id not Found')
        } else {
            const updateClass = await this.ClassRepository.updateClass(id, data)
        return updateClass;
        }
        

    }

    async delete(id: number) {
        const classId = await this.ClassRepository.findClassById(id)

        if(!classId){
            throw new AppError ('class Id not Found')
        } else {
            const deleteClass = await this.ClassRepository.deleteClass(id)
            return deleteClass;
        }      
        
    }
}
