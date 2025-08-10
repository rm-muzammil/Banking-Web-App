import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
    account: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
const UserSchema = new mongoose.Schema<IUser>(
    {
        username: { type: String, required: true, unique: true, lowercase: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
        account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" }
    },
    { timestamps: true }
);

const User: mongoose.Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;