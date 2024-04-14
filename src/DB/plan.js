import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://Guynut:Guynut123@clusterplanmap.uwy5s2x.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPlanMap";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connect() {
  await client.connect();
  console.log("Connected to MongoDB");
}

export async function close() {
  await client.close();
  console.log("Closed connection to MongoDB");
}

export async function createDocument(document) {
  const db = client.db("PlanMap");
  const collection = db.collection("Plans");
  const result = await collection.insertOne(document);
  console.log(`Document created with _id: ${result.insertedId}`);
  return result.insertedId;
}

export async function deleteDocument(documentId) {
  const db = client.db("PlanMap");
  const collection = db.collection("Plans");
  const result = await collection.deleteOne({ _id: ObjectId(documentId) });
  console.log(`Document deleted with _id: ${documentId}`);
}

export async function updateDocument(documentId, update) {
  const db = client.db("PlanMap");
  const collection = db.collection("Plans");
  const result = await collection.updateOne(
    { _id: ObjectId(documentId) },
    { $set: update }
  );
  console.log(`Document updated with _id: ${documentId}`);
}
