import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Tab from '../../layouts/Tab';
import imgtwo from "../../assets/images/imgtwo.png";
import options from '../../api/api';
import nonew from "../../assets/images/nonew.png";

const {
    notStarted,
    overdueTask,
    taskcompleted,
    taskTasking
} = options;
@withRouter
class  Task extends  Component{
    constructor (props) {
        super(props) ;
        this.state = {
            flag : 1,
            data : [],
            dtime: "开始时间",
            nav : "未开始"
        }
    }

     componentWillMount() {

        const type = this.props.location.search.slice(6);
        if (type == '' || type == 1){
            this.towei();
        } else if (type == 2) {
            this.tojin()
        }else if (type == 3){
            this.todai()
        } else if (type == 4) {
            this.towan()
        } else {
            this.towei();
        }

    }

    towei = async () => {
        let result = await notStarted();
        this.setState({
            flag : 1,
            dtime : "开始时间",
            data : result,
            nav : "未开始",
        })
    }
    tojin = async () => {
        let result = await taskTasking()
        this.setState({
            flag : 2,
            dtime : "倒计时",
            data : result,
            nav : "进行中"
        })
    }
    todai = async () => {
        let result = await overdueTask();
        this.setState({
            flag : 3,
            dtime : "已逾期",
            data : result,
            nav : "已逾期"
        })
    }
    towan = async() => {
        let result = await taskcompleted();
        this.setState({
            flag : 4,
            dtime : "开始时间",
            data : result,
            nav : "已完成"
        })
    }
    render(){
        return(
            <div id="publish">
                <div className="top"  router="true">
                    <nav>
                        <ul>
                            <li onClick= {this.towei} className={this.state.flag == 1 ?('active') : ('')}><a href={'#/task/task?type=1'} style={styles.a}>未开始</a></li>
                            <li  onClick= {this.tojin}  className={this.state.flag == 2 ?('active') : ('')}><a href={'#/task/task?type=2'} style={styles.a}>进行中</a></li>
                            <li  onClick= {this.todai} className={this.state.flag == 3 ?('active') : ('')}><a href={'#/task/task?type=3'} style={styles.a}>已逾期</a></li>
                            <li onClick= {this.towan} className= {this.state.flag == 4?('active') : ('')} ><a href={'#/task/task?type=4'} style={styles.a}>已完成</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="content">
                    {this.state.data.length >0 ? (
                        this.state.data.map(item =>(
                            <div className="big" key ={item.id}>
                                <a href= {"#/task/taskdetail?id="+ item.id + "&&type="+ this.state.flag}>
                                    <div className="content-top" >
                                        <img className="userimg"  src={item.avatar} alt="" />
                                        <span className="ctoptext"> {item.user_name}指派的任务</span>
                                        <div className={item.name === '一般'? ('nextbtn') : (item.name === '次要'? ("nextbtno"): (item.name === '重要'? ("nextbtnt"): ('nextbtntt')))}>
                                            {item.name}
                                        </div>
                                    </div>
                                    <div className="con-bottom">
                                        <div className="thoms">
                                            <span className="thtitle">{item.title}</span>
                                            <img className="imgtwo" src={imgtwo} alt="" />
                                            <div className="pnum" >
                                                <span >{item.pics}</span>
                                            </div>

                                        </div>
                                        <div className="textp">
                                            {item.text}
                                        </div>
                                        {
                                            this.state.flag ==2 || this.state.flag == 3 ? (
                                                <p className="daotime" style={{color : "red"}}>
                                                    {this.state.dtime} :&nbsp;&nbsp;{item.end_time}
                                                </p>
                                            ) : (
                                                <p className="daotime" >
                                                    {this.state.dtime} :&nbsp;&nbsp;{item.start_time}
                                                </p>
                                            )
                                        }


                                    </div>
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="nog" key={0}>
                            <img className="nog-img" src={nonew} alt="" />
                            <div className="nog-t">
                                暂时还没有{this.state.nav}的任务
                            </div>
                        </div>
                    )}
                </div>
                <Tab type = {0}/>
            </div>
        )
    }

}

const styles = {
    a : {
        textDecoration : 'none',
        color : "black"
    },
}

export default Task;