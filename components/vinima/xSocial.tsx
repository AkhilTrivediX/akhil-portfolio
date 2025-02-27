/* eslint-disable @next/next/no-img-element */
'use client'

import { CSSProperties, useRef, useState } from "react";
import { BsInstagram, BsX } from "react-icons/bs";
import { AnimatePresence, delay, motion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";
import { FaHeart, FaComment, FaInstagram, FaRegComment, FaRegHeart, FaPlay } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GrLocation, GrCalendar } from "react-icons/gr";
import { MdVerified, MdOutlineLink, MdBarChart } from "react-icons/md";
import { BiRepost } from "react-icons/bi";

type XData = {
    layoutId?:string,
    avatarUrl: string,
    bannerUrl?: string,
    username: string,
    name?: string,
    profileUrl?: string,
    bio?: string,
    badge?: boolean | 'default' | 'business' | 'government' | 'white'
    stats?: {name: string, value: string}[],
    feed?: {[K in 'Posts' | 'Replies' | 'Highlights' | 'Media']?: {
        text: string,
        dateTime?: string,
        url?:string,
        media?: {url: string, type: 'image' | 'video'}[],
        likes?: number | string,
        replies?: number | string,
        reposts?: number | string,
        views?: number | string
    }[]}

    iconOnlyButton?: boolean,
    avatarOnButton?:boolean,
    usernameOnButton?:boolean,
}
const CAPTION_WORD_LIMIT = 30

export default function XSocial({layoutId='Vinima',usernameOnButton=true, ...props}: XData){
    const [componentState, setComponentState] = useState('profile')
    const MotionButton = motion.create(Button)
    const [feedTab, setFeedTab] = useState(0);
    

    return(
        <MotionConfig >
            <motion.main className="relative flex justify-center"  onHoverStart={() => setComponentState('profile')} onHoverEnd={() => setComponentState('idle')}>
                
                <AnimatePresence initial={false}>
                {
                    componentState=='idle' && <MotionButton layoutId={layoutId+'component'} variant='outline' className="gap-2 p-2">

                    <motion.div layoutId={layoutId+'pfp'} className="inline-flex h-full aspect-square overflow-hidden" style={{borderRadius: '4px'}}>{props.avatarOnButton?<img src={props.avatarUrl} alt="Profile Insta"/>:<FaInstagram size={22}/>}</motion.div>

                    {!props.iconOnlyButton && <motion.span layoutId={layoutId+'username'} className="" initial={{opacity: 1}} exit={{opacity: 0}}>{usernameOnButton?props.username:'Instagram'}</motion.span>}

                    </MotionButton>
                }
                
                {componentState=='profile' && <motion.div key='detailInstaView' layoutId={layoutId+'component'} className="flex flex-col absolute top-0 w-[400px] bg-background border border-input rounded-md p-2 gap-2 z-[99]">
                        <div className="flex flex-col gap-2 items-end relative">
                            <motion.div className="w-full aspect-[3/1]" initial={{opacity:0, scale: 0.5, y: 10}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: 0.5, y: 10}}>
                                {props.bannerUrl?<img src={props.bannerUrl} alt="X Banner" className="w-full h-full object-cover"/>:<div className="bg-foreground/10 w-full h-full"/>}
                            </motion.div>
                            <div className="flex mr-4">
                                {props.profileUrl && <MotionButton animate={{scale: 1, opacity: 1, y: 0}} exit={{scale: 0.5, opacity: 0, y: 10, transition: {delay: 0}}} transition={{delay: 0.2}} size='sm' className={"text-xs rounded-full font-bold px-4 py-2"} onClick={()=>{window.open(props.profileUrl, '_blank')}}>Follow</MotionButton>}
                            </div>

                            

                            <motion.div layoutId={layoutId+'pfp'} className="h-[50%] aspect-square overflow-hidden absolute left-2 bottom-0 p-1 bg-background" style={{borderRadius: '100px'}}>
                                <img src={props.avatarUrl} alt="X PFP" className="w-full h-full rounded-full"/>
                            </motion.div>
                        </div>

                        <div className="px-2 flex flex-col">
                            <div className="flex gap-1 items-center">
                                            {props.name && <motion.div exit={{y: 10, opacity: 0}} transition={{delay: 0}}>
                                                <StaggeredText className="text-base font-semibold" delay={0.2} stagger={0.01}>{props.name}</StaggeredText>
                                            </motion.div>}
                                            {props.badge && <motion.div initial={{scale: 0.5,rotateZ:180, opacity: 0, y: 10}} animate={{scale: 1,rotateZ: 0, opacity: 1, y: 0}} exit={{scale: 0.5, opacity: 0, y: 10, transition: {delay: 0}}} transition={{delay: 0.3}} className={props.badge=='white'?'text-foreground':props.badge=='business'?'text-[#e2b719]':(props.badge=='government'?'text-[#839aac]':'text-[#0095f6]')}><MdVerified /></motion.div>}
                            </div>
                            <motion.div layoutId={layoutId+'username'} className="text-sm w-[max-content]" style={{opacity: 0.4}}>@{props.username}</motion.div>

                            {props.bio && <div>
                                <motion.div className="text-sm my-1" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0, transition: {delay: 0.2}}} exit={{opacity: 0, y: 10}} transition={{bounce: 0}}><StaggeredText stagger={0.01} delay={0.2}>{props.bio}</StaggeredText></motion.div>
                            </div>}

                            <motion.div className="flex flex-wrap gap-x-4 mb-2 text-sm">
                                <motion.div initial={{opacity:0, y: 10}} animate={{opacity: 1, y: 0, transition: {delay: 0.2}}} exit={{opacity: 1, y: 10}} className="flex gap-1 items-center opacity-50"><GrLocation/><span>India</span></motion.div>
                                <motion.div initial={{opacity:0, y: 10}} animate={{opacity: 1, y: 0, transition: {delay: 0.3}}} exit={{opacity: 1, y: 10}} className="flex gap-1 items-center opacity-50"><GrCalendar/><span>Joined March 2009</span></motion.div>
                                <motion.div initial={{opacity:0, y: 10}} animate={{opacity: 1, y: 0, transition: {delay: 0.4}}} exit={{opacity: 1, y: 10}} className="flex gap-1 items-center"><MdOutlineLink className="-rotate-45 text-lg opacity-50"/><span className="text-[#1d9bf0] hover:underline cursor-pointer">developer.microsoft.com/microsoft-365</span></motion.div>
                            </motion.div>

                            {props.stats && <motion.div className="w-full flex gap-4 text-xs" exit={{y: 10, opacity: 0}} transition={{duration: 0.1}}>
                                                                    {
                                                                        props.stats.map((item, index) => (
                                                                            <motion.div key={index} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2+index*0.07, bounce: 0}} className="flex gap-1">
                                                                                <StaggeredText className="font-semibold" delay={0.2+index*0.07}>{item.value}</StaggeredText>
                                                                                <motion.span initial={{opacity: 0}} animate={{opacity: 0.5, transition: {duration: 0.7}}}>{item.name}</motion.span>
                                                                            </motion.div>
                                                                        ))
                                                                    }
                            </motion.div>}
                        </div>

                        <div className="flex -mx-2">
                                {Object.keys(props.feed || {}).map((key, index)=>(
                                    <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1, transition: {delay: 0.4+index*0.07}}} exit={{y: 10, opacity: 0, transition: {delay: 0}}} key={key} className="flex w-full border-b border-input justify-center items-center mt-2 font-light text-sm">
                                        <div className={"p-4 relative cursor-pointer "+(index==feedTab?'font-bold':'opacity-40')} onClick={()=>setFeedTab(index)}>
                                            {key}
                                            {index==feedTab && <motion.div layoutId={layoutId+'indicator'} className="absolute bottom-0 left-0 w-full h-1 bg-[#1d9bf0] rounded-full"/>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        {props.feed && Object.keys(props.feed || {}).map((feedName, index)=>(
                            <div className="flex flex-col -mx-2 max-h-[400px] overflow-y-scroll" key={'FeedFor'+feedName}>
                                {props.feed && (props.feed[feedName as keyof typeof props.feed] || []).map((post, index) => (
                                    <motion.div className={"flex p-2 gap-1 "+(index<(props.feed &&props.feed[feedName as keyof typeof props.feed] || []).length-1?'border-b border-input':'border-b-0 pb-0')} key={'Post'+index}  initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1, transition: {delay: 0.2+0.05*index}}} exit={{y: 10, opacity: 0}}>
                                    <motion.div className="h-[40px] aspect-square overflow-hidden p-1 bg-background" style={{borderRadius: '40px'}}>
                                            <img src={props.avatarUrl} alt="X PFP" className="w-full h-full rounded-full"/>
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <div className="flex gap-1 items-center text-xs ">
                                            {props.name && <motion.div exit={{y: 10, opacity: 0}} transition={{delay: 0}}>
                                                            <StaggeredText className="font-semibold" delay={0.2} stagger={0.01}>{props.name}</StaggeredText>
                                                        </motion.div>}
                                            {props.badge && <motion.div initial={{scale: 0.5,rotateZ:180, opacity: 0, y: 10}} animate={{scale: 1,rotateZ: 0, opacity: 1, y: 0}} exit={{scale: 0.5, opacity: 0, y: 10, transition: {delay: 0}}} transition={{delay: 0.3}} className={props.badge=='white'?'text-foreground':props.badge=='business'?'text-[#e2b719]':(props.badge=='government'?'text-[#839aac]':'text-[#0095f6]')}><MdVerified /></motion.div>}
                                            <StaggeredText className="opacity-50 font-light" delay={0.4} stagger={0.01}>{'@'+props.username+(post.dateTime?(' · '+getReadableDate(post.dateTime)):'')}</StaggeredText>
                                        </div>
                                        <StaggeredText className="text-sm mt-1" delay={0.4} stagger={0.01}>{post.text}</StaggeredText>
                                        {post.media && <div className="w-[300px] rounded-lg overflow-hidden mt-1 grid grid-cols-2 grid-rows-2 gap-1">
                                            {post.media.map((mediaItem, imgi) => (
                                                <div className={"w-full h-full relative "+mediaGrid((post.media || []).length, imgi)} key={'Media'+imgi} onClick={(e)=>{(e.currentTarget as HTMLElement).classList.toggle('playingVideo')}}>
                                                    {mediaItem.type=='image'?<img src={mediaItem.url} alt="X Post" className="w-full h-full object-cover" key={imgi}/>:<video loop src={mediaItem.url} className="w-full h-full object-cover cursor-pointer" key={imgi} onClick={(e)=>{const target=e.target as HTMLVideoElement;target.paused?target.play():target.pause()}}/>}
                                                    {mediaItem.type=='video' && <div className="absolute top-0 left-0 flex items-center justify-center pointer-events-none text-white playButton w-full h-full"><div className="bg-black/10 w-full h-full absolute top-0 left-0"/><FaPlay/></div>}
                                                </div>
                                            ))}
                                        </div>}
                                        <div className="flex items-center justify-between text-sm p-2">
                                            {post.likes && <div className="flex gap-1 items-center opacity-50 hover:opacity-80"><FaRegHeart/><span>{post.likes}</span></div>}
                                            {post.replies && <div className="flex gap-1 items-center opacity-50 hover:opacity-80"><FaRegComment/><span>{post.replies}</span></div>}
                                            {post.reposts && <div className="flex gap-1 items-center opacity-50 hover:opacity-80"><BiRepost size={20}/><span>{post.reposts}</span></div>}
                                            {post.views && <div className="flex gap-1 items-center opacity-50 hover:opacity-80"><MdBarChart/><span>{post.views}</span></div>}
                                        </div>
                                    </div>
                                </motion.div>
                                ))}
                        </div>
                        ))}

                    </motion.div>}
                </AnimatePresence>
            </motion.main>
        </MotionConfig>
    )
}

const mediaGrid = (childrenCount:number, childNumber:number)=>{
    switch(childrenCount){
        case 1:
            return 'col-span-2 row-span-2';
        case 2:
            return 'col-span-1 row-span-2';
        case 3:
            return (childNumber==0?'col-span-1 row-span-2':'col-span-1 row-span-1');
        case 4:
            return 'col-span-1 row-span-1';
    }
}


function StaggeredText({children, className, style, delay=0, stagger=0.05}: {children: string, className?:string, style?:React.CSSProperties, delay?: number, stagger?: number}){
    console.log(children.split(''))
    return(
        <div className={className+' text-nowrap'} style={style}>
                {children.split('').map((char, index) => char!=' '?<motion.span className='inline-block' key={index} initial={{y: 5, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -5, opacity: 0, transition: {delay: 0}}} transition={{duration: 0.1, delay: delay+index * stagger}}>{char}</motion.span>:<span key={index}>&nbsp;</span>)}
        </div>
    )
}

function StaggeredWords({children, className, style, delay=0, stagger=0.05}: {children: string, className?:string, style?:React.CSSProperties, delay?: number, stagger?: number}){
    return(
        <div className={className+' text-nowrap'} style={style}>
                {children.split(' ').map((word, index) => <motion.span className='inline-block' key={index} initial={{y: 5, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -5, opacity: 0}} transition={{duration: 0.1, delay: delay+index * stagger}}>{word} </motion.span>)}
        </div>
    )
}

function StaggeredNumbers({children, className, style}: {children: string, className?:string, style?:React.CSSProperties}){
    return(
        <div className={className+" tabular-nums overflow-hidden"} style={style}>
            {children.split('').map((digit, index)=>digit!=','?<motion.span className='inline-block' key={index} initial={{y: index%2==0?30:-30, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.2, delay: 0.3, ease: 'easeOut'}}>{digit}</motion.span>:<span key={index}>,</span>)}
        </div>
    )
}

const getReadableDate = (dateString:string)=>{
    const date = new Date(dateString);

    const readableDate = date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return readableDate
}
function parseCaption(caption:string) {
    let i=0, x=0;
    let result:{type: string, text: string}[] = []
    while(x!=CAPTION_WORD_LIMIT && i<caption.length && caption.indexOf(' ', i)!=-1){
        let word = caption.substring(i, caption.indexOf(' ', i));
        i = caption.indexOf(' ', i)+1;

        if(word.includes('#'))
            result.push({type: 'hashtag', text: word})
        else
            result.push({type: 'text', text: word})

        x++;
    }

    if(x>=CAPTION_WORD_LIMIT)
        result.push({type: 'text', text: '...'})

    return result
}
