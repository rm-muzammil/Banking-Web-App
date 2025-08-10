import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/db";
import Account, { IAccount } from "@/models/Account.model";
import User from "@/models/User.model";
import Transaction from "@/models/Transaction.model";

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

        // Find sender user with populated account and user field inside account
        const sender = await User.findById(decoded.id)
            .populate<{ account: IAccount }>("account")
            .exec();

        if (!sender || !sender.account) {
            return NextResponse.json({ error: "Sender account not found" }, { status: 404 });
        }

        const receiverAccount = await Account.findOne({ accountNumber: toAccountNumber }).populate("owner");
        if (!receiverAccount) {
            return NextResponse.json({ error: "Recipient account not found" }, { status: 404 });
        }

        if (sender.account.balance < amount) {
            return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
        }

        sender.account.balance -= amount;
        receiverAccount.balance += amount;

        await sender.account.save();
        await receiverAccount.save();

        // Create transaction record for sender
        const transaction = new Transaction({
            type: "TRANSFER",
            amount,
            from: sender._id,
            to: receiverAccount.owner._id,
            account: sender.account._id,
            description: `Transfer to account ${toAccountNumber}`,
        });

        await transaction.save();

        return NextResponse.json({ message: "Transfer successful" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
