import { z } from 'zod';

const ProductFormSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, {
        message: 'Please enter a name',
    }),
    description: z.string(),
    category: z.string().trim().min(1, {
        message: 'Please enter a category'
    }),
    price: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' })
    ,
    imageUrl: z.string(),
    contributorId: z.string(),
    date: z.string(),
});

export const CreateProduct = ProductFormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        name?: string[];
        category?: string[];
        price?: string[];
    };
    message?: string | null;
    values?: {
        id?:string,
        name?: string,
        description?: string,
        category?: string,
        newCategory?: string,
        price?: string,
        imageUrl?: string,
    }
};

export interface ProductDataCore{
    name: string;
    description: string;
    category: string;
    price: number;
    imageUrl?: string;
    contributorId: string;
}

export interface ProductDataCreate extends ProductDataCore {
    createdAt: string;
    updatedAt: string;
}

export interface ProductDataUpdate extends ProductDataCore {
    id : string;
    name: string;
    updatedAt: string;
}

export interface ProductUpdateDB{
    name?: string;
    description?:string;
    price?:number;
    imageUrl?:string;
    category?:string;
    updatedAt?:string;
}