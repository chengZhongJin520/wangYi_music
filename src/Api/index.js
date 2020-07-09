/*
 * @Author: 成中锦
 * @Date: 2020-06-20 15:55:11
 * @LastEditTime: 2020-07-09 17:41:04
 * @FilePath: \wangyi_music\src\Api\index.js
 */ 
import { Axios } from "../plugins"
// http://localhost:9991
;const base = ""
;const GET = Api => {
    ;return new Promise( ( resolve ) => {
        Axios.get( base + Api ).then( res => resolve([res]) ).catch(err => resolve([undefined,err]))
    } )
}
// 首页轮播
;export const HOME_BANNER = ( type = 0 ) => GET(`/banner?type=${type}`)
// 首页热门推荐 
;export const HOME_RECOMMEND = ( size = 8 ) => GET(`/personalized?limit=${size}`)
// 首页热门电台推荐 
;export const HOME_RECOMMEND_DJ = ( size = 8 ) => GET(`/personalized/djprogram?limit=${size}`)
// 首页新碟上架
;export const HOME_NEW_ALBUM = ( size = 8 ) => GET(`/album/newest?limit=${size}`)
// 首页所有榜单
;export const HOME_MUSIC_LIST = ( size = 8 ) => GET(`/toplist`)
// 首页某个榜单
;export const HOME_MUSIC_LIST_ITEM = ( size = 8 , id ) => GET(`/playlist/detail?id=${id}&limit=${size}`)
// 首页 入驻歌手
;export const HOME_MUSIC_USER = ( size = 8 ) => GET(`/top/artists?limit=${size}`)
// 歌曲详细信息
;export const MUSIC_INFO = ( id ) => GET(`/song/detail?ids=${id}`)
// 热门主播详细信息
;export const HOT_MUSIC_USER = ( size = 8 ) => GET(`/dj/toplist/hours?limit=${size}`)
