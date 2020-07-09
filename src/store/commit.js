/*
 * @Author: 成中锦
 * @Date: 2020-06-20 14:20:22
 * @LastEditTime: 2020-07-09 17:58:13
 * @FilePath: \wangyi_music\src\store\commit.js
 */ 
import { CHANGE_BANNERLIST , CHANGE_WINDOWWIDTH , CHANGE_RECOMMEND , CHANGE_RECOMMEND_DJ ,
     CHANGE_NEW_ALBUM , CHANGE_MUSIC_LIST , CHANGE_SLIDE , CHANGE_SLIDE_MUSIC_USER } from "./type"
import { HOME_BANNER , HOME_RECOMMEND , HOME_RECOMMEND_DJ ,
     HOME_NEW_ALBUM , HOME_MUSIC_LIST_ITEM , HOME_MUSIC_LIST ,
     HOME_MUSIC_USER , MUSIC_INFO , HOT_MUSIC_USER } from "../Api"

/**
 * @description: 同步方法
 */
;export class Mutation {
    /**
     * @description: 改变redux里的banner数据
     * @param {val} Object 首页请求banner数据的返回值
     * @return: Array
     */
    static [CHANGE_BANNERLIST] (val) {
        ;return val.banners.map( item => {
            ;const obj = {}
            ;Object.keys( item ).forEach( key => {
                ;const child = item[key]
                ;if(child !== undefined && child !== null) {
                    ;const keyName = key === "imageUrl" ? "imgSrc" : key
                    ;obj[keyName] = child
                }
            } )
            return obj
        })
    }
    /**
     * @description: 改变redux里的热推荐歌单数据
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_RECOMMEND] (val) {
        ;const list = val.result.map( item => {
            ;const obj = {}
            ;Object.keys( item ).forEach( key => {
                ;const child = item[key]
                ;if(child !== undefined && child !== null) {
                    ;const keyName = key === "picUrl" ? "imgSrc" : key
                    ;obj[keyName] = child
                }
            } )
            return obj
        } )
        ;return list
    }
    /**
     * @description: 改变redux里的热推荐电台数据
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_RECOMMEND_DJ] (val) {
        ;const list = val.result.map( item => {
            ;const obj = {}
            ;Object.keys( item ).forEach( key => {
                ;const child = item[key]
                ;if(child !== undefined && child !== null) {
                    ;const keyName = key === "picUrl" ? "imgSrc" : key
                    ;obj[keyName] = child
                }
            } )
            return obj
        } )
        ;return list
    }
    /**
     * @description: 改变redux里的新碟上架
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_NEW_ALBUM] (val) {
        ;const list1 = []
        ;const list2 = []
        ;val.albums.forEach( (item , index) => {
            ;const obj = {}
            ;Object.keys( item ).forEach( key => {
                ;const child = item[key]
                ;if(child !== undefined && child !== null) {
                    ;const keyName = key === "picUrl" ? "imgSrc" : key
                    ;obj[keyName] = child
                }
            } )
            ;index < 5 ? list2.push(obj) : index < 10 && list1.push(obj)
        } )
        ;return list1.concat(list2)
    }
    /**
     * @description: 改变redux里的榜单
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_MUSIC_LIST] (val) {
        ;return val.tables
    }
    /**
     * @description: 改变redux里的home的入驻歌手
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_SLIDE] (val) {
        ;const arr = val.list.artists
        ;arr.forEach(item => {
            Object.keys(item).forEach(key => {
                ;const res = item[key]
                ;if( res === undefined || res === null ) delete item[key]
            })
            item.imgSrc = item.picUrl ;
            delete item.picUrl;
        })
        ;return arr
    }
    /**
     * @description: 改变redux里的home的热门主播
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_SLIDE_MUSIC_USER] (val) {
        ;const arr = val.list
        ;arr.forEach(item => {
            Object.keys(item).forEach(key => {
                ;const res = item[key]
                ;if( res === undefined || res === null ) delete item[key]
            })
            item.imgSrc = item.avatarUrl ;
            delete item.avatarUrl;
        })
        ;return arr
    }
    /**
     * @description: 获取窗口改变的宽度
     * @param {val} Number 窗口改变的宽度值
     * @return: Number
     */
    static [CHANGE_WINDOWWIDTH] (val) {
        return val
    }
}

/**
 * @description: 异步方法
 */
;export class Action {
    /**
     * @description: 请求首页banner数据
     * @return: Promise
     */    
    static [CHANGE_BANNERLIST] () {
        return HOME_BANNER()
    }
    /**
     * @description: 请求首页 热门推荐歌单
     * @return: Promise
     */    
    static [CHANGE_RECOMMEND] (size=0) {
        return HOME_RECOMMEND(size)
    }
    /**
     * @description: 请求首页 热门推荐电台
     * @return: Promise
     */    
    static [CHANGE_RECOMMEND_DJ] (size=0) {
        return HOME_RECOMMEND_DJ(size)
    }
    /**
     * @description: 请求首页 新碟上架
     * @return: Promise
     */    
    static [CHANGE_NEW_ALBUM] (size=0) {
        return HOME_NEW_ALBUM(size)
    }
    /**
     * @description: 请求首页 入驻歌手
     * @return: Promise
     */    
    static [CHANGE_SLIDE] (size=0) {
        return HOME_MUSIC_USER(size)
    }
    /**
     * @description: 请求首页 热门主播
     * @return: Promise
     */    
    static [CHANGE_SLIDE_MUSIC_USER] (size=0) {
        return HOT_MUSIC_USER(size)
    }
    /**
     * @description: 请求首页 榜单
     * @return: Promise
     */    
    static [CHANGE_MUSIC_LIST] () {
        ;const send = async () => {
            ;const result = await HOME_MUSIC_LIST()
            ;const list = ((result[0] || {}).list || []).slice(0,3)
            ;const arr = []
            ;const songs = []
            ;const tables = []
            ;list.forEach( items => {
                ;Object.keys(items).forEach( key => {
                    ;const item = items[key]
                    ;if( item === null || item === undefined ) delete items[key]
                } )
                ;items.imgSrc = items.coverImgUrl
                ;items.childs = []
                ;delete items.coverImgUrl
                ;arr.push( HOME_MUSIC_LIST_ITEM( 8 , items.id ) )
            } )
            ;const res = await Promise.all(arr)
            ;res.forEach(item => {
                ;if( item[0] && item[0].privileges ){
                    ;const list = item[0].privileges
                    ;const playlist = item[0].playlist
                    ;let ids = ""
                    ;for(let i = 0 ; i< 10 ; i++) ids += list[i].id + (i<9?",":"") 
                    ;Object.keys(playlist).forEach(key => {
                        ;const item = playlist[key]
                        ;if( item === null || item === undefined || item instanceof Object ) delete playlist[key]
                    })
                    ;playlist.ids = ids
                    ;playlist.imgSrc = playlist.coverImgUrl
                    ;delete playlist.coverImgUrl
                    ;tables.push( playlist )
                    ;songs.push(MUSIC_INFO(ids))
                }
            })
            ;const musicList = await Promise.all(songs)
            ;musicList.forEach( (item , index) => {
                ;const songs = item[0] && item[0].songs ? item[0].songs : [{}]
                ;let parent = undefined
                ;parent = tables[index]
                ;if(parent) parent.childs = songs
            } )
            ;return tables
        }
        return send()
    }
}
;const HOME = async function ({size , call}) {
    ;const obj = {}
    ;const type = []
    ;const sends = [ 
        Action[CHANGE_BANNERLIST]() , 
        Action[CHANGE_RECOMMEND](size) , 
        Action[CHANGE_RECOMMEND_DJ](size) ,
        Action[CHANGE_NEW_ALBUM](size) ,
        Action[CHANGE_MUSIC_LIST]() ,
        Action[CHANGE_SLIDE](5) ,
        Action[CHANGE_SLIDE_MUSIC_USER](5) ,
    ]
    ;const [
        [bannerList] , 
        [recommend] , 
        [djList] , 
        [new_album] , 
        musicList , 
        [singer] ,
        [music_user]
    ] = await Promise.all(sends)
    // ;const bannerList = await Action[CHANGE_BANNERLIST]()
    // ;const recommend = await Action[CHANGE_RECOMMEND](size)
    // ;const djList = await Action[CHANGE_RECOMMEND_DJ](size)
    // ;const new_album = await Action[CHANGE_NEW_ALBUM](size)
    // ;const musicList = await Action[CHANGE_MUSIC_LIST]()
    // ;const [singer] = await Action[CHANGE_SLIDE](5)
    ;if(bannerList) {
        ;obj.bannerList = bannerList
        ;obj.bannerList.name = 'bannerList'
        ;type.push(CHANGE_BANNERLIST)
    }
    ;if(recommend) {
        ;obj.recommend = recommend
        ;obj.recommend.name = 'recommend.0.childs'
        ;type.push(CHANGE_RECOMMEND)
    }
    ;if( djList ) {
        ;obj.recommend_dj = djList
        ;obj.recommend_dj.name = 'recommend_dj'
        ;type.push(CHANGE_RECOMMEND_DJ)
    }
    ;if( new_album ) {
        ;obj.$recommend = new_album
        ;obj.$recommend.name = 'recommend.2.childs'
        ;type.push(CHANGE_NEW_ALBUM)
    }
    ;if( musicList ) {
        ;obj.$$recommend = {tables:musicList}
        ;obj.$$recommend.name = 'recommend.3.childs'
        ;type.push(CHANGE_MUSIC_LIST)
    }
    ;if( singer ) {
        ;obj.slide = {list:singer}
        ;obj.slide.name = 'slide.singer.list'
        ;type.push(CHANGE_SLIDE)
    }
    ;if( music_user ) {
        ;obj.slide_music_user = {list:music_user.data && music_user.data.list ? music_user.data.list : []}
        ;obj.slide_music_user.name = 'slide.musicUser.list'
        ;type.push(CHANGE_SLIDE_MUSIC_USER)
    }
    ;call({ type , val:obj })
    ;return obj
}
;export const pageSend = {
    HOME
}