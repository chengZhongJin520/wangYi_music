/*
 * @Author: 成中锦
 * @Date: 2020-07-16 17:39:41
 * @LastEditTime: 2020-07-17 14:21:33
 * @FilePath: \myMusic\src\components\common\music-card.tsx
 * @explain: 
 */ 
import React, { memo , useState } from 'react';
import { Link } from "react-router-dom"
import "../../css/commonCom/music-card.css"
interface Props {
    list:Array<any>;
    data?:any;
}
interface Parmas {
    id:number ; 
    imgSrc:string ;
    name:string ; 
    playCount:number ;
}
const musicCard = memo( (props:Props) => {
    const [list]:[Array<any>,any] = useState<Array<any>>(props.list)
    console.log("music-card.tsx" );
    return (
        <ul className="music-card">
        {
            list.map( ({ id , imgSrc , name , playCount}:Parmas , index) => {
                return (
                    <li key={id + index}>
                        {/* alt={name} */}
                        <Link to="#" title={name} style={{backgroundImage:`url(${imgSrc})`}} className="cover-img" ></Link>
                        <Link to="#" title={name} className="card-info">{ name }</Link>
                        <div className="music-btn">
                            <i className="music-headset"></i>
                            <span className="music-user">{ playCount < 10000 ? playCount : Math.round(playCount / 10000) }万</span>
                            <button className="music-play"></button>
                        </div>
                    </li>
                )
            } )    
        }
    </ul>
    )
})
export default musicCard