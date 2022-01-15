function formatTime(time){
    var date = new Date(parseInt(time));
    return date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
    });
}

module.exports = formatTime;