import { link } from "fs"
import Image from "next/image"
import { BsGpuCard } from "react-icons/bs"
import { FaCode, FaCss3, FaGithub, FaGlobe, FaHtml5, FaJava, FaNodeJs, FaPython, FaReact } from "react-icons/fa"
import { FaC } from "react-icons/fa6"
import { IoBuild } from "react-icons/io5"
import { RiNextjsFill } from "react-icons/ri"
import { SiClerk, SiCloudinary, SiFirebase, SiGooglegemini, SiJavascript, SiMysql, SiOpenai, SiPrisma, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si"

export const skills = [
    {name: 'HTML', icon:<FaHtml5/>, link:'https://developer.mozilla.org/en-US/docs/Glossary/HTML5', color:'#f16524'},
    {name: 'CSS', icon:<FaCss3/>, link:'developer.mozilla.org/en-us/docs/web/css', color:'#2862e9'},
    {name: 'JavaScript', icon:<SiJavascript/>, link:'https://developer.mozilla.org/en-US/docs/Web/JavaScript', color:'#efd81d'},
    {name: 'TypeScript', icon:<SiTypescript/>, link:'https://www.typescriptlang.org/', color:'#377cc8'},
    {name: 'React', icon:<FaReact/>, link:'https://react.dev/', color:'#66dbfb'},
    {name: 'NextJS', icon:<RiNextjsFill/>, link:'https://nextjs.org/', color:''},
    {name: 'Vercel', icon: <SiVercel/>, link:'https://vercel.com', color:''},
    {name: 'TailwindCSS', icon:<SiTailwindcss/>, link:'https://tailwindcss.com/', color:'#1dc0cd'},
    {name: 'Firebase', icon: <SiFirebase/>, link:'https://firebase.google.com/', color:'#ffcd34'},
    {name: 'Prisma', icon:<SiPrisma/>, link:'https://www.prisma.io/', color:'#04c8bb'},
    {name: 'MySQL', icon:<SiMysql/>, link:'https://www.mysql.com/', color:'#08668e'},
    {name: 'Clerk', icon:<SiClerk/>, link:'https://clerk.com/', color:'#654bf6'},
    {name: 'Cloudinary', icon: <SiCloudinary/>, link: 'https://cloudinary.com/', color:'#3d54e0'},
    {name: 'NodeJS', icon: <FaNodeJs/>, link:'https://nodejs.org/en', color:'#86cf31'},
    {name: 'GitHub', icon:<FaGithub/>, link:'https://github.com/', color:''},
    {name: 'DiscordJS', icon: <Image src='/DJSIcon.svg' alt='logo' width={20} height={20}/>, link:'https://discord.js.org/', color:'#5d6af2'},
    {name: 'Java', icon:<FaJava/>, link:'https://www.java.com/en/', color:'#e67309'},
    {name: 'Python', icon:<FaPython/>, link:'https://www.python.org/', color:'#3c77a8'},
    {name: 'C', icon:<FaC/>, link:'https://www.geeksforgeeks.org/c-language-introduction/', color:'#6a9dd3'},
]

export const skillColors: {[key: string]: string} = {
    'HTML': '#f16524',
    'CSS' : '#2862e9',
    'JavaScript' : '#efd81d',
    'TypeScript' : '#377cc8',
    'React' : '#66dbfb',
    'NextJS' : '#ffffff',
    'Vercel' : '#ffffff',
    'TailwindCSS' : '#1dc0cd',
    'Firebase' : '#ffcd34',
    'Prisma' : '#04c8bb',
    'MySQL' : '#08668e',
    'NodeJS' : '#86cf31',
    'GitHub' : '',
    'DiscordJS' : '#5d6af2',
    'Java' : '#e67309',
    'C' : '#6a9dd3',
    'Python' : '#3c77a8',
    'Clerk' : '#654bf6',
    'Cloudinary' : '#3d54e0',
    'GPT Turbo 3.5': '#16ac86',
    'Gemini': '#3799dd',
    'Groq': '#f5553b'
}

export const skillIcons: {[key: string]: JSX.Element} = {
    'HTML': <FaHtml5/>,
    'CSS' : <FaCss3/>,
    'JavaScript' : <SiJavascript/>,
    'TypeScript' : <SiTypescript/>,
    'React' : <FaReact/>,
    'NextJS' : <RiNextjsFill/>,
    'Vercel' : <SiVercel/>,
    'TailwindCSS' : <SiTailwindcss/>,
    'Firebase' : <SiFirebase/>,
    'Prisma' : <SiPrisma/>,
    'MySQL' : <SiMysql/>,
    'NodeJS' : <FaNodeJs/>,
    'GitHub' : <FaGithub/>,
    'DiscordJS' : <Image src='/DJSIcon.svg' alt='logo' width={20} height={20}/>,
    'Java' : <FaJava/>,
    'C' : <FaC/>,
    'Python' : <FaPython/>,
    'Clerk' : <SiClerk/>,
    'Cloudinary': <SiCloudinary/>,
    'GPT Turbo 3.5': <SiOpenai/>,
    'Gemini' : <SiGooglegemini/>,
    'Groq': <BsGpuCard/>
}


export const projectsInfo = [
    {
        name: 'KRIDATS',
        description: 'Gamified profile web-app to give competetive experience to users.',
        techStack: ['TypeScript', 'NextJS', 'TailwindCSS', 'Prisma', 'MySQL', 'Clerk', 'Cloudinary'],
        color: '#a8eb30',
        actionButtons: [{
            name: 'Under Development',
            icon: <IoBuild/>,
            link: null
        }],
        features: [
            <div>Developed using <strong>NextJS</strong> as framework for server side and client side rendering, along with <strong>Tailwind</strong> for styling and <strong>Clerk</strong> for authentication. <strong>Prisma</strong> is used as ORM for MySQL database and <strong>Cloudinary</strong> is used for Image Hosting.</div>,
            <div>Innovated <strong>Username Screen</strong> with unique mechanism to display messages and errors to users, a demo shown in the previews.</div>,
            <div>Creative setup with futuristic look for App UI using <strong>clip-path</strong> and other <strong>CSS</strong> properties to give gamified feel to users.</div>,
            <div>Crafted <strong>Smooth Page Transition</strong> Animations to give seamless experience to users, also shown in previews.</div>,
            <div>Implemented <strong>User Theme Styling</strong> to change theme easily just using a slider.</div>
        ],
        previews: [
            {
                name: 'Page Transition Animation',
                link: 'https://player.vimeo.com/video/990611814'
            },
            {
                name: 'Theme Styling',
                link: 'https://player.vimeo.com/video/990611590'
            },
            {
                name: 'Username Selection Screen',
                link: 'https://player.vimeo.com/video/990612395'
            },
        ]
    },
    {
        name: 'ReQu AI',
        description: 'AI Based Web-App to generate code files and run them for you.',
        techStack: ['JavaScript', 'CSS', 'NextJS', 'GPT Turbo 3.5', 'Gemini', 'Groq', 'NodeJS'],
        color: '#bc6bff',
        actionButtons: [],
        features: [
            <div>Built app in <strong>Next.js 14</strong>, generating simple websites <strong>5X Faster</strong> using <strong>Groq</strong> API's LPU for super-fast model processing like <strong>Gemini</strong>, <strong>Mistral</strong>, <strong>GPT Turbo 3.5</strong>.</div>,
            <div>Implemented a group of <strong>3 AI</strong> to generate approaches, tasks and code for the prompt using different models.</div>,
            <div>Formulated backend functions to property format model inputs and outputs to process response.</div>,
            <div> Developed real-time code preview using <strong>PrismJS</strong> and website preview using <strong>iFrame</strong> during code generation with an update cycle of 200ms</div>,
            <div>Constructed <strong>API</strong> to manage <strong>backend file system</strong> to allow app to save source files of project on server and
            process them for rendering and downloading.</div>
        ],
        previews: [
            {
                name: 'Approches + Tasks + Code Generation',
                link: 'https://player.vimeo.com/video/990670493'
            },
            {
                name: 'Direct Code Generation',
                link: 'https://player.vimeo.com/video/990670436'
            }
        ]
    },
    {
        name: 'Tourney4U',
        description: 'Customizable Tournament Scheduler',
        techStack: ['JavaScript','HTML', 'CSS', 'NextJS'],
        color: '#ff397c',
        actionButtons: [{
            name: 'View Demo',
            icon: <FaGlobe/>,
            link: 'https://tourney4ux.vercel.app/'
        },
        {
            name: 'View Source Code',
            icon: <FaCode/>,
            link: 'https://github.com/AkhilTrivediX/tourney4u'
        }],
        features: [
            <div>Created a <strong>Next.js</strong> web app that streamlines tournament bracket generation for various team sizes from 2 to
            20, including <strong>byes for odd teams</strong>.</div>,
            <div>Empowered user customization with extensive options for visual style, 4 different layouts, colour schemes, and borders.</div>,
            <div>Defined a <strong>On-Demand font import</strong> system, fetching user-specified fonts from <strong>Google Fonts</strong> on demand for a personalised user experience.</div>,
            <div>Enhanced user experience with real-time bracket updates and downloadable <strong>PNG exports</strong> for sharing and
            printing.</div>,
            <div> Prioritised <strong>mobile responsiveness</strong> by optimising layout for landscape viewing on smartphones.</div>
        ],
        previews: [
            {
                name: 'Brackets Customization',
                link: 'https://player.vimeo.com/video/990945069'
            },
            {
                name: 'Background Customization',
                link: 'https://player.vimeo.com/video/990945109'
            },
            {
                name: 'Text Customization',
                link: 'https://player.vimeo.com/video/990945022'
            }
        ]
    }
]

export const experiencesInfo = [
    {
        name: 'Design4U',
        description: 'A 14,000+ member community of designers which provides graphic designs as its service to its client with over 2500+ positive reviews.',
        logo: '/Design4ULogo.svg',
        role: 'Administrator, Staff Manager',
        duration: 'February 2021 - Present',
        color: '#ff1b49',
        actionButtons: [{
            name: 'View Website',
            icon: <FaGlobe/>,
            link: 'https://design4u.vercel.app/'
        },
        {
            name: 'View Source Code',
            icon: <FaCode/>,
            link: 'https://github.com/AkhilTrivediX/Design4U'
        }
    ],
        features: [
            <div> Developed platform integrated application with <strong>Discord.js</strong> to streamline order processing, logging, moderation, and customer communication, improving <strong>10-12 hours</strong> order response time to <strong>under 5 seconds</strong>.</div>,
            <div>Implemented gamified experience to community and designer to incentivize designing and <strong>boosting
            engagement by 139%</strong>.</div>,
            <div>Redesigned order placement system allowing designers more opportunity and clients freedom to choose their
            designers, leading to increase in order <strong>conversion rate from 3 to 7 per week</strong>.</div>,
            <div>Led the team of 5 members responsible for <strong>recruiting applicants</strong> for graphic designer, order overseer and
            community moderator roles.</div>,
            <div> Crafted website based on <strong>Next.js</strong> and <strong>Firebase</strong>, showcasing designer works and client testimonials, resulting in a <strong>43% increase</strong> in order traffic.</div>,
            <div>Connected with the organisation's server using Discord.js to stream <strong>7 real-time KPIs</strong>, including client
            feedback and order count</div>
        ],
        previews: [
            {
                name: 'Realtime Stats/Reviews',
                link: 'https://player.vimeo.com/video/990712087'
            },
            {
                name: 'Design and Theme Showcase',
                link: 'https://player.vimeo.com/video/990712136'
            }
        ]
    }
]
