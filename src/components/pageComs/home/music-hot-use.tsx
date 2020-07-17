import React, { memo } from 'react';
import { Link } from "react-router-dom"

const musicHotUse:React.FC<{childClass:string , list:Array<any>}> = memo( ({childClass , list}) => {
    return (
        <div className={childClass}>
            {
                list.map(item => {
                    return (
                        <Link to={`/user/home?id=${item.id}`} style={{backgroundImage:`url(${item.imgSrc})`}} key={item.id}>
                            <div className="fr">
                                <p>{item.nickName}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
})
export default musicHotUse