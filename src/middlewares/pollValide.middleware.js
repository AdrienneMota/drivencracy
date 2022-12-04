import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"

export function pollValidate(req, res, next){
    const poll = req.body    
    if(!poll.title){
        return res.status(422).send({message: "O título da enquete deve ser uma string não vazia"})
    }
    if(!poll.expireAt){
        poll.expireAt = dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm')
    }else if(!(dayjs(poll.expireAt, 'YYYY-MM-DD HH:mm').isValid())){
        return res.status(422).send({message: "Digite uma data no formato YYYY-MM-DD HH:mm"})
    }
    
    res.locals.poll = poll
    next()
}