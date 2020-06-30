import React , { useMemo } from 'react';
import { Input } from "antd"
// import { UserOutlined } from '@ant-design/icons';
function InputCom (props) {
    ;const { hold , size = "small" , icon="" , classname='' , value="" , change=()=>{} } = props
    ;const val = useMemo(() => console.log( "input 渲染" ) && value , [value])
    
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
}
export default InputCom