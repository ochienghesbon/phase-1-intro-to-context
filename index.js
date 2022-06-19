// Your code here
function createEmployeeRecord([empFirstName, empFamilyName, empTitle, empPayRate]) {
    let employeeRecord = {
        firstName: empFirstName,
        familyName: empFamilyName,
        title: empTitle,
        payPerHour: empPayRate,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}



function createEmployeeRecords(employees) {
    let employeeRecords = employees.map(createEmployeeRecord);
    return employeeRecords;
}



function createTimeInEvent(employeeObj, dateStamp) {
    let timeInObj = {
        type: "TimeIn",
        hour: Number(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    }
    employeeObj.timeInEvents.push(timeInObj)
    return employeeObj
}



function createTimeOutEvent(employeeObj, dateStamp) {
    let timeOutObj = {
        type: 'TimeOut',
        hour: Number(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    }
    employeeObj.timeOutEvents.push(timeOutObj)
    return employeeObj
}



function hoursWorkedOnDate(employeeObj, date) {
    let startTime
    let stopTime
    for (let i = 0; i < employeeObj.timeOutEvents.length; i++) {
        if (employeeObj.timeOutEvents[i].date === date) {
            startTime = employeeObj.timeInEvents[i].hour.toString();
            stopTime = employeeObj.timeOutEvents[i].hour.toString();
        }
    }
    let stop = Number(stopTime.substring(0, stopTime.length - 2))
    let start = Number(startTime.substring(0, startTime.length - 2))
    let hoursWorked = stop - start
    return hoursWorked

}



function wagesEarnedOnDate(employeeObj, date) {
    let hoursWorked = hoursWorkedOnDate(employeeObj, date)
    return hoursWorked * employeeObj.payPerHour
}



function allWagesFor(employeeObj) {
    let wages = []
    for (let i = 0; i < employeeObj.timeInEvents.length; i++) {
        console.log(employeeObj.timeOutEvents[i].date)
        let dayWage = wagesEarnedOnDate(employeeObj, employeeObj.timeOutEvents[i].date)
        wages.push(dayWage);
    }
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return wages.reduce(reducer)
}



function calculatePayroll(records) {
    let totalPay = []
    for (let i = 0; i < records.length; i++) {
        let wages = allWagesFor(records[i]);
        totalPay.push(wages);
    }
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return totalPay.reduce(reducer)
}
