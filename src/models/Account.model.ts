import mongoose, { Schema, Model, model, models, Document } from "mongoose";

export interface IAccount extends Document {
    accountNumber: string;
    balance: number;
    owner: mongoose.Types.ObjectId; // Linked User
    createdAt: Date;
    updatedAt: Date;
}

const AccountSchema = new Schema({
    accountNumber: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 1000 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true
})
const Account: Model<IAccount> = models.Account || model("Account", AccountSchema);
export default Account;