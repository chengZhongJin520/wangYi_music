import React, { memo } from 'react';
import { Link } from "react-router-dom"

export default memo( ({list , childClass}) => {
    return (
       <div className={childClass}>
           {
               list.map(item => {
                    return (
                        <Link to={`/user/home?id=${item.id}`} style={{backgroundImage:`url(${item.imgSrc})`}} key={item.id}>
                            <div className="fr">
                                <p>{item.name}</p>
                            </div>
                        </Link>
                    )
               })
           }
           
       </div>
    )
})