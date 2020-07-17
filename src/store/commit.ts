/*
 * @Author: 成中锦
 * @Date: 2020-07-14 13:53:54
 * @LastEditTime: 2020-07-17 14:30:47
 * @FilePath: \myMusic\src\store\commit.ts
 * @explain: 
 */ 
import { CHANGE_BANNERLIST , CHANGE_WINDOWWIDTH , CHANGE_RECOMMEND , CHANGE_RECOMMEND_DJ ,
    CHANGE_NEW_ALBUM , CHANGE_MUSIC_LIST , CHANGE_SLIDE , CHANGE_SLIDE_MUSIC_USER 
} from "./type";

import { HOME_BANNER , HOME_RECOMMEND , HOME_RECOMMEND_DJ , HOME_NEW_ALBUM , HOME_MUSIC_LIST_ITEM , HOME_MUSIC_LIST ,
    HOME_MUSIC_USER , MUSIC_INFO , HOT_MUSIC_USER 
} from "../api";
import { homeResult , homeParmas , home_send} from "../test/store"

/**
 * @description: 同步方法
 */
export class Mutations<T> {
    static home: any;
    static windowWidth: number;
    /**
     * @description: 改变redux里的banner数据
     * @param {val} Object 首页请求banner数据的返回值
     * @return: Array
     */
    static [CHANGE_BANNERLIST]<T> (val:{banners:Array<any>}):any {
        return this.home.bannerList = val.banners.map( item => {
            const obj:any = {};
            Object.keys( item ).forEach( (key:any) => {
                const child = item[key];
                if(child !== undefined && child !== null) {
                    const keyName:string = key === "imageUrl" ? "imgSrc" : key
                    obj[keyName] = child
                };
            } )
            return obj;
        })
    }
    /**
     * @description: 改变redux里的热推荐歌单数据
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_RECOMMEND] (val:{result:Array<any>}) {
        return this.home.recommend[0].childs = val.result.map( (item:Array<any>) => {
            const obj:any = {}
            Object.keys( item ).forEach( (key:any) => {
                const child = item[key]
                if(child !== undefined && child !== null) {
                    const keyName = key === "picUrl" ? "imgSrc" : key
                    obj[keyName] = child
                }
            } )
            return obj
        } )
    }
    /**
     * @description: 改变redux里的热推荐电台数据
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_RECOMMEND_DJ] (val:{result:Array<any>}) {
        return this.home.recommend[2].childs = val.result.map( (item:Array<any>) => {
            const obj:any = {}
            Object.keys( item ).forEach( (key:any) => {
                const child:any = item[key]
                if(child !== undefined && child !== null) {
                    const keyName = key === "picUrl" ? "imgSrc" : key
                    obj[keyName] = child
                }
            } )
            return obj
        } )
    }
    /**
     * @description: 改变redux里的新碟上架
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_NEW_ALBUM] (val:{albums:Array<any>}) {
        const list1:Array<any> = []
        const list2:Array<any> = []
        val.albums.forEach( (item:Array<any> , index) => {
            const obj:any = {}
            Object.keys( item ).forEach( (key:any) => {
                const child:any = item[key]
                if(child !== undefined && child !== null) {
                    const keyName = key === "picUrl" ? "imgSrc" : key
                    obj[keyName] = child
                }
            } )
            index < 5 ? list2.push(obj) : index < 10 && list1.push(obj)
        } )
        return this.home.recommend[2].childs = list1.concat(list2)
    }
    /**
     * @description: 改变redux里的榜单
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_MUSIC_LIST] (val:Array<any>) {
        return this.home.recommend[3].childs = val
    }
    /**
     * @description: 改变redux里的home的入驻歌手
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_SLIDE] (val:{artists:Array<any>}) {
        const arr = val.artists;
        arr.forEach(item => {
            Object.keys(item).forEach(key => {
                const res = item[key]
                if( res === undefined || res === null ) delete item[key]
            });
            item.imgSrc = item.picUrl ;
            delete item.picUrl ;
        })
        return this.home.slide.singer.list = arr
    }
    /**
     * @description: 改变redux里的home的热门主播
     * @param {val} Object 首页请求热推荐数据的返回值
     * @return: Array
     */
    static [CHANGE_SLIDE_MUSIC_USER] (val:Array<any>) {
        val.forEach((item:any) => {
            Object.keys(item).forEach((key:any) => {
                const res = item[key];
                if( res === undefined || res === null ) delete item[key];
            });
            item.imgSrc = item.avatarUrl ;
            delete item.avatarUrl;
        });
        return this.home.slide.musicUser.list = val;
    }
    /**
     * @description: 获取窗口改变的宽度
     * @param {val} Number 窗口改变的宽度值
     * @return: Number
     */
    static [CHANGE_WINDOWWIDTH] (val:number) {
        return this.windowWidth = val
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
    static [CHANGE_BANNERLIST] (size:number=8):any {
        return HOME_BANNER(size)
    }
    /**
     * @description: 请求首页 热门推荐歌单
     * @return: Promise
     */    
    static [CHANGE_RECOMMEND] (size=0):any {
        return HOME_RECOMMEND(size)
    }
    /**
     * @description: 请求首页 热门推荐电台
     * @return: Promise
     */    
    static [CHANGE_RECOMMEND_DJ] (size=0):any {
        return HOME_RECOMMEND_DJ(size)
    }
    /**
     * @description: 请求首页 新碟上架
     * @return: Promise
     */    
    static [CHANGE_NEW_ALBUM] (size=0):any {
        return HOME_NEW_ALBUM(size)
    }
    /**
     * @description: 请求首页 入驻歌手
     * @return: Promise
     */    
    static [CHANGE_SLIDE] (size=0):any {
        return HOME_MUSIC_USER(size)
    }
    /**
     * @description: 请求首页 热门主播
     * @return: Promise
     */    
    static [CHANGE_SLIDE_MUSIC_USER] (size=0):any {
        return HOT_MUSIC_USER(size)
    }
    /**
     * @description: 请求首页 榜单
     * @return: Promise
     */    
    static [CHANGE_MUSIC_LIST] ():any {
        ;const send = async () => {
            ;const result = await HOME_MUSIC_LIST()
            ;const list = ((result[0] || {}).list || []).slice(0,3)
            ;const arr:Array<{}> = []
            ;const songs:Array<{}> = []
            ;const tables:Array<{childs?:[]}> = []
            ;list.forEach( (items:any) => {
                ;const keys = Object.keys(items)
                ;keys.forEach( (key:string) => {
                    ;const item = items[key]
                    ;if( item === null || item === undefined ) delete items[key]
                } )
                ;items.imgSrc = items.coverImgUrl
                ;items.childs = []
                ;delete items.coverImgUrl
                ;arr.push( HOME_MUSIC_LIST_ITEM( 8 , items.id ) )
            } )
            ;const res = await Promise.all(arr)
            ;res.forEach((item:any) => {
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
            ;musicList.forEach( (item:any , index):void => {
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

const HOME = async function({ size , call }:homeParmas) {
    ;const obj:homeResult = {}
    ;const sends:Array<home_send> = [ 
        Action[CHANGE_BANNERLIST](), 
        Action[CHANGE_RECOMMEND](size) , 
        Action[CHANGE_RECOMMEND_DJ](size) ,
        Action[CHANGE_NEW_ALBUM](size) ,
        Action[CHANGE_MUSIC_LIST]() ,
        Action[CHANGE_SLIDE](5) ,
        Action[CHANGE_SLIDE_MUSIC_USER](5) ,
    ]
    const [
        [bannerList] , 
        [recommend] , 
        [djList] , 
        [new_album] , 
        musicList , 
        [singer] ,
        [music_user]
    ]:Array<any> =await Promise.all(sends)
    if( bannerList ) {
        obj[CHANGE_BANNERLIST] = bannerList;
    };
    if(recommend) {
        obj[CHANGE_RECOMMEND] = recommend;
    };
    if( djList ) {
        obj[CHANGE_RECOMMEND_DJ] = djList;
    };
    if( new_album ) {
        obj[CHANGE_NEW_ALBUM] = new_album;
    };
    if( musicList ) {
        obj[CHANGE_MUSIC_LIST] = musicList;
    };
    if( singer ) {
        obj[CHANGE_SLIDE] = singer;
    };
    if( music_user ) {
        obj[CHANGE_SLIDE_MUSIC_USER] = music_user.data?.list || [];
    };
    call && call(obj);
}

export const pageSend = {
    HOME
}