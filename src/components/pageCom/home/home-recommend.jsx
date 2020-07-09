import React, { useContext , useCallback , Fragment} from 'react';
// import { Link } from 'react-router-dom' 
import { State as Store } from "../../../store"
import CardTitle from "../../card-title"
import { useMemo } from 'react';
import { useState } from 'react';
import Login from "./card-login"
function Home_recommendCom () {
    ;const { home:{recommend =[] ,slide ={} }} = useContext(Store)
    ;const [loginState] = useState(false)
    ;const loadCom = useCallback( url => require(`../../../components${url}.jsx`) ,[] )
    ;const coms = useMemo(() => {
        ;const arr = [...recommend]
        ;if( !loginState ) arr.splice(1,1)
        ;return arr
    },[loginState, recommend])
    return (
        <div className="music-list">
            <div className="card-list">
                {
                    coms.map( ({ name , titleList , noMore , childsrc , childs , data }) => {
                        ;const ChildCom = childsrc && loadCom(childsrc);
                        ;return (
                            <Fragment key={name}>
                                <CardTitle name={name} list={titleList} noMore={noMore} />
                                {
                                    ChildCom && childs.length > 0 && <ChildCom.default list={childs} data={data}/>
                                }
                            </Fragment>
                        )
                    } )
                }
            </div>
            <div className="card-side">
                <Login val={loginState}/>
                <div className="slide-card">
                    {
                        Object.keys(slide).map( key => {
                            ;const { title , list , noMore , btnText , childsrc , childClass } = slide[key]
                            ;const ChildCom = childsrc && loadCom(childsrc);
                            return (
                                <Fragment key={key}>
                                    <div className="slide-card-title" >
                                        <span className="fl">{title}</span>
                                        { !noMore && <span className="fr">查看全部&gt;</span> }
                                    </div>
                                    {
                                        ChildCom && list.length>0 && <ChildCom.default list={list} childClass={childClass}/>
                                    }
                                    {
                                        btnText && <button> <i>{btnText}</i> </button>
                                    }
                                </Fragment>
                            )
                        } )
                    }
                </div>
                <i className="right-line"></i>
            </div>
        </div>
    )
}
export default Home_recommendCom