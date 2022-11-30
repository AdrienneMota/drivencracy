import { Router } from "express"
import { pollValidate } from "../middlewares/pollValide.middleware.js"
import { creatPoll } from "../controllers/poll.controllers.js"


const pollRoute = Router()

pollRoute.post("/poll", pollValidate, creatPoll)

export default pollRoute