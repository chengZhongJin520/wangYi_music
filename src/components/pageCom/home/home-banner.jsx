import React, { useState , useMemo , useContext } from 'react';
import { Link } from 'react-router-dom' 
import { State as Store } from "../../../store"
import Banner from "../../banner"
import { useCallback } from 'react';
function Home_bannerCom () {
    ;const { windowWidth , home:{bannerList =[] }} = useContext(Store)
    ;const [conf] = useState({
        boxheight: 285
        ,btnwidth:38
        ,btnheight:64
        ,controlBoxwidth:769
        ,playtime:4000
        ,playtype:"opacity"
        ,playauto:true
    })
    ;const [ bannerActive , change_bannerActive ] = useState(0)
    ;const bg = useMemo(() => {
        ;const active = bannerList[bannerActive]
        ;return active ? `url(${active.imgSrc}?imageView&blur=40x20)` : "#ccc"
    } ,[bannerList , bannerActive])
    ;const change = useCallback(active => change_bannerActive(active),[])
    return (
        <div style={{ width:windowWidth-17+"px" ,background:bg }} className="banner-background-box">
            <div className="page-content">
                {
                    bannerList.length > 0 && <Banner list={bannerList} Active={bannerActive} change={change} config={conf}/>
                }
                <div className="download-box">
                    <Link to="/download" className="download-img">下载客户端</Link>
                    <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    <span className="shadow"></span>
                    <span className="shadowr"></span>
                </div>
            </div>
        </div> 
    )
}
export default Home_bannerCom