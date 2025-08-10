// src/app/api/accounts/transfer/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/db";
import Account from "@/models/Account.model";
import User from "@/models/User.model";
import { IAccount } from "@/models/Account.model";
import { IUser } from "@/models/User.model";

export async function POST(req: NextRequest) {
    await connectToDB();

    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };

        const { toAccountNumber, amount } = await req.json();

        if (!toAccountNumber || !amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid transfer details" }, { status: 400 });
        }

        // Find sender (with account)
        const sender = await User.findById(decoded.id)
            .populate<{ account: IAccount }>("account")
            .exec();
        if (!sender || !sender.account) {
            return NextResponse.json({ error: "Sender account not found" }, { status: 404 });
        }

        // Find receiver account
        const receiverAccount = await Account.findOne({ accountNumber: toAccountNumber });
        if (!receiverAccount) {
            return NextResponse.json({ error: "Recipient account not found" }, { status: 404 });
        }

        // Check balance
        if (sender.account.balance < amount) {
            return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
        }

        // Update balances (transaction-like approach)
        sender.account.balance -= amount;
        receiverAccount.balance += amount;

        await sender.account.save();
        await receiverAccount.save();

        return NextResponse.json({ message: "Transfer successful" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
