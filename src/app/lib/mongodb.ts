import { MongoClient, ObjectId } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";
import type { ProductDoc } from "@/app/ui/types";
import { ProductDataCreate, ProductDataUpdate, ProductUpdateDB } from "./schemas";

const uri = process.env.MONGODB_URI || "";
if (!uri) throw new Error("Missing MONGODB_URI environment variable");
const options = {}

const client = new MongoClient(uri, options);

attachDatabasePool(client);


const GetAllProducts = async () => {

    const db = client.db("handcraftedhavendb")
    const products = db.collection<ProductDoc>("products")

    return products.find().toArray();
}

const GetCategories = async () => {
    const db = client.db("handcraftedhavendb");
    const products = db.collection("products");
    return products.distinct("category");
}

const GetProductById = async (id: string) => {
    const db = client.db("handcraftedhavendb");
    const products = db.collection("products");
    const product = await products.findOne({ _id: new ObjectId(id) });
    console.log("PRODUCT BY ID:", product);
    return {
        id: product?._id.toString(),
        name: product?.name,
        description: product?.description,
        price: product?.price,
        category: product?.category,
        imageUrl: product?.imageUrl,
    }
}

const createProductDB = async (data: ProductDataCreate) => {
    const db = client.db("handcraftedhavendb");
    const products = db.collection("products");
    const result = await products.insertOne({
        ...data,
    });
    return result.insertedId.toString();
}

const editProductDB = async (data: ProductDataUpdate) => {
    const db = client.db("handcraftedhavendb");
    const products = db.collection("products");

    let dataToUpdate: ProductUpdateDB = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        updatedAt: data.updatedAt,
    }
    if (data.imageUrl) {
        dataToUpdate = { ...dataToUpdate, imageUrl: data.imageUrl }
    }
    const result = await products.updateOne(
        { _id: new ObjectId(data.id) }, { $set: dataToUpdate });
    return result.upsertedId?.toString();
}

const deleteProductDB = async (id: string) => {
    const db = client.db("handcraftedhavendb");
    const products = db.collection("products");
    const result = await products.deleteOne({_id: new ObjectId(id)});
    return result.deletedCount;
}


export { GetAllProducts, createProductDB, editProductDB, GetProductById, GetCategories, deleteProductDB }