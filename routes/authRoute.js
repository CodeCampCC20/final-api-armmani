import express from "express";
import { loginDoctor, loginUser, registerDoctor, registerUser } from "../controllers/authController.js";
import { loginDoctorSchema, loginUserSchema, registerDoctorSchema, registerUserSchema, validate } from "../validations/validator.js";

const authRouter = express.Router()

authRouter.post("/register/doctor",validate(registerDoctorSchema), registerDoctor)
authRouter.post("/register/user",validate(registerUserSchema), registerUser)
authRouter.post("/login/doctor",validate(loginDoctorSchema), loginDoctor)
authRouter.post("/login/user",validate(loginUserSchema), loginUser)

export default authRouter