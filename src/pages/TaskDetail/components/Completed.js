import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import sheng from '../../../assets/images/sheng.png';
import option from '../../../api/api';
import shenw from "../../../assets/images/shenw.png";

const {querytaskcompleted} = option;

@withRouter
class  Completed extends  Component{
    constructor (props) {
        super(props) ;
        this.state = {
            user_name : "用户2",
            visible : false,
            result : []
        }
        this.image = this.image.bind(this);
    }
    async componentWillMount () {
        let search = this.props.location.search.slice(1).split("&&");
        let id = search[0].slice(3);
        let result = await querytaskcompleted(id);
        let {user_name,avatar} = result.task;
        this.setState(
            {
                result: result.commit,
                user_name,
                avatar
            }
        )

    }
    image = (data) => {
        let arr = [];
        if (data.length > 0) {
            for (let i =0; i<data.length; i++){
                let src = data[i];
                arr.push(
                    <img  className="imgs d" src={src} alt="" key={i}/>
                )
            }
        }
        return arr;
    }
    imgshow = (num) =>{
        if (num == 0) return <img src= {shenw} alt="" />
        if (num == 2) return  <img src={sheng} alt="" />
        return '';
    }
    rejectshow = (num,id,reject,time) => {
        let _this = this;
        if (num == 0) {
            return (
                <div className="sttp">
                    <div className="sttp-t">
                        {_this.state.user_name}回复: <span className="sttp-time"> {time}</span>
                    </div>
                    <div className="textp">
                        {reject}
                    </div>
                </div>
            )
        }
        return '';
    }
    render(){
        return(
            <div>
                <div className="daishen" style={{background : "#F5F5F5"}}>
                    <div className="dai-top">
                        <span>提交任务</span>
                    </div>
                    {this.state.result.map(item =>(
                        <div className="dai-black" key={item.id}>
                            <img className="dai-userimg" src={this.state.avatar} alt="" />
                            <div className="username">
                                {item.user_name}
                            </div>
                            <div className="dai-time timec">
                                {item.add_time}
                            </div>
                            <div className="textp">
                                {item.text}
                            </div>
                            <div className="blackimg deblack">
                                {this.image(item.pics)}
                            </div>
                            <div className="sttimg">
                                {this.imgshow(item.status)}
                            </div>
                            {this.rejectshow(item.status,item.id, item.reject,item.process_time)}
                        </div>
                    ))}
                </div>
            </div >
        )
    }


}
export default Completed;
