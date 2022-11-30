import { pollsCollection } from "../database/db.js"

export async function creatPoll(req, res){
    const {title, expireAt} = res.locals.poll

    try {
        await pollsCollection.insertOne({title, expireAt})
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendSatatus(500)
    }

}

export async function listPoll(req, res){
    try {
        const polls = await pollsCollection.find().toArray()
        res.send(polls)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}