import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware (req: NextRequest) {
    console.log('Middleware executed');
    const { pathname } = req.nextUrl;
    const user = req.cookies.get('game');
    console.log('token', user);

    if (pathname.startsWith('/game')) {
        if (!user) {
            return Response.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/game']
};