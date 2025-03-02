'use client'

import { useState } from "react";
import SwitchTabs from "./natives/switchTabs";
import Codeblock from "./codeblock";

export default function InstallationGuide(){
    const [installationTab, setInstallationTab] = useState('cli')
    return(
        <div className="flex flex-col mt-12">
            <div className="font-heading scroll-m-20 border-b pb-2 mb-2 text-2xl font-semibold tracking-tight first:mt-0 ">Installation</div>
            <SwitchTabs tabs={[
                {name:'CLI', id:'cli'},
                {name: 'Manual', id: 'manual'}
            ]}
            currentTab={installationTab} setCurrentTab={setInstallationTab}
            />
            {installationTab == 'cli' && <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border w-full mt-4 flex codeblock overflow-hidden no-scrollbars"><Codeblock code={`npx shadcn add https://vinima.akhiltrivedi.me/instagram.json`} language="bash"/></div>}
        </div>
    )
}