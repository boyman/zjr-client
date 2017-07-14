/**
 * 小程序配置文件
 */

//var protocol = 'http://';
var protocol = 'https://';
//var host = 'localhost:8444';
var host = 'yiyihost.com'

var config = {
    url : {
        user : {
            login : `${protocol}${host}/login`,
        },
        event : {
            getAll : `${protocol}${host}/event/for_me`,
            getOne : `${protocol}${host}/event/get`,
            thumbnail : `${protocol}${host}/event/thumbnail`,
            add : `${protocol}${host}/event/add`,
            edit : `${protocol}${host}/event/edit`,
            _testAll : `${protocol}${host}/event/all`,
            participate : `${protocol}${host}/event/guest/participate`,
            unparticipate : `${protocol}${host}/event/guest/unparticipate`,
            watch : `${protocol}${host}/event/watch`,
            unwatch : `${protocol}${host}/event/unwatch`,
            guests : `${protocol}${host}/event/guest/get`,
            myGuests : `${protocol}${host}/event/guest/my`,
            bringGuests : `${protocol}${host}/event/guest/bring`,
            deleteGuest : `${protocol}${host}/event/guest/delete_guest`,
            deletePendingGuest : `${protocol}${host}/event/guest/delete_pending`,
            approveGuest : `${protocol}${host}/event/guest/approve`,
        }
    },
    service : {
        host ,
        loginUrl : `${protocol}${host}/login`,
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
            thumbnail : `${protocol}${host}/event/thumbnail`,
            editEvent : `${protocol}${host}/event/edit`,
            deleteGuest : `${protocol}${host}/event/guest/delete_guest`,
            deletePendingGuest : `${protocol}${host}/event/guest/delete_pending`,
            approveGuest : `${protocol}${host}/event/guest/approve`,
            test : `${protocol}${host}/event/guest/new_get`,
        },
        getEventUrl : `${protocol}${host}/event/get`,
    },
    heartbeat : {
        fast : 8, // seconds
        medium : 15,
        slow : 30,
    }
};

module.exports = config;