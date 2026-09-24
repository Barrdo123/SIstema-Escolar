import { AuthUserRepository } from "./auth.repository";
import { AppError } from "../../shared/utils/app.error";
import { Prisma } from "../../generated/prisma"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
    private repository: AuthUserRepository;

    constructor(repository: AuthUserRepository){
        this.repository = repository
    }

    async createUser(data: Prisma.UserCreateInput){
        const existingEmail = await this.repository.findUserByEmail(data.email)

        if(existingEmail){
            throw new AppError('Email already in use');
        } else {
            const hash = await bcrypt.hash(data.password, 10)
            const userCreated = await this.repository.createUser({...data, password: hash});
            const {password: _, ...userWithoutPassword} = userCreated
            return userWithoutPassword;
        }
    }

    async loginUser(email: string, password: string){

        const user = await this.repository.findUserByEmail(email);

        if(!user){
            throw new AppError('Invalid email or password', 401);
        } 

        const validPassword = await bcrypt.compare(password, user.password);
        
        if(!validPassword){

            throw new AppError('Invalid email or password', 401);

        }

        const secret = process.env.JWT_SECRET ?? 'default_secret';

        const token = jwt.sign({id: user.id}, secret, {expiresIn: '1d'});
        const {password: _, ...userWithoutPassword} = user
        return { token, user: userWithoutPassword };
    }
}
