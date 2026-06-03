import { prisma } from "../../shared/prisma/client";
import { Prisma } from "../../generated/prisma"

export class ClassRepository {

    async createClass(data: Prisma.ClassCreateInput) {
        const classes = await prisma.class.create({data})
        return classes;
    }

    async findAllClasses() {
        const allClasses = await prisma.class.findMany()
        return allClasses;
    }

    async findClassById(id: number) {
        const classId = await prisma.class.findUnique({ where: { id }})
        return classId;
    }

    async updateClass(id: number, data: Prisma.ClassUpdateInput) {
        const updateClass = await prisma.class.update({ where: { id }, data })
        return updateClass;
    }

    async deleteClass(id: number) {
        const deleteClass = await prisma.class.delete({ where: { id }})
        return deleteClass;
    }
}
