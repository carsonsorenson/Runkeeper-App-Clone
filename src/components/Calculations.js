export function formatValue(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);
    seconds = Math.round(seconds);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;

    }
    if (hours >= 1) {
        return hours + ':' + minutes + ':' + seconds;
    }
    else {
        return minutes + ':' + seconds;
    }
}

export function formatDistance(distance) {
    return distance.toFixed(2);
}