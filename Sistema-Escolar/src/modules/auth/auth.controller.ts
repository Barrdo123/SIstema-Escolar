import { NextFunction, Response, Request } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
    private service: AuthService;

    constructor (service: AuthService){
        this.service = service;
    }

    async registerUser(req: Request, res: Response, next: NextFunction) {
        try{
            const {nome, email, password} = req.body

            const createUser = await this.service.createUser({nome,email, password})
            return res.status(201).json({createUser})
        } catch (error) {
            next(error)
        }
    }

    async loginUser (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body

            const loginUser = await this.service.loginUser(email, password)
            return res.status(200).json({loginUser})
        } catch (error) {
            next(error)
        }
    }
}