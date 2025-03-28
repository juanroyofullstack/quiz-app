import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware (req: NextRequest) {
    const { pathname } = req.nextUrl;
    const user = await req.cookies.get('game')?.value;

    if (pathname.startsWith('/game')) {
        const userData = user ? JSON.parse(user) : null;
        if (!userData || !userData.isLoggedIn) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/game']
};