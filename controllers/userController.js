import prisma from "../config/prisma.js";

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      omit: {
        password: true,
      },
    });
    res.json({ result: user, message: `${user.username} are logging in` });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { username } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
      },
    });
    res.json({ message: `USERNAME changed to ${user.username}` });
  } catch (error) {
    next(error);
  }
};
