import { NextResponse } from "next/server";
import { createOrderDB } from "@/app/lib/mongodb";

export async function POST(request: Request) {
    try {
        const order = await request.json();
        const id = await createOrderDB(order);

        return NextResponse.json({
            success: true,
            id,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            },
        );
    }
}
