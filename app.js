
var qcloud = require('./vendor/qcloud-weapp-client-sdk/index');
var config = require('./config');

App({
    onLaunch() {
        qcloud.setLoginUrl(config.service.loginUrl);
    }
});