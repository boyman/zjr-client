/**
 * 小程序配置文件
 */

var protocol = 'https://';
var host = 'yiyihost.com';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${protocol}${host}/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${protocol}${host}/user`,

        Url: {
            getMyHostEvents: `${protocol}${host}/get_my_host_events`,
            addEvent: `${protocol}${host}/add_event`,
            allEvents: `${protocol}${host}/all_events`,
            participate: `${protocol}${host}/participate`,
            unparticipate: `${protocol}${host}/unparticipate`,
        },
        getEventUrl: `${protocol}${host}/get_event`,

        // 测试的信道服务地址
        tunnelUrl: `${protocol}${host}/tunnel`,
    }
};

module.exports = config;