import { prisma } from "../../shared/prisma/client";
import { Prisma } from "../../generated/prisma"

export class TeacherRepository {

    async createTeachers(data: Prisma.TeacherCreateInput) {
        const teacher = await prisma.teacher.create({data})
        return teacher;
    }

    async findAllTeachers() {
        const allTeachers = await prisma.teacher.findMany()
        return allTeachers;
    }

    async findTeacherById(id: number) {
        const Teacher = await prisma.teacher.findUnique({ where: { id }})
        return Teacher;
    }

    async updateTeacher(id: number, data: Prisma.TeacherUpdateInput) {
        const updateTeacher = await prisma.teacher.update({ where: { id }, data })
        return updateTeacher;
    }

    async deleteTeacher(id: number) {
        const deleteTeacher = await prisma.teacher.delete({ where: { id }})
        return deleteTeacher;
    }

    async findTeacherByEmail(email: string) {
        const teacherEmail = await prisma.teacher.findUnique({ where: { email }})
        return teacherEmail;
    }
}
