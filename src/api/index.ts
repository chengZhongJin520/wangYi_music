/*
 * @Author: 成中锦
 * @Date: 2020-07-14 13:59:46
 * @LastEditTime: 2020-07-14 14:06:08
 * @FilePath: \myMusic\src\api\index.ts
 * @explain: 
 */ 
import { Axios } from "../plugin"
// http://localhost:9991
;const base = ""
;const GET = (Api:string):any => {
    ;return new Promise( ( resolve ) => {
        Axios.get( base + Api ).then( (res:any) => resolve([res]) ).catch((err:any) => resolve([undefined,err]))
    } )
}
// 首页轮播
;export const HOME_BANNER:any = ( type:number = 0 ) => GET(`/banner?type=${type}`)
// 首页热门推荐 
;export const HOME_RECOMMEND:any = ( size:number = 8 ) => GET(`/personalized?limit=${size}`)
// 首页热门电台推荐 
;export const HOME_RECOMMEND_DJ:any = ( size:number = 8 ) => GET(`/personalized/djprogram?limit=${size}`)
// 首页新碟上架
;export const HOME_NEW_ALBUM:any = ( size:number = 8 ) => GET(`/album/newest?limit=${size}`)
// 首页所有榜单
;export const HOME_MUSIC_LIST:any = ( size:number = 8 ) => GET(`/toplist`)
// 首页某个榜单
;export const HOME_MUSIC_LIST_ITEM:any = ( size:number = 8 , id:string|number ) => GET(`/playlist/detail?id=${id}&limit=${size}`)
// 首页 入驻歌手
;export const HOME_MUSIC_USER:any = ( size:number = 8 ) => GET(`/top/artists?limit=${size}`)
// 歌曲详细信息
;export const MUSIC_INFO:any = ( id:string|number ) => GET(`/song/detail?ids=${id}`)
// 热门主播详细信息
;export const HOT_MUSIC_USER:any = ( size:number = 8 ) => GET(`/dj/toplist/hours?limit=${size}`)