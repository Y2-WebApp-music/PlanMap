import { MongoClient, ServerApiVersion } from 'mongodb';

const url = "mongodb+srv://Guynut:Guynut123@clusterplanmap.uwy5s2x.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPlanMap";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
let collection;

export async function connect() {
  await client.connect();
  console.log("Connected to MongoDB");
  db = client.db("PlanMap");
  collection = db.collection("Plans");
}

export async function close() {
  await client.close();
  console.log("Closed connection to MongoDB");
}

export async function createDocument(document) {
  const result = await collection.insertOne(document);
  console.log(`Document created with _id: ${result.insertedId}`);
  return result.insertedId;
}

export async function readDocument(documentId) {
  const document = await collection.findOne({ _id: ObjectId(documentId) });
  console.log(`Document read with _id: ${documentId}`);
  return document;
}

export async function readAllDocuments(sortField = "CreateAt", sortOrder = 1) {
  const sortQuery = { [sortField]: sortOrder };
  const documents = await collection.find({}).sort(sortQuery).toArray();
  console.log("All documents read and sorted");
  return documents;
}

export async function updateDocument(documentId, update) {
  const result = await collection.updateOne(
    { _id: ObjectId(documentId) },
    { $set: update }
  );
  console.log(`Document updated with _id: ${documentId}`);
}

export async function deleteDocument(documentId) {
  const result = await collection.deleteOne({ _id: ObjectId(documentId) });
  console.log(`Document deleted with _id: ${documentId}`);
}

export async function findOneNearestToDate() {
  const currentDate = new Date();
  const document = await collection
    .find({})
    .sort({ $abs: { $subtract: ["$StartDate", currentDate] } })
    .limit(1)
    .next();

  console.log("Nearest document to current date:", document);
  return document;
}


