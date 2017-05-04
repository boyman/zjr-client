/**
 * 小程序配置文件
 */

var protocol = 'http://';
var host = 'localhost:8444';

var config = {

    // 下面的地址配合云端 Demo 工作
    service : {
        host ,

        // 登录地址，用于建立会话
        loginUrl : `${protocol}${host}/login`,

        // 测试的请求地址，用于测试会话
        requestUrl : `${protocol}${host}/user`,

        Url : {
            getMyHostEvents : `${protocol}${host}/event/my_hosting`,
            addEvent : `${protocol}${host}/event/add`,
            allEvents : `${protocol}${host}/event/all`,
            participate : `${protocol}${host}/event/participate`,
            unparticipate : `${protocol}${host}/event/unparticipate`,
            guests : `${protocol}${host}/event/guests`,
        },
        getEventUrl : `${protocol}${host}/event/get`,

        // 测试的信道服务地址
        tunnelUrl : `${protocol}${host}/tunnel`,
    }
};

module.exports = config;