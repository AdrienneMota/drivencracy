import { choicesCollection } from "../database/db.js";

export async function createChoice(req, res){
    const {title, pollId} = res.locals.choice
    try {
        await choicesCollection.insertOne({title, pollId})
        res.status(201).send({title, pollId})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
} 