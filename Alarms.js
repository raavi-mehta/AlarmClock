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

    var newAlarm = {time: alarmSetTime, label: alarmLabel, date: alarmDate, timer:alarmTimer, aId:i, activeFlag:true};
    alarmList.push(newAlarm);
    setAlarm(newAlarm);
    updatePreview(newAlarm);
    localStorage.setItem("AlarmList",JSON.stringify(alarmList));
    var storedList = localStorage.getItem("AlarmList");
    window.alert(storedList.toString());
}

function setAlarm(alarm){
    clearTimeout( alarm.alarmTimer );
    var currentDate = new Date();
    while(alarm.date < currentDate)
    {
        alarm.date.setDate(alarm.date.getDate()+1);
    }
    var time = (alarm.date - currentDate );
    //alert(alarm.date);
    alarm.alarmTimer = setTimeout( function(){fireAlarm(alarm.aId);} ,parseInt(time) );
}

function fireAlarm(x)
{
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

    $('#addr'+i).html("<td>"+ (i) +"</td><td>"+alarm.time+"</td>"+"</td><td>"+alarm.label+"</td>"+ "<td align='center'><input type=\"checkbox\" onchange=\"toggleCheckbox(this)\" checked id=\"check"+ i +"\"></td>"  + "<td width='70%'>"+ "<input type=\"button\" value='delete' id="+ i +" onclick=\"deleteAlarm(this)\" />"+"</td>");
    $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
    i++;
}

function deleteAlarm(x)
{
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

    idsearch = x.id.substring(x.id.indexOf('k')+1, x.id.length);
    for(var count=0; count< alarmList.length; count++)
    {
        if(alarmList[count].aId == idsearch)
        {
            break;
        }
    }

    if(alarmList[count].activeFlag == true)
    {
        clearTimeout(alarmList[count].alarmTimer);
        alarmList[count].activeFlag=false;
    }
    else
    {
        setAlarm(alarmList[count]);
        alarmList[count].activeFlag=true;
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
