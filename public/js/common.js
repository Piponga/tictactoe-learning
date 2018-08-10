/**
 * Created by djz on 10.08.2018.
 */
var millisecondsToTime = function (seconds) {
    var hours, minutes;
    var strH, strM, strS;

    seconds = Math.floor(seconds/1000);
    hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    strH = hours < 10 ? '0'+hours : hours;
    strM = minutes < 10 ? '0'+minutes : minutes;
    strS = seconds < 10 ? '0'+seconds : seconds;

    if (hours < 99) {
        return strH + ':' + strM + ':' + strS;
    } else {
        return strH + ' hours';
    }
};