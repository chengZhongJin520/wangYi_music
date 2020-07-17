import React, { memo } from 'react';
import { BrowserRouter as Router , Route } from "react-router-dom";
import Home from "../pages/home"
import Login from "../pages/login"
import Head from "../components/common/headNav"
import Foot from "../components/common/foot"

export default memo( (props:{}) => {
    return (
        <Router>
            <Head />
            <div id="content">
                <Route path="/" exact >
                    <Home />
                </Route>
                <Route path="/login" exact component={ Login } />
            </div>
            <Foot />
        </Router>
    )
})