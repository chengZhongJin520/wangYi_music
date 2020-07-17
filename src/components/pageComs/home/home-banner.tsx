import React, { memo , useContext , useState , useMemo , useCallback} from 'react';
import { stateTest } from "../../../test/home"
import { Store } from "../../../store"
import { Link } from "react-router-dom"
import Banner from "../../common/banner"
const HomeBanner:React.FC<{}> = memo( (props:any) => {
    const { State:{home:{bannerList},windowWidth} } = useContext<stateTest>(Store)
    const [conf] = useState({
        boxheight: 285,
        btnwidth:38,
        btnheight:64,
        controlBoxwidth:769,
        playtime:4000,
        playtype:"opacity",
        playauto:false,
        playpause:true
    })
    const [ bannerActive , change_bannerActive ] = useState(0)
    console.log( bannerActive , windowWidth );
    ;const bg = useMemo(() => {
        const active:any = bannerList[bannerActive]
        return active ? `url(${active.imgSrc}?imageView&blur=40x20)` : "#ccc"
    } ,[bannerList , bannerActive])
    const change = useCallback(active => change_bannerActive(active),[])
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
})
export default HomeBanner