import { prisma } from "../../shared/prisma/client";
import { Prisma } from "../../generated/prisma"

export class EnrollmentsRepository {

    async createEnrollment(data: Prisma.EnrollmentCreateInput) {
        const enrollment = await prisma.enrollment.create({data})
        return enrollment;
    }

    async findAllEnrollments() {
        const allEnrollments = await prisma.enrollment.findMany()
        return allEnrollments;
    }

    async findEnrollmentById(id: number) {
        const EnrollmentId = await prisma.enrollment.findUnique({ where: { id }})
        return EnrollmentId;
    }

    async deleteEnrollment(id: number) {
        const deleteEnrollment = await prisma.enrollment.delete({ where: { id }})
        return deleteEnrollment;
    }

    async findEnrollmentByStudentAndClass(studentId: number, classId: number) {
        const studentAndClassId = await prisma.enrollment.findFirst({ where: {studentId, classId}})
        return studentAndClassId
    }

}
