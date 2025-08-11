import { connectToDB } from "@/lib/db";
import Account from "@/models/Account.model";
import Transaction from "@/models/Transaction.model";
import User from "@/models/User.model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectToDB()
    try {
        const token = req.cookies.get("token")?.value
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string }

        const adminUser = await User.findById(decoded.id);
        if (!adminUser || adminUser.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        const { fromAccountNumber, toAccountNumber, amount } = await req.json();
        console.log(fromAccountNumber, toAccountNumber, amount);

        if (!fromAccountNumber || !toAccountNumber || !amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid transfer details" }, { status: 400 });
        }
        const senderAccount = await Account.findOne({ accountNumber: fromAccountNumber }).populate("owner");
        if (!senderAccount) {
            return NextResponse.json({ error: "Invalid sender account" })

        }
        const receiverAccount = await Account.findOne({ accountNumber: toAccountNumber }).populate("owner")
        if (!receiverAccount) {
            return NextResponse.json({ error: "Invalid receiver account" })
        }
        if (senderAccount.balance < amount) {
            return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
        }
        senderAccount.balance -= amount;
        receiverAccount.balance += amount;

        await senderAccount.save()
        await receiverAccount.save()
        const senderTransaction = new Transaction({
            type: "TRANSFER",
            amount,
            from: senderAccount.owner._id,
            to: receiverAccount.owner._id,
            account: senderAccount._id,
            description: `Bank transfer to account ${toAccountNumber}`,
        })
        const receiverTransaction = new Transaction({
            type: "TRANSFER",
            amount,
            from: senderAccount.owner._id,
            to: receiverAccount.owner._id,
            account: receiverAccount._id,
            description: `Admin received from account ${fromAccountNumber}`,
        });
        await Promise.all([senderTransaction.save(), receiverTransaction.save()]);
        return NextResponse.json({ message: "Bank transfer successful" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}