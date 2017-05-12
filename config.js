/**
 * 小程序配置文件
 */

var protocol = 'http://';
//var protocol = 'https://';
var host = 'localhost:8444';
//var host = 'yiyihost.com'

var config = {

    // 下面的地址配合云端 Demo 工作
    service : {
        host ,

        // 登录地址，用于建立会话
        loginUrl : `${protocol}${host}/login`,

        // 测试的请求地址，用于测试会话
        requestUrl : `${protocol}${host}/user`,

        Url : {
            getEventsForMe : `${protocol}${host}/event/for_me`,
            addEvent : `${protocol}${host}/event/add`,
            allEvents : `${protocol}${host}/event/all`,
            participate : `${protocol}${host}/event/guest/participate`,
            unparticipate : `${protocol}${host}/event/guest/unparticipate`,
            watch : `${protocol}${host}/event/watch`,
            unwatch : `${protocol}${host}/event/unwatch`,
            guests : `${protocol}${host}/event/guest/get`,
            myGuests : `${protocol}${host}/event/guest/my`,
            bringGuests : `${protocol}${host}/event/guest/bring`,
            test : `${protocol}${host}/event/guest/new_get`,
        },
        getEventUrl : `${protocol}${host}/event/get`,

        // 测试的信道服务地址
        tunnelUrl : `${protocol}${host}/tunnel`,
    }
};

module.exports = config;