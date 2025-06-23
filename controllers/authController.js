import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const registerDoctor = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password, specialization } = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    console.log(doctor);

    if (doctor) {
      createError(400, "username is already existed");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization,
      },
    });
    res.json({ message: "Register Doctor Successfully" });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log(user);

    if (user) {
      createError(400, "username is already existed");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });
    res.json({ message: "Register User Successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    console.log(doctor);
    if (!doctor) {
      createError(400, "USERNAME or PASSWORD is not Correct");
    }

    const checkPasswordDoctor = bcrypt.compareSync(password, doctor.password);

    if (!checkPasswordDoctor) {
      createError(400, "USERNAME or PASSWORD is not Correct");
    }

    const payload = {
      id: doctor.id,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

    res.json({
      message: `Welcome ${doctor.username}`,
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log(user);
    if (!user) {
      createError(400, "USERNAME or PASSWORD is not Correct");
    }

    const checkPasswordUser = bcrypt.compareSync(password, user.password);

    if (!checkPasswordUser) {
      createError(400, "USERNAME or PASSWORD is not Correct");
    }

    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

    res.json({
      message: `Welcome ${user.username}`,
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
