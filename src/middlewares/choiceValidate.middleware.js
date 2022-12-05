import dayjs from "dayjs"
import { ObjectId } from "mongodb"
import {choicesCollection, pollsCollection} from "../database/db.js"
import choiceSchema from "../schemas/choice.schema.js"


export async function choiceValidate(req, res, next){
    const choice = req.body
    try {  
        
        const { error } = choiceSchema.validate(choice, {abortEarly: false})
        if(error){
            const erros = error.details.map(detail => detail.message)
            return res.status(422).send(erros)
        }

        const title = choice.title.toLowerCase()

        const poll = await pollsCollection.findOne({_id: new ObjectId(choice.pollId)})
        if(!poll){
            return res.sendStatus(404)
        }

        const choices = await choicesCollection.find({pollId: choice.pollId}).toArray()
        const titleAlreadexist = choices?.map(c => c.title).includes(title.toLowerCase())
      
        if(titleAlreadexist){
            return res.sendStatus(409)
        }

        if(!(dayjs().isBefore(poll.expireAt))){
            return res.sendStatus(403)
        }

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