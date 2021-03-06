/*
 * @Author: 成中锦
 * @Date: 2020-07-14 13:57:52
 * @LastEditTime: 2020-07-17 15:20:07
 * @FilePath: \myMusic\src\store\state.ts
 * @explain: 
 */ 
export default {
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
    "windowWidth":0,
    "home":{
        "bannerList":[],
        "recommend":[
            {
                "name":"热门推荐",
                "titleList":[
                    "华语" , "流行" , "摇滚" , "民谣" , "电子"
                ],
                "childLength":8,
                "childsrc":"/common/music-card",
                "childs":[]
            },
            {
                "name":"个性化推荐",
                "titleList":[],
                "childLength":4,
                // "childsrc":"/common/music-card",
                "noMore":true,
                "childs":[]
            },
            {
                "name":"新碟上架",
                "titleList":[],
                "childLength":10,
                "childsrc":"/common/music-banner",
                "data":{
                    "pagesize":5,
                    "controlshow":false
                },
                "childs":[]
            },
            {
                "name":"榜单",
                "titleList":[],
                "childLength":8,
                "childsrc":"/common/music-table",
                "childs":[]
            },
        ],
        "slide":{
            "singer":{
                "noMore":false,
                "title":"入驻歌手",
                "list":[],
                "btnText":"申请成为网易音乐人",
                "childsrc":"/pageComs/home/singer-card",
                "childClass":"slide-singer"
            },
            "musicUser":{
                "noMore":true,
                "title":"热门主播",
                "list":[],
                "childsrc":"/pageComs/home/music-hot-use",
                "childClass":"slide-music-user"
            }
        },
        "recommend_dj":[],
        // "new_album":[],
        
    }
}