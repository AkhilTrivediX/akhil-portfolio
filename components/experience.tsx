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
                {experiencesInfo.map((experience, experiencei)=>(
                    <div className={"w-full h-screen  flex justify-start items-center sticky top-0 bg-black"+(experiencei!=0?" mt-[20%]":"")} key={experiencei}>
                    {experiencei!=0?<div className="absolute bottom-full left-0 w-full h-[20%]" style={{backgroundImage:`linear-gradient(0deg, black 40%, transparent 100%)`}}></div>:null}
                    <div className="h-full w-[50%] p-12 pt-12 flex flex-col justify-around">

                        <div className="text-8xl" style={{color: experience.color}}>{experience.name}</div>
                        <div className="text-lg font-kanit">{experience.description}</div>
                        <div className="text-base font-kode flex items-center"><FaUserTie className="mr-2 text-lg"/>{experience.role}</div>
                        <div className="text-base font-kode flex items-center"><FaCalendarDay className="mr-2 text-lg"/>{experience.duration}</div>
                      
                        {experience.actionButtons.length>0?<div className="flex items-center">
                            {experience.actionButtons.map((button, buttoni)=>{
                                if(button.link)
                                    return(
                                        <a href={button.link} target="_blank" key={buttoni}>
                                            <div className="text-lg flex p-[1px] bg-white bg-opacity-60 w-[max-content] cutBanner mr-4 hover:bg-opacity-80">
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
                            <div className="text-lg">Responsibilities:</div>
                            <div className="flex flex-col">
                                {experience.features.map((feature, featurei)=>(
                                    <div className="flex items-start primaryStrongs" key={featurei} style={{'--strongColor':experience.color} as React.CSSProperties}><div className="w-[18px]"><VscDebugBreakpointDataUnverified className="mr-2 mt-1"/></div> {feature}</div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-lg mb-2">Previews:</div>
                            <div className="flex flex-wrap gap-4">
                                {experience.previews.map((preview, previewi)=>(
                                    <div className="text-lg flex p-[1px] bg-white bg-opacity-60 w-[max-content] cutBanner cursor-pointer" style={currentPreviews[experiencei]==previewi?{backgroundColor:experience.color, color:experience.color}:{}} onClick={()=>{
                                        setCurrentPreviews((prev)=>[...prev.slice(0,experiencei), previewi, ...prev.slice(experiencei+1)]);
                                    }} key={previewi}>
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
                            {experience.previews.map((preview, previewi)=>(
                                // <video autoPlay loop muted className={"w-full h-full object-cover"+(currentPreviews[experiencei]!=previewi?' hidden':'')} preload={previewi==0?'auto':'none'}>
                                //     <source src={preview.link} type="video/webm"/>
                                // </video>
                                <iframe src={preview.link+"?background=1"} className={"w-screen h-screen object-cover absolute right-0 top-0"+(currentPreviews[experiencei]!=previewi?' hidden':'')} key={previewi}></iframe>
                            ))}
                    </div>
                </div>
                ))}
                
        </div>
    )
}