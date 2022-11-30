import dayjs from "dayjs"
import {choicesCollection, pollsCollection} from "../database/db.js"
import { ObjectId } from "mongodb"

async function pollExist(pollId){
    try {
        const poll = await pollsCollection.findOne({_id: new ObjectId(pollId)})
        if(!poll){
            return res.status(404).send({message: "Enquete não encontrada."})
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function choiceValidate(req, res, next){
    const {pollId, title} = req.body

    try {
        
        pollExist(pollId)

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

export async function listChoiceValidate(req, res, next){
    const pollId = req.params.id

    try {
        
        pollExist(pollId)

        res.locals.pollId = pollId
        next()  
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}