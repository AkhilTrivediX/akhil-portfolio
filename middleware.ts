import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
    const host = req.headers.get('host') || '';

    console.log('Hosts', host)

    if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.pathname.startsWith('/static')) {

        return NextResponse.next();
    }

    if(host.includes('vinima')){
        return NextResponse.rewrite(new URL(`/vinima`, req.url));
    }

    return NextResponse.next();
}