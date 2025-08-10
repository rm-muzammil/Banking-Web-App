import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransaction extends Document {
    type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
    amount: number;
    from?: mongoose.Types.ObjectId; // Optional (null for deposits)
    to?: mongoose.Types.ObjectId;   // Optional (null for withdrawals)
    account: mongoose.Types.ObjectId; // Account related to transaction
    description?: string;
    createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
    {
        type: { type: String, enum: ["DEPOSIT", "WITHDRAWAL", "TRANSFER"], required: true },
        amount: { type: Number, required: true },
        from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
        description: { type: String }
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const Transaction: Model<ITransaction> =
    mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
