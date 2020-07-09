/*
 * @Author: 成中锦
 * @Date: 2020-07-03 16:40:56
 * @LastEditTime: 2020-07-09 10:26:11
 * @FilePath: \wangyi_music\src\components\music-card.jsx
 * @explain: 图片加描述的卡片
 */ 
import React, { memo , useState } from 'react';
import { Link } from "react-router-dom" 
import "../css/coms/music-card.css"
const Music_cardCom = memo( props => {
    ;const [list] = useState(props.list)
    console.log( "card渲染" );
    return (
        <ul className="music-card">
            {
                list.map( ({ id , imgSrc , name , playCount} , index) => {
                    return (
                        <li key={id + index}>
                            <Link to="#" alt={name} title={name} style={{backgroundImage:`url(${imgSrc})`}} className="cover-img" ></Link>
                            <Link to="#" alt={name} title={name} className="card-info">{ name }</Link>
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
export default Music_cardCom
// module.exports = Music_cardCom