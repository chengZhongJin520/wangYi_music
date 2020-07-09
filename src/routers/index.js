/*
 * @Author: 成中锦
 * @Date: 2020-06-20 13:31:15
 * @LastEditTime: 2020-07-09 18:18:42
 * @FilePath: \wangyi_music\src\routers\index.js
 */ 
import React,{ useEffect } from 'react';
import { BrowserRouter as Router , Route } from "react-router-dom" 
import Home from '../pages/home.jsx'
import Longin from '../pages/login.jsx'
import Head from "../components/headNav"
import Foot from "../components/foot"
function RouterCom () {
   useEffect( () => {
   },[] )
   return (
      <Router>
         <Head />
         <div id="content">
            <Route path="/" exact >
               <Home />
            </Route>
            <Route path="/login" exact component={ Longin } />
         </div>
         <Foot />
      </Router>
   )
}
export default RouterCom