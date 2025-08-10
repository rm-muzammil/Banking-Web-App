// api/users/me
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/db";
import User, { IUser } from "@/models/User.model";
import { IAccount } from "@/models/Account.model";
type IUserPopulated = Omit<IUser, "account"> & { account: IAccount };
import Transaction from "@/models/Transaction.model";
import "@/models/Account.model.ts"


export async function GET(req: NextRequest) {
    await connectToDB();
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };

        const user: IUserPopulated | null = await User.findById(decoded.id)
            .populate<{ account: IAccount }>("account", "accountNumber balance")
            .select("username account");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const transactions = await Transaction.find({ account: user.account._id })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();

        return NextResponse.json({
            username: user.username,
            accountNumber: user.account ? user.account.accountNumber : "No account assigned",
            balance: user.account?.balance ?? 0,
            transactions: transactions.map(tx => ({
                type: tx.type,
                amount: tx.amount,
                description: tx.description || "",
                createdAt: tx.createdAt
            }))
        });

    } catch (error: any) {
        console.error("Error in /api/users/me:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
