/**
 * Created by Quinn on 2017-03-29.
 */

var alarmList = [];
var i = 0;
var ringtone = new Audio("ringtone.mp3");

function createAlarm()
{
    var alarmLabel = document.getElementById("alarmLabel").value;
    var alarmSetTime = document.getElementById("alarmTime").value;
    checkValidAlarm(alarmSetTime);
    var hrs = alarmSetTime.substring(0, alarmSetTime.indexOf(':'));
    var mins = alarmSetTime.substring(alarmSetTime.indexOf(':')+1, alarmSetTime.length);

    var alarmDate = new Date();
    alarmDate.setHours(hrs);
    alarmDate.setMinutes(mins);
    alarmDate.setSeconds(0);
    var alarmTimer = null;
    console.log("original time: " + alarmDate);
    var newAlarm = {time: alarmSetTime, label: alarmLabel, date: alarmDate, timer:alarmTimer, aId:i, activeFlag:true, jsonDate: alarmDate.getTime()};
    console.log("original time after: " + newAlarm.date);
    alarmList.push(newAlarm);
    console.log("Alerm List size: " + alarmList.length);
    setAlarm(newAlarm);
    updatePreview(newAlarm);
    localStorage.setItem("AlarmList",JSON.stringify(alarmList));
    console.log("create alarm getting called");
    // localStorage.setItem("AlarmList",JSON.stringify(alarmList));
    // var storedList = localStorage.getItem("AlarmList");
    // window.alert(storedList.toString());
}

function setAlarm(alarm){

    console.log("set alarm getting called");
    if (alarm.alarmTimer != null) {
        clearTimeout(alarm.alarmTimer);
    }
    var currentDate = new Date();
    while(alarm.date < currentDate)
    {
        console.log("Alarm date is less than current date");
        alarm.date.setDate(alarm.date.getDate()+1);
    }
    var time = (alarm.date - currentDate );
    console.log("The time remaining: " + time);
    //alert(alarm.date);
    alarm.alarmTimer = setTimeout( function(){fireAlarm(alarm.aId);} ,parseInt(time) );
}

function fireAlarm(x)
{
    console.log("fire alarm getting called")
    //alert("The alarm is going off!!!");
    jQuery.noConflict();
    $('#alarmModal').modal('show');
    //deleteAlarm(document.getElementById(x));
    setInactiveOnRing(x);
	// start ringtone
	startRingtone();
}

function setSnooze()
{
    var alarmDate = new Date();
    alarmDate.setSeconds(30);
    var alarmTimer = null;
    var snoozeAlarm = {time: alarmSetTime, label: alarmLabel, date: alarmDate, timer:alarmTimer, aId:-1};
    setAlarm(snoozeAlarm);
	stopRingtone();
}

function checkValidAlarm(x)
{
    if(x == null || x == "")
    {
        alert("not a valid ")
    }
}


function updatePreview(alarm)
{
    console.log("update preview getting called: " + alarm.date);
    if(alarm != null) {
        if (alarm.activeFlag) {
            $('#addr' + i).html("<td>" + (i) + "</td><td>" + alarm.date + "</td><td>" + alarm.time + "</td>" + "</td><td>" + alarm.label + "</td>" + "<td align='center'><input type=\"checkbox\" onchange=\"toggleCheckbox(this)\" checked id=\"check" + i + "\"></td>" + "<td width='70%'>" + "<input type=\"button\" value='delete' id=" + i + " onclick=\"deleteAlarm(this)\" />" + "</td>");
            $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
            i++;
        } else {
            $('#addr' + i).html("<td>" + (i) + "</td><td>" + alarm.date + "</td><td>" + alarm.time + "</td>" + "</td><td>" + alarm.label + "</td>" + "<td align='center'><input type=\"checkbox\" onchange=\"toggleCheckbox(this)\" unchecked id=\"check" + i + "\"></td>" + "<td width='70%'>" + "<input type=\"button\" value='delete' id=" + i + " onclick=\"deleteAlarm(this)\" />" + "</td>");
            $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
            i++;
        }
    }
}

function deleteAlarm(x)
{
    console.log("delete alarm getting called");
	stopRingtone();
    for(var count=0; count< alarmList.length; count++)
    {
        if(alarmList[count].aId == x.id)
        {
            break;
        }
    }
    //alert("deleting: " + alarmList[count].label);
    clearTimeout(alarmList[count].alarmTimer);
    alarmList.splice(count,1);
    $(x).closest("tr").remove();
    refrsehView();
}


function toggleCheckbox(x)
{
    console.log("toggle checkbox getting called");
    idsearch = x.id.substring(x.id.indexOf('k')+1, x.id.length);
    console.log("Id search value: " + idsearch);
    for(var count=0; count< alarmList.length; count++)
    {
        var currentDate = new Date();


        if(alarmList[count].aId == idsearch)
        {
            console.log("Alarm id: " + alarmList[count].aId + "id search value: " + idsearch);
            break;

        }
    }

    if(alarmList[count].activeFlag == true)
    {
        console.log("flag is true");
        clearTimeout(alarmList[count].alarmTimer);
        alarmList[count].activeFlag=false;
        localStorage.setItem("AlarmList",JSON.stringify(alarmList));
    }
    else
    {
        console.log("flag is false");
        setAlarm(alarmList[count]);
        alarmList[count].activeFlag=true;
        localStorage.setItem("AlarmList",JSON.stringify(alarmList));
    }
}

function setInactiveOnRing(xAlarmID)
{
    checkboxID = "check" + xAlarmID;
    for(var count=0; count< alarmList.length; count++)
    {
        if(alarmList[count].aId == xAlarmID)
        {
            break;
        }
    }
    alarmList[count].activeFlag = false;
    document.getElementById(checkboxID).click();
}

function startRingtone()
{
	ringtone.play();
}

function stopRingtone()
{
	ringtone.pause();
	ringtone.currentTime = 0;
}
