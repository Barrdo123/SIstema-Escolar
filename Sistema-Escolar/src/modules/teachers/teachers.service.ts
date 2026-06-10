import { TeachersRepository } from "./teachers.repository";
import { AppError } from "../../shared/utils/app.error";
import { Prisma } from "../../generated/prisma"


export class TeacherService {
    private repository: TeachersRepository;

    constructor (repository: TeachersRepository){
        this.repository = repository
    }

    async createTeacher(data: Prisma.TeacherCreateInput){

        const existingEmail = await this.repository.findTeacherByEmail(data.email)

        if(existingEmail) {
            throw new AppError('Email already in use');

        } else {
           const teacherCreated = await this.repository.createTeachers(data)
            return teacherCreated;

        }
    }

    async findAllTeachers() {
        const allTeachers = await this.repository.findAllTeachers()
        return allTeachers;
    }

    async findbyId(id: number) {

        const teacherId = await this.repository.findTeacherById(id)

        if(!teacherId){ throw new AppError ('ID not found')

        } else {
            return teacherId;
        }
    }

    async update(id: number, data: Prisma.TeacherUpdateInput) {

        const teacherId = await this.repository.findTeacherById(id)

        if(!teacherId){
            throw new AppError ('Id not Found')
        } else {
            const updateTeacher = await this.repository.updateTeacher(id, data)
        return updateTeacher;
        }
        

    }

    async delete(id: number) {
        const studentId = await this.repository.findTeacherById(id)

        if(!studentId){
            throw new AppError ('Id not Found')
        } else {
            const deleteTeacher = await this.repository.deleteTeacher(id)
            return deleteTeacher;
        }      
        
    }
}