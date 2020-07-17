/*
 * @Author: 成中锦
 * @Date: 2020-07-16 11:37:53
 * @LastEditTime: 2020-07-16 11:38:36
 * @FilePath: \myMusic\src\test\store.ts
 * @explain: 
 */ 
import { CHANGE_BANNERLIST , CHANGE_WINDOWWIDTH , CHANGE_RECOMMEND , CHANGE_RECOMMEND_DJ ,
    CHANGE_NEW_ALBUM , CHANGE_MUSIC_LIST , CHANGE_SLIDE , CHANGE_SLIDE_MUSIC_USER } from "../store/type"
interface parmas{}
export interface actionTest extends parmas {
    type?:any ;
    value?:any ;
}
export interface homeResult extends parmas {
    [CHANGE_BANNERLIST]?:{ val:{}};
    [CHANGE_RECOMMEND]?:{ val:{}};
    [CHANGE_RECOMMEND_DJ]?:{ val:{}};
    [CHANGE_NEW_ALBUM]?:{ val:{}};
    [CHANGE_MUSIC_LIST]?:{ val:{}};
    [CHANGE_SLIDE]?:{ val:{}};
    [CHANGE_SLIDE_MUSIC_USER]?:{ val:{}};
}
export interface homeParmas extends parmas {
    size:number ;
    call:any ;
}
export interface home_send extends parmas {
    [index:number]:any
}