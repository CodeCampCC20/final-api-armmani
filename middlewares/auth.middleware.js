import { createError } from "../utils/createError.js";
import jwt from 'jsonwebtoken'

export const authCheckDoctor = (req, res, next) => {
  try {
    const header = req.headers.authorization

    if(!header){
      createError(401, "Token Unauthorization")
    }

    const token = header.split(" ")[1]

    jwt.verify(token, process.env.SECRET_DOCTOR, (error, decode) => {
      if(error) {
        createError(401, "Token is invalid")
      }
      req.user = decode
      next()
    })
  } catch (error) {
    next(error)
  }
};

export const authCheckUser = (req, res, next) => {
  try {
    const header = req.headers.authorization
    // console.log("AUTH HEADER:", header)
    if(!header){
      createError(401, "Token Unauthorization")
    }

    const token = header.split(" ")[1]
    // console.log("TOKEN:", token)
    jwt.verify(token, process.env.SECRET_USER, (error, decode) => {
      if(error) {
        createError(401, "Token is invalid")
      }
      // console.log("DECODED PAYLOAD:", decode)

      req.user = decode
      next()
    })
  } catch (error) {
    next(error)
  }
};
