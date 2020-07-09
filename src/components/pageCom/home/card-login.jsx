/*
 * @Author: 成中锦
 * @Date: 2020-07-09 14:00:59
 * @LastEditTime: 2020-07-09 14:02:29
 * @FilePath: \wangyi_music\src\components\pageCom\home\card-login.jsx
 * @explain: 
 */ 
import React, { memo } from 'react';
import "../../../css/coms/pageCom/card-login.css"

export default memo( props => {
    console.log( props );
    return (
       <div className="card-load">
           <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
           <button title="用户登录">用户登录</button>
       </div>
    )
})