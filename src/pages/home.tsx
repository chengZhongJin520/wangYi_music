/*
 * @Author: 成中锦
 * @Date: 2020-07-14 14:31:48
 * @LastEditTime: 2020-07-17 10:51:51
 * @FilePath: \myMusic\src\pages\home.tsx
 * @explain: 
 */ 
import React, { memo , useContext , Fragment , useEffect , useState } from 'react';
import { Store } from "../store"
import "../css/pages/home.css"
import HomeBanner from "../components/pageComs/home/home-banner"
import HomeRecommend from "../components/pageComs/home/home-recommend"
import { pageSend } from "../store/commit"
import { stateTest } from "../test/home"

const Home:React.FC<{}> = memo((props) => {
    const { State:{ home:{recommend}} , changeState } = useContext<stateTest>(Store)
    const [hotRecommend_length]:[number,any] = useState<number>(recommend[0].childLength)
    console.log( "home 加载" );
    useEffect( ():void => {
        const send = async () => await pageSend.HOME({size:hotRecommend_length ,call:changeState})
        send()
        console.log( "发送请求" );
    },[changeState, hotRecommend_length])
    return (
       <Fragment>
           {/* 轮播组件 */}
           <HomeBanner />
           {/* 推荐 */}
           <HomeRecommend />
       </Fragment>
    )
})
export default Home