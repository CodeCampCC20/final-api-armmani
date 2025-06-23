import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { authCheckUser } from "../middlewares/auth.middleware.js";
import { healthCreate, healthGet } from "../controllers/healthRecController.js";

const userRouter = express.Router();

userRouter.get("/me", authCheckUser, getUser);
userRouter.patch("/me", authCheckUser, updateUser);
userRouter.post("/health-records", authCheckUser, healthCreate)
userRouter.get("/health-records", authCheckUser, healthGet)

export default userRouter;
