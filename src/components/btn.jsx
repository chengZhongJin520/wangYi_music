import React from 'react';
// import { Button } from "antd"

function BtnCom (props) {
    ;const { call , value , type="button", classname } = props
    return (
        <button className={classname} type={type} onClick={call}>{ value }</button>
    )
}
export default BtnCom