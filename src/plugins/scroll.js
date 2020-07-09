
class fn {
    static init( el , options = {} ) {
        ;const parent = this.parent = el.parentElement || el.parentNode
        ;const pCss = this.getCss(parent)
        ;const pOverflow = options.pOverflow || "hidden"
        // 去除超出
        ;if( pCss.overflow.val !== pOverflow ) parent.style.overflow = pOverflow
        // ;if( pCss.position.val == 'static' ) parent.style.position = 'relative'
        ;const targetCss = this.getCss(el)
        // 设置滚动条
        ;el.style.width = `${ Math.round(parseFloat(targetCss.width.val)) + 17 }px`
        ;if( !["auto" , 'scroll'].includes(targetCss.overflowY.val) ) el.style.overflowY = "auto"
        ;if( targetCss.overflowX.val !== "hidden" ) el.style.overflowX = "hidden"
        ;if( targetCss.position.val === "static" ) el.style.position = "relative"
        ;if( options.maxHeight ) el.style.maxHeight = ( targetCss.h = parseInt(options.maxHeight) ) + 'px'

        ;this.el = el 
        ;this.options = options 
        ;this.oldElStyle = targetCss
        ;this.oldParentStyle = pCss
        ;fn.initComputed.call(this)
        ;this.setScrollBar( targetCss )
        ;this.addEvent()
    }
    static destroy() {
        ;const { scrollBox , scrollBar , el , oldElStyle , oldParentStyle , parent } = this
        // 清除事件
        ;el.onscroll = null
        ;scrollBar.onmousedown = null
        // 清除设置给父元素的属性
        ;if( oldParentStyle.overflow.flag ) {
            ;parent.style.overflow = oldParentStyle.overflow.val
        } else {
            ;parent.style.cssText = parent.style.cssText.replace( /overflow:[^;]+;/ ,'' )
        }
        
        // 清除设置给元素的属性
        ;if( oldElStyle.position.flag ) {
            ;el.style.position = el.position.val
        } else {
            ;el.style.cssText = el.style.cssText.replace( /position:[^;]+;/ ,'' )
        }
        ;if( oldElStyle.width.flag ) {
            ;el.style.width = el.width.val
        } else {
            ;el.style.cssText = el.style.cssText.replace( /width:[^;]+;/ ,'' )
        }
        ;if( oldElStyle.overflowY.flag ) {
            ;el.style.overflowY = oldElStyle.overflowY.val
        } else {
            ;const cssText = el.style.cssText
            ;const str = /overflow-y/.test(cssText) ? cssText.replace( /overflow-y:[^;]+;/ ,'' ) : cssText.replace( /overflow:\s([^\s]+)\sauto;/ ,(a,b) => `overflow-x: ${b};` )
            ;el.style.cssText = str
        }
        ;if( oldElStyle.overflowX.flag ) {
            ;el.style.overflowX = oldElStyle.overflowX.val
        } else {
            ;el.style.cssText = el.style.cssText.replace( /overflow-x:[^;]+;/ ,'' )
        }

        // 清除滚动条
        ;el.removeChild( scrollBox )
    }
    static getCss( el , key ) {
        ;const obj = {}
        ;const css = window.getComputedStyle(el)
        ;const lineStyle = el.style
        ;if( key ) return css[ key ]
        ;const arr = [ "position" , 'overflow' , 'overflowY' , 'overflowX' , 'zIndex' , 'width' ,'height' ]
        ;const keys = ['offsetTop' , 'offsetLeft' , 'offsetHeight']
        ;arr.forEach( key => obj[key] = { val:css[key] , flag: !!lineStyle[key] })
        ;keys.forEach( key => obj[key] = el[key] )
        ;return obj
    }
    static setScrollBar( Css ) {
        ;const { el  } = this
        ;const box = document.createElement( "div" )
        ;const bar = document.createElement( "div" )
        ;const allH = fn.getHeight(el)
        ;const boxHeight = Css.offsetHeight - 4
        ;const { floor } = Math
        ;bar.style.position = box.style.position = 'absolute'
        ;box.style.top = '2px'
        ;box.style.right = '0px'
        ;box.style.height = 'calc(100% - 4px)'
        ;bar.style.width = box.style.width = '5px'
        ;bar.style.borderRadius = box.style.borderRadius = "2px"
        ;box.style.backgroundColor = "rgba(0,0,0,0.2)"
        ;bar.style.height = `${ Math.min(floor(boxHeight / allH * 100) , 100) }%`
        ;bar.style.backgroundColor = "rgba(0,0,0,0.5)"
        ;bar.style.top = `${ el.scrollTop / (allH - boxHeight) }%`
        ;bar.style.cursor = "pointer"
        ;box.appendChild( bar )
        ;el.appendChild( box )
        ;this.scrollBox = box
        ;this.scrollBar = bar
        ;this.computed.showScrollBar = boxHeight < allH - 4
    }
    static getHeight( el ) {
        ;const childs = el.children || el.childNodes
        ;const get = fn.getCss
        ;let h = 0
        ;for (let i in childs) {
            ;const item = childs[i]
            ;if( [ 1 , 3 ].includes( item.nodeType ) ) {
                ;if(["relative" , "static"].includes(get(item , 'position'))) h += item.offsetHeight
            }
        }
        ;return h
    }
    static addEvent() {
        ;const { scrollBar , el } = this
        ;el.onscroll = fn.scroll.bind(this,{ top: el.scrollTop })
        ;scrollBar.onmousedown = fn.mouse.bind(this)
    }
    static scroll( obj ) {
        ;const { scrollBox , scrollBar , el , options } = this
        ;const top = el.scrollTop
        ;if( top === obj.top ) return 
        ;const { ceil } = Math
        ;const allH = fn.getHeight(el) 
        ;const elHeight = el.offsetHeight
        ;const radio = Number((top / allH).toFixed(5))
        ;const boxH = elHeight - 4
        ;scrollBox.style.top = `${ top + 2 }px`
        ;scrollBar.style.top = top === 0 ? "0px" : top + elHeight === allH ? `${ boxH - scrollBar.offsetHeight }px` : `${ ceil(radio * boxH) }px`

        ;obj.top = top
        ;options.callBack && options.callBack({ x:0 , y:-top })
    }
    static mouse( e ) {
        ;const { scrollBox , scrollBar , el , options } = this
        ;const { round } = Math
        ;const downY = e.clientY
        ;const oldTop = parseInt( scrollBar.style.top ) 
        ;const barH = scrollBar.offsetHeight
        ;const max = scrollBox.offsetHeight - barH
        ;const maxScroll = fn.getHeight(el) - el.offsetHeight

        ;document.onmousemove = function(e) {
            ;const moveY = e.clientY
            ;const newTop = round( moveY - downY + oldTop )
            ;const top = Math.min( Math.max( 0 , newTop ) , max )
            ;const scroll = Math.min( maxScroll , top / max * round(maxScroll) )
            ;scrollBar.style.top = `${ top }px`
            ;el.scrollTop = scroll
            ;options.callBack && options.callBack({ x:0 , y:scroll })
        }
        ;document.onmouseup = function(e) {
            ;document.onmousemove = null
            ;document.onmouseup = null
        }
    }
    static reload(option = {}) {
        ;const { el , oldElStyle , scrollBar , options } = this
        ;const { height , offsetHeight } = oldElStyle
        ;const allH = fn.getHeight(el)
        ;const h = option.maxHeight || oldElStyle.h
        ;this.computed.showScrollBar = parseInt( h || height.val ) < allH - 4
        ;el.scrollTop = 0
        ;if( h ) el.style.maxHeight = `${h}px`;
        ;scrollBar.style.top = '0px'
        // ;if( el.scrollTop === 0 ) scrollBar.style.top = '0px'
        ;scrollBar.style.height = `${ Math.min( Math.floor( ( (h || offsetHeight) - 4) / allH * 100 ) , 100 ) }%`
        ;Object.keys( option ).forEach( key => options[key] = option.k )
    }
    static initComputed() {
        ;const that = this
        ;const { el , oldElStyle } = that
        ;that.computed = new Proxy( {} , {
            get:function( target , key ) {
                return target[ key ]
            }
            ,set:function( target , key , val ) {
                ;const { scrollBox } = that
                
                ;if( val ) {
                    ;let width = oldElStyle.width.val
                    ;if( width === "auto" ) width = "100%"
                    ;width = /px/.test(width) ? `${ Math.round(parseFloat(oldElStyle.width.val)) + 17 }px` : `calc(${ width } + 17px)`
                    ;el.style.width = width
                    ;if( scrollBox ) scrollBox.style.display = "block"
                } else {
                    ;if( oldElStyle.width.flag ) {
                        ;el.style.width = el.width.val
                    } else {
                        ;el.style.cssText = el.style.cssText.replace( /width:[^;]+;/ ,'' )
                    }
                    ;if( scrollBox ) scrollBox.style.display = "none"
                }
                ;target[ key ] = val
                ;return true
            }
        })
    }
}

class scroll {
    ;el = undefined
    ;oldElStyle = undefined
    ;parent = undefined 
    ;oldParentStyle = undefined 
    ;options = undefined
    ;scrollBox = undefined 
    ;scrollBar = undefined
    ;computed = undefined
    // ;position = { top: el.scrollTop }
    ;destroy = fn.destroy.bind(this)
    ;getCss = fn.getCss.bind(this)
    ;setScrollBar = fn.setScrollBar.bind(this)
    ;addEvent = fn.addEvent.bind(this)
    ;reload = fn.reload.bind(this)
    ;constructor( el , options ) {
        ;if( !window ) return this
        ;fn.init.call(this,el,options)
    }
}
export default scroll