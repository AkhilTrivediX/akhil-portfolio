'use client'

import { usePathname } from "next/navigation";
import Sidebar from "./_components/sidebar";
import IntroductionPage from "./_components/pages/Introduction";
import { ReactNode } from "react";
import InstagramPage from "./_components/pages/Instagram";
import { AnimatePresence, motion } from 'motion/react'

export default function Page(){

    const pathname = usePathname();

    const pageComponents:{[key: string]: {title: string, description: string, content: ReactNode}} = {
        '/': {
            title: 'Introduction',
            description: 'Vinima is a component tool that helps to showcase your socials better.',
            content: <IntroductionPage/>
        },
        '/instagram': {
            title: 'Instagram',
            description: 'This page showcase how insta component works.',
            content: <InstagramPage/>
        }
    }
    return (
        <div className="relative flex min-h-svh flex-col bg-background">
            <div className="border-grid flex flex-1 flex-col">
                <header className="border-dashed border sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="max-w-[1400px] mx-auto w-full border-dashed border px-8">
                        <div className="h-14 flex items-center justify-center text-xl font-bold">Vinima</div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col">
                    <div className="max-w-[1400px] mx-auto w-full border-dashed border">
                        <div className="mx-auto max-w-[1536px] px-4 lg:px-6 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                        <Sidebar/>
                        {pageComponents[pathname] && 
                        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                            <div className="mx-auto w-full min-w-0 max-w-2xl">
                                <div className="space-y-2">
                                    <div className="h-8 overflow-clip relative">
                                        <AnimatePresence mode="popLayout">
                                                {Object.entries(pageComponents).map((page)=>(
                                                    page[0]==pathname && <motion.h1 key={page[1].title} className="scroll-m-20 text-3xl font-bold tracking-tight">
                                                        {page[1].title.split('').map((letter, ind)=>(
                                                            <motion.span className="inline-block" key={ind} initial={{y:20, opacity: 0}} animate={{y:0, opacity: 1}} exit={{y:-20, opacity: 0}} transition={{delay: 0.02*ind}}>{letter}</motion.span>
                                                        ))}
                                                    </motion.h1>
                                                ))}
                                        </AnimatePresence>
                                    </div>
                                    <p className="text-base text-muted-foreground overflow-clip relative">
                                        <AnimatePresence mode="popLayout">
                                            {Object.entries(pageComponents).map((page)=>(
                                                page[0]==pathname && <motion.span initial={{y:20}} animate={{y:0, transition: {delay: 0}}} exit={{y:-20}} key={page[1].title} className="block">{page[1].description}</motion.span>
                                            ))}
                                        </AnimatePresence>
                                    </p>
                                </div>
                                <div className="pb-12 pt-8">{pageComponents[pathname].content}</div>
                            </div>
                        </main>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}