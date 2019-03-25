import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import num from '../../assets/images/num.png';
import mi from '../../assets/images/mi.png';
import './Login.css';
import {
    FormBinder as IceFormBinder,
    FormBinderWrapper as IceFormBinderWrapper,
    FormError as IceFormError
} from "@icedesign/form-binder";
import {Input} from "@icedesign/base";
import cookie from 'react-cookies';
import options from '../../api/api';

const {login} = options;

@withRouter
class Login extends Component {
    static defaultProps = {};
    constructor(props) {
        super(props);
        this.state = {
            code : '',

        };

    }
    async componentWillMount () {
        let code = await this.getQueryVariable("code");
        this.setState({
            code
        })
    }
    getQueryVariable =(variable)=> {
        const query = window.location.search.substring(1);
        const vars = query.split("&");
        for (let i=0; i<vars.length; i++) {
            const pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
    Login = ()=> {
        let _this = this;
        this.formRef.validateAll(async (error, value) => {
            if (error) {
                // 处理表单报错
            } else {
                let result = await login(value);
                if (result.code ==1) {
                    cookie.save("user_id", result.msg);
                    _this.props.history.push({
                        pathname : "/"
                    })
                    window.location.reload()
                }
            }
        });
    }
    render() {

        return (
            <div style={styles.personal}>
                <div style={styles.bt}>
                    <div style={styles.wel}> Welcome</div>
                    <div style={styles.xian} />
                    <div style={styles.gs}>山东瑞瀚网络科技有限公司</div>
                </div>
                <div className="water-group">
                    <div className="water water1"/>
                    <div className="water water2"/>
                    <div className="water water3"/>
                </div>
                <div style={styles.kj}>
                    <IceFormBinderWrapper
                        ref={(formRef) => {
                            this.formRef = formRef;
                        }}
                        value={this.state}
                    >
                        <div  style={styles.user}>
                            <div  style={styles.iimg}>
                                <img src={num} height="22" width="18" alt={""}/>
                            </div>
                            <IceFormBinder
                                name="tel"
                                required
                                message="账号必须填写"
                            >
                                <Input style={styles.i_user} id="per" htmlType="text" placeholder="请输入账号" />
                            </IceFormBinder>
                            <br/>
                            <IceFormError name="tel" />
                        </div>

                        <div style={styles.user1}>
                            <div style={styles.iimg}>
                                <img src={mi} height="22" width="18" alt={""}/>
                            </div>
                            <IceFormBinder
                                name="password"
                                required
                                message="密码必须填写"
                            >
                                <Input style={styles.i_user}  htmlType="password" placeholder="请输入密码"  />
                            </IceFormBinder>
                            <br/>
                            <IceFormError name="password" />
                        </div>
                    </IceFormBinderWrapper>
                    <div  style={styles.fenn}>
                    </div>
                    <button onClick={this.Login} style={styles.btn}>登录</button>
            </div>
    </div>
        );
    }
}

const styles = {
    personal:{
        width: '100%' ,
        height: '100%' ,
        background: '#F5F5F5' ,
    },
    bt: {
        padding: '2.9rem 0.9375rem 0 0.9375rem' ,
        color: 'white' ,
        height: '7rem' ,
        background: '#1AA4F5' ,
        marginTop: '-0.125rem' ,
    },
    wel :{
        letterSpacing: '0.25rem' ,
        fontSize: '2.0625rem' ,
    },
    xian :{
        width: '2.3125rem' ,
        height: '0.125rem' ,
        background: 'white' ,
    },
    gs :{
        marginTop: '0.3125rem' ,
        letterSpacing: '0.125rem',
        fontSize: '0.75rem' ,
    },
// /*登录*/
    kj : {
        boxSizing: 'border-box' ,
        position: 'absolute' ,
        zIndex: 900 ,
        width: '92%' ,
        margin: '-6.5625rem 4% 0 4%' ,
        height: '17.4375rem' ,
        background: 'white' ,
        paddingTop: '1.75rem' ,
    },
    user:{
        position: 'relative' ,
        margin: '0 1.25rem 0 1.25rem' ,
        background: '#F4F6F8' ,
    },
    user1 :{
        position: 'relative' ,
        background: '#F4F6F8' ,
        margin: '1.25rem 1.25rem 0.8125rem 1.25rem'
    },
    i_user: {
        boxSizing: 'border-box' ,
        background: '#F4F6F8' ,
        fontSize: '0.75rem' ,
        width: '100%' ,
        paddingLeft: '3rem' ,
        height: '2.6875rem' ,
        outline: 'none' ,
        borderWidth: 0 ,
    },
    iimg :{
        position: 'absolute',
        top: '0.5625rem' ,
        left: '0.625rem' ,
    },
    fenn:{
        boxSizing: 'border-box' ,
        margin: '0 1.25rem 0 1.875rem' ,
        position: 'relative' ,
    },
    btn : {
        width: '100%' ,
        height: '3.125rem' ,
        position: 'absolute' ,
        bottom: 0 ,
        border: 'none' ,
        background: '#1AA4F5' ,
        color: 'white' ,
        fontSize: '1.25rem' ,
    }
}
export default Login;