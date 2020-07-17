import React, { memo , useState } from 'react';
import { Link } from 'react-router-dom'
import "../../css/commonCom/foot.css"
interface Props{}
interface params {
    href:string ;
    text?:string ;
    position?:string ;
    childPt?:string ;
}
interface navParams{
    href:string ;
    text:string ;
}
export default memo( (props:Props) => {
    ;const [ nav ] = useState<Array<params>>([
        { href : "/official-terms/service"  , text:"服务条款" },
        { href : "/official-terms/privacy"  , text:"隐私政策" },
        { href : "/official-terms/children"  , text:"儿童隐私政策" },
        { href : "#"  , text:"版权投诉指引" },
        { href : "#"  , text:"意见反馈" },
    ])
    ;const [ iconNav ] = useState<Array<params>>([
        { href : "#"  , position:"-63px -456.5px" , childPt:"0px -80px"},
        { href : "/st/userbasic#/auth"  , position:"-63px -101px" , childPt:"-1px -80px"},
        { href : "/recruit"  , position:"0px 0px" , childPt:"0px 4px"},
        { href : "/web/reward"  , position:"-60px -50px" , childPt:"0px -46px"},
        { href : "/uservideo#/plan"  , position:"0px -101px" , childPt:"-1px -63px"},
    ])
    return (
        <footer>
            <div className="foot-content">
                <div className="left-text-nav fl">
                    <p>
                        {
                            nav.map(({href , text}:params) => (
                                <Link to={href} key={href+text} target="_blank">{text} <span className="line">|</span></Link>
                            ))
                        }
                    </p>
                    <p className="right s-fc3">
                        <span className="sep span">网易公司版权所有©1997-2020</span><span className="span">杭州乐读科技有限公司运营：</span>
                        <Link to="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png" target="_blank" className="alink s-fc3">浙网文[2018]3506-263号</Link>
                    </p>
                    <p className="contact s-fc3">
                        <span className="sep span">违法和不良信息举报电话：0571-89853516</span>
                        <span className="span">举报邮箱：</span>
                        <Link className="alink" to="mailto:ncm5990@163.com">ncm5990@163.com</Link>
                    </p>
                    <p className="right s-fc3">
                        <span className="sep span">粤B2-20090191-18</span>
                        <Link to="http://www.beian.miit.gov.cn/publish/query/indexFirst.action" rel="noopener noreferrer" target="_blank" className="alink s-fc3">工业和信息化部备案管理系统网站</Link>
                    </p>
                </div>
                <div className="right-icon-nav fr">
                    {
                        iconNav.map(({href , position , childPt}:params) => {
                            return (
                                <div key={href}>
                                    <Link to={href} target="_blank" style={{backgroundPosition:position}} />
                                    <i style={{backgroundPosition:childPt}}></i>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </footer>
    )
})