import express, { json } from 'express'
import cors from 'cors'
import { createDocument, readDocument, readAllDocuments, updateDocument, deleteDocument} from './plan.js'

const app = express()
app.use(cors())
app.use(json())

app.get('/mainpage', (req, res)=>{

    readAllDocuments()
    .then(data => res.json(data))
    .catch(err => res.json(err))
})
app.listen(3000, () =>{
    console.log("server is running")
})