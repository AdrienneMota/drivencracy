import dayjs from "dayjs"
import {choicesCollection, pollsCollection} from "../database/db.js"
import { ObjectId } from "mongodb"

export async function choiceValidate(req, res, next){
    const {pollId, title} = req.body

    try {
        const poll = await pollsCollection.findOne({_id: new ObjectId(pollId)})
        if(!poll){
            return res.sendStatus(404)
        }
        const titleExist = await choicesCollection.findOne({title})
        if(!title){
            return res.sendStatus(422)
        }
        if(titleExist){
            return res.sendStatus(409)
        }
        if(!(dayjs().isBefore(poll.expireAt))){
            return res.sendStatus(403)
        }

    const choice = {title, pollId}

    res.locals.choice = choice

    next()

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}