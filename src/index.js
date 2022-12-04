import express from "express";
import cors from "cors"
import pollRoute from "./routes/poll.routes.js";
import choiceRoute from "./routes/choice.routes.js";
import voteRoute from "./routes/vote.routes.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(pollRoute)
app.use(choiceRoute)
app.use(voteRoute)

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server is running in port: ${port}`))