import React, { useMemo , useState , useCallback , useRef , useEffect , memo } from 'react';
import { Link } from "react-router-dom"
import { bannerParams , bannerConf , bannerUlStyle } from "../../test/home"
import "../../css/commonCom/banner.css"
// 默认设置项
const defaultConfig:any = {
    boxheight:300
    // 按钮设置项
    ,btnwidth:40
    ,btnheight:80
    ,controlBoxwidth:"100%"
    ,controlshow:true
    ,playtime:2000
    ,playtype:'left'
    ,playauto:false
    ,playpause:false
}
const BannerCom = memo((props:bannerParams) => {
    ;const { list=[] , Active=0 , change=()=>{} , config={} } = props
    //= 控制动画的暂停和播放
    ;const [pause , changePause]:[string|boolean,any] = useState<boolean|string>( false )
    ;const [opacity , changeOpacity]:[string|number,any] = useState<number|string>( 1 )
    //= 当前轮播页
    ;const [nowActive , changeNowActive]:[any,any] = useState<number|string>( Active )
    //= banner的dom元素
    ;const banner = useRef<any>(null)
    //= 动画id
    ;const animate = useRef<any>(null)
    //= 判断是否是子元素
    ;const isChild = useCallback(( ref , toTarget) => !ref.current || !toTarget ? false : toTarget.nodeType && ref.current.contains(toTarget),[]) 
    //= 鼠标事件
    ;const enter = useCallback(e => changePause(true) && e.stopPropagation(),[])
    ;const leave = useCallback(e => !isChild(banner , e.relatedTarget) && changePause(false),[banner,isChild])
    
    
    //= 数组重组
    ;const newList = useMemo(() => [ list[list.length-1] ,...list , list[0] ] , [list])
    //= 配置项
    ;const conf = useMemo(():bannerConf => {
        ;const conf:bannerConf = {
            box:{}
            ,btn:{}
            ,control:{}
            ,play:{}
            ,banner:{}
        }
        ;const newConf = config
        ;Object.keys(defaultConfig).forEach(key => {
            ;if( /^box/.test(key) ) {
                ;conf.box[`${key.replace("box","")}`] = newConf[key] || defaultConfig[key]
            } else 
            if( /^btn/.test(key) ) {
                ;conf.btn[`${key.replace("btn","")}`] = newConf[key] || defaultConfig[key]
            } else 
            if( /^control/.test(key) ) {
                ;conf.control[`${key.replace("control","")}`] = newConf[key] || defaultConfig[key]
            } else 
            if( /^play/.test(key) ) {
                ;conf.play[`${key.replace("play","")}`] = newConf[key] || defaultConfig[key]
            } else {
                ;conf.banner[key] = newConf[key] || defaultConfig[key]
            }
        } )
        ;if( conf.play.time < 500 ) conf.play.time = 500
        console.log( "banner设置项改变" );
        ;return conf
    } , [config])

    //= ul样式
    ;const setUlStyle = useCallback(():bannerUlStyle => {
        // console.log( "ul样式" );
        ;const len = newList.length 
        ;const index:number = nowActive + 1
        ;const type = conf.play.type
        ;const obj:bannerUlStyle = { width:`${len * 100}%` ,left:`${-index * 100 }%` , transition: `${type} 0.5s linear`}
        ;if( type === "opacity" ) {
            ;obj.opacity = opacity
            ;obj.transition= "opacity 0.5s linear"
        }  
        ;if( pause === "noAnimation" ) {
            ;obj.transition = "none 0s linear"
        }
        ;return obj
    },[conf.play.type, newList.length, nowActive , pause , opacity])
    //= ul类
    ;const getClass = useCallback( (index:number):string => {
        ;const len:number = newList.length
        ;let name:string = ""
        // 当前页
        ;if( index-1 === nowActive ) {
            name += "active"
        } else 
        // 最后一页
        if( index === 1 && nowActive=== len -2 ) {
            name += "active"
        }
        else 
        // 第一一页
        if( index === len -2 && nowActive=== -1 ) {
            name += "active"
        }
        ;return name
    },[nowActive , newList.length])
    //= 改变当前页的方法
    ;const changeActive = useCallback( ( num:number|string|undefined , del:any ) => {
        ;const len = newList.length
        ;const addNum = !del ? 1 : -1
        ;const type = conf.play.type
        ;let target = typeof num === "number" ? num : nowActive + addNum
        ;if( type !== "opacity" ) {
            ;if( target >= len - 1 && addNum > 0 ) target = 0
            //= 最后一页跳到第一页，并取消动画
            ;if( target === 0 && addNum > 0 && del !== undefined ) {
                changePause("noAnimation")
                setTimeout(() => changeActive(1,undefined) && changePause( num === "click" ) , 0);
            } else 
            //= 第一页跳到最后一页，并取消动画
            if( target < 0 && addNum < 0 ) {
                setTimeout(() => {
                    changePause("noAnimation")
                    changeActive(len - 3, undefined)
                    setTimeout(() => changePause( num === "click"), 0);
                } , 500);
            }
        } else {
            ;if( len - 1 === target + 1 ) {
                target = 0
            } else 
            if( target < 0 ) target = len - 3
            changeOpacity(0)
            ;if( num === undefined || num === "click" ) {
                target -=1
                setTimeout(() => {
                    changeActive(target+1,undefined)
                    setTimeout(() => changeOpacity(1), 0);
                }, 500);
                return
            }
        }

        changeNowActive( target )
        //= 修正选中下标
        ;if( len - 1 === target + 1 ) {
            target = 0
        } else 
        if( target < 0 ) {
            target = len - 3
        }
        change(target)
        ;return true
    },[newList.length, nowActive, change , conf.play.type])
    ;const click = useCallback(type => changeActive("click" , type === "del"),[changeActive])
    //= 动画
    ;useEffect(() => {
        ;const stop = (ref:{current:any}):void => {
            ;clearTimeout(ref.current)
            ;ref.current = null
        }
        ;if( !animate.current && !pause && !conf.play.pause) {
            ;const { type , time , auto } = conf.play
            ;let playTime = Math.max(type === "opacity" ? time - 600 : time , 0)
            ;animate.current = setTimeout(() => {
                ;if( type === "opacity" ) {
                    changeActive(undefined,undefined)
                } else {
                    ;const delNum = auto ? 1 : 2
                    ;if( nowActive + 1 >= newList.length - delNum ) {
                        ;if( auto )  changeActive(0 , undefined)
                        stop(animate)
                    } else {
                        changeActive(undefined,undefined)
                    }
                }
            },playTime)
        } else 
        if( pause ){
            stop(animate)
        }
        // console.log( "%ceffect ==========> 启动" , "font-size:40px;" , animate.current);
        return () => stop(animate)
    },[changeActive, conf.play, newList.length, nowActive, pause])
    return (
        <div className="banner-box" style={conf.box} ref={banner}>
            <div className="banner-left-btn" style={conf.btn} onMouseEnter={enter} onMouseLeave={leave} onClick={() => click("del")}>
                {/* t="1593421081078" */}
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1325" width="200" height="200"><path d="M294.134 512c0-13.701 5.232-27.402 15.667-37.847l328.704-328.694c20.91-20.91 54.804-20.91 75.704 0 20.9 20.9 20.9 54.794 0 75.705L423.363 512l290.836 290.836c20.9 20.9 20.9 54.805 0 75.705-20.9 20.91-54.794 20.91-75.704 0L309.79 549.847c-10.435-10.445-15.657-24.146-15.657-37.847z" p-id="1326"></path></svg>
            </div>
            <div className="banner-rigth-btn" style={conf.btn} onMouseEnter={enter} onMouseLeave={leave} onClick={() => click("add")}>
                {/* t="1593420941824" */}
                <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1199" width="200" height="200"><path d="M714.199 549.847L385.495 878.541c-20.91 20.91-54.804 20.91-75.704 0-20.9-20.9-20.9-54.805 0-75.705L600.637 512 309.801 221.164c-20.9-20.91-20.9-54.805 0-75.705 20.9-20.91 54.794-20.91 75.704 0L714.21 474.153c10.445 10.455 15.667 24.146 15.667 37.847s-5.232 27.402-15.677 37.847z" p-id="1200"></path></svg>
            </div>
            <div className="banner-view" style={conf.banner} onMouseEnter={enter} onMouseLeave={leave}>
                <ul style={setUlStyle()}>
                    {
                        newList.map( (item:any , index) => (
                            <li key={item.imgSrc + index}>
                                <Link to={item.url || "/"}>
                                    <img src={item.imgSrc} alt={item.typeTitle}/>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                conf.control.show && 
                <div className="banner-control" style={{width:conf.control.Boxwidth}}>
                    {
                        newList.map( (item:any,index) => (
                            <i key={item.imgSrc + index} className={getClass(index)} onClick={() => changeActive( index-1 , undefined )}></i>
                        ))
                    }
                </div>
            }
        </div>
    )
})

export default BannerCom