import { TradeContext } from "../contexts/TradeContexts";
import { useContext } from "react";
export const useTradeContext=()=>{
    const context=useContext(TradeContext)

    if(!context){
        throw Error('useTradeContext must be used inside an TradeContextProvider')
    }

    console.log("context",context)
    return context
}