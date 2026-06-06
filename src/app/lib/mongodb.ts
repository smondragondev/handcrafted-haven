import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const uri = process.env.MONGODB_URI || "";
const options = {}

const client = new MongoClient(uri, options);
attachDatabasePool(client);