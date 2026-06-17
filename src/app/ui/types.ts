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

export interface CartItem extends ProductData {
    quantity: number;
}

export interface OrderDoc {
    orderNumber: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    createdAt: string;
}

export interface Review {
    _id?: string;
    productId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface User {
    _id?: string;
    name: string;
    email: string;
    bio: string;
    location: string;
    role: "customer" | "contributor";
    createdAt: string;
    password: string;
}
