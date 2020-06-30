/*
 * @Author: 成中锦
 * @Date: 2020-06-20 13:51:36
 * @LastEditTime: 2020-06-29 17:18:14
 * @FilePath: \wangyi_music\src\store\index.js
 */ 
import React, { createContext , useReducer , useEffect , useCallback } from 'react';
import Router from "../routers/index"
import state from "./state"
import { CHANGE_WINDOWWIDTH } from "./type"
import { Mutation } from "./commit"
;const action = ( oldState , action ) => {
    ;const commit = Mutation[action.type] || function() {}
    ;const res = commit(action.val)
    ;return res || oldState
}

;export const State = createContext(null)
;export const Store = () => {
    ;const value = {}
    ;const obj = {}
    ;const resize = useCallback((e) => {
        obj.windowWidth[1]({type:CHANGE_WINDOWWIDTH,val:window.innerWidth})
    },[])
    ;obj.headNav = useReducer( action , state.headNav )
    ;obj.bannerList = useReducer( action , state.bannerList )
    ;obj.windowWidth = useReducer( action , window.innerWidth )
    ;useEffect(() => {
        window.addEventListener("resize", resize)
        ;return () => window.removeEventListener("resize", resize)
    } ,[resize])
    ;Object.keys( state ).forEach( key => {
        ;const item = obj[key]
        ;if( item ) {
            ;value[key] = item[0]
            ;value[`dispatch${key}`] = item[1]
        }
    } )
    return (
        <State.Provider value={value}>
            <Router />
        </State.Provider>
    )
}