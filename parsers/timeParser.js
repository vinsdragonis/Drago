function getTime() {
    var currentHours = new Date(Date.now()).getHours();
    var currentMinutes = new Date(Date.now()).getMinutes();

    currentHours = ("0" + currentHours).slice(-2);
    currentMinutes = ("0" + currentMinutes).slice(-2);

    return " " + currentHours + ":" + currentMinutes;
}

module.exports = getTime;