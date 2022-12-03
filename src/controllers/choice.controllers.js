import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";

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

export async function listChoice(req, res){
    const pollId = res.locals.pollId
    try {
        const choices = await choicesCollection.find({pollId}).toArray()
        res.send(choices)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}