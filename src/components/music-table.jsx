/*
 * @Author: 成中锦
 * @Date: 2020-07-03 16:40:56
 * @LastEditTime: 2020-07-09 16:29:25
 * @FilePath: \wangyi_music\src\components\music-table.jsx
 * @explain: 音乐榜单
 */ 
import React, { memo } from 'react';
import { Link } from "react-router-dom"
import "../css/coms/music-table.css"

export default memo( ({list}) => {
    console.log(`\\components\\music-table.jsx -> 音乐榜单渲染`);
    return (
        <div className="music-table">
            {
                list.map( ({ name , id , imgSrc , childs } , index) => {
                    return (
                        <dl key={id + index}>
                            <dt>
                                <Link className="table-img-link" to={`/discover/toplist?id=${id}`} title={name} style={{backgroundImage:`url(${imgSrc})`}}></Link>
                                <div className="table-tit">
                                    <Link className="table-tit-link" to={`/discover/toplist?id=${id}`} title={name}>{name}</Link>
                                    <br />
                                    <button className="table-play" title="播放"></button>
                                    <button className="table-save" title="收藏"></button>
                                </div>
                            </dt>
                            {
                                childs instanceof Array && childs.map( (child , index) => {
                                    return (
                                        <dd key={child.id}> 
                                            <span>{index+1}</span> 
                                            <Link title={child.name} to={`/song?id=${child.id}`}>{child.name}</Link>
                                        </dd>
                                    )
                                })
                            }
                            <dd>
                                <Link to="/discover/toplist" >加载更多&gt;</Link>
                            </dd>
                        </dl>
                    )
                })
            }
        </div>
    )
})
// module.exports = Music_tableCom