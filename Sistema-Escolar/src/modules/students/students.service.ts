import { StudentsRepository } from "./students.repository";
import { AppError } from "../../shared/utils/app.error";


const repository = new StudentsRepository();

const studentService = {
      async createStudent(err: AppError, req: any, res: any) {
        const {id, email, name} = req.body

        if (req.body.email === prisma.student.findUnique({ where: { email }})){
                res.status(err.statusCode).json({status: "error", message: err.message});
        }

        const student = await StudentsRepository.createStudent({id, email, name})

        res.status(201).json(student);
}