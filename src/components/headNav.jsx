/*
 * @Author: 成中锦
 * @Date: 2020-06-20 16:32:19
 * @LastEditTime: 2020-06-30 14:24:05
 * @FilePath: \wangyi_music\src\components\headNav.jsx
 * @explain: 头部导航
 */ 

import React, { useContext , useState , useCallback , useRef , useMemo } from 'react';
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { State } from "../store"
import List from "./list"
import Btn from "./btn"
import Input from "./input"
import "../css/coms/headNav.css"
function Head ( props ) {
    ;const { headNav } = useContext( State )
    ;const [ enterOne , changeEnterOne ] = useState("")
    ;const [ enterTwo , changeEnterTwo ] = useState("")
    ;const [ inputVal , changeInputVal ] = useState("")
    ;const [ secondList , changeSecondList ] = useState([])
    ;const [ navString ] = useState(JSON.stringify(headNav))
    ;const firstListDom = useRef(null)
    ;const secondListDom = useRef(null)
    ;const nowRoute = props.location.pathname
    ;const navList = useMemo(() => JSON.parse(navString) ,[navString])
    //= 头部一级导航的mouse事件回调
    ;const enterCall = ( e , route , index ) => {
        ;const toTarget = e.relatedTarget
        ;const isChild = ( ref ) => !ref.current ? false : toTarget.nodeType && ref.current.contains(toTarget)
        ;if(!route && ( isChild(secondListDom) || isChild(firstListDom) )) return
        ;const childs = route && navList[index].childrens
        ;changeSecondList( childs && childs.length ? childs : [])
        ;changeEnterOne(route)
        ;changeEnterTwo(Math.random().toString())
    }
    //= 头部二级导航的mouse事件回调
    ;const secondEnterCall = ( e , route , index ) => {
        ;const toTarget = e.relatedTarget
        ;const isChild = ( ref ) => toTarget.nodeType && ref.current.contains(toTarget)
        ;if(!route &&  isChild(secondListDom)) return
        ;if( !route ) {
            ;changeEnterOne("")
            ;changeSecondList([])
        }
        ;changeEnterTwo(route)
    }
    ;const enterCall1 = useCallback(enterCall,[])
    ;const enterCall2 = useCallback(secondEnterCall,[])
    //= 创作者中心按钮回调
    ;const search = useCallback( e => { console.log(e) },[])
    //= 改变搜索框的值
    ;const change = useCallback( e => {
        changeInputVal(e.target.value)
    } ,[])
    return (
        <header>
            <div className="head-content clearFloat" >
                <Link to="/" id="logo" className="fl">网易云音乐</Link>
                <Link to="/login" className="fr login">登录</Link>
                <Btn value="创作者中心" call={ search } classname="fr head-search-btn" />
                <Input classname="fr input" hold="音乐/视屏/电台/用户" size="middle" icon="iconfont icon-search" value={inputVal} change={change}/>
                <div className="head-nav-box" ref={firstListDom}>
                    <List list={ navList } classname="head-nav" enter={enterOne} enterCall={enterCall1} />
                </div>
            </div>
            {
                secondList.length>0 && (
                    <div className="head-second-nav-box" ref={secondListDom}>
                        <div>
                            <List list={ secondList } classname="head-second-nav" enter={enterTwo} enterCall={enterCall2} active={nowRoute}/>
                        </div>
                    </div>
                )
            }
        </header>
    )
}
export default withRouter(Head)