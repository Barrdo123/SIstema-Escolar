import { AttendanceRepository } from "./attendance.repository";
import { AppError } from "../../shared/utils/app.error";
import { Prisma } from "../../generated/prisma"
import {StatusAttendance} from "../../generated/prisma"

type CreateAttendanceData = {
    date: Date;
    status: StatusAttendance;
}

export class AttendanceService {
    private repository: AttendanceRepository;

    constructor (repository: AttendanceRepository){
        this.repository = repository
    }

    async createAttendance(classId: number, studentId: number, data: CreateAttendanceData) {

        const attendanceCreated = await this.repository.createAttendance({
            ...data,
            student: {connect: {id: studentId} },
            class: {connect: {id: classId} }
        })
        return attendanceCreated;
    }
    
    async findAllAttendances() {
        const allAttendances = await this.repository.findAllAttendances()
        return allAttendances;
    }
    
    async findAttendanceById(id: number) {

        const attendanceId = await this.repository.findAttendanceById(id)
        
        if(!attendanceId){ 
            throw new AppError ('ID not found')

        } else {
            return attendanceId;
        }
    }

    async findAttendanceByStudent(studentId: number){

        const attendance = await this.repository.findAttendanceByStudent(studentId)

        if(!attendance) {

            throw new AppError('Attendance not found');

        }else {
            return attendance;
        }
        
    }
    
    

    async findAttendanceByClassId(classId: number){
        const attendance = await this.repository.findAttendanceByClass(classId)

        if(!attendance){
            throw new AppError('Attendance not found');
        } else {
            return attendance;
        }
    }

    async update(id: number, data: Prisma.AttendanceUpdateInput) {
        const attendanceId = await this.repository.findAttendanceById(id)

        if(!attendanceId) {
            throw new AppError('ID not found', 404)
        } else {
            const updateAttendance = await this.repository.updateAttendance(id, data)
            return updateAttendance;
        }
    }

    async delete(id: number) {
        const attendanceId = await this.repository.findAttendanceById(id)
        if(!attendanceId) {
            throw new AppError('Id not Found', 404)
        }

        return await this.repository.deleteAttendance(id)
    }
}