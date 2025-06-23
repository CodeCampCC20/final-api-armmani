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

export const healthGet = async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await prisma.healthRecord.findMany({
      where: {
        userId: Number(id),
      },
    });
    if(result.length === 0) {
      res.status(404).json({message: "No Record Found"})
    }
    res.json({ result: result, message: "Your Records" });
  } catch (error) {
    next(error);
  }
};

export const healthGetById = async (req, res, next) => {
  try {
    const {id} = req.params

    const result = await prisma.healthRecord.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!result) {
      return res.status(404).json({ message: "Record Not Found" });
    }
    res.json({ result: result, message: "Your Records" });
  } catch (error) {
    next(error);
  }
};

export const healthUpdateById = async (req, res, next) => {
  try {
    const {id} = req.params
    const userId = req.user.id;
    const { type, value } = req.body;

    const result = await prisma.healthRecord.update({
      where: {
        id: Number(id),
        userId: userId,
      },
      data: {
        type: type,
        value: value,
      },
    });
    res.json({
      result: result,
      message: `Your Record id ${recordId} was updated`,
    });
  } catch (error) {
    next(error);
  }
};

export const healthDeleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const delrecord = await prisma.healthRecord.delete({
      where: {
        id: Number(id),
        userId: userId
      },
    });
    res.json({message: `Record ${id} is deleted`})
  } catch (error) {
    next(error);
  }
};
