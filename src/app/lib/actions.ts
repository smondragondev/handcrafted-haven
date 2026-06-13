'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache'; //Clean the cache to trigger a new request to the server
import { redirect } from 'next/navigation';
import { CreateProduct, ProductDataCreate, State } from './schemas';
import { put } from '@vercel/blob';
import { createProductDB } from './mongodb';


export async function createProduct(prevState: State, formData: FormData) {

    const image = formData.get('image');
    console.log("Cform : ",formData);
    let blob;
    if ((image instanceof File) && image.size > 0) {
        blob = await put(
            'products/' + Date.now() + '-' + image.name,
            image,
            { access: 'public' }
        );
    }


    const formCategory = formData.get('category') === 'new-category'
        ? formData.get('new-category') : formData.get('category');
    console.log("form category", formCategory)
    const validatedFields = CreateProduct.safeParse({
        name: formData.get('name'),
        description: formData.get("description"),
        category: formCategory,
        price: formData.get('price'),
        imageUrl: blob?.url ?? "",
        contributorId: formData.get("contributorId") ?? "",
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
            message: 'Missing Fields. Failed to Create Product.',
            values: {
                name: String(formData.get("name") ?? ""),
                description: String(formData.get("description") ?? ""),
                category: String(formData.get("category") ?? ""),
                newCategory: String(formData.get("new-category") ?? ""),
                price: String(formData.get("price") ?? "")
            }
        };
    }
    // Prepare data for insertion into the database
    const { name, description, category, price, imageUrl, contributorId } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    try {
        const data: ProductDataCreate = {
            name,
            description,
            category,
            price,
            imageUrl,
            createdAt: date,
            updatedAt: date,
            contributorId,
        }
        await createProductDB(data);
        // return {
        //     id,
        //     message: 'New Product Created'
        // }

    } catch (error) {
        // We'll also log the error to the console for now
        console.error(error);
        return {
            message: 'Database Error: Failed to Create Product.',
        };
    }

    revalidatePath('/my-shop');
    redirect('/my-shop');
}