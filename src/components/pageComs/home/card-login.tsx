/*
 * @Author: 成中锦
 * @Date: 2020-07-09 14:00:59
 * @LastEditTime: 2020-07-17 15:09:22
 * @FilePath: \myMusic\src\components\pageComs\home\card-login.tsx
 * @explain: 
 */ 
import React, { memo } from 'react';
import "../../../css/coms/card-login.css"

const cardLogin:React.FC<{val:boolean}> = memo( ({val}) => {
    return val ? 
    (
        <div></div>
    ) : 
    (
        <div className="card-load">
            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <button title="用户登录">用户登录</button>
        </div>
    )
})
export default cardLogin