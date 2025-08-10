import { connectToDB } from "@/lib/db";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
connectToDB()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, email, password, role } = reqBody
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: `User already exist with this: ${email} email` })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        })
        const savedUser = await newUser.save()
        return NextResponse.json({ message: "User createed successfully", success: true, savedUser }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}