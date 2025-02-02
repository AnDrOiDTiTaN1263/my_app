"use client"
import React, { useEffect, useState } from "react";
import {Stock} from './utils';
import HamburgerMenu from "./_components/hamburgerMenu";
import StockList from "./_components/StockList";

export default function Home() {
  const [stocks, addStock] = useState(Array<Stock>);
  const [shownStocks, setShown] = useState(stocks);
  const [price, setPrice] = useState("");
  const [totalInvested, setTotalInvested] = useState(0.00);
  const [ticker, setTicker] = useState("");
  const [units, setUnits] = useState("");
  const [error, setError] = useState(false);
  // used to indicate that an update is required for stocks to be set into localstorage
  const [update,setUpdate] = useState(false);
  
  function setStocks(stocks:Stock[]){
    try{
        localStorage.setItem("stocks",JSON.stringify(stocks))
    }catch (e:any){
        console.log(e);
    }
  }
  useEffect(()=>{
    if (update){
      localStorage.setItem("stocks", JSON.stringify(stocks));
      setTotalInvested(stocks.reduce((accumulator,curr)=>accumulator+(Number(curr.price)*Number(curr.units)),0))
      setUpdate(false);
    }
  }, [update])
  useEffect(()=>{
    let str = localStorage.getItem("stocks");
    if (str !== null){
        addStock(JSON.parse(str));
        setUpdate(true);
    }
  }, [])

  const handleAddStock = (e:any)=>{
    e.preventDefault();
    if(units.length > 0 && ticker.length > 0 && price.length >0){
      let index = stocks.findIndex((x)=>x.ticker === ticker.toUpperCase());
      if (index === -1){
        addStock([...stocks, new Stock(ticker.toUpperCase(), parseFloat(price), parseInt(units), null, [])])
      }else{
        let new_units = Number(stocks[index].units)+  parseInt(units);
        stocks[index].price = Number(stocks[index].price)*(Number(stocks[index].units)/new_units)+Number(parseFloat(price)*(parseFloat(units)/new_units))
        stocks[index].units =new_units;
      }
      setTotalInvested(totalInvested + parseFloat(price)*parseInt(units));
      setStocks(stocks);
      setUpdate(true);
    }else{
      setError(true);
    }
  }

  const handleRemove = (e:any)=>{
    e.preventDefault();
    const id = parseInt(e.target.id);
    if (stocks.length > 1){
      setTotalInvested(totalInvested-(Number(stocks[id].price)*Number(stocks[id].units)));
    }else{
      setTotalInvested(0)
    }
    stocks.splice(id,1);
    setStocks(stocks);
  }
  
  const handleInputChange = (e:any)=>{
  if (e.target.id === "ticker"){
    setTicker(e.target.value);
  }else if (e.target.id === "price"){
    e.target.value =  e.target.value.replace(/([A-Z]|[a-z])*/,"")
    e.target.value = e.target.value.replace(/\s/g,'')

    setPrice(e.target.value);
  }else if (e.target.id === "units"){
    console.log(e.target.value);
    e.target.value = e.target.value.replace(".", "");
    e.target.value =  e.target.value.replace(/([A-Z]|[a-z])*/,"")
    e.target.value = e.target.value.replace(/\s/g,'')
    setUnits(e.target.value);
  }
}
useEffect(()=>{
  if (error === true){
    setTimeout(() => {
      setError(false);
    }, 2500);
  }
},[error])

  return (
    <div className="flex flex-row  h-screen w-screen justify-start py-10 pr-2 items-center text-xl gap-10 overflow-hidden">
      <div className="flex w-fit">
        <HamburgerMenu curPage="home" />
      </div>
      <div className="flex flex-col h-screen w-full justify-start py-10 items-center text-xl gap-10 overflow-hidden ">
        {error && <div className="absolute bg-red-400 text-white rounded-full px-2 animate-pulse">Input fields can not be empty</div>}
        <div>Stock Portfolio tracker</div>
        <div>Total Invested: ${totalInvested.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        <div id="input-form" className="flex flex-col w-3/4 h-fit justify-center items-center rounded-xl border-2 border-black">
          <div id="labels" className="flex flex-row justify-between w-full p-2 px-5">
            <div className="flex items-center justify-center w-full h-full">Ticker</div>
            <div className="flex items-center justify-center w-full h-full">Units</div>
            <div className="flex items-center justify-center w-full h-full">Price</div>
          </div> 
          <div id="inputs" className="flex flex-row justify-between w-full p-2 px-5 gap-5">
            <input id="ticker" className="flex justify-center w-full h-full px-2 border-2 border-black rounded-full" placeholder="XYZ"   onChange={handleInputChange}/>
            <input id="units" className="flex justify-center w-full h-full px-2 border-2 border-black rounded-full" placeholder="100"    onChange={handleInputChange}/>
            <input id="price" className="flex justify-center w-full h-full px-2 border-2 border-black rounded-full" placeholder="100.00" onChange={handleInputChange}/>
            <div className="rounded-full border-2 border-black flex w-1/4 justify-center hover:bg-slate-900 hover:text-white transition-all duration-500 ease-in-out cursor-pointer" onClick={handleAddStock}>Add</div>
          </div>
        </div>
        
        <StockList update={update} setUpdate={setUpdate} handleRemove={handleRemove}/>
      </div>
    </div>
  );
}
