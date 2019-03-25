import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import options from '../../../api/api';
import src from "../../../assets/images/commit.png";
import del from "../../../assets/images/yy.png";

const {commit} = options

@withRouter
class  SubmitTask extends  Component{
    constructor (props) {
       super(props)
        this.state={
            imgshowarr : [],
            num : 9,
            error : ''
        }
        this.imgList = [];
        this.Img = [];

    }
    chooseType = () =>{
        this.input.click();
    }
    fileChange =(el) =>{
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''
    }
    fileList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
            //判断是否为文件夹
            if (files[i].type != '') {
                this.fileAdd(files[i]);
            } else {
                //文件夹处理
                this.folders(fileList.items[i]);
            }
        }
    }
    //文件夹处理
    folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
            files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
            for (let i = 0; i < file.length; i++) {
                if (file[i].isFile) {
                    _this.foldersAdd(file[i]);
                } else {
                    _this.folders(file[i]);
                }
            }
        });
    }
    foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
            _this.fileAdd(file)
        })
    }
    fileAdd(file) {
        let _this = this;
        if (this.state.num !== undefined) {
            _this.setState({num : _this.state.num--});
        }
        if (this.state.num !== undefined && this.state.num < 0) return;
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
            console.log("请选择图片文件")
            // this.$dialog.toast({mes: '请选择图片文件'});
        } else {
            let reader = new FileReader();
            let image = new Image();
            let _this = this;
            reader.readAsDataURL(file);
            reader.onload = function () {
                file.src = this.result;
                image.onload = function () {
                    let width = image.width;
                    let height = image.height;
                    file.width = width;
                    file.height = height;
                    _this.imgList.push({
                        file
                    });
                    let cc = file.src;
                    _this.Img.push(cc);
                    _this.setState({num : 9 - _this.imgList.length})
                    _this.imgshow();
                };
                image.src = file.src;

            }
        }
    }
    delImg(index) {
        // this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
        this.Img.splice(index, 1);
        this.setState({num : 9-this.Img.length})
        this.imgshow();
    }
    imgshow =() => {
        let _this = this;
        let imgshowarr = [];
        if (_this.Img.length>0){
            for (let i = 0 ; i<_this.Img.length; i++ ){
                let addimg = _this.Img[i];
                imgshowarr.push(
                    <li key={i}>
                        <img className="del" src={del} onClick={()=>{this.delImg(i)}}/>
                        <img className="list-addimg" src={addimg} />
                    </li>
                )

            }
        }
        _this.setState({imgshowarr})
    }

    otaskcommit = async() => {
        if (this.textarea.value == ''){
            this.setState({
                error : "内容不能为空"
            })
        }else {
            let id = this.props.location.search.slice(4);
            let value = {
                content : this.textarea.value,
                images : this.Img,
                task_id : id
            }
            let result = await commit(value);
            if (result.code == 1){
                this.props.history.push({
                    pathname : "/task/task?type=2"
                })
                window.location.reload();
            }
        }
    }
    render(){
        return(
            <div id={'commit'}>
                <div className="com-top">
                    <span >提交任务</span>
                </div>
                <div className={'com-content'}>
                    <div className="com-n">
                        内容:
                    </div>
                    <textarea className="textarea"  placeholder="请输入工作内容" ref={(el) => this.textarea = el}></textarea>
                    <div style={{color : "red"}}>
                        {this.state.error}
                    </div>
                    <div className="com-n">
                        添加照片
                    </div>
                    <input  ref={(e) => {this.input = e}} onChange={(el)=> this.fileChange(el)} type="file" id="upload_file" multiple style={{display: 'none'}} />
                    <div className="add" onClick={this.chooseType}>
                        <div className="add-image" align="center">
                            <img className="addp" src={src} alt="" />
                        </div>
                    </div>

                    <div className="add-img">
                        <p className="font14">图片(最多9张，还可上传{this.state.num < 0 ? (0) : (this.state.num)}张)</p>
                        <ul className="img-list">
                            {this.state.imgshowarr}
                        </ul>
                    </div>
                </div>
                <div onClick={this.otaskcommit} className="btncommit">
                    提交任务
                </div>
            </div>
        )
    }


}

export default SubmitTask;