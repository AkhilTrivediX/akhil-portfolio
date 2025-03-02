'use server'
import axios from 'axios'
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

let jar = new CookieJar(); // Create an initial cookie store
let client = wrapper(axios.create({ jar })); // Axios instance with cookies

// Function to reset cookies every 10 minutes
function resetCookieJar() {
    console.log("🔄 Resetting cookies...");
    jar = new CookieJar(); // Create a fresh cookie store
    client = wrapper(axios.create({ jar })); // Attach new jar to Axios instance
}

// Set an interval to reset cookies every 10 minutes (600,000ms)
setInterval(resetCookieJar, 30 * 60 * 1000);



export default async function getInstaData( username: string) {

    
    const regex = /<meta\s+(?:name|property)=\\"([\w:]+)\\"\s+content=\\"([^\\"]+)/gi;

    const imageRegex = /<meta\s+property=\\"og:image\\"\s+content=\\"([^\\"]+)\\"/; 
    const titleRegex = /<meta\s+property=\\"og:title\\"\s+content=\\"([\w\s]+)/;
    const descriptionRegex = /<meta\s+content=\\"([\w\,\.]+) Followers, ([\w\,\.]+) Following, ([\w\,\.]+) Posts[^\:]+\: &quot;(.*)&quot;.*name=\\"description\\"/;

    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://instagram.com/cristiano/',
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
      

      jar.getCookies('https://www.instagram.com/cristiano', (err, cookies) => {
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

    //console.log(html.match(regex))
    //return html
//       let match;
//       let metaDict:{[key:string]:string} = {}
// while ((match = regex.exec(html)) !== null) {
//     console.log({
//         attribute: match[1].startsWith("og:") ? "property" : "name",
//         value: match[1],
//         content: match[2]
//     });
//     if(match[1] && match[2]) metaDict[match[1]] = match[2];
// }
const imageMatch = html.match(imageRegex)
const titleMatch = html.match(titleRegex)
const descriptionMatch = html.match(descriptionRegex)
return {
    avatar: imageMatch ? imageMatch[1] : '',
    name: titleMatch ? titleMatch[1].trim() : '',
    stats: [
        {name: 'Followers', value: descriptionMatch && descriptionMatch[1] ? descriptionMatch[1] : ''},
        {name: 'Following', value: descriptionMatch && descriptionMatch[2] ? descriptionMatch[2] : ''},
        {name: 'Posts', value: descriptionMatch && descriptionMatch[3] ? descriptionMatch[3] : ''},
    ],
    bio: descriptionMatch && descriptionMatch[4] ? descriptionMatch[4] : '',
}
}5