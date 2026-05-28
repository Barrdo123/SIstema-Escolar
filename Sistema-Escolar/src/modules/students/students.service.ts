import { StudentsRepository } from "./students.repository";
import { AppError } from "../../shared/utils/app.error";
import { Prisma } from "../../generated/prisma"


export class StudentService {
    private repository: StudentsRepository;

    constructor (repository: StudentsRepository){
        this.repository = repository
    }

    async createStudent(data: Prisma.StudentCreateInput){

        const existingEmail = await this.repository.findStudentByEmail(data.email)

        if(existingEmail) {
            throw new AppError('Email already in use');

        } else {
           const studentCreated = await this.repository.createStudent(data)
            return studentCreated;

        }
    }

    async findAllStudents() {
        const allStudents = await this.repository.findAllStudents()
        return allStudents;
    }

    async findbyId(id: number) {

        const studentId = await this.repository.findStudentById(id)

        if(!studentId){ throw new AppError ('ID not found')

        } else {
            return studentId;
        }
    }

    async update(id: number, data: Prisma.StudentUpdateInput) {

        const studentId = await this.repository.findStudentById(id)

        if(!studentId){
            throw new AppError ('Id not Found')
        } else {
            const updateStudent = await this.repository.updateStudent(id, data)
        return updateStudent;
        }
        

    }

    async delete(id: number) {
        const studentId = await this.repository.findStudentById(id)

        if(!studentId){
            throw new AppError ('Id not Found')
        } else {
            const deleteStudent = await this.repository.deleteStudent(id)
            return deleteStudent;
        }      
        
    }
}
