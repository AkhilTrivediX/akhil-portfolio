'use client'
import { useEffect, useState } from "react"

export default function ThemeProvider({children}:{children: React.ReactNode})
{
    const [primaryColor, setPrimaryColor] = useState('#fff')

    useEffect(()=>{
    
        let themeDiv = document.getElementById('themeDiv')!;
        const themeMutationObserver = new MutationObserver((mutationList, observer)=>{
            for(const mutation of mutationList)
            {
                if(mutation.type=='childList')
                {
                    setPrimaryColor(themeDiv.innerText);
                }
            }
        })
        themeMutationObserver.observe(themeDiv,{childList: true});
    
        return (()=>{
            themeMutationObserver.disconnect();})
        
    },[])

    return (
        <div style={{'--primaryColor': primaryColor} as React.CSSProperties}>
            <div id = 'themeDiv' className="hidden">{primaryColor}</div>
            {children}
        </div>
    )
}

export function updatePrimaryColor(color: string)
{
    document.getElementById('themeDiv')!.innerText = color;
}