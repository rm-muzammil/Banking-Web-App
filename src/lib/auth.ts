import User from "@/models/User.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./db";
import bcrypt from "bcryptjs";


const authConfig = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "E mail", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToDB()
                const user = await User.findOne({ email: credentials?.email });
                if (!user) {
                    throw new Error("User Not Found")
                }
                const isValid = await bcrypt.compare(credentials!.password, user.password)
                if (!isValid) {
                    throw new Error("Invalid Password")
                }
                return {
                    id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id,
                    token.role = (user as any).role
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    }, pages: {
        signIn: "/auth/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
})
export default authConfig;
export const { handlers: { GET, POST }, auth, signIn, signOut } = authConfig;