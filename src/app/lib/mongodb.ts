import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";
import { ProductDataCreate } from "./schemas";

const uri = process.env.MONGODB_URI || "";
if (!uri) throw new Error("Missing MONGODB_URI environment variable");
const options = {}

const client = new MongoClient(uri, options);

attachDatabasePool(client);


const GetAllProducts = async ()=>{

    const db = client.db("handcraftedhavendb")
    const products = db.collection("products")

    return products.find().toArray();
}

const createProductDB = async (data : ProductDataCreate) => {
    const db = client.db("handcraftedhavendb");    
    const products = db.collection("products");
    const result = await products.insertOne({
        ...data,
    });
    return result.insertedId.toString();
}


export {GetAllProducts, createProductDB}