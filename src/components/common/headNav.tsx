import React, { memo , useContext , useMemo , useRef , useState , useCallback } from 'react';
import { Link , withRouter} from "react-router-dom"
import { Store } from "../../store"
import List from "./list"
import Btn from "./btn"
import Input from "./input"
import "../../css/commonCom/headNav.css"
interface storeDefine {
    State:{
        headNav:Array<any>
    }
}
;const Head = memo((props:any) => {
    const nowRoute:string = props.location.pathname
    const store:storeDefine = useContext<any>( Store )
    const navList = useMemo<any>(() => store.State.headNav,[store.State.headNav])
    const firstListDom = useRef<null>(null)
    const secondListDom = useRef<null>(null)
    const btn = useRef<null>(null)
    const [ enterOne , changeEnterOne ] = useState<string>("")
    const [ enterTwo , changeEnterTwo ] = useState<string>("")
    const [ inputVal , changeInputVal ] = useState<string>("")
    const [ secondList , changeSecondList ] = useState<Array<any>>([])

    //= 一级导航栏mouseenter回调
    const enterCall1 = useCallback((e:any , route:string , index:number) => {
        const toTarget:Element = e.relatedTarget;
        const isChild = ( ref:{current?:HTMLElement|undefined|null} ) => !ref.current ? false : toTarget.nodeType && ref.current.contains(toTarget);

        // eslint-disable-next-line no-mixed-operators
        if(!route && ( isChild(secondListDom) || isChild(firstListDom) && toTarget.nodeName !=="UL" || route === enterOne )) return;
        const item = navList[index];
        const childs = route && item?.childrens ? item.childrens : [];
        changeEnterOne(route);
        console.log( "鼠标移动到一级导航栏上了" );
        if( childs.length < 1 && secondList.length < 1 ) return 
        changeSecondList( childs );
    },[enterOne, navList, secondList.length]);

    //= 二级导航栏mouseenter回调
    const enterCall2 = useCallback((e:any , route:string , index:number) => {
        ;const toTarget = e.relatedTarget
        ;const isChild = ( ref:{current:HTMLElement|undefined|null} ) => toTarget.nodeType && ref.current?.contains(toTarget)
        ;if(!route &&  isChild(secondListDom)) return
        ;if( !route ) {
            ;changeEnterOne("")
            ;changeSecondList([])
        }
        ;changeEnterTwo(route)
    },[]);

    //= 创作者中心按钮回调
    const search = useCallback<any>( (e:any) => { console.log(e) },[]);

    //= 改变搜索框的值
    const change = useCallback( (e:any) => changeInputVal(e.target.value),[]);
    return (
        <header>
        <div className="head-content clearFloat" >
            <Link to="/" id="logo" className="fl">网易云音乐</Link>
            <Link to="/login" className="fr login">登录</Link>
            <Btn value="创作者中心" call={ search } classname="fr head-search-btn" ref={btn} />
            <Input classname="fr input" hold="音乐/视屏/电台/用户" size="middle" icon="iconfont icon-search" value={inputVal} change={change}/>
            {/* onMouseLeave={ (e:any) => enterCall1(e,"",0) } */}
            <div className="head-nav-box" ref={firstListDom} >
                <List list={ navList } classname="head-nav" enter={enterOne} enterCall={enterCall1}  />
            </div>
        </div>
        {
            secondList.length>0 && (
                <div className="head-second-nav-box" ref={secondListDom}>
                    <div>
                        <List list={ secondList } classname="head-second-nav" enter={enterTwo} enterCall={enterCall2} active={nowRoute} />
                    </div>
                </div>
            )
        }
    </header>
    )
})
export default withRouter(Head)