import React, { useMemo } from 'react';
import { Link } from "react-router-dom"

import "../css/coms/banner.css"
// 默认设置项
;const defaultConfig = {
    boxheight:300
    // 按钮设置项
    ,btnwidth:40
    ,btnheight:80
}
function BannerCom (props) {
    ;const { list=[] , active=0 , change=()=>{} , config=""} = props
    ;const newList = useMemo(() => [ list[list.length-1] ,...list , list[0] ] , [list])
    ;const conf = useMemo(() => {
        ;const conf = {
            box:{}
            ,btn:{}
            ,control:{}
            ,banner:{}
        }
        ;const newConf = JSON.parse(config)
        ;Object.keys(defaultConfig).forEach(key => {
            ;if( /^box/.test(key) ) {
                ;conf.box[`${key.replace("box","")}`] = newConf[key] || defaultConfig[key]
            } else 
            if( /^btn/.test(key) ) {
                ;conf.btn[`${key.replace("btn","")}`] = newConf[key] || defaultConfig[key]
            } else 
            if( /^control/.test(key) ) {
                ;conf.control[`${key.replace("control","")}`] = newConf[key] || defaultConfig[key]
            } else {
                ;conf.banner[key] = newConf[key] || defaultConfig[key]
            }
        } )
        console.log( config ,"banner设置项改变" );
        ;return conf
    } , [config])
    console.log( newList );
    return (
        <div className="banner-box" style={conf.box}>
            <div className="banner-left-btn" style={conf.btn}>
                <svg t="1593421081078" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1325" width="200" height="200"><path d="M294.134 512c0-13.701 5.232-27.402 15.667-37.847l328.704-328.694c20.91-20.91 54.804-20.91 75.704 0 20.9 20.9 20.9 54.794 0 75.705L423.363 512l290.836 290.836c20.9 20.9 20.9 54.805 0 75.705-20.9 20.91-54.794 20.91-75.704 0L309.79 549.847c-10.435-10.445-15.657-24.146-15.657-37.847z" p-id="1326"></path></svg>
            </div>
            <div className="banner-rigth-btn" style={conf.btn}>
                <svg t="1593420941824" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1199" width="200" height="200"><path d="M714.199 549.847L385.495 878.541c-20.91 20.91-54.804 20.91-75.704 0-20.9-20.9-20.9-54.805 0-75.705L600.637 512 309.801 221.164c-20.9-20.91-20.9-54.805 0-75.705 20.9-20.91 54.794-20.91 75.704 0L714.21 474.153c10.445 10.455 15.667 24.146 15.667 37.847s-5.232 27.402-15.677 37.847z" p-id="1200"></path></svg>
            </div>
            <div className="banner-view" style={conf.banner}>
                <ul style={{ width:`${newList.length * 100}%` }}>
                    {
                        newList.map( (item , index) => (
                            <li key={item.imageUrl + index}>
                                <Link to={item.url || "/"}>
                                    <img src={item.imageUrl} alt={item.typeTitle}/>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="banner-control" style={conf.control}></div>
        </div>
    )
}
export default BannerCom