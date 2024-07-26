'use client'

import { skills } from "@/constants/constants"
import { updatePrimaryColor } from "./themeProvider"


export default function Skills()
{
    

    return(
        <div className="flex flex-col items-center">
            <div className="text-2xl opacity-60 m-2">My TechStack</div>
                <div className="flex">
                    {skills.slice(0, Math.ceil(skills.length/3)).map((skill,i)=>(<a href={skill.link} target="_blank"><div key={i} className={`px-4 py-4 mx-4 my-2 border-[2px] border-white opacity-60 border-opacity-50 rounded-full flex justify-center items-center text-2xl skillDiv hover:opacity-100 cursor-pointer animateRise`} onMouseEnter={()=>{updatePrimaryColor(skill.color)}} onMouseLeave={()=>{updatePrimaryColor('#fff')}} style={{animationDelay: `${2000+i*150}ms`}}>
                        {skill.icon}
                        <div className="text-[18px] skillName max-h-[20px] overflow-hidden leading-none text-center">
                            <div className="pl-2">{skill.name}</div></div>
                        </div></a>))
                    }
                </div>
                <div className="flex">
                    {skills.slice(Math.ceil(skills.length/3), Math.floor(skills.length/1.5)).map((skill,i)=>(<a href={skill.link} target="_blank"><div key={i} className={`px-4 py-4 mx-4 my-2 border-[2px] border-white opacity-60 border-opacity-50 rounded-full flex justify-center items-center text-2xl skillDiv hover:opacity-100 cursor-pointer animateRise`} onMouseEnter={()=>{updatePrimaryColor(skill.color)}} onMouseLeave={()=>{updatePrimaryColor('#fff')}}  style={{animationDelay: `${2000+i*150}ms`}}>
                        {skill.icon}
                        <div className="text-[18px] skillName max-h-[20px] overflow-hidden leading-none text-center">
                            <div className="pl-2">{skill.name}</div></div>
                        </div></a>))}
                </div>
                <div className="flex">
                    {skills.slice(Math.floor(skills.length/1.5) ).map((skill,i)=>(<a href={skill.link} target="_blank"><div key={i} className={`px-4 py-4 mx-4 my-2 border-[2px] border-white opacity-60 border-opacity-50 rounded-full flex justify-center items-center text-2xl skillDiv hover:opacity-100 cursor-pointer animateRise`} onMouseEnter={()=>{updatePrimaryColor(skill.color)}} onMouseLeave={()=>{updatePrimaryColor('#fff')}}  style={{animationDelay: `${2000+i*150}ms`}}>
                        {skill.icon}
                        <div className="text-[18px] skillName max-h-[20px] overflow-hidden leading-none text-center">
                            <div className="pl-2">{skill.name}</div></div>
                        </div></a>))}
                </div>
            <div></div>
        </div>
    )
}