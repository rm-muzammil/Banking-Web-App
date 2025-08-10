// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get("token")?.value;

//     if (!token) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

//     try {
//         jwt.verify(token, process.env.TOKEN_SECRET!);
//     } catch {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }
// }

// export const config = {
//     matcher: ["/:username/dashboard"], // Protected routes
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
    username: string;
}

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

        // Extract username from URL
        const pathUsername = req.nextUrl.pathname.split("/")[1];
        if (decoded.username !== pathUsername) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

    } catch {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/:username/dashboard"], // Protect this pattern
};
