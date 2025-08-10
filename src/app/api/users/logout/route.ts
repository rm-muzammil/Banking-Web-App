import { NextRequest, NextResponse } from "next/server";

export async function POST(rew: NextRequest) {
    const res = NextResponse.json({ message: "Logout Successful" })

    res.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    return res
}