/**
 * Created by Quinn on 2017-03-28.
 */
var alarmSetTime;
var i=0;
var savedList =[]

function clock() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById('time').innerHTML = t;
    var timeout = setTimeout(clock, 500);
    //loadPastSession();
}

function loadPastSession() {
    if (localStorage.length > 0) {
        var rawList = localStorage.getItem("AlarmList");
        var list = JSON.parse(rawList);

        for(var i = 0; i < list.length; i++) {
            list[i].date = new Date(list[i].jsonDate);
            console.log("Converted tiime: " + list[i].date);

            var currentDate = new Date();
            console.log("current time: " + currentDate);
            if (list[i].jsonDate < currentDate.getTime()) {
                console.log("time expired ");
                list[i].activeFlag = false;

            } else {
                if (list[i].activeFlag) {
                    console.log("time in the future: ");
                    setAlarm(list[i]);
                }

            }
            // list[i].date = new Date(list[i].jsonDate);
            // console.log("Converted tiime: " + list[i].date);
            alarmList.push(list[i]);
            updatePreview(list[i]);
            // if (list[i].jsonDate < currentDate.getTime()) {
            //     document.getElementById("check" + list[i].aId).click();
            // }

        }
    } else {
        console.log("There is no local storage");
    }
}

// function create( alarm ){
//     var hrs = alarmSetTime.substring(0, alarmSetTime.indexOf(':'));
//     var mins = alarmSetTime.substring(alarmSetTime.indexOf(':')+1, alarmSetTime.length);
//
//     var alarmDate = new Date();
//     alarmDate.setHours(hrs);
//     alarmDate.setMinutes(mins);
//     alarmDate.setSeconds(0);
//     var alarmTimer = null;
//
//     var newAlarm = {time: alarmSetTime, label: alarmLabel, date: alarmDate, timer:alarmTimer, aId:i, activeFlag:true};
//     alarmList.push(newAlarm);
//     setAlarm(newAlarm);
//     updatePreview(newAlarm);
//
// }
