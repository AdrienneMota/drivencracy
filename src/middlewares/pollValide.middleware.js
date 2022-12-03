import dayjs from "dayjs"

export function pollValidate(req, res, next){
    const poll = req.body    
    if(!poll.title){
        return res.status(422).send({message: "O título da enquete deve ser uma string não vazia"})
    }
    if(!poll.expireAt){
        poll.expireAt = dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm')
    }else{
        poll.expireAt = dayjs(poll.expireAt).format('YYYY-MM-DD HH:mm')
    }

    res.locals.poll = poll
    next()
}