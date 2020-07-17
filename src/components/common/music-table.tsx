/*
 * @Author: 成中锦
 * @Date: 2020-07-16 17:41:08
 * @LastEditTime: 2020-07-17 15:25:34
 * @FilePath: \myMusic\src\components\common\music-table.tsx
 * @explain: 
 */ 
import React, { memo } from 'react';
import { Link } from "react-router-dom"
import "../../css/commonCom/music-table.css"
interface params {
    name?:string;
    imgSrc?:string;
    id:number;
    childs?:Array<any>;
}
const musicTable:React.FC<{list:Array<any>}> = memo( ({list}) => {
    return (
        <div className="music-table">
            {
                list.map( ({ name , id , imgSrc , childs }:params , index) => {
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
                                childs instanceof Array && childs.map( (child:{id:number,name:string} , index:number) => {
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
export default musicTable