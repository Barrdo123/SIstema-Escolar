import { prisma } from "../../shared/prisma/client";
import { Prisma } from "../../generated/prisma"

export class GradesRepository {

    async createGrades(data: Prisma.GradeCreateInput) {
        const grade = await prisma.grade.create({data})
        return grade;
    }

    async findAllGrades() {
        const allGrades = await prisma.grade.findMany()
        return allGrades;
    }

    async findGradeById(id: number) {
        const GradeId = await prisma.grade.findUnique({ where: { id }})
        return GradeId;
    }

    async updateGrade(id: number, data: Prisma.GradeUpdateInput) {
        const updateGrade = await prisma.grade.update({ where: { id }, data })
        return updateGrade;
    }

    async deleteGrade(id: number) {
        const deleteGrade = await prisma.grade.delete({ where: { id }})
        return deleteGrade;
    }

    async findGradesByStudents(studentId: number) {
        const gradesByStudents = await prisma.grade.findMany({where: {studentId}})
        return gradesByStudents;
    }
}
 