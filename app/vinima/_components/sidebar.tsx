

'use client'

import { AnimatePresence, motion } from 'motion/react'
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar(){

    const router = useRouter();
    const pathname = usePathname();

    const sidebarPages = {
        'Getting Started': [
            { name: 'Introduction', path: '/' },
        ],
        'Components' : [
            { name: 'Instagram', path: '/instagram' },
            { name: 'X', path: '/x'}
        ]
    }
    return (
        <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
                                <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
                                    <div className="flex flex-col gap-6">
                                        {Object.entries(sidebarPages).map(([group, pages]) => (
                                            <div className="flex flex-col gap-1" key={group}>
                                                <h4 className="rounded-md px-2 py-1 text-sm font-semibold">{group}</h4>
                                                <div className="grid grid-flow-row auto-rows-max gap-0.5 text-sm">
                                                    {pages.map((page) => (
                                                        <div className={"group relative flex h-8 w-full items-center rounded-lg px-2 after:absolute after:inset-x-0 after:inset-y-[-2px] after:rounded-lg hover:bg-accent/50 hover:text-accent-foreground font-normal text-foreground "} onClick={()=>{router.push((page.path))}} key={page.name}>
                                                            {page.name}
                                                            <AnimatePresence>
                                                            {(!pathname || pathname==page.path) && <motion.div transition={{type:'spring', duration: 0.2, bounce: 0}} layoutId="sidebarIndicator" className="w-full h-full absolute top-0 left-0 bg-accent rounded-lg -z-10"/>}
                                                            </AnimatePresence>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
        </aside>
    )
}