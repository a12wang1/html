import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {
    FormBinder as IceFormBinder,
    FormBinderWrapper as IceFormBinderWrapper,
    FormError as IceFormError
} from "@icedesign/form-binder";
import {Input} from "@icedesign/base";
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/es/Button";
import './register.css'
// import options from '../../api/api';
// const {register} = options;

@withRouter
class Register extends Component {
    static defaultProps = {};
    constructor(props) {
        super(props);
        this.state = {
            code : '',

        };

    }
    async componentWillMount () {

    }
    register = ()=> {
        let _this = this;
        this.formRef.validateAll(async (error, value) => {
            if (error) {
                // 处理表单报错
            } else {

            }
        });
    }
    render() {

        return (
            <div className={"div"}>
                <marquee direction="left" ><p>欢迎来到每日比价</p></marquee>
                    <IceFormBinderWrapper
                        ref={(formRef) => {
                            this.formRef = formRef;
                        }}
                        value={this.state}
                    >
                        <Row className={'row'}>
                            <Col lg={2} sm={2} xm={2}>
                                用户名
                                <span style={styles.span}>*</span>
                                :
                            </Col>
                            <Col lg={3} sm={3} xm={3}>
                                <IceFormBinder
                                    name="username"
                                    required
                                    message="用户名必须填写"
                                >
                                    <Input  htmlType="text" placeholder="请输入用户名" />
                                </IceFormBinder>
                                <br/>
                                <IceFormError name="username" />
                            </Col>
                        </Row>
                        <Row className={'row'}>
                            <Col lg={2} sm={2} xm={2}>
                                密码
                                <span style={styles.span}>*</span>
                                :
                            </Col>
                            <Col lg={3} sm={3} xm={3}>
                                <IceFormBinder
                                    name="password"
                                    required
                                    message="密码必须填写"
                                >
                                    <Input  htmlType="password" placeholder="请输入密码" />
                                </IceFormBinder>
                                <br/>
                                <IceFormError name="password" />
                            </Col>
                        </Row>
                        <Row className={'row'}>
                            <Col lg={2} sm={2} xm={2}>
                                确认密码
                                <span style={styles.span}>*</span>
                                :
                            </Col>
                            <Col lg={3} sm={3} xm={3}>
                                <IceFormBinder
                                    name="againpassword"
                                    required
                                    message="两次密码不一致"
                                >
                                    <Input  htmlType="password" placeholder="请输入密码" />
                                </IceFormBinder>
                                <br/>
                                <IceFormError name="againpassword" />
                            </Col>
                        </Row>
                        <Row className={'row'}>
                            <Col lg={2} sm={2} xm={2}>
                                年龄
                                <span style={styles.span}>*</span>
                                :
                            </Col>
                            <Col lg={3} sm={3} xm={3}>
                                <IceFormBinder
                                    name="age"
                                    required
                                    number
                                    message="年龄必须填写"
                                >
                                    <Input  htmlType="number" placeholder="请输入年龄" />
                                </IceFormBinder>
                                <br/>
                                <IceFormError name="age" />
                            </Col>
                        </Row>
                        <Row className={'row'}>
                            <Col lg={2} sm={2} xm={2}>
                                手机号码
                                <span style={styles.span}>*</span>
                                :
                            </Col>
                            <Col lg={3} sm={3} xm={3}>
                                <IceFormBinder
                                    name="tel"
                                    required
                                    message="手机号码必须填写"
                                >
                                    <Input  htmlType="phone" placeholder="请输入常用手机号" />
                                </IceFormBinder>
                                <br/>
                                <IceFormError name="tel" />
                            </Col>
                        </Row>
                        <Row className={'row'}>
                            <Col lg={2} sm={2} xm={2}>
                                邮箱
                                <span style={styles.span}>*</span>
                                :
                            </Col>
                            <Col lg={3} sm={3} xm={3}>
                                <IceFormBinder
                                    name="email"
                                    required
                                    message="邮箱必须填写"
                                >
                                    <Input  htmlType="mail" placeholder="请输入邮箱地址" />
                                </IceFormBinder>
                                <br/>
                                <IceFormError name="email" />
                            </Col>
                        </Row>
                    </IceFormBinderWrapper>
                    <Row className={'row'}>
                        <Col lg={2} sm={2}>
                            <Button >
                                立即注册
                            </Button>
                        </Col>
                        <Col lg={2} sm={2}>
                            <Button >
                                重置
                            </Button>
                        </Col>
                        <Col lg={2} sm={2}>
                            <Button >
                                登录
                            </Button>
                        </Col>
                    </Row>
            </div>
        );
    }
}

const styles = {
    span : {
        color : "red"
    }
}
export default Register;