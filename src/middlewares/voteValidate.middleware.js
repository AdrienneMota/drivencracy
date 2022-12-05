import dayjs from "dayjs"
import { ObjectId } from "mongodb"
import { choicesCollection, pollsCollection, votesCollection} from "../database/db.js"

export async function voteValidate(req, res, next){
    const choiceId = req.params.id
    try {
        const choice = await choicesCollection.findOne({_id: new ObjectId(choiceId)})
        if(!choice){
            return res.status(404).send({message: "Escolha não encontrada."})
        }

        const poll = await pollsCollection.findOne({_id: new ObjectId(choice.pollId)})
        if(!poll){
            return res.sendStatus(404)
        }

        if(!(dayjs().isBefore(poll.expireAt))){
            return res.status(403).send({message: "Enquete expirada."})
        }

        const vote = {createdAt: dayjs().format("YYYY-MM-DD HH:mm"), choiceId}
        res.locals.vote = vote
        next()        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function checkResult(req, res, next){
    const pollId = req.params.id
    let result

    const poll = await pollsCollection.findOne({_id: new ObjectId(pollId)})
    if(!poll){
        return res.sendStatus(404)
    }

    try{
        const choicesMidlle = await choicesCollection.find({pollId}).toArray()
        const choices = choicesMidlle.map(choice => String(choice._id))
    
        const topVoted = await votesCollection.aggregate([
            { $match: {choiceId: {$in: choices}} },
            { $group: {_id: "$choiceId", voteAmount: {$sum: 1}} },
            { $sort: {voteAmount: -1}}
        ]).toArray()

        const choice = await choicesCollection.findOne({_id: new ObjectId(topVoted[0]._id)})

        const empate = topVoted.filter(v => v.voteAmount === topVoted[0].voteAmount)

        if(empate.length > 1){
            result = "Ganhador ainda não definido..."
        }else{
            const votes = topVoted[0].voteAmount
            result = { title: choice.title, votes }
        }
     
        const winner = {...poll, result}
        res.locals.winner = winner
  
        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(500)   
    }
}