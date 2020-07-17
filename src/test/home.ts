/*
 * @Author: 成中锦
 * @Date: 2020-07-16 11:32:14
 * @LastEditTime: 2020-07-17 14:39:53
 * @FilePath: \myMusic\src\test\home.ts
 * @explain: 
 */ 
interface params {}
export interface stateTest {
    State:{
        headNav:Array<{}>;
        home:{
            bannerList:Array<{}>;
            recommend:Array<any>;
            slide:any;
        }
        windowWidth:number ;
    };
    changeState:any ;
}
//= 轮播
export interface bannerParams extends params {
    list:Array<{}> ; 
    Active:number ;
    change?(num:number):void;
    config?:any
    data?:any
}
export interface bannerConf extends params {
    box:any;
    btn:any;
    control:any;
    play:any;
    banner:any;
    page?:any;
    item?:any;
}
export interface bannerUlStyle extends params {
    width:string;
    left:string;
    transition?:string;
    opacity?:string|number;
}

//= 推荐
export interface Home_cardTitleParmas extends params {
    name:string ; 
    titleList:Array<any> ; 
    noMore?:boolean|undefined|null ; 
    childsrc?:string ; 
    childs:Array<any> ; 
    data:any ;
    width:string;
    left:string;
    transition?:string;
    opacity?:string|number;
}