
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "./codeblock.css";
import "highlight.js/lib/languages/bash"
import { FaRegClipboard } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";
import {motion, AnimatePresence} from 'motion/react'
import { useState } from 'react';

export default function Codeblock({code, language='tsx'}:{code: string, language?:string})
{
    const [codeCopied, setCodeCopied] = useState(false);
    const customLanguages = ['']
    return(
                    <>
                {!customLanguages.includes(language)?(<ReactMarkdown className={'markdown w-full h-full overflow-y-scroll'}
                     rehypePlugins={[rehypeHighlight]}
                    >{`\`\`\`${language || 'tsx'}
${code}
\`\`\`
            `}</ReactMarkdown>):(<code className='flex gap-2'>{code.split(' ').map((token,i)=><span key={i} className={customClass(token, language)}>{token}</span>)}</code>)}
            <div className="absolute right-4 top-4 bg-background/80 rounded-md p-2 opacity-80 border-input border cursor-pointer" onClick={()=>{if(codeCopied) return;navigator.clipboard.writeText(code); setCodeCopied(true); setTimeout(()=>setCodeCopied(false), 1000)}}>
                <AnimatePresence mode="popLayout">
                    ${codeCopied?<motion.div key={'checkmark'} initial={{opacity: 0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity: 0, y: -10}}><IoCheckmarkSharp /></motion.div>:<motion.div key={'clipboard'} initial={{opacity: 0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity: 0, y: -10}}><FaRegClipboard /></motion.div>}
                </AnimatePresence>
            </div></>
    )
}

function customClass(token:string, language:string)
{
    if(language=='bash')
    {
        if(token=='npx') return 'hljs-type'
        if(token=='shadcn') return 'hljs-title'
        if(token.startsWith('http')) return 'hljs-code'
    }
}