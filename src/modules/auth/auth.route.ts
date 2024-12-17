import express from "express"
import validateRequest from "../../app/middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const AuthRoute = express.Router();

AuthRoute.post('/login',validateRequest(AuthValidation.loginValidationSchema),
    AuthController.loginuser
)

AuthRoute.post(
  '/change-password',
  auth(USER_ROLE.student,USER_ROLE.admin,USER_ROLE.faculty),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

AuthRoute.post('/refresh-token',validateRequest(AuthValidation.refreshTokenValidation),
AuthController.refreshToken
)

export const AuthRoutes = AuthRoute