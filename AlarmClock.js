/**
 * Created by Quinn on 2017-03-28.
 */
var alarmSetTime;
var i=0;
var alarmList =[]

function clock() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById('time').innerHTML = t;
    var timeout = setTimeout(clock, 500);
    //loadPastSession();
}

function loadPastSession(){
    alarmList = localStorage.getItem("AlarmList");
    window.alert(alarmList.toString());
}
