/*
 * @Author: 成中锦
 * @Date: 2020-06-20 13:51:36
 * @LastEditTime: 2020-07-09 15:48:16
 * @FilePath: \wangyi_music\src\store\index.js
 */ 
import React, { createContext , useReducer , useEffect , useCallback } from 'react';
import Router from "../routers/index"
import state from "./state"
import { CHANGE_WINDOWWIDTH } from "./type"
import { Mutation } from "./commit"
;const commit = function({ call , val , name , res }) {
    ;let backData = undefined
    ;if( !name ) {
        ;backData = call(val)
    } else {
        ;let target = backData = res
        ;const names= name.split(".")
        ;const max = names.length - 1
        ;let time = 0
        ;while ( time < max) {
            target = target[ names[time] ]
            time++
        }
        ;target[names[max]] = call(val)
    }
    return backData
}
;const action = ( oldState , { type , val , name } ) => {
    // ;const commit = Mutation[type] || function() {}
    ;let res = JSON.parse(JSON.stringify(oldState))
    ;if( typeof type === "string" ) {
        ;res = commit({ call:Mutation[type] || function(){} , val , name , res })
    } else {
        ;type.forEach( name => {
            ;const key = name.replace("change_","")
            
            ;let value = undefined
            ;switch (key) {
                case "new_album":
                    value = val.$recommend
                    break;
                case "music_list":
                    value = val.$$recommend
                    break;
                default:
                    value = val[key]
                    break;
            }
            ;res = commit({ call:Mutation[name] || function(){} , val:value , name:value.name , res })
        } )
    }
    console.log( "%c 修改store" , "font-size:20px;color:red;" );
    ;return res 
}

;export const State = createContext(null)
;export const Store = () => {
    ;const value = {}
    ;const obj = {}
    ;const resize = useCallback((e) => {
        obj.windowWidth[1]({type:CHANGE_WINDOWWIDTH,val:window.innerWidth})
    },[obj.windowWidth])
    ;obj.headNav = useReducer( action , state.headNav )
    ;obj.home = useReducer( action , state.home )
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