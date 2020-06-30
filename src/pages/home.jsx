/*
 * @Author: 成中锦
 * @Date: 2020-06-20 13:28:32
 * @LastEditTime: 2020-06-30 09:52:57
 * @FilePath: \wangyi_music\src\pages\home.jsx
 */ 
import React , { Fragment , useContext , useEffect , useCallback , useState } from 'react';
import { State as Store } from "../store"
import { CHANGE_BANNERLIST } from "../store/type"
import { Action } from "../store/commit"
import Banner from "../components/banner"
import "../css/pages/home.css"
;const bannerConf = {
    boxheight: 285
    ,btnwidth:38
    ,btnheight:64
}
function App () {
    ;const { dispatchbannerList , bannerList , windowWidth } = useContext(Store)
    ;const send = useCallback( async ()=> {
        ;const res = await Action[CHANGE_BANNERLIST]()
        ;dispatchbannerList({type:CHANGE_BANNERLIST,val:res[0]})
    },[dispatchbannerList])
    
    ;const [ bannerActive , change_bannerActive ] = useState(0)
    ;const [ bannerConfig ] = useState(JSON.stringify(bannerConf))
    ;useEffect(()=> {send()},[send])
    console.log( "首页 =============> 渲染" , bannerList);
    return (
        <Fragment>
            {
                bannerList.length > 0 && <div style={{ width:windowWidth+"px" ,backgroundImage:`url(${bannerList[bannerActive].imageUrl}?imageView&blur=40x20)` }} className="banner-background-box">
                <div className="page-content">
                    <Banner list={bannerList} Active={bannerActive} change={change_bannerActive} config={bannerConfig}/>
                </div>
            </div>
            }
        </Fragment>
    )
}
export default App