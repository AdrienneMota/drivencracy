import { Router } from "express"
import { choiceValidate } from "../middlewares/choiceValidate.middleware.js"
import { createChoice } from "../controllers/choice.controllers.js"

const choiceRoute = Router()

choiceRoute.post("/choice", choiceValidate, createChoice)
// choiceRoute.get("/poll", listPoll)

export default choiceRoute