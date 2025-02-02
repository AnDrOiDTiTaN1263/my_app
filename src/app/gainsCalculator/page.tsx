'use client'
import React, { useState } from 'react'
import {Stock} from '../utils';
import HamburgerMenu from '../_components/hamburgerMenu';
import StockList from '../_components/StockList';

export default function page() {
    const [stocks, addStock] = useState(getStocks());
    const [totalGains, setTotalGains] = useState("0.00");
    const[buyPrice, setBuyPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [ticker, setTicker] = useState("");
    const [dividendYield, setDividend] = useState("");
    function getStocks():Array<Stock>{
        if (typeof window !== "undefined"){
        let str = localStorage.getItem("stocks");
        if (str !== null){
            return JSON.parse(str);
        }}
        return [];
      }
       
    return (
        <div className='flex flex-row  h-screen w-screen justify-start py-10 pr-2 items-center text-xl gap-10 overflow-hidden bg-slate-950 text-white'>
            <div className="flex w-fit">
                <HamburgerMenu  bg={"white"} curPage={"gainsCalculator"}/>
            </div>
            <div id='content' className='flex flex-col justify-start bg-slate-400 w-full h-full items-center'>
                <div id='title' className='flex justify-center items-center text-4xl w-full h-fit'>Calculate Your Gains this year</div>
                <div id='total-gains' className={`flex justify-center items-center w-full text-3xl ${(parseFloat(totalGains) > 0) && 'text-green-500'} ${(parseFloat(totalGains) < 0) && 'text-red-500'}`}>${totalGains}</div>
                <div className='flex w-full h-full'>
                    <StockList />
                </div>
            </div>
        </div>
  )
}
