
import React, { memo , forwardRef , useRef , useImperativeHandle } from 'react';
interface Props {
    call?:any;
    value?:string;
    type?:"button" | "submit" | "reset";
    classname?:string;
}
export default memo( forwardRef((props:Props , ref?:any) => {
    ;const { call , value , type="button", classname } = props
    const btn = useRef(null)
    useImperativeHandle(ref ,() => btn.current ,[])
    console.log( type );
    return (
        <button className={classname} type={type} onClick={call} ref={btn}>{ value }</button>
    )
}))