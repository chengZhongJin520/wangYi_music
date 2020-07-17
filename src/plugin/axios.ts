/*
 * @Author: 成中锦
 * @Date: 2020-07-14 14:00:28
 * @LastEditTime: 2020-07-14 14:01:33
 * @FilePath: \myMusic\src\plugin\axios.ts
 * @explain: 
 */ 
import Axios from "axios"
;Axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8"
;Axios.defaults.headers.get['Cache-Control'] =  'no-cache'
;Axios.defaults.headers.get['Pragma'] =  'no-cache'
//配置过滤器请求响应（通过查npm官网，axios文档）
Axios.interceptors.response.use((response:any) => response.data, (error:any) => Promise.reject(error));
;export default Axios