import React, { useEffect, useState } from 'react'
import {getAllUnits, Stock} from "../utils";
import StockComponent from './StockComponent';
export default function StockList({update, setUpdate, handleRemove}:{update:boolean, setUpdate:Function, handleRemove:Function}) {
    const [shownStocks, setShownStocks] = useState(Array<Stock>); 
    const [allStocks, setAllStocks]= useState(Array<Stock>);
    useEffect(()=>{
        let stocksString = localStorage.getItem("stocks");
        if (stocksString !== null){
            setShownStocks(JSON.parse(stocksString));
            setAllStocks(shownStocks);
        }

    },[update])
    const handleSearch = (e:any)=>{
        console.log(e.target.value);
        if (e.target.value === "" || e.target.value === null){
            setShownStocks(allStocks);
        }else{
            setShownStocks(allStocks.filter((x)=>x.ticker.includes(e.target.value.toUpperCase())))
        }
    }

    const sortBy = (e:any)=>{
        if (e.target.id === "price") {
            console.log("sorting")
            setShownStocks(shownStocks.sort((a,b)=>Number(a.price)-Number(b.price)))
        }else if (e.target.id === "ticker"){
            setShownStocks(shownStocks.sort((a,b)=>(a.ticker as any)-(b.ticker as any)))
        }else if (e.target.id   === "sell-price"){
        }
    }

    return (
        <div className='flex flex-col w-full border-2 border-black p-2  h-[50vh] rounded-lg gap-3'>
        <input className='flex w-full h-14 text-xl border-2 border-black rounded-lg px-2' placeholder='search for a ticker' onChange={handleSearch}/>
        <div className='flex flex-row w-full h-14 border-black border-2 rounded-lg'>
                <div id='ticker' className='flex w-full h-full border-black border-r-2 justify-center items-center' onClick={sortBy}>Ticker</div>
                <div id='price' className='flex w-full h-full border-black border-r-2 justify-center items-center'  onClick={sortBy}>Price</div>
                <div id='units' className='flex w-full h-full border-black border-r-2 justify-center items-center'  onClick={sortBy}>Units</div>
                <div id='sell-price' className='flex w-full h-full  border-black border-r-2 justify-center items-center'>Sell Price</div>
                <div id='sell-price' className='flex w-full h-full  border-black border-r-2 justify-center items-center'>Weight</div>
                <div className='flex w-1/2 h-full justify-center items-center cursor-pointer'>Remove</div>
            </div>
        <div id='results' className='flex flex-col w-full h-full gap-5 rounded-lg overflow-y-scroll'>
            
            <div className='flex flex-col w-full h-full gap-3 '>
            {shownStocks.map((x:Stock, i:number)=>{
                return (
                       <StockComponent stock={x} i={i} weight={(Number(x.units)/Number(getAllUnits(allStocks)))*100} handleRemove={handleRemove} setUpdate={setUpdate}/>
                )
            })}
            </div>
        </div>
      </div>
    )
}
