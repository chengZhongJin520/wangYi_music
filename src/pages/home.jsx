/*
 * @Author: 成中锦
 * @Date: 2020-06-20 13:28:32
 * @LastEditTime: 2020-07-03 15:43:24
 * @FilePath: \wangyi_music\src\pages\home.jsx
 */ 
import React , { Fragment , useContext , useEffect , useCallback , useState } from 'react';
import { State as Store } from "../store"
// import { CHANGE_BANNERLIST } from "../store/type"
import { pageSend } from "../store/commit"

import HomeBanner from "../components/pageCom/home/home-banner"
import HomeRecommend from "../components/pageCom/home/home-recommend"
import "../css/pages/home.css"

function App () {
    ;const { dispatchhome , home:{recommend}} = useContext(Store)
    ;const [hotRecommend_length] = useState(recommend[0].childLength)
    ;const send = useCallback( async ()=> {
        console.log( "首页请求数据" );
        await pageSend.HOME({size:hotRecommend_length ,call:dispatchhome})
    },[dispatchhome, hotRecommend_length])
    ;useEffect(()=> {send()},[send])
    ;return (
        <Fragment>
            {/* 轮播组件 */}
            <HomeBanner />

            {/* 推荐 */}
            <HomeRecommend />
        </Fragment>
    )
}
export default App