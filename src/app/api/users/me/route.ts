// api/users/me
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/db";
import User, { IUser } from "@/models/User.model";
import { IAccount } from "@/models/Account.model";
type IUserPopulated = Omit<IUser, "account"> & { account: IAccount };

connectToDB();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };

        const user: IUserPopulated | null = await User.findById(decoded.id)
            .populate<{ account: IAccount }>("account", "accountNumber")
            .select("username account");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            username: user.username,
            accountNumber: user.account ? user.account.accountNumber : "No account assigned",
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
