import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";

export default function Navbar()
{
    return(
        <div id='navbar' key='navbar' className="w-[max-content] px-4 py-4 rounded-full border-[1px] border-white border-opacity-20 absolute top-5 right-5 z-[10] flex items-center justify-center backdrop-blur-sm">
            <a href="https://www.linkedin.com/in/akhiltrivedix/" target="_blank"><div className="p-4 hover:bg-white hover:bg-opacity-20 mr-2 rounded-full"><BsLinkedin className="opacity-60 text-xl"/> </div></a>
            <a href="github.com/akhiltrivedix/" target="_blank"><div  className="p-4 hover:bg-white hover:bg-opacity-20 mr-2 rounded-full"><BsGithub className="opacity-60 text-xl"/> </div></a>
            <a href="/AkhilResume.pdf" target="_blank"><div className="flex items-center justify-center text-black bg-white p-3 rounded-full hover:bg-opacity-80"><IoDocumentText className="opacity-60 text-xl mr-1"/> Resume</div></a>
        </div>
    )
}