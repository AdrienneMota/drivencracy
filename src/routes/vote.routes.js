import { voteValidate, checkResult } from "../middlewares/voteValidate.middleware.js"
import { createVote, showResult } from "../controllers/vote.controllers.js"
import { Router } from "express"

const voteRoute = Router()

voteRoute.post("/choice/:id([0-9a-fA-F]{24})/vote", voteValidate, createVote)
voteRoute.get("/poll/:id([0-9a-fA-F]{24})/result", checkResult, showResult )

export default voteRoute

