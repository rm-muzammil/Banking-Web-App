import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";
import Account from "@/models/Account.model";

export async function GET(req: NextRequest) {
    await connectToDB()
    try {
        const token = req.cookies.get("token")?.value
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string }
        const adminUser = await User.findById(decoded.id);
        if (!adminUser || adminUser.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }
        const users = await User.find().select("-password").populate("account")
        const accounts = await Account.find();
        const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0)

        return NextResponse.json({ users, totalBalance })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}