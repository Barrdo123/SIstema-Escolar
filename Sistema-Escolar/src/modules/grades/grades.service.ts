import { GradesRepository } from "./grades.repository";
import { AppError } from "../../shared/utils/app.error";
import { Prisma } from "../../generated/prisma"


type CreateGradeData = {
        value: number;
        valueType: string;
    }


export class GradesService {
    private repository: GradesRepository;

    constructor (repository: GradesRepository){
        this.repository = repository
    }
    
    async createGrade(data: CreateGradeData, studentId: number, classId: number){

           const gradeCreated = await this.repository.createGrades({
            ...data,
            student: { connect: { id: studentId } },
            class: { connect: { id: classId } }
           })

            return gradeCreated;
    }

    async findAllGrades() {
        const allGrades = await this.repository.findAllGrades()
        return allGrades;
    }

    async findGradeById(id: number) {

        const gradeId = await this.repository.findGradeById(id)

        if(!gradeId){ throw new AppError ('ID not found')

        } else {
            return gradeId;
        }
    }

    async findGradesByStudent(studentId: number) {
        const gradesByStudent = await this.repository.findGradesByStudents(studentId)
        return gradesByStudent;
    }

    async update(id: number, data: Prisma.GradeUpdateInput) {

        const gradeId = await this.repository.findGradeById(id)

        if(!gradeId){
            throw new AppError ('Id not Found')
        } else {
            const updateGrade = await this.repository.updateGrade(id, data)
        return updateGrade;
        }
        

    }

    async delete(id: number) {
        const gradeId = await this.repository.findGradeById(id)

        if(!gradeId){
            throw new AppError ('Id not Found')
        } else {
            const deleteGrade = await this.repository.deleteGrade(id)
            return deleteGrade;
        }      
        
    }
}