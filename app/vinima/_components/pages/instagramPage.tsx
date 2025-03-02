import { Button } from "@/components/ui/button";
import ViInstagram, {InstaPostsType} from "@/components/vinimax/instagram"; 
import ComponentPreview from "../componentPreview";
import { act, useCallback, useEffect, useMemo, useState } from "react";
import { FaCheck} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaC } from "react-icons/fa6";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import InstallationGuide from "../installationGuide";



export default function InstagramPage(){

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const samplePosts:InstaPostsType = [
        {
            imageUrl:BASE_URL+'/cat1.jpg',
            caption: 'Paws off, this is my snack! 😼🍭 #CatMood #TooCute #FurryFriend',
            likes: '5,678',
            comments: '312',
            dateTime: '2025-02-25T21:05:45.000Z'
        },
        {
            imageUrl: BASE_URL+'/cat2.jpg',
            caption: 'Too cute to handle! 😻🎀 #FluffyQueen #Meowdel #Purrfection',
            likes: '6,234',
            comments: '289',
            dateTime: '2024-07-25T18:30:25.000Z'
        },
        {
            imageUrl: BASE_URL + '/cat3.jpg',
            caption: 'Just hanging upside down 🐾😸 #ChillVibes #LazyCat #Adorable',
            likes: '7,845',
            comments: '356',
            dateTime: '2024-06-16T15:45:10.000Z'
        },
        {
            imageUrl: BASE_URL + '/cat4.jpg',
            caption: 'Double the fluff, double the cuteness! 🐱🐱💕 #TwinTrouble #FluffyBabies #CutenessOverload',
            likes: '8,912',
            comments: '421',
            dateTime: '2024-01-19T12:20:35.000Z',
        }
    ]
    
    const defaultControls = {
        username: 'cats_of_instagram',
        avatarUrl: 'https://moderncat.com/wp-content/uploads/2013/09/Ragdoll-Header_bigstock-408978611_Rawlik-1440x980.jpg',
        name: 'Ragdoll',
        stats: [{name: 'Followers', value: '2.9K'},{name:'Following', value: '845'}],
        bio: 'I\'m the best cat 😺',
        isVerified: true,
        monotone: false,
        followButton: true,
    }

    const [controlAvatarUrl, setControlAvatarUrl] = useState(defaultControls.avatarUrl);
    const [controlShowAvatarOnIdleToggle, setControlShowAvatarOnIdleToggle] = useState(true);
    const [controlUsername, setControlUsername] = useState(defaultControls.username);
    const [controlShowUsernameOnIdleToggle, setControlShowUsernameOnIdleToggle] = useState(true);
    const [controlIconOnlyToggle, setControlIconOnlyToggle] = useState(false);
    const [controlName, setControlName] = useState(defaultControls.name);
    const [controlNameActive, setControlNameActive] = useState(true);
    const [controlStats, setControlStats] = useState(defaultControls.stats);
    const [controlStatsActive, setControlStatsActive] = useState(true);
    const [controlBio, setControlBio] = useState(defaultControls.bio);
    const [controlBioActive, setControlBioActive] = useState(true);
    const [controlIsVerified, setControlIsVerified] = useState(defaultControls.isVerified);
    const [controlFollowButton, setControlFollowButton] = useState(defaultControls.followButton);
    const [controlMonotone, setControlMonotone] = useState(defaultControls.monotone);
    const [controlSamplePostsToggle, setControlSamplePostsToggle] = useState(true);

    
    const codeFn = useMemo(() => {
        return (`import ViInstagram${controlSamplePostsToggle?', { InstaPostsType } ':''} from "@/components/vinima/instagram"

export function InstagramDemo() {

    ${controlAvatarUrl.length>50?`const avatarUrl = '${controlAvatarUrl}'`:''}
    ${controlStatsActive && controlStats.length>0?`const stats = [${controlStats.map(e=>`{ name: '${e.name}', value: '${e.value}'}`)}]`:''}
    ${controlSamplePostsToggle?`const BASE_URL = 'akhiltrivedi.me'
        const postData:InstaPostsType = [
        {
            imageUrl:BASE_URL+'/cat1.jpg',
            caption: 'Paws off, this is my snack! 😼🍭 #CatMood #TooCute #FurryFriend',
            likes: '5,678',
            comments: '312',
            dateTime: '2025-02-25T21:05:45.000Z'
        },
        {
            imageUrl: BASE_URL+'/cat2.jpg',
            caption: 'Too cute to handle! 😻🎀 #FluffyQueen #Meowdel #Purrfection',
            likes: '6,234',
            comments: '289',
            dateTime: '2024-07-25T18:30:25.000Z'
        },
        {
            imageUrl: BASE_URL + '/cat3.jpg',
            caption: 'Just hanging upside down 🐾😸 #ChillVibes #LazyCat #Adorable',
            likes: '7,845',
            comments: '356',
            dateTime: '2024-06-16T15:45:10.000Z'
        },
        {
            imageUrl: BASE_URL + '/cat4.jpg',
            caption: 'Double the fluff, double the cuteness! 🐱🐱💕 #TwinTrouble #FluffyBabies #CutenessOverload',
            likes: '8,912',
            comments: '421',
            dateTime: '2024-01-19T12:20:35.000Z',
        }
    ]`:''}
    return(
        <ViInstagram 
            avatarUrl=${controlAvatarUrl.length<=50?`'${controlAvatarUrl}'`:'{avatarUrl}'}
            username='${controlUsername}'${controlNameActive && controlName?(`\n\t\t\tname='${controlName}'`):''}${controlStatsActive?controlStats.length>0 &&`\n\t\t\tstats={stats}`:''}${controlBioActive && controlBio?`\n\t\t\tbio="${controlBio}"`:''}${controlSamplePostsToggle?'\n\t\t\tposts={postData}':''}\n\t\t   ${controlShowAvatarOnIdleToggle?' avatarOnIdle':''}${controlShowUsernameOnIdleToggle?' usernameOnIdle':''}${controlIconOnlyToggle?' iconOnlyIdle':''}${controlIsVerified?' isVerified':''}${controlMonotone?' monotone':''}${controlFollowButton?' followButton':''} />
    )
}
`)
    }, [controlAvatarUrl, controlBio, controlBioActive, controlFollowButton, controlIconOnlyToggle,
        controlIsVerified, controlMonotone, controlName, controlNameActive, controlSamplePostsToggle,
        controlShowAvatarOnIdleToggle, controlShowUsernameOnIdleToggle, controlStats,
        controlStatsActive, controlUsername
    ])

    return (
        <TooltipProvider>
            <main>
                <ComponentPreview code={codeFn} previewComponent={<ViInstagram avatarUrl={controlAvatarUrl} username={controlUsername} avatarOnIdle={controlShowAvatarOnIdleToggle} usernameOnIdle={controlShowUsernameOnIdleToggle} iconOnlyIdle={controlIconOnlyToggle} name={controlNameActive?controlName:undefined} bio={controlBioActive?controlBio:undefined} isVerified={controlIsVerified} monotone={controlMonotone} stats={controlStatsActive?controlStats:undefined} followButton={controlFollowButton} posts={controlSamplePostsToggle?samplePosts:undefined} fetchLatest={[]}/>} controlsComponent={
                <div className="flex flex-col gap-1 p-2 w-full h-full">
                    <div className="flex gap-2">
                        <TextControl name="Avatar Url" size="300px" currentValue={controlAvatarUrl} onChange={(val) => setControlAvatarUrl(val)} description="Url of the profile picture"/>
                        <ToggleControl name="Avatar on Idle" value={controlShowAvatarOnIdleToggle} onChange={(val) => setControlShowAvatarOnIdleToggle(val)} description="Show Avatar on default preview. If false, instagram logo will be shown."/>
                    </div>
                    <div className="flex gap-2">
                        <TextControl name="Username" currentValue={controlUsername} onChange={(val) => setControlUsername(val)} description="Instagram Username to display" size="200px"/>
                        <ToggleControl name="Username on Idle" value={controlShowUsernameOnIdleToggle} onChange={(val) => setControlShowUsernameOnIdleToggle(val)} description="Show username on default preview. If false, social name will be shown."/>
                        <ToggleControl name="Icon Only on Idle" value={controlIconOnlyToggle} onChange={(val) => setControlIconOnlyToggle(val)} description="To show only icon on default view."/>
                    </div>
                    <TextControl name="Name" currentValue={controlName} onChange={(val) => setControlName(val)} description="Display name for the instagram account" size="200px" active={controlNameActive} setActive={(val) => setControlNameActive(val)}/>
                    <PairControl name="Stats" currentValue={controlStats} onChange={(val)=>setControlStats(val)} description="Display stats for the instagram account like followers, followings, etc." active={controlStatsActive} setActive={(val) => setControlStatsActive(val)}/>
                    <TextAreaControl name="Bio" value={controlBio} currentValue={defaultControls.bio} onChange={(val) => setControlBio(val)} description="Biography section for profile" size="400px" active={controlBioActive} setActive={(val) => setControlBioActive(val)}/>
                    <div className="flex gap-2">
                        <ToggleControl name="Verified" value={controlIsVerified} onChange={(val) => setControlIsVerified(val)} description="To show verified badge."/>
                        <ToggleControl name="Follow Button" value={controlFollowButton} onChange={(val) => setControlFollowButton(val)} description="To show follow button on profile preview."/>
                        <ToggleControl name="Monotone" value={controlMonotone} onChange={(val) => setControlMonotone(val)} description="To remove instagram brand colors from buttons and badges."/>
                        <ToggleControl name="Show Sample Posts" value={controlSamplePostsToggle} onChange={(val) => setControlSamplePostsToggle(val)} description="To demonstrate how posts look with the components."/>
                    </div>
                </div>}/>
                <InstallationGuide/>
            </main>
        </TooltipProvider>
        
    )
}

function TextControl({name, currentValue, onChange, description, active=true, setActive, size='50%'}:{name: string, currentValue: string, onChange: (val: string) => void, description: string, size?:string, active?:boolean, setActive?: (val: boolean) => void}){

    const [value, setValue] = useState(currentValue);

    useEffect(()=>{
        onChange(value);
    },[ onChange, value])

    return(
        <div className={"flex items-center gap-2 "+(active?"text-foreground":"text-muted-foreground")}>
            {!setActive?<div className="min-w-[20px] min-h-[20px] flex items-center justify-center bg-input/50 text-white/20 border border-input rounded-sm"><FaCheck size={10}/></div>:<div className={"min-w-[20px] min-h-[20px] flex items-center justify-center border border-input rounded-sm "+(active?"bg-foreground text-background":"bg-input")} onClick={()=>setActive(!active)}>{active && <FaCheck size={10}/>}</div>}
            <Tooltip>
                <TooltipTrigger><label className={"text-sm font-medium leading-none text-nowrap"}>{name}</label></TooltipTrigger>
                <TooltipContent className="opacity-80 font-light">{description}</TooltipContent>
            </Tooltip>
            <input className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" disabled={!active} style={{width: size}} type="text" name={name} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
        </div>
    )
}

function TextAreaControl({name, currentValue, onChange, description, active=true, setActive, size='50%'}:{name: string, value: string, currentValue: string, onChange: (val: string) => void, description: string,  active?:boolean, setActive?: (val: boolean) => void, size?:string}){

    const [value, setValue] = useState(currentValue);


    useEffect(()=>{
        onChange(value);
    },[value, onChange])

    return(
        <div className={"flex items-center gap-2 "+(active?"text-foreground":"text-muted-foreground")}>
            {!setActive?<div className="min-w-[20px] min-h-[20px] flex items-center justify-center bg-input/50 text-white/20 border border-input rounded-sm"><FaCheck size={10}/></div>:<div className={"min-w-[20px] min-h-[20px] flex items-center justify-center border border-input rounded-sm "+(active?"bg-foreground text-background":"bg-input")} onClick={()=>setActive(!active)}>{active && <FaCheck size={10}/>}</div>}
            <Tooltip>
                <TooltipTrigger><label className={"text-sm font-medium leading-none text-nowrap"}>{name}</label></TooltipTrigger>
                <TooltipContent className="opacity-80 font-light">{description}</TooltipContent>
            </Tooltip>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none" disabled={!active} style={{width: size}} name={name} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
        </div>
    )
}

function ToggleControl({name,value, onChange, description}:{name: string, value: boolean, onChange: (val: boolean) => void, description: string}){
    return(
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger>
                    <Button variant={'outline'} onClick={()=>onChange(!value)} className={value?"text-foreground bg-foreground/10 border-foreground/10":"text-muted-foreground"}>{name}</Button>
                </TooltipTrigger>
                <TooltipContent className="opacity-80 font-light">{description}</TooltipContent>
            </Tooltip>
        </div>
    )
}

function PairControl({name, currentValue, onChange, description, active, setActive}:{name: string, currentValue:{name:string, value:string}[], onChange: (val:{name:string, value:string}[]) => void, description: string, active?:boolean, setActive?: (val: boolean) => void}){
    const [value, setValue] = useState<{name:string, value:string}[]>(currentValue);


    useEffect(()=>{onChange(value);},[ onChange, value])

    return(
        <div className={"flex items-center gap-2 "+(active?"text-foreground":"text-muted-foreground")}>
            {!setActive?<div className="min-w-[20px] min-h-[20px] flex items-center justify-center bg-input/50 text-white/20 border border-input rounded-sm"><FaCheck size={10}/></div>:<div className={"min-w-[20px] min-h-[20px] flex items-center justify-center border border-input rounded-sm "+(active?"bg-foreground text-background":"bg-input")} onClick={()=>setActive(!active)}>{active && <FaCheck size={10}/>}</div>}
            <Tooltip>
                <TooltipTrigger><label className={"text-sm font-medium leading-none text-nowrap"}>{name}</label></TooltipTrigger>
                <TooltipContent className="opacity-80 font-light">{description}</TooltipContent>
            </Tooltip>
            <div className="flex gap-2 items-center flex-wrap">
                {value.map((pair, ind)=>
                    <div className="flex" key={ind}>
                        <input className="flex h-10 rounded-l-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" style={{width: '100px'}} disabled={!active} type="text" onChange={(e)=>{setValue(prev=>[...prev.slice(0, ind), {name: e.target.value, value: pair.value, ...prev.slice(ind+1)}])}} value={pair.name}/>
                        <input className="flex h-10 rounded-r-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-foreground/5 " style={{width: '75px'}}  disabled={!active} type="text" onChange={(e)=>{setValue(prev=>[...prev.slice(0, ind), {name: pair.name, value: e.target.value}, ...prev.slice(ind+1)])}} value={pair.value}/>
                    </div>
                )}
            <Button variant={'outline'} size={'icon'} onClick={()=>{setValue(prev=>[...prev, {name: '', value: ''}])}}><FiPlus/></Button>
            </div>
        </div>
    )
}