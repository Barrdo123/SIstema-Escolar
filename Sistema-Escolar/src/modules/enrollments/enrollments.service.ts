import { EnrollmentsRepository } from "./enrollments.repository";
import { AppError } from "../../shared/utils/app.error";
import { Prisma } from "../../generated/prisma"


export class EnrollmentsService {
    private repository: EnrollmentsRepository;

    constructor (repository: EnrollmentsRepository){
        this.repository = repository
    }

    async createEnrollment(studentId: number, classId: number, data: Prisma.EnrollmentCreateInput){

        const existingEnrollment = await this.repository.findEnrollmentByStudentAndClass(studentId, classId)

        if(existingEnrollment) {
            throw new AppError('Enrollment already exists');

        } else {
           const enrollmentCreated = await this.repository.createEnrollment(data)
            return enrollmentCreated;

        }
    }

    async findAllEnrollments() {
        const allEnrollments = await this.repository.findAllEnrollments()
        return allEnrollments;
    }

    async findEnrollmentById(id: number) {

        const enrollmentId = await this.repository.findEnrollmentById(id)

        if(!enrollmentId){ throw new AppError ('ID not found')

        } else {
            return enrollmentId;
        }
    }


    async delete(id: number) {
        const enrollmentId = await this.repository.findEnrollmentById(id)
        if(!enrollmentId) {
            throw new AppError('Id not Found', 404)
        }

        return await this.repository.deleteEnrollment(id)
    }
}   
