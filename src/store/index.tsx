import React, { memo , createContext , useReducer , useEffect , useCallback } from 'react';
import States from "./state";
import Router from "../router"
import { Mutations } from "./commit"
import { actionTest } from '../test/store'
export const Store:any = createContext({});
const Action = (state:any , action:any):any => {
    const { type , value }:actionTest = action
    const data = JSON.parse( JSON.stringify(state) )
    const mutation:any = Mutations
    if( type ) {
        mutation[type] && mutation[type].call(data ,value) 
    } else {
        Object.keys(action).forEach( (key:string ) => {
            let commit = mutation[key]
            commit && commit.call(data , action[key])
        })
    }
    console.log( "%c store修改完成","color:red;font-size:18px;" );
    return data
} 
States.windowWidth = window.innerWidth
export const StoreView:React.FC<{}> = memo((props) => {
    const [ State , changeState ] = useReducer(Action , States)
    const resize = useCallback(():number => {
        changeState({ type: "change_windowWidth" , value: window.innerWidth})
        return window.innerWidth
    } ,[])
    useEffect( () =>{
        window.addEventListener( "resize" , resize );
        return ():void => window.removeEventListener("resize" , resize)
    } , [resize] )
    return (
        <Store.Provider value={{ State , changeState }}>
            <Router />
        </Store.Provider>
    )
})