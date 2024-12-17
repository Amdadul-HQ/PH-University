import express from "express"
import validateRequest from "../../app/middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const AuthRoute = express.Router();

AuthRoute.post('/login',validateRequest(AuthValidation.loginValidationSchema),
    AuthController.loginuser
)


export const AuthRoutes = AuthRoute