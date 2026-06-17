import { NextResponse } from "next/server";
import { GetUserByEmail, CreateUser } from "@/app/lib/mongodb";

export async function POST(request: Request) {
    const { name, email, password } = await request.json();
    const existingUser = await GetUserByEmail(email);

    if (existingUser) {
        return NextResponse.json(
            {
                error: "Email already exists",
            },
            {
                status: 400,
            },
        );
    }

    await CreateUser({
        name,
        email,
        password,
        bio: "",
        location: "",
        role: "customer",
        createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
        success: true,
    });
}
