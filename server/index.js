import express, { json } from 'express'
import cors from 'cors'
import { createDocument, readDocument, readAllDocuments, updateDocument, deleteDocument, findOneNearestToDate} from './plan.js'

const app = express()
app.use(cors())
app.use(json())

app.get('/mainpage', (req, res)=>{
    const uid = req.query.uid;
    const planOrder = req.query.planOrder
    readAllDocuments(uid, "CreateAt", planOrder)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

app.get('/comingplan', (req, res)=>{
    const uid = req.query.uid;
    findOneNearestToDate(uid)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

app.get('/plan', (req, res)=>{
    const uid = req.query.uid;
    const id = req.query.id;
    readDocument(uid,id)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

app.post('/addPlan', (req, res)=>{
    const uid = req.query.uid;
    const document = req.body;
    createDocument(uid,document)
    .catch(err => res.json(err))
})

app.post('/updatePlan', (req, res)=>{
    const uid = req.query.uid;
    const documentId = req.query.documentId;
    const update = req.body;
    console.log(' >> >> updatePlan ')
    console.log('uid ', uid)
    console.log('documentId ', documentId)
    console.log('update ', update)
    updateDocument(uid, documentId, update)
    .catch(err => res.json(err))
})

app.post('/deletePlan', (req, res)=>{
    const uid = req.query.uid;
    const id = req.query.id;
    console.log(" >> Delete Plan << ")
    deleteDocument(uid, id)
    .catch(err => res.json(err))
})


app.listen(3000, () =>{
    console.log("server is running")
})