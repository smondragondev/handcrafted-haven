import { NextResponse } from "next/server";
import { UpdateUserRole } from "@/app/lib/mongodb";

export async function POST(request: Request) {
    const { userId } = await request.json();

    await UpdateUserRole(userId, "contributor");

    return NextResponse.json({
        success: true,
    });
}
