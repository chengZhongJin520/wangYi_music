import React, { useMemo } from 'react';
import { List } from "antd"
import { Link } from "react-router-dom"
function ListCom (props) {
    ;const { classname , enterCall =() =>{} , list , enter , active } = props
    ;const getList = () => {
        console.log( "list 渲染" );
        return list
    }
    ;const arr = useMemo( getList , [enter,active] )
    ;return arr.length > 0 && (
        <List dataSource={arr} className={classname} 
            renderItem={ ( { href , title , clsName , childrens } , index ) => {
                ;const hasChild = childrens && childrens.length > 0
                return (
                    <List.Item className={{ [clsName]:clsName , enter:enter===href , li:true , hasChild ,active:active===href}}
                        onMouseEnter={ (e) => enterCall(e,href,index) }
                        onMouseLeave={ (e) => enterCall(e,"",0) }
                    >
                        <Link to={ href } >
                            <span>
                                {title}
                            </span>
                        </Link>
                    </List.Item>
                )
            } }
        />
    )
}
export default ListCom