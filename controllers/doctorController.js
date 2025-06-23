import prisma from "../config/prisma.js";

export const getDoctor = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const doctor = await prisma.doctor.findFirst({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
      },
    });
    res.json({ result: doctor, message: `${doctor.username} are logging in` });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { username, specialization } = req.body;
    const doctor = await prisma.doctor.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
        specialization: specialization,
      },
    });
    res.json({ message: `USERNAME changed to ${doctor.username}` });
  } catch (error) {
    next(error);
  }
};
