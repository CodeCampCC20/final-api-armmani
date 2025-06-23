import { object, ref, string } from "yup";

export const registerDoctorSchema = object({
  username: string().required("Enter Your Username"),
  password: string().min(4, "Password must be at least 4 letters"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Password is not Matched"
  ),
  specialization: string().required("Enter Your Specialization"),
});

export const registerUserSchema = object({
  username: string().required("Enter Your Username"),
  password: string().min(4, "Password must be at least 4 letters"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Password is not Matched"
  ),
});

export const loginDoctorSchema = object({
  username: string().required("Enter Your Username"),
  password: string().min(4, "Password must be at least 4 letters")
})

export const loginUserSchema = object({
  username: string().required("Enter Your Username"),
  password: string().min(4, "Password must be at least 4 letters")
})

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, {abortEarly: false})
    next()
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(",");
    console.log(errTxt);
    const mergeErr = new Error(errTxt);
    next(mergeErr);
  }
}