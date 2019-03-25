import React, { Component } from 'react';
import { Redirect, Switch, Route ,withRouter} from 'react-router-dom';
import routerData from '../../routerConfig';
import Login from '../../pages/Login';
import cookie from 'react-cookies'
@withRouter
class MainRoutes extends Component {
    static displayName = 'MainRoutes';
    constructor(props) {
        super(props);
        this.props.history.listen((location)=>{
            switch(location.pathname){
                case '/publishtask/showtask':
                    document.title="发布任务";
                    break;
                case '/publishtask/taskdetail':
                    document.title="任务详情";
                    break;
                case '/publishtask/release':
                    document.title="发布任务";
                    break;
                case '/orgnization/index':
                    document.title="组织结构";
                    break;
                case '/publishtask/taskmodify':
                    document.title="修改任务";
                    break;
                case '/orgnization/companyperson':
                    document.title="部门";
                    break;
                case '/orgnization/persondetail':
                    document.title="个人信息";
                    break;
                default:break;
            }
        })
    }
    componentWillUpdate(nextprops) {
        nextprops.history.listen((location)=>{
            switch(location.pathname){
                case '/publishtask/showtask':
                    document.title="发布任务";
                    break;
                case '/publishtask/taskdetail':
                    document.title="任务详情";
                    break;
                case '/publishtask/release':
                    document.title="发布任务";
                    break;
                case '/orgnization/index':
                    document.title="组织结构";
                    break;
                case '/publishtask/taskmodify':
                    document.title="修改任务";
                    break;
                case '/orgnization/companyperson':
                    document.title="部门";
                    break;
                case '/orgnization/persondetail':
                    document.title="个人信息";
                    break;
                default:break;
            }
        })
    }
    /**
     * 渲染路由组件
     */
    renderNormalRoute = (item, index) => {
        return item.component ? (
            <Route
                key={index}
                path={item.path}
                component={item.component}
                exact={item.exact}
            />
        ) : null;
    };

    render() {
        let user_id = cookie.load("user_id");
        if (user_id == undefined) {
            return (
                <Switch>
                    <Route
                        path='/login'
                        component={Login}
                    />
                    <Redirect exact from="/*" to="/login" />
                </Switch>
            )
        }
        return (
            <Switch>
                {/* 渲染路由表 */}
                {routerData.map(this.renderNormalRoute)}

                {/* 首页默认重定向到  */}
                <Redirect exact from="/" to="/task/task" />
            </Switch>
        );
    }
}

export default MainRoutes;
