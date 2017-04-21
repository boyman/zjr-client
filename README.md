# ZJR微信小程序客户端

本项目基于[Wafer客户端 SDK](https://github.com/tencentyun/weapp-client-sdk)和[腾讯云微信小程序一站式解决方案客户端示例](https://github.com/tencentyun/wafer-client-demo)搭建。需要先部署[ZJR服务端](https://github.com/boyman/zjr-server)作为后端支持。

## 运行

服务端部署好之后，修改 `config.js` 里面的服务域名：

```js
// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'yourid.qcloud.la';
```

修改之后，就可以使用微信开发者工具运行客户端。

## 源码简介

```tree
zjr-client
├── LICENSE
├── README.md
├── app.js
├── app.json
├── bower.json
├── config.js
├── package.json
├── pages
│   ├── chat
│   │   ├── chat.js
│   │   ├── chat.wxml
│   │   └── chat.wxss
│   └── index
│       ├── index.js
│       ├── index.wxml
│       └── index.wxss
└── vendor
    └── qcloud-weapp-client-sdk/
```

`app.js` 是小程序入口文件。

`app.json` 是小程序的微信配置。

`config.js` 是小程序自己的业务配置。

`vendor/qcloud-weapp-client-sdk` 是[客户端 SDK](https://github.com/tencentyun/weapp-client-sdk) 的一份拷贝。
