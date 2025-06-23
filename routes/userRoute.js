import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { authCheckUser } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/me", authCheckUser, getUser);
userRouter.patch("/me", authCheckUser, updateUser);

export default userRouter;
