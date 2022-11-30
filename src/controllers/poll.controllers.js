import { pollsCollection } from "../database/db.js"

export async function creatPoll(req, res){
    const poll = res.locals.poll

    try {
        await pollsCollection.insertOne({poll})
        res.sendSatatus(201)
    } catch (error) {
        console.log(error)
        res.sendSatatus(500)
    }

}