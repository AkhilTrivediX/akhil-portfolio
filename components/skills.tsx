'use client'

import { skills } from "@/constants/constants"
import { updatePrimaryColor } from "./themeProvider"


export default function Skills()
{
    function getSkills()
    {
        let skillDivision = innerWidth>=1024?[7,5,7]:[4,3,4,3,4];
        let xsum = 0;
        let stack = [];
        for(let x=0;x<skillDivision.length;x++)
        {
            stack.push(
                skillDivision.length<4?(
                    <div className="flex">
                    {
                        skills.slice(xsum, xsum+skillDivision[x]).map((skill,i)=>(<a href={skill.link} target="_blank" key={i} ><div key={i} className={`px-4 py-4 mx-2 my-1 lg:mx-4 lg:my-2 border-[2px] border-white opacity-60 border-opacity-50 rounded-full flex justify-center items-center text-lg lg:text-2xl skillDiv hover:opacity-100 cursor-pointer animateRise`} onMouseEnter={()=>{updatePrimaryColor(skill.color)}} onMouseLeave={()=>{updatePrimaryColor('#fff')}} style={{animationDelay: `${2000+i*150}ms`, '--primaryColor':skill.color} as React.CSSProperties}>
                        {skill.icon}
                        <div className="text-[18px] skillName max-h-[20px] max-w-[0px] lg:max-w-[150px] overflow-hidden leading-none text-center">
                            <div className="pl-2">{skill.name}</div></div>
                        </div></a>))
                    }
                </div>
                ):
                (
                    <div className="flex">
                    {
                        skills.slice(xsum, xsum+skillDivision[x]).map((skill,i)=>(<div key={i} className={`px-4 py-4 mx-2 my-1 lg:mx-4 lg:my-2 border-[2px] border-white opacity-60 border-opacity-50 rounded-full flex justify-center items-center text-lg lg:text-2xl skillDiv hover:opacity-100 cursor-pointer animateRise`} onMouseEnter={()=>{updatePrimaryColor(skill.color)}} onMouseLeave={()=>{updatePrimaryColor('#fff')}} style={{animationDelay: `${2000+i*150}ms`, '--primaryColor':skill.color} as React.CSSProperties}>
                        {skill.icon}
                        <div className="text-[18px] skillName max-h-[20px] max-w-[0px] lg:max-w-[150px] overflow-hidden leading-none text-center">
                            <div className="pl-2">{skill.name}</div></div>
                        </div>))
                    }
                </div>
                )
            )
            xsum+=skillDivision[x];
        }

        return stack;
    }

    return(
        <div className="flex flex-col items-center">
            <div className="text-md lg:text-2xl opacity-60 m-2 mt-8">My TechStack</div>
                {getSkills()}
            <div></div>
        </div>
    )
}