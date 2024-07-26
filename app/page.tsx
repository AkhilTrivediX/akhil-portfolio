import Image from "next/image";
import HeroSection from "../components/heroSection";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center max-w-screen max-h-screen overflow-x-hidden">
        <div className="hidingDiv w-full bg-background z-[1] absolute top-0 left-0 h-full "></div>
        <div className="w-full min-h-screen flex flex-col items-center">
          <HeroSection/>
          <Skills/>
        </div>
        <div className="text-2xl flex items-center justify-center m-2 text-white text-opacity-60">Personal Projects</div>
        <Projects/>
        <div className="text-2xl flex items-center justify-center m-2 text-white text-opacity-60">Professional Experience</div>
        <Experience/>
      </div>
    </main>
  );
}
