/*
 * @Author: 成中锦
 * @Date: 2020-06-20 15:56:39
 * @LastEditTime: 2020-06-29 14:24:19
 * @FilePath: \wangyi_music\src\plugins\axios.js
 */ 
import Axios from "axios"
;Axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8"
;Axios.defaults.headers.get['Cache-Control'] =  'no-cache'
;Axios.defaults.headers.get['Pragma'] =  'no-cache'
//配置过滤器请求响应（通过查npm官网，axios文档）
Axios.interceptors.response.use(response => response.data, error => Promise.reject(error));
;export default Axios