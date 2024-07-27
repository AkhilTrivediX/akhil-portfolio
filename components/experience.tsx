'use client'

import { experiencesInfo, skillColors, skillIcons } from "@/constants/constants";
import { FaCalendarDay, FaPlay, FaUserTie } from "react-icons/fa";
import { IoBuild, IoPlay } from "react-icons/io5";
import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { updatePrimaryColor } from "./themeProvider";
import Image from "next/image";
import { useState } from "react";
import { BsCursor } from "react-icons/bs";



export default function Experience()
{

    const [currentPreviews, setCurrentPreviews] = useState([0,0,0,0]);

    function skillPreviewIn(e: any){
        if(innerWidth<1024){return;}
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
        if(innerWidth<1024){return;}
        let target = e.currentTarget.parentElement as HTMLDivElement;
        target.style.width = '50%';
    }
    return(
        <div className="w-[100vw]  text-white text-opacity-60 relative">
                {experiencesInfo.map((experience, experiencei)=>(
                    <div className={"w-full h-screen flex flex-col lg:flex-row items-start justify-start lg:justify-start lg:items-center sticky top-0 bg-black"+(experiencei!=0?" mt-[20%]":"")} key={experiencei}>
                    {experiencei!=0?<div className="absolute bottom-full left-0 w-full h-[20%] pointer-events-none" style={{backgroundImage:`linear-gradient(0deg, black 40%, transparent 100%)`}}></div>:null}
                    <div className=" w-full h-full lg:w-[50%] p-12 pt-2 lg:pt-12 flex flex-col justify-around">

                    <div className="text-6xl lg:text-8xl" style={{color: experience.color}}>{experience.name}</div>
                        <div className="text-xs lg:text-lg font-kanit">{experience.description}</div>
                        <div className="text-xs lg:text-base font-kode flex items-center"><FaUserTie className="mr-2 text-xs lg:text-lg"/>{experience.role}</div>
                        <div className="text-xs lg:text-base font-kode flex items-center"><FaCalendarDay className="mr-2 text-xs lg:text-lg"/>{experience.duration}</div>
                      
                        {experience.actionButtons.length>0?<div className="">
                            {experience.actionButtons.map((button, buttoni)=>{
                                if(button.link)
                                    return(
                                        <a href={button.link} key={buttoni}>
                                            <div className="flex p-[1px] bg-white bg-opacity-60 w-[max-content] cutBanner">
                                                <div className="text-sm lg:text-lg flex items-center w-[max-content] py-1 px-2 lg:py-2 lg:px-3 bg-black cutBanner">
                                                    {button.icon}<div className="ml-1 lg:ml-2">{button.name}</div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                else
                                    return(
                                        <div className="flex p-[1px] bg-white bg-opacity-60 w-[max-content] cutBanner" key={buttoni}>
                                            <div className="text-sm lg:text-lg flex items-center w-[max-content] py-1 px-2 lg:py-2 lg:px-3 bg-black cutBanner">
                                                {button.icon}<div className="ml-2">{button.name}</div>
                                            </div>
                                        </div>
                                    )
                        })}</div>:null}
                        
                        <div>
                            <div className="text-md lg:text-lg">Responsibilities:</div>
                            <div className="flex flex-col text-xs lg:text-base">
                                {experience.features.map((feature, featurei)=>(
                                    <div className="flex items-start primaryStrongs" key={featurei} style={{'--strongColor':experience.color} as React.CSSProperties}><div className="w-[18px]"><VscDebugBreakpointDataUnverified className="mr-2 mt-1"/></div> {feature}</div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-md lg:text-lg mb-2">Previews:</div>
                            <div className="flex flex-wrap gap-4">
                                {experience.previews.map((preview, previewi)=>(
                                    <div className="flex p-[1px] bg-white bg-opacity-60 w-[max-content] cutBanner cursor-pointer" style={currentPreviews[experiencei]==previewi?{backgroundColor:experience.color, color:experience.color}:{}} onClick={()=>{
                                        setCurrentPreviews((prev)=>[...prev.slice(0,experiencei), previewi, ...prev.slice(experiencei+1)]);
                                        let previewParent = document.getElementById('previewE'+experiencei+'Parent');
                                        previewParent?.classList.toggle('opacity-0');
                                        previewParent?.classList.toggle('pointer-events-none');
                                    }} key={previewi}>
                                        <div className="text-sm lg:text-lg  flex items-center w-[max-content] py-1 px-2 lg:py-2 lg:px-3 bg-black cutBanner">
                                            <IoPlay className="mr-2"/> {preview.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id={'previewE'+experiencei+'Parent'} className="w-full h-full lg:w-[50%] absolute bottom-0 right-0 overflow-hidden bg-black bg-opacity-60 opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
                            <div className="w-full h-full absolute bottom-0 right-0 z-[1] bg-black bg-opacity-60 opacity-0 lg:opacity-100 flex items-center justify-center hover:opacity-0" onMouseMove={(e)=>{skillPreviewIn(e)}} onMouseLeave={(e)=>{skillPreviewOut(e)}} onClick={(e)=>{
                                let previewParent = document.getElementById('previewE'+experiencei+'Parent');
                                previewParent?.classList.toggle('opacity-0');
                                previewParent?.classList.toggle('pointer-events-none');
                            }}>
                                <div className="py-2 px-4 bg-white bg-opacity-10 flex justify-center items-center rounded-full"><BsCursor style={{transform:'rotateY(180deg)'}} className="mr-2"/> Hover Over Me</div>
                            </div>
                            {experience.previews.map((preview, previewi)=>(
                                <iframe src={preview.link+"?background=1"} className={"w-screen h-screen object-cover absolute right-0 top-0"+(currentPreviews[experiencei]!=previewi?' hidden':'')} key={previewi}></iframe>
                            ))}
                    </div>
                </div>
                ))}
                
        </div>
    )
}