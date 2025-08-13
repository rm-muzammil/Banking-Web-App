// export { GET, POST } from "@/lib/auth";

import NextAuth from "next-auth";
import authConfig from "@/lib/auth";

export const GET = async (req: Request) => {
    const handler = NextAuth(authConfig);
    return handler(req);
};

export const POST = async (req: Request) => {
    const handler = NextAuth(authConfig);
    return handler(req);
};
