import dayjs from "dayjs"
import { ObjectId } from "mongodb"
import {choicesCollection, pollsCollection} from "../database/db.js"


export async function choiceValidate(req, res, next){
    const {pollId, title} = req.body
    try {  
        if(!title){
            return res.sendStatus(422)
        }
              
        const poll = await pollsCollection.findOne({_id: new ObjectId(pollId)})
        if(!poll){
            return res.sendStatus(404)
        }

        const titleAlreadexist = await choicesCollection.findOne({title: title.toLowerCase()})
        if(titleAlreadexist){
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
        const poll = await pollsCollection.findOne({_id: new ObjectId(pollId)})
        if(!poll){
            return res.sendStatus(404)
        }
        res.locals.pollId = pollId
        next()  
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}