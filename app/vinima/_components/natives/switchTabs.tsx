import { Button } from "@/components/ui/button";
import { LayoutGroup, motion } from 'motion/react'
export default function SwitchTabs({tabs,currentTab, setCurrentTab, className}:{tabs:{id:string, name?: string}[],currentTab: string, setCurrentTab: React.Dispatch<React.SetStateAction<string>>,className?:string}){
    return (
        <LayoutGroup id={crypto.randomUUID()}>
            <div className={"inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0 "+className}>
                {tabs.map((tab)=><Button key={tab.id} variant={'ghost'} className="hover:bg-transparent hover:text-foreground/80 relative pb-4" onClick={()=>setCurrentTab(tab.id)}>
                    <span className={currentTab===tab.id?'text-foreground':''}>{tab.name || tab.id}</span>
                    {currentTab === tab.id && <motion.div layoutId='tabUnderline' className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"/>}
                </Button>)}
            </div>
        </LayoutGroup>
    )
}