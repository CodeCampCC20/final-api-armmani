import express from "express"
import cors from 'cors'
import morgan from "morgan"
import error from "./utils/error.js"
import notFound from "./utils/404notfound.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import authRouter from "./routes/authRoute.js"


const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use('/doctors', doctorRouter)
app.use('/', userRouter)

app.use(error)

app.use(notFound)


const PORT = 4000

app.listen(PORT, ()=> console.log(`Server is running on PORT: ${PORT}`))