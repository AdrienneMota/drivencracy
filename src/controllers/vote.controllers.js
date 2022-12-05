import { votesCollection } from "../database/db.js";

export async function createVote(req, res){
    const {createdAt, choiceId} = res.locals.vote
    try {
        await votesCollection.insertOne({createdAt, choiceId})
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function showResult(req, res){
    const winner = res.locals.winner
    res.send(winner)
}   