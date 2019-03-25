import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import './BtnSubmit.css';

@withRouter
class  BtnSubmit extends  Component{
    constructor (props) {
        super(props) ;
        this.state = {
            can_commit : 0,
            id : props.id || '',

        }

    }
    componentWillMount() {
        this.setState({
            can_commit : this.props.cancommit,
            id : this.props.id
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            can_commit : nextProps.cancommit,
            id : nextProps.id
        })
    }

    submitTask = () => {
        this.props.history.push({
            pathname : '/task/submittask?id='+this.state.id
        })
        window.location.reload()
    }

    render(){
        if (this.state.can_commit == 0){
            return (
                <div style={styles.errorClass}>
                    审核中
                </div>
            )
        }
        return(
            <div>
                <div style={styles.activet} onClick={this.submitTask}>
                    提交任务
                </div>
            </div>
        )

    }


}
const styles = {
    activet :{
        width:'100%' ,
        height:'3.1875rem' ,
        position: 'fixed' ,
        bottom: '0rem ',
        textAlign: 'center' ,
        fontSize: '1.0625rem' ,
        fontFamily: 'PingFang-SC-Medium' ,
        fontWeight:'bold' ,
        lineHeight: '3.1875rem' ,
        color: 'rgba(255,255,255,1)' ,
        backgroundColor: '#1AA4F5' ,
        zIndex: 999 ,
    },
    errorClass : {
        width:'100%' ,
        height:'3.1875rem' ,
        position: 'fixed' ,
        bottom: '0rem ',
        textAlign: 'center' ,
        fontSize: '1.0625rem' ,
        fontFamily: 'PingFang-SC-Medium' ,
        fontWeight:'bold' ,
        lineHeight: '3.1875rem' ,
        color: 'rgba(255,255,255,1)' ,
        backgroundColor: '#E5E5E5' ,
        zIndex: 999 ,
    }


}
export default BtnSubmit;