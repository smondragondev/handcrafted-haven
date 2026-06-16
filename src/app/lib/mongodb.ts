import { MongoClient, ObjectId } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";
import type { ProductDoc } from "@/app/ui/types";
import { ProductDataCreate, ProductDataUpdate, ProductUpdateDB } from "./schemas";
import type { OrderDoc } from "@/app/ui/types";

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
    const result = await products.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}

const createOrderDB = async (order: OrderDoc) => {

    const db = client.db("handcraftedhavendb");
    const orders = db.collection<OrderDoc>("orders");
    const result = await orders.insertOne(order);

    return result.insertedId.toString();
}

const GetReviewsByProductId = async (productId: string) => {

    const db = client.db("handcraftedhavendb");
    const reviews = db.collection("reviews");
    const results = await reviews.find({
        productId
    }).toArray();

    return results.map(review => ({

        _id: review._id.toString(),
        productId: review.productId,
        userName: review.userName,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt?.toISOString()
    }));
    
}

const getUser = async () => {

    const db = client.db("handcraftedhavendb")
    const products = db.collection<ProductDoc>("products")

    return products.find().toArray();
}

const createUser = async (data: {
    name: string;
    email: string;
    password: string; 
    bio?: string;
    location?: string;
    role?: string;
}) => {
    const db = client.db("handcraftedhavendb");
    const users = db.collection("users");

    // Don't allow duplicate accounts for the same email.
    const existing = await users.findOne({ email: data.email });
    if (existing) return null;

    const result = await users.insertOne({
        name: data.name,
        email: data.email,
        password: data.password,
        bio: data.bio ?? "",
        location: data.location ?? "",
        role: data.role ?? "contributor",
        createdAt: new Date(),
    });
    return result.insertedId.toString();
}

const getUserByEmail = async (email: string) => {
    const db = client.db("handcraftedhavendb");
    const users = db.collection("users");
    return users.findOne({ email });
}






export { GetAllProducts, createProductDB, editProductDB, GetProductById, GetCategories, deleteProductDB, createOrderDB, GetReviewsByProductId, createUser, getUserByEmail }