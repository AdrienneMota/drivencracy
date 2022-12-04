import customParseFormat from "../node_modules/dayjs/plugin/customParseFormat.js"
import dayjs from "dayjs"

dayjs.extend(customParseFormat)

const date = "01-12-2022"

const newdate = dayjs(date, 'YYYY-MM-DD HH:mm').isValid()

if(!newdate){
    console.log("data não valida")
}