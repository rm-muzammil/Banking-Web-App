import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmin extends Document {
    user: mongoose.Types.ObjectId; // Link to User
    permissions: string[]; // e.g., ["CREATE_USER", "DELETE_TRANSACTION"]
}

const AdminSchema = new Schema<IAdmin>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        permissions: [{ type: String }]
    },
    { timestamps: true }
);

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
