import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({
        message: "missing token"})

    try{
        const secret = process.env.JWT_SECRET ?? 'default_secret';
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }   catch(error){
        console.error(error);
        return res.status(401).json({
            message: "invalid token"
        });
    }
};

export default authMiddleware;