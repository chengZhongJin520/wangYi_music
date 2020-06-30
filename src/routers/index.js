/*
 * @Author: 成中锦
 * @Date: 2020-06-20 13:31:15
 * @LastEditTime: 2020-06-23 17:04:29
 * @FilePath: \wangyi_music\src\routers\index.js
 */ 
import React from 'react';
import { BrowserRouter as Router , Route } from "react-router-dom" 
import Home from '../pages/home.jsx'
import Longin from '../pages/login.jsx'
import Head from "../components/headNav"
function RouterCom () {
   return (
      <Router>
         <Head />
         <div id="content">
            <Route path="/" exact >
               <Home />
            </Route>
            <Route path="/login" exact component={ Longin } />
         </div>
      </Router>
   )
}
export default RouterCom