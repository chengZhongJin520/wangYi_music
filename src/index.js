/*
 * @Author: 成中锦
 * @Date: 2020-06-20 13:27:09
 * @LastEditTime: 2020-06-22 17:11:11
 * @FilePath: \wangyi_music\src\index.js
 */ 
import React from 'react';
import { render } from "react-dom"
import { Store } from "./store/index"
import "./css/reset.css"
import "antd/dist/antd.css"
;render( <Store /> ,document.querySelector("#view") )