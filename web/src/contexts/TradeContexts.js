import {createContext, useReducer}from 'react'
import React from 'react';
export const TradeContext=createContext()
export const TradeReducer=(state,action)=>{
    switch(action.type){
        case 'SET_CATEGORIES':
            return{
                categories:action.payload
            }
         
        default:
            return state
    }
}
export const TradeContextProvider=({children})=>{
    const[state,dispatch]=useReducer(TradeReducer,{
        categories:null
    })
    return(
        
        <TradeContext.Provider value={{...state,dispatch}}>
            {children}
        </TradeContext.Provider>
    )
}