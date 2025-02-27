import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest){
    const host = req.headers.get('x-forwarded-host') || req.nextUrl.host;
    const { pathname} = req.nextUrl;


    if (req.nextUrl.pathname.startsWith('/_next') || req.nextUrl.pathname.startsWith('/static')) {

        return NextResponse.next();
    }

    const subdomainMatch = host.match(/^(?:https?:\/\/)?(?:www\.)?([^\.]+)\.(?:[\w-]+\.\w+|localhost)(?::\d+)?$/);
    const subdomain = subdomainMatch && subdomainMatch[1]?subdomainMatch[1]:''
    console.log('URL:', host)
    console.log('Subdomain', subdomain)
    console.log('Pathname:', pathname)

    const componentLibraries = ['vinima'];
    

    if(componentLibraries.includes(subdomain) && !pathname.endsWith('.json')){
        return NextResponse.rewrite(new URL('/'+subdomain, req.url));
    }

    if(subdomain){
        const targetUrl = (new URL('/'+subdomain+pathname, req.url)).toString()
        console.log('Targeting to url:',targetUrl)
        return NextResponse.rewrite(targetUrl);
    }

    return NextResponse.next();
}