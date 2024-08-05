import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";

export default function Navbar()
{
    return(
        <div id='navbar' key='navbar' className="w-[max-content] p-2 lg:p-4 rounded-full border-[1px] border-white border-opacity-20 top-2 right-2 absolute lg:top-5 lg:right-5 z-[10] flex items-center justify-center backdrop-blur-sm">
            <a href="https://www.linkedin.com/in/akhiltrivedix/" target="_blank"><div className="p-2 lg:p-4 hover:bg-white hover:bg-opacity-20 mr-1 lg:mr-2 rounded-full"><BsLinkedin className="opacity-60 text-md lg:text-xl"/> </div></a>
            <a href="https://www.github.com/akhiltrivedix/" target="_blank"><div  className="p-2 lg:p-4 hover:bg-white hover:bg-opacity-20 mr-1 lg:mr-2 rounded-full"><BsGithub className="opacity-60 text-xl"/> </div></a>
            <a href="/AkhilResume.pdf" target="_blank"><div className="flex items-center justify-center text-black bg-white p-2 lg:p-3 text-sm rounded-full hover:bg-opacity-80"><IoDocumentText className="opacity-60 text-md lg:text-xl mr-1"/> Resume</div></a>
        </div>
    )
}