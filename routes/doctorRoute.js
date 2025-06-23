import express from "express";
import { getDoctor, updateDoctor } from "../controllers/doctorController.js";
import { authCheckDoctor } from "../middlewares/auth.middleware.js";

const doctorRouter = express.Router()

doctorRouter.get("/me", authCheckDoctor, getDoctor)
doctorRouter.patch("/me", authCheckDoctor, updateDoctor)

export default doctorRouter