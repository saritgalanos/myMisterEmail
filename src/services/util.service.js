
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getImgUrl,
    getIconUrl,
    getMonthName,
    getDateToDisplay
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function getImgUrl(url) {
    return new URL(url, import.meta.url).href
}

function getIconUrl(iconName, isSelected) {
    if (isSelected) {
        return utilService.getImgUrl(`../assets/imgs/selected_${iconName}.png`)
    }
    else {
        return utilService.getImgUrl(`../assets/imgs/${iconName}.png`)
    }
}

function getMonthName(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    return monthNames[date.getMonth()]
}

function getDateToDisplay(date, isFullDate=false) {

    const minutes = date.getMinutes();
    const hours = date.getHours()
    const year = date.getFullYear()
    const month = date.getMonth()
    const dayOfMonth = date.getDate()
    const AmPM = hours<12? 'PM':'AM'
    if(isFullDate) {
        console.log("print date")
        return `${getMonthName(date)} ${dayOfMonth}, ${year}, ${hours}:${minutes.toString().padStart(2, '0')} ${AmPM}`
    }

    const currentDate = new Date();
    /*check if today*/
    if ((dayOfMonth === currentDate.getDate() &&
        month === currentDate.getMonth() &&
        year === currentDate.getFullYear())) {
        return `${hours}:${minutes.toString().padStart(2, '0')}`
    }
    /*this year*/
    if (year == currentDate.getFullYear()) {
        return `${getMonthName(date)} ${dayOfMonth} `
    }
    /*not this year*/
    return `${year}`
}
