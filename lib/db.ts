import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

declare global {
  var _mongoClient: MongoClient | undefined;
}

const client = global._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  global._mongoClient = client;
}

export const db = client.db();
