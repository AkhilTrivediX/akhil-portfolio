'use client'

import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from 'motion/react'
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "./codeblock.css";
import { FaRegClipboard } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function ComponentPreview({previewComponent,code, controlsComponent}:{previewComponent: ReactNode,code:string, controlsComponent: ReactNode}){

    const [currentTab, setCurrentTab] = useState('preview');
    const [codeCopied, setCodeCopied] = useState(false);
    return (
        <main>
            <div className="inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0">
                <Button variant={'ghost'} className="hover:bg-transparent hover:text-foreground/80 relative pb-4" onClick={()=>setCurrentTab('preview')}>
                    <span className={currentTab==='preview'?'text-foreground':''}>Preview</span>
                    {currentTab === 'preview' && <motion.div layoutId='tabUnderline' className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"/>}
                </Button>
                <Button variant={'ghost'} className="hover:bg-transparent hover:text-foreground/80 relative pb-4" onClick={()=>setCurrentTab('code')}>
                    <span className={currentTab==='code'?'text-foreground':''}>Code</span>
                    {currentTab === 'code' && <motion.div layoutId='tabUnderline' className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"/>}
                </Button>
                <Button variant={'ghost'} className="hover:bg-transparent hover:text-foreground/80 relative pb-4" onClick={()=>setCurrentTab('controls')}>
                    <span className={currentTab==='controls'?'text-foreground':''}>Controls</span>
                    {currentTab === 'controls' && <motion.div layoutId='tabUnderline' className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"/>}
                </Button>
            </div>
            <AnimatePresence>
                {currentTab == 'preview' && <motion.div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border w-full min-h-[350px] mt-4 flex items-center justify-center">
                    {previewComponent}
                </motion.div>}
                {currentTab=='code' && <motion.div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border w-full h-[350px] mt-4 flex codeblock overflow-hidden">
                    <ReactMarkdown className={'markdown w-full h-full overflow-y-scroll'}
                rehypePlugins={[rehypeHighlight]}
            >{`\`\`\`tsx
${code}
\`\`\`
            `}</ReactMarkdown>
            <div className="absolute right-4 top-4 bg-background/80 rounded-md p-2 opacity-80 border-input border cursor-pointer" onClick={()=>{if(codeCopied) return;navigator.clipboard.writeText(code); setCodeCopied(true); setTimeout(()=>setCodeCopied(false), 1000)}}>
                <AnimatePresence mode="popLayout">
                    ${codeCopied?<motion.div key={'checkmark'} initial={{opacity: 0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity: 0, y: -10}}><IoCheckmarkSharp /></motion.div>:<motion.div key={'clipboard'} initial={{opacity: 0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity: 0, y: -10}}><FaRegClipboard /></motion.div>}
                </AnimatePresence>
            </div>

                </motion.div>}
                {currentTab == 'controls' && <motion.div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border w-full min-h-[350px] mt-4 flex items-start justify-center">
                    {controlsComponent}
                </motion.div>}
            </AnimatePresence>
        </main>
    )
}