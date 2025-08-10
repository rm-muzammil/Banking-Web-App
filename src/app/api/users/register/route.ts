import { connectToDB } from "@/lib/db";
import User from "@/models/User.model";
import Account from "@/models/Account.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { generateAccountNumber } from "@/lib/utils";
import mongoose from "mongoose";

connectToDB();

export async function POST(req: NextRequest) {
    try {
        const { username, email, password, role } = await req.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: `User already exists with email: ${email}` },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 1: Create user without account
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });
        const savedUser = await newUser.save();

        // Step 2: Create account for user
        const newAccount = await Account.create({
            accountNumber: generateAccountNumber(),
            owner: savedUser._id,
            balance: 1000
        });

        // Step 3: Link account to user
        savedUser.account = newAccount._id as mongoose.Types.ObjectId;
        await savedUser.save();

        return NextResponse.json(
            { message: "User and account created successfully", success: true },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
