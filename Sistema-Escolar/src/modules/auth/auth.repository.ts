import {prisma} from "../../shared/prisma/client";
import { Prisma } from "../../generated/prisma"

export class AuthUserRepository {

    async findUserByEmail(email:string){
        const userEmail = await prisma.user.findUnique({where:{email}})
        return userEmail;
    }

    async createUser(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({data})
        return user;
    }

}