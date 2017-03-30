/**
 * Created by Quinn on 2017-03-29.
 */

var alarmList = [];
var i=0;

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
    var newAlarm = {time: alarmSetTime, label: alarmLabel, date: alarmDate, timer:alarmTimer};
    alarmList.push(newAlarm);

    setAlarm(newAlarm);
    updatePreview(newAlarm);
}

function setAlarm(alarm){
    clearTimeout( alarm.alarmTimer );
    var time = (alarm.date - (new Date()) );
    alarm.alarmTimer = setTimeout( function(){fireAlarm();} ,parseInt(time) );
}

function fireAlarm()
{
    alert("The alarm is going off!!!");
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
    $('#addr'+i).html("<td>"+ (i+1) +"</td><td>"+alarm.time+"</td>"+"</td><td>"+alarm.label+"</td>");
    $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
    i++;
}

$(document).ready(function(){
    $('#myTable').on('click', 'input[type="button"]', function () {
        $(this).closest('tr').remove();
    })
    $('p input[type="button"]').click(function () {
        $('#myTable').append('<tr><td><input type="text" class="fname" /></td><td><input type="button" value="Delete" /></td></tr>')
    });
});