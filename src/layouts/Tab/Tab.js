import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import one from "../../assets/images/rent.png";
import two from "../../assets/images/fao.png";
import three from '../../assets/images/ogo.png';
import four from '../../assets/images/myo.png';
import reno from '../../assets/images/reno.png'
import fat from '../../assets/images/fat.png'
import ogt from '../../assets/images/ogt.png'
import myt from '../../assets/images/myt.png'
import './Tab.css';

@withRouter
class Tab extends Component{
    constructor (props) {
        super(props);
        this.state = {
            one : reno ,
            two : fat,
            three,
            four
        }
        this.ren = this.ren.bind(this);
        this.fabu = this.fabu.bind(this);
        this.orgnization = this.orgnization.bind(this);
        this.my = this.my.bind(this);
    }
    componentWillMount() {
        let _this = this;
        switch (this.props.type) {
            case 0 : _this.setState({
                        one,
                        two,
                        three,
                        four ,
                    }); break;
            case 1 : _this.setState({
                        one : reno ,
                        two : fat,
                        three,
                        four
                    });break;
            case 2 : _this.setState({
                        one : reno ,
                        two ,
                        three :ogt ,
                        four
                    });break;
            case 4 : _this.setState({
                        one : reno ,
                        two ,
                        three,
                        four : myt
                    });break;
            default : _this.setState({
                        one : reno ,
                        two : fat,
                        three,
                        four
                    });break;
        }
    }
    ren = () => {
        this.setState({
            one,
            two,
            three,
            four ,
        })
        this.props.history.push({
            pathname : '/task/task',
        })
        // window.location.reload()
    }
    fabu = () => {
        this.setState({
            one : reno ,
            two : fat,
            three,
            four
        })
        this.props.history.push({
            pathname : '/publishtask/showtask',
        })
        // window.location.reload()
    }
    orgnization = () => {
        this.setState({
            one : reno ,
            two ,
            three :ogt ,
            four
        })
        this.props.history.push({
            pathname : '/orgnization/index',
        })
        // window.location.reload()
    }
    my = () => {
        this.setState({
            one : reno ,
            two ,
            three,
            four : myt
        })
        this.props.history.push({
            pathname : '/personal/index',
        })
        // window.location.reload()
    }

    render () {
        return (
                <div id="tab" >
                    <div className="black" onClick={this.ren}>
                        <img className="icon"  src={this.state.one} alt="" />
                        <div className={{active: this.state.isActiveo, linet: true  }} style = {{ textAlign : "center", marginTop : "3px"}}>任务</div>
                    </div>

                    <div className="black" onClick={this.fabu}>
                        <img className="icon" src={this.state.two} alt="" />
                        <div className={{ active: this.state.isActivet, linet: true  }} style = {{ textAlign : "center", marginTop : "3px"}}>发布任务</div>
                    </div>

                    <div className="black" onClick={this.orgnization} >
                        <img  className="icon " src={this.state.three} alt="" />
                        <div className={{ active: this.state.isActivett, linet: true  }} style = {{ textAlign : "center", marginTop : "3px"}}>组织架构</div>
                    </div>

                    <div className="black" onClick={this.my}>
                        <img className="icon" src={this.state.four} alt="" />
                        <div className={ {active: this.state.isActivef , linet: true } } style = {{ textAlign : "center", marginTop : "3px"}}>我的</div>
                    </div>
                </div>
        )
    }
}


export default Tab;