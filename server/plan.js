import { MongoClient, ObjectId } from 'mongodb';

const url = "mongodb+srv://Guynut:Guynut123@clusterplanmap.uwy5s2x.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPlanMap";

const client = new MongoClient(url);

let db;
let collection;

async function connect() {
  await client.connect();
  console.log("Connected to MongoDB");
  db = client.db("Plan");
  collection = db.collection("Plans");
}

async function close() {
  await client.close();
  console.log("Closed connection to MongoDB");
}

export async function createDocument(uid, document) {
  const result = await collection.insertOne({ uid, ...document });
  console.log(`Document created with _id: ${result.insertedId}`);
  return result.insertedId;
}

export async function readDocument(uid, documentId) {
  const document = await collection.findOne({ _id: ObjectId(documentId), uid });
  console.log(`Document read with _id: ${documentId}`);
  return document;
}

// export async function readAllDocuments(uid, sortField = "CreateAt", sortOrder = 1) {
//   const sortQuery = { [sortField]: sortOrder };
//   const documents = await collection.find({ uid }).sort(sortQuery).toArray();
//   console.log("All documents read and sorted");
//   return documents;
// }

export async function readAllDocuments() {
  try {
    await connect();
    const documents = await collection.find({}).toArray();
    console.log("All documents read and sorted");
    return documents;
  } catch (error) {
    console.error("Error reading documents:", error);
    throw error;
  }
}

export async function updateDocument(uid, documentId, update) {
  const result = await collection.updateOne(
    { _id: ObjectId(documentId), uid },
    { $set: update }
  );
  console.log(`Document updated with _id: ${documentId}`);
}

export async function deleteDocument(uid, documentId) {
  const result = await collection.deleteOne({ _id: ObjectId(documentId), uid });
  console.log(`Document deleted with _id: ${documentId}`);
}

export async function findOneNearestToDate(uid) {
  const currentDate = new Date();
  const document = await collection
    .find({ uid })
    .sort({ $abs: { $subtract: ["$StartDate", currentDate] } })
    .limit(1)
    .next();

  console.log("Nearest document to current date:", document);
  return document;
}
