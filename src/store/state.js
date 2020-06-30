/*
 * @Author: 成中锦
 * @Date: 2020-06-20 14:20:08
 * @LastEditTime: 2020-06-29 17:05:42
 * @FilePath: \wangyi_music\src\store\state.js
 */ 
;const state = {
    "headNav":[
        { 
            "title" : "发现音乐" 
            ,"href":"/"
            ,"target":"_self"
            ,"childrens":[
                { 
                    "title":"推荐"
                    ,"href":"/"
                }
                ,{ 
                    "title":"排行榜"
                    ,"href":"/discover/toplist"
                }
                ,{ 
                    "title":"歌单"
                    ,"href":"/discover/playlist"
                }
                ,{ 
                    "title":"主播电台"
                    ,"href":"/discover/djradio"
                }
                ,{ 
                    "title":"歌手"
                    ,"href":"/discover/artist"
                }
                ,{ 
                    "title":"新碟上架"
                    ,"href":"/discover/album"
                }
            ]
        }
        ,{ 
            "title" : "我的音乐" 
            ,"href":"/my/"
            ,"target":"_self"
        }
        ,{ 
            "title" : "朋友" 
            ,"href":"/friend"
            ,"target":"_self"
        }
        ,{ 
            "title" : "商城" 
            ,"href":"/store/product"
            ,"target":"_blank"
        }
        ,{ 
            "title" : "音乐人" 
            ,"href":"/nmusician/web/recruit"
            ,"target":"_blank"
        }
        ,{ 
            "title" : "下载客户端" 
            ,"href":"/download"
            ,"target":"_self"
            ,"clsName":"hot"
        }
    ],
    "bannerList":[],
    "windowWidth":0,
}
;export default state