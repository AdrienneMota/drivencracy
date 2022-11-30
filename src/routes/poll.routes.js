import { Router } from "express"
import { pollValidate } from "../middlewares/pollValide.middleware.js"
import { creatPoll, listPoll } from "../controllers/poll.controllers.js"


const pollRoute = Router()

pollRoute.post("/poll", pollValidate, creatPoll)
pollRoute.get("/poll", listPoll)

export default pollRoute