import React, {  } from 'react';
import "../css/coms/card-title.css"
function cardTitleComs (props) {
    ;const { name , list , noMore } = props
    return (
        <div className="card-title clearFloat">
            <h3>{name}</h3>
            {
                list.length > 0 && 
                <ul>
                    {
                        list.map(item => <li key={item}>{item}<span>|</span></li>)
                    }
                </ul>
            }
            {
                !noMore && 
                <div className="more">更多 <i className="iconfont icon-youjiantou"></i> </div>
            }
        </div>
    )
}
export default cardTitleComs