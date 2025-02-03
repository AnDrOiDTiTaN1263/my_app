'useClient'
import React, { SetStateAction, useState } from 'react'
import {Stock} from "../utils";
export default function StockComponent({stock, weight, i, handleRemove, setUpdate}:{stock:Stock,weight:number,i:number, handleRemove:any, setUpdate:any}) {
    const [hoverSell, setHoverSell] = useState(false);
    const non_ending_node_style = "flex w-full h-full border-r-2 border-black justify-center items-center";

    const sell = (e:any)=>{
      let x = JSON.parse(localStorage.getItem("stocks")|| "");
      x[i].sell_price

    }
  return (
    <div className='flex flex-row w-full h-10  border-2 border-black rounded-lg'>
        <div className={non_ending_node_style}>{stock.ticker}</div>
        <div className={non_ending_node_style}>{stock.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <div className={non_ending_node_style}>{stock.units.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <div className={non_ending_node_style} onMouseOver={()=>{setHoverSell(true);}} onMouseOut={()=>{setHoverSell(false);}} onClick={sell} >{stock.sell_price!==null ? stock.sell_price.toFixed(2): hoverSell? "sell?" : "not sold yet"}</div>
        <div className={non_ending_node_style}>{weight.toFixed(2)}%</div>
        <div id={i.toString()} className='flex w-1/2 h-full justify-center items-center hover:bg-red-500 hover:text-white' onClick={(e)=>{handleRemove(e); setUpdate(true)}}>X</div>
    </div>
  )
}
