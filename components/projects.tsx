'use client'

import { projectsInfo, skillColors, skillIcons } from "@/constants/constants";
import { FaPlay } from "react-icons/fa";
import { IoBuild, IoPlay } from "react-icons/io5";
import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { updatePrimaryColor } from "./themeProvider";
import Image from "next/image";
import { useState } from "react";
import { BsCursor } from "react-icons/bs";



export default function Projects()
{

    const [currentPreviews, setCurrentPreviews] = useState([0,0,0,0]);

    function skillPreviewIn(e: any){
        let target = e.currentTarget.parentElement as HTMLDivElement;
        let parent = target.parentElement as HTMLDivElement;

        let parentWidth = parent.offsetWidth;
        let parentX = parent.offsetLeft;
        let mouseX = e.clientX;
        let covered = (mouseX-parentX)*100/(parentWidth);
        console.log('Percent Covered:',covered);
        covered = covered<75?covered:75;
        let incWidth = (covered-25)*2;
        console.log('Inc Width:',incWidth);
        target.style.width = `${incWidth}%`;
    }

    function skillPreviewOut(e: any){
        let target = e.currentTarget.parentElement as HTMLDivElement;
        target.style.width = '50%';
    }
    return(
        <div className="w-[100vw] min-h-screen text-white text-opacity-60 overflow-y-scroll scroll-smooth relative">
                {projectsInfo.map((project, projecti)=>(
                    <div className={"w-full h-screen  flex justify-start items-center sticky top-0 bg-black"+(projecti!=0?" mt-[20%]":"")} key={projecti}>
                    {projecti!=0?<div className="absolute bottom-full left-0 w-full h-[20%]" style={{backgroundImage:`linear-gradient(0deg, black 40%, transparent 100%)`}}></div>:null}
                    <div className="h-full w-[50%] p-12 pt-12 flex flex-col justify-around">

                        <div className="text-8xl" style={{color: project.color}}>{project.name}</div>
                        <div className="text-lg font-kode">{project.description}</div>
                        <div className="flex text-2xl items-center">

                            <div className="text-lg">Tech Stack:</div>
                            {project.techStack.map((tech, techi)=>(
                                <div className="ml-2 flex p-1 rounded-3xl skillDiv cursor-pointer" key={techi} onMouseEnter={()=>{updatePrimaryColor(skillColors[tech])}} onMouseLeave={()=>{updatePrimaryColor('#fff')}} >{skillIcons[tech]} <div className="text-base font-kode max-w-[0px] overflow-hidden skillName"><span className="ml-2 text-nowrap">{tech}</span></div></div>
                            ))}
                        </div>
                        {project.actionButtons.length>0?<div className="">
                            {project.actionButtons.map((button, buttoni)=>{
                                if(button.link)
                                    return(
                                        <a href={button.link} key={buttoni}>
                                            <div className="text-lg flex p-[1px] bg-white bg-opacity-60 w-[max-content] cutBanner">
                                                <div className="text-lg flex items-center w-[max-content] py-2 px-3 bg-black cutBanner">
                                                    {button.icon}<div className="ml-2">{button.name}</div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                else
                                    return(
                                        <div className="text-lg flex p-[1px] bg-white bg-opacity-60 w-[max-content] cutBanner" key={buttoni}>
                                            <div className="text-lg flex items-center w-[max-content] py-2 px-3 bg-black cutBanner">
                                                {button.icon}<div className="ml-2">{button.name}</div>
                                            </div>
                                        </div>
                                    )
                        })}</div>:null}
                        
                        <div>
                            <div className="text-lg">Features:</div>
                            <div className="flex flex-col">
                                {project.features.map((feature, i)=>(
                                    <div className="flex items-start primaryStrongs" style={{'--strongColor':project.color}}><div className="w-[18px]"><VscDebugBreakpointDataUnverified className="mr-2 mt-1"/></div> {feature}</div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-lg mb-2">Previews:</div>
                            <div className="flex flex-wrap gap-4">
                                {project.previews.map((preview, previewi)=>(
                                    <div className="text-lg flex p-[1px] bg-white bg-opacity-60 w-[max-content] cutBanner cursor-pointer" style={currentPreviews[projecti]==previewi?{backgroundColor:project.color, color:project.color}:{}} onClick={()=>{
                                        setCurrentPreviews((prev)=>[...prev.slice(0,projecti), previewi, ...prev.slice(projecti+1)]);
                                    }}>
                                        <div className="text-lg flex items-center w-[max-content] py-2 px-3 bg-black cutBanner">
                                            <IoPlay className="mr-2"/> {preview.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-[50%] absolute right-0 h-full overflow-hidden">
                            <div className="w-full h-full absolute top-0 right-0 z-[1] bg-black bg-opacity-60 flex items-center justify-center hover:opacity-0"  onMouseMove={(e)=>{skillPreviewIn(e)}} onMouseLeave={(e)=>{skillPreviewOut(e)}}>
                                <div className="py-2 px-4 bg-white bg-opacity-10 flex justify-center items-center rounded-full"><BsCursor style={{transform:'rotateY(180deg)'}} className="mr-2"/> Hover Over Me</div>
                            </div>
                            {project.previews.map((preview, previewi)=>(
                                // <video autoPlay loop muted className={"w-full h-full object-cover"+(currentPreviews[projecti]!=previewi?' hidden':'')} preload={previewi==0?'auto':'none'}>
                                //     <source src={preview.link} type="video/webm"/>
                                // </video>
                                <iframe src={preview.link+"?background=1"} className={"w-screen h-screen object-cover absolute right-0 top-0"+(currentPreviews[projecti]!=previewi?' hidden':'')}></iframe>
                            ))}
                    </div>
                </div>
                ))}
                
        </div>
    )
}