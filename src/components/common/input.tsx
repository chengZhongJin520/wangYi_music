import React, { memo , useMemo } from 'react';
import { Input } from "antd"
interface Props{
    hold?:string;
    size?:'small' | 'middle' | 'large' | undefined;
    icon?:string;
    classname?:string;
    value?:string;
    change?:any;
}
export default memo( (props:Props) => {
    ;const { hold="" , size = "small" , icon="" , classname='' , value="" , change=()=>{} } = props
    ;const val = useMemo(():string => {
        console.log( "input 渲染" )
        return value
    } , [value])
    
    ;if( icon ) {
        return (
            <div className={`${classname} input-box`} >
                <Input placeholder={hold} size={size} style={{ paddingLeft:"30px" }}
                    value={val} onChange={change}
                />
                <i className={`input-before-icon ${icon}`} ></i>
                <style >{`
                    .input-box{
                        position:relative;
                    }
                    .input-before-icon{
                        position:absolute;
                        left:1px;
                        top:1px;
                        width:30px;
                        height:calc(100% - 2px);
                        line-height:unset;
                        text-align: center;
                    }
                `}</style>
            </div>
        )
    } else {
        return (
            <Input placeholder={hold} size={size} value={val} 
                className={classname} onChange={change}
            />
        )
    }
})