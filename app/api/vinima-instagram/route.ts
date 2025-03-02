import axios from 'axios'
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import { NextResponse } from 'next/server';

let jar = new CookieJar(); // Create an initial cookie store
let client = wrapper(axios.create({ jar })); // Axios instance with cookies

// Function to reset cookies every 10 minutes
function resetCookieJar() {
    console.log("🔄 Resetting cookies... in Instagram fetcher");
    jar = new CookieJar(); // Create a fresh cookie store
    client = wrapper(axios.create({ jar })); // Attach new jar to Axios instance
}

// Set an interval to reset cookies every 10 minutes (600,000ms)
setInterval(resetCookieJar, 30 * 60 * 1000);



export async function GET(request: Request) {

    

    const { searchParams} = new URL(request.url);
    const username = searchParams.get('username');
    
    const regex = /<meta\s+(?:name|property)=\\"([\w:]+)\\"\s+content=\\"([^\\"]+)/gi;

    const imageRegex = /<meta\s+property=\\"og:image\\"\s+content=\\"([^\\"]+)\\"/; 
    const titleRegex = /<meta\s+property=\\"og:title\\"\s+content=\\"([\w\s]+)/;
    const descriptionRegex = /<meta\s+content=\\"([\w\,\.]+) Followers, ([\w\,\.]+) Following, ([\w\,\.]+) Posts[^\:]+\: &quot;(.*)&quot;.*name=\\"description\\"/;

    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://instagram.com/'+username,
        headers: { 
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://www.instagram.com/',
          'Connection': 'keep-alive',
          'DNT': '1',
          'Upgrade-Insecure-Requests': '1'
        }
      };
      

      jar.getCookies('https://www.instagram.com/'+username, (err, cookies) => {
        if (err) {
            console.error("Error getting cookies:", err);
        } else {
            console.log("🍪 Cookies before request:", cookies!.map(c => c.toString()).join("; "));
        }
    });

      const html = await client.request(config)
      .then((response) => 
        (JSON.stringify(response.data))
      )

const imageMatch = html.match(imageRegex)
const titleMatch = html.match(titleRegex)
const descriptionMatch = html.match(descriptionRegex)
console.log('Image URL:', imageMatch ? imageMatch[1] : '');
return NextResponse.json({
  avatar: imageMatch ? imageMatch[1].replaceAll('&amp;', '&') : '',
  name: titleMatch ? titleMatch[1].trim() : '',
  stats: [
      {name: 'Followers', value: descriptionMatch && descriptionMatch[1] ? descriptionMatch[1] : ''},
      {name: 'Following', value: descriptionMatch && descriptionMatch[2] ? descriptionMatch[2] : ''},
      {name: 'Posts', value: descriptionMatch && descriptionMatch[3] ? descriptionMatch[3] : ''},
  ],
  bio: descriptionMatch && descriptionMatch[4] ? descriptionMatch[4] : '',
}, {headers: {'Access-Control-Allow-Origin': '*'}}) 
}