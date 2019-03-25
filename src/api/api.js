// import { get, post } from './request.js';
import mock from './mock';
import {post} from "./request";

//发布任务-未开始的任务
const unStart = () => {
    return mock.unStartedmock.data;
    // return get(`https://sdrhup.com/postedTask/unStart`).then((res) => {
    //     return(res);
    // })
}

//发布任务-进行中的任务
const tasking = () => {
    return mock.taskingmock.data;
    // return get(`https://sdrhup.com/postedTask/tasking`).then((res) => {
    //     return res;
    // })
}

//发布任务-要审核的任务
const check = () => {
    return mock.checkmock.data;
    // return get(`https://sdrhup.com/postedTask/check`).then((res) =>{
    //     return res
    // })
}

//发布任务-完成的任务
const completed = () => {
    return mock.completedmock.data
    // return get(`https://sdrhup.com/postedTask/completed`).then((res)=> {
    //     return res
    // })
}

//获取紧急程度
const getLevel = () => {
    return mock.getLevelmock.data;
    // return get('https://sdrhup.com/task/getLevel').then((res)=> {
    //     return res;
    // })
}

//发布任务选择人
const checkPerson = () => {
    return mock.checkPersonmock.data;
    // return get(`https://sdrhup.com/company/checkPerson`).then((res)=> {
    //     return res;
    // })
}

//发布任务
const publishtask = (value) => {
    return mock.publishtaskmock;
    // return post(`https://sdrhup.com/Task/publishTask`,{
    //     value
    // }).then((res) => {
    //     return res;
    // })
}

//发布的任务详情
const commitInfo = (id) => {
    return mock.commitInfomock.data;
    // return post(`https://sdrhup.com/postedTask/commitInfo`,{
    //         task_id : id
    // }).then((res) => {
    //     return res
    // })
}

// 删除任务
const deleteTask  = (id) => {
    return mock.deleteTaskmock;
    // return post(`https://sdrhup.com/task/deleteTask`,{
    //         task_id : id
    // }).then((res) => {
    //     return res
    // })
}

// 修改任务时显示的信息
const modifyInfo = (id) => {
    return mock.modifyInfomock.data;
    // return post(`https://sdrhup.com/querytask/modifyInfo`,{
    //         task_id : id
    // }).then((res) => {
    //     return res
    // })
}

//修改任务
const  modify = (value) => {
    return mock.modifymock;
    // return post(`https://sdrhup.com/Task/modify`,{
    //         value
    // }).then((res) => {
    //     return res
    // })
}

//任务提交驳回
const reject = (value) => {
    return mock.rejectmock;
    // return post(`https://sdrhup.com/task/reject`,{
    //         value
    // }).then((res) => {
    //     return res
    // })
}

//任务提交通过
const pass = (value) => {
    return mock.passmock;
    // return post(`https://sdrhup.com/task/pass`,{
    //         value
    // }).then((res) => {
    //     return res
    // })
}

//获取组织架构
const architecture = () => {
    return mock.architecturemock.data;
    // return get(`https://sdrhup.com/company/architecture`).then((res) => {
    //     return res;
    // })
}

//获取指定部门的人
const companyperson = (value) => {
    return mock.companypersonmock.data;
    // return post(`https://sdrhup.com/company/person`,{
    //         value
    // }).then((res) => {
    //     return res
    // })
}

//获取用户信息
const userInfo = (id) => {
    return mock.userInfomock.data;
    // return post(`https://sdrhup.com/userInfo`,{
    //         user_id : id
    // }).then((res) => {
    //     return res
    // })
}
//获取用户自己的信息
const selfInfo = () => {
    return mock.selfInfomock.data;
    // return post(`https://sdrhup.com/userInfo`).then((res) => {
    //     return res
    // })
}
//修改用户信息
const usermodify = (value) => {
    return mock.usermodifymock;
    // return post(`https://sdrhup.com/user/modify`,{
    //     value
    // }).then((res) => {
    //     return res
    // })
}

// 查询用户积分
const userintegral = () => {
    return mock.userintegralmock.data;
    // return get(`https://sdrhup.com/user/integral`).then((res) => {
    //     return res;
    // })
}

//查询历史积分
const userhistoryIntegral = (id) => {
    return mock.userhistoryIntegralmock;
    // return post(`https://sdrhup.com/user/historyIntegral`,{
    //     index : id
    // }).then((res) => {
    //     return res
    // })
}

//登录
const login = (value) => {
    return mock.loginmock;
    // return post(`https://sdrhup.com/WxAuth/login`,{
    //     value
    // }).then((res)=> {
    //     return res
    // })
}

//查询没有开始的任务
const notStarted = () => {
    return mock.notStartedmock.data;
    // return get(`https://sdrhup.com/Task/notStarted`).then((res) => {
    //     return(res);
    // })
}
//已经逾期的任务
const overdueTask = () => {
    return mock.overdueTaskmock.data;
    // return get(`https://sdrhup.com/querytask/overdueTask`).then((res) => {
    //     return(res);
    // })
}
//已完成的任务
const taskcompleted = () => {
    return mock.taskcompletedmock.data;

}
//进行中的任务
const taskTasking = () => {
    return mock.task_taskingmock.data;
}
//查询任务详情
const taskInfo = (id) => {
    return mock.taskInfomock.data;
    // return post(`https://sdrhup.com/QueryTask/taskInfo`,{
    //         task_id : id
    // }).then((res) => {
    //     return res
    // })
}
//用户提交任务
const commit = (value) => {
    return mock.commitmock;
    // return post(`https://sdrhup.com/task/commit`,{
    //     value
    // }).then((res) => {
    //     return res
    // })
}
const querytaskcompleted = (id) => {
    return mock.querytaskcompletedmock.data;
    // return post(`https://sdrhup.com/querytask/completedinfo`,{
    //         task_id : id
    // }).then((res) => {
    //     return res
    // })
}

//用户 --已提交的任务

const userTaskSubmit = () => {
    return mock.userTaskSubmitmock.data;
    // return get(`https://sdrhup.com/usertask/submitted`).then((res)=> {
    //     return res;
    // })
}

//用户 --已完成的任务

const userTaskCompleted = () => {
    return mock.userTaskCompletedmock.data;
    // return get(`https://sdrhup.com/usertask/completed`).then((res)=> {
    //     return res
    // })
}

//用户 --未完成的任务
const userTaskUnCompleted = () => {
    return mock.userTaskUnCompletedmock.data;
    // return get(`https://sdrhup.com/usertask/uncompleted`).then((res)=>{
    //   return res
    // })
}

//用户任务详情
const usertaskInfo =(id) => {
    return mock.usertaskInfomock.data;
    // return post(`https://sdrhup.com/usertask/taskInfo`,  {
    //     task_id : id
    // }).then((res)=> {
    //     return res
    // })
}
export default {
    unStart,
    tasking,
    check,
    completed,
    getLevel,
    checkPerson,
    publishtask,
    commitInfo,
    deleteTask,
    modifyInfo,
    modify,
    reject,
    pass,
    architecture,
    companyperson,
    userInfo,
    selfInfo,
    usermodify,
    userintegral,
    userhistoryIntegral,
    login,
    notStarted,
    overdueTask,
    taskcompleted,
    taskTasking,
    taskInfo,
    commit,
    querytaskcompleted,
    userTaskSubmit,
    userTaskCompleted,
    userTaskUnCompleted,
    usertaskInfo
}