/*
 * @Author: 成中锦
 * @Date: 2020-06-20 14:20:22
 * @LastEditTime: 2020-06-29 17:20:11
 * @FilePath: \wangyi_music\src\store\commit.js
 */ 
import { CHANGE_BANNERLIST , CHANGE_WINDOWWIDTH } from "./type"
import { HOME_BANNER } from "../Api"

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
        return val.banners
    }
    /**
     * @description: 获取窗口改变的宽度
     * @param {val} Number 窗口改变的宽度值
     * @return: Number
     */
    static [CHANGE_WINDOWWIDTH] (val) {
        console.log( val );
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
    // 
    static [CHANGE_BANNERLIST] () {
        return HOME_BANNER()
    }
}