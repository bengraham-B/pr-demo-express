function dateStringFunc(time) {
    const date = new Date();
    let month = date.getMonth() + 1;
    console.log(month)

    let monthName = "";

    switch (month) {
        case  1:
            monthName = "Jan";
            break;

        case  2:
            monthName = "Feb";
            break;

        case  3:
            monthName = "Mar";
            break;

        case  4:
            monthName = "Apr";
            break;

        case 5:
            monthName = "May";
            break;

        case 6:
            monthName = "Jun";
            break;

        case 7:
            monthName = "Jul";
            break;

        case 8:
            monthName = "Aug";
            break;

        case 9:
            monthName = "Sept";
            break;

        case 10:
            monthName = "Oct";
            break;
        case 11:
            monthName = "Nov";
            break;

        case 12:
            monthName = "Dec";
            break;
    }

    if(time){
        return (`${date.getDate()} ${monthName} ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    }

    else {
        return (`${date.getDate()} ${monthName} ${date.getFullYear()}`);
    }

}


module.exports = {dateStringFunc}