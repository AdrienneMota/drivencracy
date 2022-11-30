import pollSchema from "../schemas/poll.schema.js"
import dayjs from "dayjs"

export function pollValidate(req, res, next){
    const { poll } = req.body

    const { error } = pollSchema.validate(poll, {abortEarly: false})
    if(error){
        return res.status(422).send({message: "Title precisa ser uma string não vazia"})
    }

    if(!poll.expireAt){
        poll.expireAt = dayjs().add(30, 'day').format("YYYY-MM-DD HH:mm")
    }

    res.locals.poll = poll

    next()
}