import { AppError } from "../utils/app.error";
import { Request, Response, NextFunction } from "express"

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({status: "error", message: err.message});
} else {
    res.status(500).json({message: "internal server error"});
}
}