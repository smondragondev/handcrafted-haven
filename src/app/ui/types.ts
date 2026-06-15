import { ObjectId } from "mongodb";

// what the Mongo driver works with (server side) — NO _id, WithId adds it
export interface ProductDoc {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  contributorId: ObjectId;
  createdAt: string;
}

// what the client receives after serializing at the boundary
export interface ProductData {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  contributorId: string;
  createdAt: string;
}