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

export async function readAllDocuments(uid, sortField = "CreateAt", sortOrder = 1) {
  try {
    await connect();
    const sortQuery = { [sortField]: sortOrder };
    const documents = await collection.find({ uid }).sort(sortQuery).toArray();
    close()
    return documents;
  } catch (error) {
    console.error("Error readAllDocuments documents:", error);
    throw error;
  }
}

export async function findOneNearestToDate(uid) {
  try {
    await connect();
    const currentDate = new Date();

    const document = await collection
      .aggregate([
        { $match: { uid } },
        { $addFields: { start_date: { $toDate: "$StartDate" } } },
        { $addFields: { date_diff: { $abs: { $subtract: ["$start_date", currentDate] } } } },
        { $sort: { date_diff: 1 } },
        { $limit: 1 }
      ])
      .next();

    return document;
  } catch (error) {
    console.error("Error findOneNearestToDate documents:", error);
    throw error;
  }
}
export async function readDocument(uid, documentId) {
  try {
    await connect();
    const document = await collection.findOne({ _id: new ObjectId(documentId), uid });
    console.log(`Document read with _id: ${documentId}`);
    close();
    return document;
  } catch (error) {
    console.error("Error reading documents:", error);
    throw error;
  }
}








export async function createDocument(uid, document) {
  const result = await collection.insertOne({ uid, ...document });
  console.log(`Document created with _id: ${result.insertedId}`);
  return result.insertedId;
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
