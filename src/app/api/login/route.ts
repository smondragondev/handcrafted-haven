import { NextResponse } from "next/server";
import { GetUserByEmail } from "@/app/lib/mongodb";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    const user = await GetUserByEmail(email);

    if (!user) {
        return NextResponse.json(
            {
                error: "User not found",
            },
            {
                status: 404,
            },
        );
    }

    if (user.password !== password) {
        return NextResponse.json(
            {
                error: "Wrong password",
            },
            {
                status: 401,
            },
        );
    }

    return NextResponse.json({
        success: true,
        user: {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            bio: user.bio,
            location: user.location,
        },
    });
}
