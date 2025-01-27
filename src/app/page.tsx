import { useState } from "react";

export default function Home() {
  const [counter, setCounter]= useState(0);

  return (
    <div className="flex flex-col bg-slate-700 h-screen w-screen text-white justify-center items-center text-4xl">
      {counter}
      <div onClick={()=>{setCounter(counter+1)}}>+</div>
      <div onClick={()=>{setCounter(counter-1)}}>-</div>
    </div>
  );
}
