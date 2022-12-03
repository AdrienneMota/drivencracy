import { Router } from "express"
import { choiceValidate, listChoiceValidate } from "../middlewares/choiceValidate.middleware.js"
import { createChoice, listChoice } from "../controllers/choice.controllers.js"

const choiceRoute = Router()

choiceRoute.post("/choice", choiceValidate, createChoice)
choiceRoute.get("/poll/:id/choice", listChoiceValidate, listChoice)

export default choiceRoute

// 638a8ea7a2dc0848be4c8f8d