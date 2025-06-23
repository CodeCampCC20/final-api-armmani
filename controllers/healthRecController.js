import prisma from "../config/prisma.js";

export const healthCreate = async (req, res, next) => {
  try {
    const { type, value } = req.body;
    const result = await prisma.healthRecord.create({
      data: {
        type: type,
        value: value,
        userId: req.user.id,
      },
    });
    res.json({ message: "create health record successfully" });
  } catch (error) {
    next(error);
  }
};
