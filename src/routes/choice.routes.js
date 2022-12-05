import { Router } from "express"
import { choiceValidate, listChoiceValidate } from "../middlewares/choiceValidate.middleware.js"
import { createChoice, listChoice } from "../controllers/choice.controllers.js"

const choiceRoute = Router()

choiceRoute.post("/choice", choiceValidate, createChoice)
choiceRoute.get("/poll/:id([0-9a-fA-F]{24})/choice", listChoiceValidate, listChoice)

export default choiceRoute

