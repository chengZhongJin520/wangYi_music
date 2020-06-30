/*
 * @Author: 成中锦
 * @Date: 2020-06-20 15:55:11
 * @LastEditTime: 2020-06-29 14:26:20
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
;export const HOME_BANNER = ( type = 0 ) => GET(`/banner?type=${type}`)