import React, { Component } from 'react';

export default class  ShowTime extends  Component{
    constructor (props) {
        super(props) ;
        this.state = {
            show_time  : '',
            name : "距任务开始时间还有",
            type : 1
        }
    }
    componentWillMount() {
       this.changeName(this.props.type)
        this.setState({
            type : this.props.type,
            show_time : this.props.showTime
        })
    }
    changeName = (type) => {
        if (type == 1) {
            this.setState({
                name : "距任务开始时间还有"
            })
        } else if (type == 2) {
            this.setState({
                name : "距任务结束时间还有"
            })
        } else if (type == 3) {
            this.setState({
                name : "距任务结束已逾期"
            })
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps)
        this.setState({
            show_time : nextProps.showTime,
            type : nextProps.type
        })
        this.changeName(nextProps.type)
    }

    render(){
        return(
            <div className="blacktime">
                <div className="blacktime-p">
                    {this.state.name}
                </div>
                <div className="blacktime-time" style={{color : "red"}}>
                    {this.state.show_time}
                </div>
            </div>
        )
    }


}

