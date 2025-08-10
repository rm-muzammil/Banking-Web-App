import { connectToDB } from "@/lib/db";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export async function POST(req: NextRequest) {
    await connectToDB()
    try {
        const reqBody = await req.json()
        const { email, password } = reqBody
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: `User does not exist with this email: ${email}` }, { status: 400 })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 })
        }
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        const res = NextResponse.json({
            message: "Login Successful",
            success: true,
            username: user.username,
            email: user.email
        })
        res.cookies.set("token", token, {
            httpOnly: true
        })

        return res

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}