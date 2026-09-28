import { prisma } from "../../shared/prisma/client";
import { Prisma } from "../../generated/prisma"

export class AttendanceRepository {

    async createAttendance(data: Prisma.AttendanceCreateInput) {
        const attendance = await prisma.attendance.create({data})
        return attendance;
    }

    async findAllAttendances() {
        const allAttendances = await prisma.attendance.findMany()
        return allAttendances;
    }

    async findAttendanceById(id: number) {
        const AttendanceId = await prisma.attendance.findUnique({ where: { id }})
        return AttendanceId;
    }

    async deleteAttendance(id: number) {
        const deleteAttendance = await prisma.attendance.delete({ where: { id }})
        return deleteAttendance;
    }

    async findAttendanceByStudent(studentId: number) {
        const attendance = await prisma.attendance.findMany({ where: { studentId } })
        return attendance;
    }

    async findAttendanceByClass(classId: number) {
        const attendance = await prisma.attendance.findMany({ where: { classId } })
        return attendance;
    }

        async updateAttendance(id: number, data: Prisma.AttendanceUpdateInput) {
        const updateAttendance = await prisma.attendance.update({ where: { id }, data })
        return updateAttendance;
    }

}