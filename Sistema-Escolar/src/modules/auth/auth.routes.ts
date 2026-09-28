import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import  express  from "express";

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

const authRouter = express.Router()

authRouter.post("/register", (req, res, next) => controller.registerUser(req, res,  next));
authRouter.post("/login", (req, res, next) => controller.loginUser(req, res, next));

export default authRouter;