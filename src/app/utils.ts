export class Stock{
    ticker:String;
    price:Number;
    units:Number;
    sell_price:Number|null;
    
    dividendPayments: Array<Number>;
    constructor(ticker:string, price:Number, units:Number, sell_price:Number|null, dividendPayments:Array<Number>){
        this.ticker = ticker;
        this.price = price;
        this.units = units;
        this.sell_price = sell_price;
        this.dividendPayments = dividendPayments;
    }

    calculateDividendYields():Array<Number>|[] {
        if (this.dividendPayments.length > 0){
            return this.dividendPayments.map((x)=>{return Number(x)/Number(this.price)})
        }
        return [];
    }

    
}

export function getAllUnits(stocks: Array<Stock>):Number|number{
    
    return stocks.reduce((acc, stock)=>acc += Number(stock.units),0);
}
