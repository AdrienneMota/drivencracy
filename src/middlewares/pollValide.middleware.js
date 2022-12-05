import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import pollSchema from "../schemas/poll.schema.js"
dayjs.extend(customParseFormat)


export function pollValidate(req, res, next){
    const poll = req.body 
    
    const {error} = pollSchema.validate(poll, {abortEarly:false})
    if(error){
        const erros = error.details.map(detail => detail.message)
        return res.status(422).send(erros)
    }
    if(!poll.expireAt){
        poll.expireAt = dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm')
    }else if(!(dayjs(poll.expireAt, 'YYYY-MM-DD HH:mm').isValid())){
        return res.status(422).send({message: "Digite uma data no formato YYYY-MM-DD HH:mm"})
    }
    
    res.locals.poll = poll
    next()
}