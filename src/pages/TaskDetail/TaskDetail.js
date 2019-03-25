import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ShowTime from './components/showTime'
import BtnSubmit from './components/BtnSubmit';
import Completed from './components/Completed';
import options from '../../api/api';
const {taskInfo} = options;

@withRouter
class  PublishTaskDetali extends  Component{
    constructor (props) {
        super(props) ;
        this.state = {
            user_name : "",
            name : "",
            title : '',
            text: '',
            start_time : '',
            end_time : '',
            names : '',
            integral : '',
            show_time  : '',
            image : [],
            show : []
        }
    }
    async componentWillMount () {
        const search = this.props.location.search.slice(1).split("&&");
        let id = search[0].slice(3);
        let type = search[1].slice(5);
        let result = await taskInfo(id);
        let {can_commit} = result.commit_info;
        let {
            user_name,
            name,
            names,
            title,
            text,
            start_time,
            end_time,
            integral,
            show_time,
            pics,
            avatar
        }= result.base_info;
        this.setState({
            id,
            type,
            user_name,
            name,
            names,
            title,
            text ,
            start_time,
            end_time,
            integral,
            show_time,
            image : pics,
            avatar
        })
        let _this = this;
        if (type =="1") {
            _this.setState({
                show : [
                    <ShowTime key={0}type={1} showTime={show_time}/> ,
                ]
            })
        } else if (type == '2'){
            _this.setState({
                show : [
                    <ShowTime key={0} type={2} showTime={show_time}/>,
                    <BtnSubmit key={1} cancommit ={can_commit} id={id}/>
                ]
            })
        }else if ( type == "3"){
            _this.setState({
                show : [
                    <ShowTime key={0} showTime={show_time} type={3}/>
                ]
            })
        }else if ( type == "4") {
            _this.setState({
                show : [
                    <Completed key={0} id={id}/>
                ]
            })
        } else {
            _this.setState({
                show : []
            })
        }
    }
    imgshow = () => {
        let arr = [],_this = this;
        if (this.state.image.length > 0){
            for(let i =0; i< _this.state.image.length; i++){
                arr.push(
                    <img src = {_this.state.image[i]}  key={i} className="imgs"/>
                )
            }
        }
        return arr;
    }
    render(){
        return(
            <div id="publishdetail" style={{background : "#F5F5F5"}}>
                <div className="big">
                    <div className="content-top" >
                        <img className="userimg" src={this.state.avatar} alt="" />
                        <span className="ctoptext">{this.state.user_name}</span>
                        <div  className={this.state.name=== '一般'? ("nextbtn") : ((this.state.name=== '次要')?("nextbtno") : ((this.state.name=== '重要')?("nextbtnt") : ("nextbtntt")))}>
                            {this.state.name}
                        </div>
                    </div>
                    <div className="con-bottom">
                        <div className="thoms">
                            {this.state.title}
                        </div>
                        <div className="textp">
                            {this.state.text}
                        </div>
                        <p className="daotime">开始时间:{this.state.start_time}</p>
                        <p className="daotime">结束时间:{this.state.end_time}</p>
                        <p className="daotime">接收人:&nbsp;{this.state.names}</p>
                        <p className="daotime guic" style={{color : "red"}}>积分规则: 完成+{this.state.integral}分 &nbsp;未完成-{this.state.integral}分</p>

                        <div className="blackimg">
                            {this.imgshow()}
                        </div>
                    </div>
                </div>
                {this.state.show}
            </div >
        )
    }


}

export default PublishTaskDetali;