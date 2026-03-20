import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

declare global {
  var _mongoClient: MongoClient | undefined;
}

const mongoClient = global._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  global._mongoClient = mongoClient;
}

export const client = mongoClient;
export const db = mongoClient.db();
