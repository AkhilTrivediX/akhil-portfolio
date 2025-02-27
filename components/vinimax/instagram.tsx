/* eslint-disable @next/next/no-img-element */
'use client'

import {  useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Button } from "@/components/ui/button";

export type InstaPostsType =  
{
    imageUrl: string,
    url?: string,
    videoUrl?: string,
    caption: string,
    likes?: number | string,
    comments?: number | string,
    dateTime?: string
}[]
type InstaData = {
    layoutId?:string,
    avatarUrl: string,
    username: string,
    name?: string,
    bio?: string,
    isVerified?: boolean,
    stats?: {name: string, value: string}[],
    followButton?: boolean | string,
    posts?: InstaPostsType,

    iconOnlyIdle?: boolean,
    avatarOnIdle?:boolean,
    usernameOnIdle?:boolean,
    monotone?: boolean
}
const CAPTION_WORD_LIMIT = 30

export default function ViInstagram({layoutId='Vinima',usernameOnIdle=true, ...props}: InstaData){
    const [componentState, setComponentState] = useState('idle')
    const MotionButton = motion.create(Button)
    const liveComponent = useRef(null);
    const [expandDirection, setExpandDirection] = useState<{[K in 'top' | 'left' | 'bottom' | 'right' | 'translate']?: string}>({top: '50%', left: '50%', translate: '50%'});

    const updateExpandDirection = () => {
        if(liveComponent.current){
            const target = liveComponent.current as HTMLElement
            const boundingBox = target.getBoundingClientRect()
            const positionX = (boundingBox.x+boundingBox.width/2) / window.innerWidth * 100;
            const positionY = (boundingBox.y+boundingBox.height/2) / window.innerHeight * 100;
            let direction: {[K in 'top' | 'left' | 'bottom' | 'right' | 'translate']?: string} = {};
            let translateX='0%'
            let translateY='0%'
            positionX<=20?(direction.left='0%'):positionX>80?(direction.right='0%'):(direction.left='50%', translateX='-50%');
            positionY<=20?(direction.top='0%'):positionY>80?(direction.bottom='0%'):(direction.top='50%', translateY='-50%')
            direction.translate = `${translateX} ${translateY}`
            setExpandDirection(direction)
        }
    }

    useEffect(() => {
        updateExpandDirection();

        window.addEventListener("resize", updateExpandDirection);
        window.addEventListener("scroll", updateExpandDirection);

        const observer = new MutationObserver(updateExpandDirection);
        if (liveComponent.current) {
            observer.observe(liveComponent.current, { attributes: true, childList: true, subtree: true });
        }

        return () => {
            window.removeEventListener("resize", updateExpandDirection);
            window.removeEventListener("scroll", updateExpandDirection);
            observer.disconnect();
        };
    }, []);

    return(
        <MotionConfig >
            <motion.main className="vinima relative flex justify-center"  onHoverStart={() => setComponentState('profile')} onHoverEnd={() => setComponentState('idle')}>

            <MotionButton variant='outline' className="gap-2 p-2 opacity-0 pointer-events-none">

                <motion.div className="inline-flex h-full aspect-square overflow-hidden items-center" style={{borderRadius: '4px'}}>{props.avatarOnIdle?<img src={props.avatarUrl} alt="Profile Insta"/>:<FaInstagram size={22}/>}</motion.div>

                {!props.iconOnlyIdle && <motion.span className="" initial={{opacity: 1}} exit={{opacity: 0}}>{usernameOnIdle?props.username:'Instagram'}</motion.span>}

            </MotionButton>
                
                <AnimatePresence initial={false}>
                {
                    componentState=='idle' && <MotionButton layoutId={layoutId+'component'} variant='outline' className="gap-2 p-2 absolute" style={{translate: '-50% -50%', top: '50%', left: '50%'}} ref={liveComponent}>

                    <motion.div layoutId={layoutId+'pfp'} className="inline-flex h-full aspect-square overflow-hidden items-center" style={{borderRadius: '4px'}}>{props.avatarOnIdle?<img src={props.avatarUrl} alt="Profile Insta"/>:<FaInstagram size={22}/>}</motion.div>

                    <AnimatePresence propagate>
                    {!props.iconOnlyIdle && <motion.span layoutId={layoutId+'username'} className="" initial={{opacity: 1}} animate={{opacity: 1}} exit={{opacity: 0}}>{usernameOnIdle?props.username:'Instagram'}</motion.span>}
                    </AnimatePresence>

                    </MotionButton>
                }
                
                {componentState=='profile' && <motion.div key='detailInstaView' layoutId={layoutId+'component'} className="flex flex-col absolute w-[470px] bg-background border border-input rounded-md p-2 gap-2 z-[99]" style={expandDirection}>

                        <div className="flex gap-4">

                            <motion.div layoutId={layoutId+'pfp'} className="w-[75px] aspect-square overflow-hidden" style={{borderRadius: '50px'}}>
                                <img src={props.avatarUrl} alt="Profile Insta"/>
                            </motion.div>

                            <div className="flex flex-col gap-1">
                                <div className="flex gap-4 items-center">
                                    <div className="flex gap-1 items-center">
                                        <motion.div layoutId={layoutId+'username'} className="text-sm w-[max-content]" style={{opacity: 0.8}}>{props.username}</motion.div>
                                        {props.isVerified && <motion.div initial={{scale: 0.5,rotateZ:180, opacity: 0, y: 10}} animate={{scale: 1,rotateZ: 0, opacity: 1, y: 0}} exit={{scale: 0.5, opacity: 0, y: 10, transition: {delay: 0}}} transition={{delay: 0.2}} style={props.monotone?{}:{color: '#0095f6'}}><MdVerified /></motion.div>}
                                    </div>
                                    {props.followButton && <MotionButton initial={{scale: 0.5, opacity: 0, y: 10}} animate={{scale: 1, opacity: 1, y: 0}} exit={{scale: 0.5, opacity: 0, y: 10, transition: {delay: 0}}} transition={{delay: 0.2}} size='sm' className={"h-6 px-2 py-1 text-xs "+(props.monotone?'':'text-white bg-[#0095f6] hover:bg-[#1877f2]')} onClick={()=>{window.open(typeof props.followButton=='string'?props.followButton:'https://www.instagram.com/'+props.username, '_blank')}}>Follow</MotionButton>}
                                </div>

                                {props.stats && <motion.div className="w-full flex justify-between gap-4 text-sm" exit={{y: 10, opacity: 0}} transition={{duration: 0.1}}>
                                        {
                                            props.stats.map((item, index) => (
                                                <motion.div key={index} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2+index*0.07, bounce: 0}} className="flex gap-1">
                                                    <StaggeredText className="font-semibold" delay={0.2+index*0.07}>{item.value}</StaggeredText>
                                                    <motion.span initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.7}}}>{item.name}</motion.span>
                                                </motion.div>
                                            ))
                                        }
                                </motion.div>}

                                {props.name && <motion.div exit={{y: 10, opacity: 0}} transition={{delay: 0}}>
                                    <StaggeredText className="text-sm font-semibold" delay={0.2} stagger={0.01}>{props.name}</StaggeredText>
                                </motion.div>}

                            </div>
                        </div>

                        {props.bio && <div>
                            <motion.div className="text-sm" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0, transition: {delay: 0.2}}} exit={{opacity: 0, y: 10}} transition={{bounce: 0}}>{props.bio}</motion.div>
                        </div>}

                        {props.posts && <div className="flex flex-wrap justify-start items-center w-[max-content] gap-4 max-w-[450px]">
                            {
                                props.posts.map((post, i)=>(
                                    <motion.div layoutId={layoutId+'postImage '+i} initial={{scale: 0.5, opacity: 0, y: 10}} animate={{scale: 1, opacity: 1, y: 0, transition: {delay: 0.3+i*0.05}}} exit={{scale: 0.5, opacity: 0, y: -10, transition: {delay: 0}}} key={i} className="w-[100px] aspect-[4/5] border border-input rounded-sm overflow-hidden cursor-pointer relative" onClick={()=>setComponentState('post '+i)}>
                                        <motion.img src={post.imageUrl} alt='instagram post' className="w-full h-full object-cover object-center"/>
                                        <div className="absolute w-full h-full top-0 left-0 bg-black/20 opacity-0 hover:opacity-100 transition-all duration-300 flex justify-center items-end p-2">
                                            <div className="flex gap-2 items-center justify-center text-xs opacity-90 text-white">
                                                {post.likes && <div className="flex gap-1 items-center"><FaHeart /><StaggeredText>{post.likes.toString()}</StaggeredText></div>}
                                                {post.comments && <div className="flex gap-1 items-center"><FaComment /><StaggeredText>{post.comments.toString()}</StaggeredText></div>}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </div>}

                    </motion.div>}
                    {
                        (props.posts||[]).map((post, i)=>componentState==('post '+i) ? <motion.div key='detailPostView' layoutId={layoutId+'component'} className="flex flex-col absolute bg-background border border-input rounded-md" style={expandDirection}>
                            <div className="flex p-2 gap-2 border-b border-input h-10 items-center text-sm relative">
                                <motion.div layoutId={layoutId+'pfp'} className="inline-flex h-full aspect-square overflow-hidden" style={{borderRadius: '50px'}}><img src={props.avatarUrl} alt="Profile Insta"/></motion.div>
    
                                <motion.span layoutId={layoutId+'username'} className="" style={{opacity: 1}}>{props.username}</motion.span>
    
                                <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity: 0, y: 10}}>
                                    {post.dateTime && <StaggeredText className="text-sm opacity-70" delay={0.2} stagger={0.01}>{getReadableDate(post.dateTime)}</StaggeredText>}
                                </motion.div>

                                <div className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-lg" onClick={()=>{setComponentState('profile')}}><BsX/></div>
                            </div>
    
                            <div className="p-1">
                                <motion.div className="w-[300px] aspect-[4/5] border border-input rounded-sm overflow-hidden" layoutId={layoutId+'postImage '+i} initial={{opacity:1, y: 10}} animate={{opacity:1, y:0}} exit={{scale: 0.5,opacity: 0, y: 10, transition: {delay:0, duration: 0.1}}}>
                                    <motion.img src={post.imageUrl} alt='instagram post' className="w-full h-full object-cover object-center"/>
                                </motion.div>
                                <div className="flex gap-3 text-sm p-2 pb-0 font-semibold opacity-80">
                                    {post.likes && <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0, transition: {delay: 0.2}}} exit={{opacity: 0, y: 10}} className="flex gap-1 items-center"><FaHeart style={props.monotone?{}:{color: '#ff3040'}}/><StaggeredText delay={0.3}>{post.likes.toString()}</StaggeredText></motion.div>}
    
                                    {post.comments && <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0, transition: {delay: 0.4}}} exit={{opacity: 0, y: 10}} className="flex gap-1 items-center"><FaComment /><StaggeredText delay={0.5}>{post.comments.toString()}</StaggeredText></motion.div>}
    
                                    {post.url && <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0, transition: {delay: 0.6}}} exit={{opacity: 0, y: 10}} className="flex gap-1 items-center" onClick={()=>{window.open(post.url, '_blank')}}><FaArrowUpRightFromSquare /></motion.div>}
                                </div>
    
                                <div className="inline-flex text-xs px-2 gap-0.5 flex-wrap">{parseCaption(post.caption).map((part, index)=>(<StaggeredWords className="inline-flex" key={index} delay={0.5+index*0.02} style={{opacity: part.type=='hashtag'?0.6:1}}>{part.text}</StaggeredWords>))}</div>
                            </div>
                        </motion.div>:null)
                    }
                </AnimatePresence>
            </motion.main>
        </MotionConfig>
    )
}

function StaggeredText({children, className, style, delay=0, stagger=0.05}: {children: string, className?:string, style?:React.CSSProperties, delay?: number, stagger?: number}){
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
    const result:{type: string, text: string}[] = []
    while(x!=CAPTION_WORD_LIMIT && i<caption.length && caption.indexOf(' ', i)!=-1){
        const word = caption.substring(i, caption.indexOf(' ', i));
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

const BsX = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
        />
    </svg>)

const FaHeart = ({style}:{style?:React.CSSProperties}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width={'1em'}
        height={'1em'}      
        stroke="currentColor"
        viewBox="0 0 512 512"
        style={style}
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
        />
    </svg>
)

const FaComment = ({style}:{style?:React.CSSProperties}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width={'1em'}
        height={'1em'}      
        stroke="currentColor"
        viewBox="0 0 512 512"
        style={style}
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
        />
    </svg>
)

const FaInstagram = ({style, size}:{style?:React.CSSProperties, size?:number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width={size || '1em'}
        height={size || '1em'}      
        stroke="currentColor"
        viewBox="0 0 512 512"
        style={style}
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
        />
    </svg>
)

const FaArrowUpRightFromSquare = ({style, size}:{style?:React.CSSProperties, size?:number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width={size || '1em'}
        height={size || '1em'}      
        stroke="currentColor"
        viewBox="0 0 512 512"
        style={style}
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
        />
    </svg>
)

const MdVerified = ({style, size}:{style?:React.CSSProperties, size?:number}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width={size || '1em'}
        height={size || '1em'}   
        viewBox="0 -960 960 960"
        style={style}
    >
        <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"/>
    </svg>
)

    