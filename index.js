/* Your Code Here */

function createEmployeeRecord(info) {
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(records) {
    return records.map((element) => createEmployeeRecord(element));
}

function createTimeInEvent(stamp) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(stamp.slice(10, 15)),
        date: stamp.slice(0,10)
    })
    return this;
}

function createTimeOutEvent(stamp) {   
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(stamp.slice(10, 15)),
        date: stamp.slice(0,10)
    })
    return this;
}

function hoursWorkedOnDate(day) {
    let hours;
    // for (let i=0; i<this.timeInEvents.length; i++) {
    //     if (this.timeInEvents[i].date === day) {
    //         hours = this.timeOutEvents[i].hour - this.timeInEvents[i].hour;
    //         hours = hours/100;
    //     }
    // }
    const timeIn = this.timeInEvents.find((date) => day === date.date)
    const timeOut = this.timeOutEvents.find((date) => day === date.date)
    hours = timeOut.hour - timeIn.hour;
    hours = hours / 100;
    return hours;
}

function wagesEarnedOnDate(day) {
    let pay = this.payPerHour * hoursWorkedOnDate.call(this, day);
    return pay;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.reduce((element) => {
        if (element.firstName === firstName){
            return element;
        }
    })
}

function calculatePayroll(srcArray) {
    let pay = srcArray.map((employee) => allWagesFor.call(employee));
    let total = 0;
    for (let i=0; i<pay.length; i++) {
        total += pay[i]
    }
    return total;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
