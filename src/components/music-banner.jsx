import React, { memo , useMemo , useState , useRef , useCallback , useEffect } from 'react';
import { Link } from "react-router-dom"
import "../css/coms/music-banner.css"
const defaultConf = {
    // "boxheight":300,
    "btnwidth":18
    ,"btnheight":18
    ,"itemwidth":118
    ,"itemheight":150
    ,"controlBoxwidth":"100%"
    ,"controlshow":false
    ,"playtime":2000
    ,"playtype":'left'
    ,"playauto":false
    ,"playpause":false
    ,"pagesize":1
}
export default memo( props => {
    ;const { list=[] , Active=0 , change=()=>{} , data:config={} } = props
    //= 控制动画的暂停和播放
    ;const [pause , changePause] = useState( false )
    ;const [opacity , changeOpacity] = useState( 1 )
    ;const [showPlay , changeShowPlay] = useState( false )
    //= 当前轮播页
    ;const [nowActive , changeNowActive] = useState( Active )
    //= banner的dom元素
    ;const banner = useRef(null)
    //= 动画id
    ;const animate = useRef(null)
    //= 判断是否是子元素
    ;const isChild = useCallback(( ref , toTarget) => !ref.current || !toTarget ? false : toTarget.nodeType && ref.current.contains(toTarget),[]) 
    //= 鼠标事件
    ;const enter = useCallback(e => changePause(true) && e.stopPropagation(),[])
    ;const leave = useCallback(e => !isChild(banner , e.relatedTarget) && changePause(false),[banner,isChild])
    ;const showPlayBtn = useCallback((e,index) => changeShowPlay(index),[])
    ;const hidePlayBtn = useCallback(e => changeShowPlay(false),[])
    
    ;const conf = useMemo(() => {
        ;const conf = {
            box:{}
            ,btn:{}
            ,control:{}
            ,play:{}
            ,banner:{}
            ,page:{}
            ,item:{}
        }
        ;const newConf = config
        ;Object.keys(defaultConf).forEach(key => {
            ;if( /^box/.test(key) ) {
                ;conf.box[`${key.replace("box","")}`] = newConf[key] || defaultConf[key]
            } else 
            if( /^btn/.test(key) ) {
                ;conf.btn[`${key.replace("btn","")}`] = newConf[key] || defaultConf[key]
            } else 
            if( /^control/.test(key) ) {
                ;conf.control[`${key.replace("control","")}`] = newConf[key] || defaultConf[key]
            } else 
            if( /^page/.test(key) ) {
                ;conf.page[`${key.replace("page","")}`] = newConf[key] || defaultConf[key]
            } else 
            if( /^item/.test(key) ) {
                ;conf.item[`${key.replace("item","")}`] = newConf[key] || defaultConf[key]
            } else 
            if( /^play/.test(key) ) {
                ;conf.play[`${key.replace("play","")}`] = newConf[key] || defaultConf[key]
            } else {
                ;conf.banner[key] = newConf[key] || defaultConf[key]
            }
        } )
        ;if( conf.play.time < 500 ) conf.play.time = 500
        console.log( "music-banner设置项改变" );
        ;return conf
    } , [config])
    ;const lists = useMemo(() => {
        ;const size = conf.page.size
        ;const arr = list
        ;const len = arr.length
        ;const beforeList = arr.slice( len - size )
        ;const afterList = arr.slice( 0 , size )
        return beforeList.concat( arr , afterList )
    } , [list , conf.page.size])
    console.log( "music-banner" );
    //= ul样式
    ;const setUlStyle = useCallback(() => {
        // console.log( "ul样式" );
        ;const len = lists.length 
        ;const type = conf.play.type
        ;const width = conf.item.width + 11
        ;const size = conf.page.size
        ;const obj = { width:`${len * width}px` ,left:`${-size * width * (nowActive+1) }px` , transition: `${type} 0.5s linear`}
        ;if( type === "opacity" ) {
            ;obj.opacity = opacity
            ;obj.transition= "opacity 0.5s linear"
        }  
        ;if( pause === "noAnimation" ) {
            ;obj.transition = "none 0s linear"
        }
        ;return obj
    },[lists.length, conf.play.type, conf.item.width, conf.page.size, pause, opacity , nowActive])
    //= ul类
    ;const getClass = useCallback( index => {
        ;const len = lists.length
        ;let name = ""
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
    },[nowActive , lists.length])
    //= 改变当前页的方法
    ;const changeActive = useCallback( ( num , del ) => {
        ;const len = lists.length / conf.page.size
        ;const addNum = !del ? 1 : -1
        ;const type = conf.play.type
        ;let target = typeof num === "number" ? num : nowActive + addNum
        ;if( type !== "opacity" ) {
            ;if( target >= len - 1 && addNum > 0 ) target = 0
            //= 最后一页跳到第一页，并取消动画
            ;if( target === 0 && addNum > 0 && del !== undefined ) {
                changePause("noAnimation")
                setTimeout(() => changeActive(1) && changePause( num === "click") , 0);
            } else 
            //= 第一页跳到最后一页，并取消动画
            if( target < 0 && addNum < 0 ) {
                setTimeout(() => {
                    changePause("noAnimation")
                    changeActive(len - 3)
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
                    changeActive(target+1)
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
    },[lists.length, conf.page.size, conf.play.type, nowActive, change])
    ;const click = useCallback(type => changeActive("click" , type === "del"),[changeActive])
    //= 动画
    ;useEffect(() => {
        ;const stop = ref => {
            ;clearTimeout(ref.current)
            ;ref.current = null
        }
        ;if( !animate.current && !pause && !conf.play.pause && conf.play.auto) {
            ;const { type , time , auto } = conf.play
            ;let playTime = Math.max(type === "opacity" ? time - 600 : time , 0)
            ;animate.current = setTimeout(() => {
                ;if( type === "opacity" ) {
                    changeActive()
                } else {
                    ;const delNum = auto ? 1 : 2
                    ;if( nowActive + 1 >= lists.length - delNum ) {
                        ;if( auto )  changeActive(0)
                        stop(animate)
                    } else {
                        changeActive()
                    }
                }
            },playTime)
        } else 
        if( pause ){
            stop(animate)
        }
        // console.log( "%ceffect ==========> 启动" , "font-size:40px;" , animate.current);
        return () => stop(animate)
    },[changeActive, conf.play, lists.length, nowActive, pause])
    return (
        <div className="music-banner-box" style={conf.box} ref={banner}>
            <i className="banner-left-btn" style={conf.btn} onMouseEnter={enter} onMouseLeave={leave} onClick={() => click("del")}>
            </i>
            <i className="banner-rigth-btn" style={conf.btn} onMouseEnter={enter} onMouseLeave={leave} onClick={() => click("add")}>
            </i>
            <div className="banner-view" style={conf.banner} onMouseEnter={enter} onMouseLeave={leave}>
                <ul style={setUlStyle()}>
                    {
                        lists.map( (item , index) => {
                            // console.log( item );
                            return (
                                <li key={item.id + index} style={conf.item}>
                                    <div className="item-img-box" onMouseEnter={e => showPlayBtn(e , index)} onMouseLeave={e => hidePlayBtn(e)}>
                                        <img src={item.imgSrc} alt={`新碟:${item.name}`} title={item.name}/>
                                        <Link to={`/album?id=${item.id}`} title={item.name} className="item-img-link"></Link>
                                        <button title="播放" style={{opacity: showPlay === index ? 1 : 0}}></button>
                                    </div>
                                    <Link to={`/album?id=${item.id}`} title={item.name} className="item-link oneline">{item.name}</Link>
                                    <Link to={`/artist?id=${item.artist.id}`} title={item.artist.name} className="item-artist-link">{item.artist.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                conf.control.show && 
                <div className="banner-control" style={{width:conf.control.Boxwidth}}>
                    {
                        lists.map( (item,index) => (
                            <i key={item.imgSrc + index} className={getClass(index)} onClick={() => changeActive( index-1 )}></i>
                        ))
                    }
                </div>
            }
        </div>
    )
})