'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function HamburgerMenu(props:any) {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
    const handleRouting = (path:String)=>{
      if(path === "gainsCalculator" && props.curPage!=="gainsCalculator"){
        router.push("/gainsCalculator")
      }if (path === "home" && props.curPage!=="home"){
        router.push('/');
      }
    }
  return (
    <>
        <div className={`${showMenu ? "w-[25vw]":"w-0 opacity-0"} flex flex-col transition-all duration-1000 h-screen bg-slate-600 p-2 text-white gap-2 pt-10`}>
            <div className={`flex w-full ${showMenu ? "opacity-100" : "opacity-0"} cursor-pointer ${props.curPage !=="home"? "bg-slate-950 hover:bg-white hover:text-black":"bg-slate-500"} px-2 rounded-xl hover:bg-white hover:text-black`} onClick={()=>{handleRouting('home')}}>
              Home
            </div>
            <div className={`flex w-full ${showMenu ? "opacity-100" : "opacity-0"} cursor-pointer ${props.curPage !=="gainsCalculator"? "bg-slate-950 hover:bg-white hover:text-black ":"bg-slate-500"} px-2 rounded-xl `} onClick={()=>{handleRouting('gainsCalculator')}}>
              Gains Calculator
            </div>
        </div>
        <div className={`flex flex-col w-10 h-6 gap-1 absolute ${showMenu? "translate-x-[25vw]": "translate-x-0"}  left-4 top-1 transition-all duration-1000 justify-center items-center`} onClick={()=>{setShowMenu(!showMenu)}}>
            <div className={`flex w-full h-1/3 rounded-md transition-all duration-500 ${props.bg ? "bg-white": "bg-black" } ${showMenu && "translate-y-2"}`} />
            <div className={`flex w-full h-1/3 rounded-md transition-all duration-500 ${props.bg ? "bg-white": "bg-black" }  `} />
            <div className={`flex w-full h-1/3 rounded-md transition-all duration-500 ${props.bg ? "bg-white": "bg-black" } ${showMenu && " -translate-y-2"}`} />
        </div>
    </>
  )
}
