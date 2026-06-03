import { prisma } from "../../shared/prisma/client";
import { Prisma } from "../../generated/prisma"

export class TeachersRepository {

    async createTeachers(data: Prisma.TeacherCreateInput) {
        const teacher = await prisma.teacher.create({data})
        return teacher;
    }

    async findAllTeachers() {
        const allTeachers = await prisma.teacher.findMany()
        return allTeachers;
    }

    async findTeacherById(id: number) {
        const TeacherId = await prisma.teacher.findUnique({ where: { id }})
        return TeacherId;
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

    async findClassesByTeacherId(teacherId: number) {
        return prisma.class.findMany({ where: { teacherId } })
    }
}
