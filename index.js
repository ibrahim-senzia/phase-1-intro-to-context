// Your code here
// Function to create an employee record
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
}

// Function to create a time in event
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}

// Function to create a time out event
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

// Function to calculate total wages earned for all dates
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
}

// Function to calculate payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPay, employeeRecord) => {
        return totalPay + allWagesFor(employeeRecord);
    }, 0);
}
