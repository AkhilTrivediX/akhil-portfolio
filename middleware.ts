import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
    const host = req.headers.get('host') || '';

    const subdomain = host.split('.')[0];
    console.log('Subdomain is ', subdomain);

    if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.pathname.startsWith('/static')) {

        return NextResponse.next();
    }

    if(subdomain && subdomain != 'localhost:3000' && subdomain != 'akhiltrivedi' && subdomain != 'www'){
        return NextResponse.rewrite(new URL(`/${subdomain}`, req.url));
    }

    return NextResponse.next();
}