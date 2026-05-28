import {prisma} from "../../shared/prisma/client";
import { Prisma } from "../../generated/prisma"

export class StudentsRepository {

    async createStudent(data: Prisma.StudentCreateInput) {
        const student = await prisma.student.create({data})
        return student;
    }

    async findAllStudents() {
        const allStudents = await prisma.student.findMany()
        return allStudents;
    }

    async findStudentById(id: number) {
        const student = await prisma.student.findUnique({ where: { id }})
        return student;
    }

    async updateStudent(id: number, data: Prisma.StudentUpdateInput) {
        const updateStudent = await prisma.student.update({ where: { id }, data })
        return updateStudent;
    }

    async deleteStudent(id: number) {
        const deleteStudent = await prisma.student.delete({ where: { id }})
        return deleteStudent;
    }

    async findStudentByEmail(email: string) {
        const StudentEmail = await prisma.student.findUnique({ where: { email }})
        return StudentEmail;
    }
}
