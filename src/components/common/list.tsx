import React, { memo , useMemo } from 'react';
import { List } from "antd"
import { Link } from "react-router-dom"
interface Prop {
    classname?:string|undefined;
    enterCall?:any ;
    list:Array<any> ;
    enter?:string|undefined ;
    active?:string|undefined ;
}
interface params {
    href:string;
    title:string;
    clsName:string;
    childrens:Array<any>;
}
export default memo((props:Prop):any => {
    const { classname , enterCall = () =>{} , list , enter , active } = props;
    const getList = () => {
        console.log( "list 渲染" );
        return list
    };
    const arr = useMemo( getList , [enter,active] );
    return arr.length > 0 && (
        <List dataSource={arr} className={classname} 
            renderItem={ ( { href , title , clsName , childrens }:params , index:number ) => {
                ;const hasChild = childrens && childrens.length > 0
                ;let cla = `li ${clsName?clsName:""} ${enter===href?"enter":""} ${hasChild?"hasChild":""} ${active===href?"active":""}`
                return (
                    <List.Item className={cla}
                        onMouseEnter={ (e:any) => enterCall(e,href,index) }
                        onMouseLeave={ (e:any) => enterCall(e,"",0) }
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
})