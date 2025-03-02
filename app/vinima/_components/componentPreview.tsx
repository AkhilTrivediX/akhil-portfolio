'use client'

import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from 'motion/react'
import SwitchTabs from "./natives/switchTabs";
import Codeblock from "./codeblock";

export default function ComponentPreview({previewComponent,code, controlsComponent}:{previewComponent: ReactNode,code:string, controlsComponent: ReactNode}){

    const [currentTab, setCurrentTab] = useState('preview');
    return (
        <main>
            <SwitchTabs tabs={[
                {id: 'preview',name: 'Preview'},
                {id: 'code',name: 'Code'},
                {id: 'controls',name: 'Controls'},
                ]} currentTab={currentTab} setCurrentTab={setCurrentTab}/>
            <AnimatePresence>
                {currentTab == 'preview' && <motion.div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border w-full min-h-[350px] mt-4 flex items-center justify-center">
                    {previewComponent}
                </motion.div>}
                {currentTab=='code' && 
                        <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border w-full h-[350px] mt-4 flex codeblock overflow-hidden"><Codeblock code={code}/></div>}
                {currentTab == 'controls' && <motion.div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border w-full min-h-[350px] mt-4 flex items-start justify-center">
                    {controlsComponent}
                </motion.div>}
            </AnimatePresence>
        </main>
    )
}