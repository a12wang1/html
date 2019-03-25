import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { DatePicker } from '@alifd/next';
import {withRouter} from 'react-router-dom';
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError,
} from '@icedesign/form-binder';
import {Input} from '@icedesign/base';
import Dialog from 'rc-dialog';
import src from '../../assets/images/commit.png';
import del from '../../assets/images/yy.png';
import TreeSelect from 'react-do-tree-select';
import options from '../../api/api';

moment.locale('zh-cn');

const { getLevel,checkPerson, modifyInfo, modify} = options;

@withRouter
export default class Release extends Component {
    static defaultProps = {};
    constructor(props) {
        super(props);
        this.state = {
            level : 5,
            leve : '1',
            title :  '',
            content : '',
            startTime : '',
            stopTime : '',
            num : 9,
            imgshowarr : [],
            personnum : 0,
            visible : false,
            showlevel : 0,
            checked : [],
            result : [],
            data : [],
            personInput : <Input style={{ width: '100%' }} placeholder="请您选择接收人"  />

        };
        this.imgList = [];
        this.Img = [];
        this.onChecked = this.onChecked.bind(this);
        this.selected = this.selected.bind(this);
        this.chooseType = this.chooseType.bind(this);
        this.taskchoice = this.taskchoice.bind(this);
        this.choicesubmit = this.choicesubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    async componentWillMount () {
        let id = this.props.history.location.search.slice(4);
        let _this = this;
        const result = await getLevel();
        const persondata = await checkPerson();
        const checkpersondata = [];
        let modifydata = await modifyInfo(id);
         let {users} = modifydata;
         let checked = JSON.parse('[' + users + ']');
        const {title,text,start_time , end_time, pics, name,integral} = modifydata.task_info;
        if (persondata.length > 0) {
            for (let i=0; i<persondata.length; i++){
                let json = {};
                json.title = persondata[i].dept_name;
                json.value = persondata[i].name + '_'+ persondata[i].dept_name;
                if (persondata[i].item.length > 0){
                    let child = [];
                    for (let j=0; j<persondata[i].item.length; j++){
                        let childjson = {};
                        childjson.value = persondata[i].item[j].name;
                        childjson.title = persondata[i].item[j].user_name;
                        child.push(childjson);
                    }
                    json.children = child;
                } else {
                    json.children = [];
                    json.disabled = true;
                }
                checkpersondata.push(json);
            }
        }
        for (let i = 0; i<result.length; i++ ) {
            if (result[i].name == name){
                _this.setState({
                    leve : result[i].id
                })
                break;
            }
        }
        for (let i =0; i< pics.length; i++){
            _this.Img.push(pics[i]);
        }
        this.setState({
            result,
            data : checkpersondata,
            title,
            content : text,
            startTime : start_time,
            stopTime : end_time,
            level : integral,
            checked,
            personnum : checked.length,
            num : this.state.num - pics.length,
        })
        if (this.Img.length>0){
            _this.imgshow();
        }
        if (this.state.personnum > 0) {
            _this.setState({
                personInput : <Input style={{ width: '100%' }} value={'已选择' + _this.state.personnum + '人,点击重新选择'}  disabled={true} />
            });
        }
    }
    onFormChange = (value) => {
        // console.log(value)
    };
    submit = () => {
        let _this = this;
        this.formRef.validateAll(async (error, value) => {
            if (error) {
                // 处理表单报错
            } else {
                let data = {};
                let pics = '', images = [];
                let task_id = _this.props.history.location.search.slice(4);
                let {title , content,level} = value;
                let start_time = value.startTime;
                let end_time = value.stopTime;
                let receive = JSON.stringify(value.checked).replace("[",'').replace("]",'');
                if (_this.Img.length >0) {

                    for (let i =0; i< _this.Img.length; i++){
                        if (_this.Img[i].indexOf("data:image/png;base64") != '-1'){
                            images.push(_this.Img[i]);
                        }else {
                            pics = pics+_this.Img[i] + ','
                        }
                    }
                    data = {
                        task_id,
                        title,
                        content,
                        level,
                        start_time,
                        end_time,
                        receive,
                        pics,
                        images
                    }
                }else {
                    data = {
                        task_id,
                        title,
                        content,
                        level,
                        start_time,
                        end_time,
                        receive,
                    }
                }
                let result  = await modify(data);
                if (result.code == 1){
                    _this.props.history.push(
                        {
                            pathname : '/publishtask/showtask',
                        }
                    );
                    window.location.reload();
                }
            }
        });
    };
    selected = () =>{
        let value = this.leve.value;
        this.setState({
            level : value
        })
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
    taskchoice =() => {
        this.setState({
            visible: true,
        });
    }
    onChecked = (val, e) =>{
        let checked = [];
        for (let i =0 ; i< val.length; i++) {
            if (val[i].indexOf("_") == -1){
                checked.push(val[i]);
            }
        }
        this.setState({
            personnum : checked.length,
            checked
        })
    }
    choicesubmit =() => {
        this.setState({
            visible: false,
        });
        let _this = this;
        if (this.state.personnum > 0) {
            _this.setState({
                personInput : <Input style={{ width: '100%' }} value={'已选择' + _this.state.personnum + '人,点击重新选择'}  disabled={true} />
            });
        }

    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    }
    option = () => {
        let _this = this;
        return (
            <select ref={e => _this.leve = e} onChange={_this.selected}>
                {_this.state.result.map(item => (
                    <option value={item.integral} key={item.id} selected={_this.state.leve == item.id ? true : false}>{item.name}</option>
                ))}

            </select>
        )
    }
    render() {
        const checkbox = {
            enable: true,
            parentChain: true,   // child Affects parent nodes;
            childrenChain: true, // parent Affects child nodes;
            halfChain: false,    // The selection of child nodes affects the semi-selection of parent nodes.
            initCheckedList: []  // Initialize check multiple lists
        }
        let _this = this;
        return (
            <div className="app">
                <IceFormBinderWrapper
                    ref={(formRef) => {
                        this.formRef = formRef;
                    }}
                    value={this.state}
                    onChange={this.onFormChange}
                >
                    <div>
                        <div className='bt'>
                            任务标题
                            <div>*</div>
                        </div>
                        <div className='ipt'>
                            <IceFormBinder
                                name="title"
                                required
                                message="标题名称必须填写"
                            >
                                <Input style={{ width: '100%' }} placeholder="请输入标题名称" />
                            </IceFormBinder>
                            <br/>
                            <IceFormError name="title" />
                        </div>

                        <div className='bt'>
                            输入内容
                            <div>*</div>
                        </div>
                        <div className='ipt'>
                            <IceFormBinder
                                name="content"
                                required
                                message="任务内容必须填写"
                            >
                                <Input style={{ width: '100%' }} placeholder="请输入任务内容" />
                            </IceFormBinder>
                            <br/>
                            <IceFormError name="content" />
                        </div>
                        <div className='bt'>
                            紧急程度
                            <div>*</div>
                        </div>
                        <div className='ipt'>
                            {this.option()}
                        </div>
                        <div className='bt'>
                            任务积分
                            <div>*</div>
                        </div>
                        <div className='ipt'>
                            <IceFormBinder
                                name="level"
                                required
                                message=""
                            >
                                <Input style={{ width: '100%' }}   Value = {this.state.level} disabled={true} />
                            </IceFormBinder>
                            <br/>
                            <IceFormError name="level" />
                        </div>
                        <div className='bt'>
                            开始时间
                            <div>*</div>
                        </div>
                        <div className='ipt'>
                            <IceFormBinder name="startTime" required  message = '请选择开始时间'>
                                <DatePicker format="YYYY-MM-DD" showTime={{ format: 'HH:mm' }} style = {{width : '100%'}} ref={(el) => {this.starttime = el}} />
                            </IceFormBinder>
                            <IceFormError name="startTime" />
                        </div>
                        <div className='bt'>
                            结束时间
                            <div>*</div>
                        </div>
                        <div className='ipt'>
                            <IceFormBinder name="stopTime" required  message = '请选择结束时间'>
                                <DatePicker format="YYYY-MM-DD" showTime={{ format: 'HH:mm' }} style = {{width : '100%'}}  />
                            </IceFormBinder>
                            <IceFormError name="stopTime" />
                        </div>
                        <div className='bt'>
                            选择接收人
                            <div>*</div>
                        </div>
                        <div className='ipt'>
                            <IceFormBinder
                                name="person"
                                required = {this.state.personnum>0? false : true}
                                message="接收人至少选择一人"
                            >

                                <a onClick={()=> {this.taskchoice()}}>
                                    {this.state.personInput}
                                </a>
                            </IceFormBinder>
                            <br/>
                            <IceFormError name="person" />
                        </div>
                        <div className="bt">添加照片
                        </div>
                        <div className="com-content">
                            <input  ref={(e) => {this.input = e}} onChange={(el)=> this.fileChange(el)} type="file" id="upload_file" multiple style={{display: 'none'}} />
                            <div className="add" onClick={this.chooseType}>
                                <div className="add-image" align="center">
                                    <img className="addp" src={src} alt="" />
                                </div>
                            </div>

                            <div className="add-img" show="Img.length">
                                <p className="font14">图片(最多9张，还可上传{this.state.num < 0 ? (0) : (this.state.num)}张)</p>
                                <ul className="img-list">
                                    {this.state.imgshowarr}
                                </ul>
                            </div>
                        </div>
                        <div className="kkj">
                            <div className="lan_btn" onClick={this.submit}>
                                提交
                            </div>
                        </div>
                    </div>
                    <Dialog
                        visible={this.state.visible}
                        animation="slide-fade"
                        maskAnimation="fade"
                        onClose={this.onClose}
                        style={{width: '100%', overflow: 'hidden', margin: '0'}}
                        title={<div>接收人</div>}
                    >
                        <div className="App">
                            <TreeSelect
                                treeData={this.state.data}
                                style={{width: '100%', height: 600, margin: 0}}
                                selectVal={this.state.selectVal}
                                onSelect={this.onSelect}
                                onExpand={this.onExpand}
                                onChecked={this.onChecked}
                                checkbox={checkbox}
                                showlevel={this.state.showlevel}
                                customTitleRender={this.customTitleRender}/>
                            <div className="pos">
                                已选择：{_this.state.personnum}人
                                <div className="btn" onClick={this.choicesubmit}>
                                    确定
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </IceFormBinderWrapper>
            </div>
        );
    }
}