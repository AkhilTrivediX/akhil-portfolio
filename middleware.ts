import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
    const host = req.headers.get('host') || '';

    console.log('Hosts', host)

    if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.pathname.startsWith('/static')) {

        return NextResponse.next();
    }

    if(host.includes('vinima')){
        return NextResponse.rewrite(new URL(process.env.NEXT_PUBLIC_BASE_URL+'/vinima'));
    }

    return NextResponse.next();
}