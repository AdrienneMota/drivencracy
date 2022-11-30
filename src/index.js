import express from "express";
import cors from "cors"
import pollRoute from "./routes/poll.routes.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(pollRoute)


app.listen(5000, () => console.log(`Server is running in port: ${5000}`))