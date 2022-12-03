import { voteValidate, checkResult } from "../middlewares/voteValidate.middleware.js"
import { createVote, showResult } from "../controllers/vote.controllers.js"
import { Router } from "express"

const voteRoute = Router()

voteRoute.post("/choice/:id/vote", voteValidate, createVote)
voteRoute.get("/poll/:id/result", checkResult, showResult )

export default voteRoute
