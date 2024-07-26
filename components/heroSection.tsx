import Image from "next/image";

export default function HeroSection()
{
    return(
      <div className="flex max-w-[75%] relative justify-around z-[2]" style={{perspective:'1000px', color:'var(--primaryColor)'}}>
        <div className="absolute w-full h-full z-[12] mix-blend-darken" style={{backgroundColor: 'var(--primaryColor)'}}></div>
        <div className="absolute w-full h-full bg-black z-[0]"></div>
        <div className="hidingDiv w-full bg-background z-[1] absolute top-0 left-0 h-full "></div>
          <div className="w-[500px] aspect-square flex items-center justify-center relative">
            <Image src='/heroLogo.svg' alt='logo' width={400} height={400} className="heroLogo opacity-70" priority/>
            <Image src='/heroLogoStroked.svg' alt='logo' width={400} height={400} className="heroLogoStroke opacity-70 absolute" priority/>
            <div className="absolute w-[400px] h-[400px] heroGrid">
              <div className="h-full w-full heroGridGradient"></div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center opacity-80 z-[2] relative">
            
            <div className="hidingDiv w-full bg-background z-[1] absolute top-0 left-0 h-full "></div>
            <div className="flex justify-around items-center w-full z-[20] opacity-0"  style={{animation:'fadeIn 1s forwards ease', animationDelay:'200ms'}}>
              <div className='h-[1px] bg-opacity-70' style={{animation:'fadeInLine 1.7s forwards ease', animationDelay:'200ms', backgroundColor:'var(--primaryColor)'}}></div>
              <div className="font-kode font-bold">MEET</div>
              <div className='h-[1px] bg-opacity-70' style={{animation:'fadeInLine 1.7s forwards ease', animationDelay:'200ms', backgroundColor:'var(--primaryColor)'}}></div>
            </div>
            <div className="akhilText max-h-[0%] overflow-hidden opacity-full" style={{transition:'all 300ms linear, max-height 4000ms ease'}}><span className="text-6xl font-bold font-kode p-4 ">Akhil Trivedi</span></div>
            <div className="text-4xl z-[20]">
              <span className="opacity-0" style={{animation:'fadeIn 1s forwards ease', animationDelay:'200ms'}}>A Self</span>
              <span className="opacity-0" style={{animation:'fadeIn 1s forwards ease', animationDelay:'500ms'}}>-Taught </span>
              <span className="opacity-0" style={{animation:'fadeIn 1s forwards ease', animationDelay:'1000ms'}}>Developer</span>
              </div>
          </div>
    </div>
    )
}