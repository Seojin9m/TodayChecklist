let checkList = [{}];
let today_checkList = [{}];
let today_finishList = [{}];
let unfinished_checkList = [{}];

const savedFuture = JSON.parse(localStorage.getItem('checkList'));
const savedToday = JSON.parse(localStorage.getItem('today_checkList'));
const savedFinished = JSON.parse(localStorage.getItem('today_finishList'));
const savedUnfished = JSON.parse(localStorage.getItem('unfinished_checkList'));

if (Array.isArray(savedFuture)) {
    checkList = savedFuture;
    today_checkList = savedToday;
    today_finishList = savedFinished;
    unfinished_checkList = savedUnfished;
} else {
    checkList = [{
        title: 'Example',
        dueDate: 'xxxx-xx-xx',
        id: 'id'
    }]
    today_checkList = [{
        title: 'Example',
        dueDate: 'xxxx-xx-xx',
        id: 'id'
    }]
    today_finishList = [{
        title: 'Example',
        dueDate: 'xxxx-xx-xx',
        id: 'id'
    }]
    unfinished_checkList = [{
        title: 'Example',
        dueDate: 'xxxx-xx-xx',
        id: 'id'
    }]
}

renderChecklist();

function currentDate() {
    let todayDate = new Date();
    const offset = todayDate.getTimezoneOffset();
    todayDate = new Date(todayDate.getTime() - (offset*60*1000))
    return todayDate.toISOString().split('T')[0];
}

function compareDate(firstDate, secondDate) {
    if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
        return 'past';
    } else if (firstDate.setHours(0, 0, 0, 0) === secondDate.setHours(0, 0, 0, 0)) {
        return 'sameday';
    } else {
        return 'future';
    }
}

function createChecklist(title, dueDate) {
    const id = '' + new Date().getTime();
    checkList.push({
        title: title,
        dueDate: dueDate,
        id: id
    })
    saveChecklist();
}

function removeChecklist(deleteId) {
    checkList = checkList.filter(function (list) {
        if (list.id === deleteId) {
            return false;
        } else {
            return true;
        }
    });
    saveChecklist();
}

function removeToday_checklist(deleteId) {
    today_checkList = today_checkList.filter(function (list) {
        if (list.id === deleteId) {
            today_finishList.push(list);
            return false;
        } else {
            return true;
        }
    })
    saveChecklist();
}

function removeUnfinished_checklist(dismissId) {
    unfinished_checkList = unfinished_checkList.filter(function (list) {
        if (list.id === dismissId) {
            return false;
        } else {
            return true;
        }
    });
    saveChecklist();
}

function clearTextbox() {
    document.getElementById('checklist-title').value = '';
}

function addChecklist() {
    const textbox = document.getElementById('checklist-title');
    const title = textbox.value;

    const datebox= document.getElementById('checklist-date');
    const dueDate = datebox.value;

    createChecklist(title, dueDate);
    clearTextbox();
    renderChecklist();
}

function deleteChecklist(event) {
    const deleteButton = event.target;
    const deleteId = deleteButton.id;

    removeChecklist(deleteId);
    console.log('deleted');
    renderChecklist();
}

function finishChecklist(event) {
    const finishButton = event.target;
    const finishId = finishButton.id;

    removeToday_checklist(finishId);
    console.log('deleted');
    renderChecklist();
}

function dismissChecklist(event) {
    const dismissButton = event.target;
    const dismissId = dismissButton.id;

    removeUnfinished_checklist(dismissId);
    console.log('dismissed');
    renderChecklist();
}

function saveChecklist() {
    localStorage.setItem('checkList', JSON.stringify(checkList));
    localStorage.setItem('today_checkList', JSON.stringify(today_checkList));
    localStorage.setItem('today_finishList', JSON.stringify(today_finishList));
    localStorage.setItem('unfinished_checkList', JSON.stringify(unfinished_checkList));
    console.log('changed have been saved');
}

function dateCovert(date) {
    if (date.includes('Mon') === true) {
        date = date.replace('Mon', 'Monday');
    }
    else if (date.includes('Tue') === true) {
        date = date.replace('Tue', 'Tuesday');
    }
    else if (date.includes('Wed') === true) {
        date = date.replace('Wed', 'Wednesday');
    }
    else if (date.includes('Thu') === true) {
        date = date.replace('Thu', 'Thursday');
    }
    else if (date.includes('Fri') === true) {
        date = date.replace('Fri', 'Friday');
    }
    else if (date.includes('Sat') === true) {
        date = date.replace('Sat', 'Saturday');
    }
    else {
        date = date.replace('Sun', 'Sunday');
    }
    return date;
}

function monthCovert(date) {
    if (date.includes('Jan') === true) {
        date = date.replace('Jan', 'January');
    }
    else if (date.includes('Feb') === true) {
        date = date.replace('Feb', 'February');
    }
    else if (date.includes('Mar') === true) {
        date = date.replace('Mar', 'March');
    }
    else if (date.includes('Apr') === true) {
        date = date.replace('Apr', 'April');
    }
    else if (date.includes('May') === true) {
        date = date.replace('May', 'May');
    }
    else if (date.includes('Jun') === true) {
        date = date.replace('Jun', 'June');
    }
    else if (date.includes('Jul') === true) {
        date = date.replace('Jul', 'July');
    }
    else if (date.includes('Aug') === true) {
        date = date.replace('Aug', 'August');
    }
    else if (date.includes('Sep') === true) {
        date = date.replace('Sep', 'September');
    }
    else if (date.includes('Oct') === true) {
        date = date.replace('Oct', 'October');
    }
    else if (date.includes('Nov') === true) {
        date = date.replace('Nov', 'November');
    } 
    else {
        date = date.replace('Dec', 'December');
    }
    return date;
}

function renderChecklist() {
    if (today_checkList === null) {
        today_checkList = [{
            title: 'Example',
            dueDate: 'xxxx-xx-xx',
            id: 'id'
        }]
    } else if (today_finishList === null) {
        today_finishList = [{
            title: 'Example',
            dueDate: 'xxxx-xx-xx',
            id: 'id'
        }]
    } else if (checkList === null) {
        checkList = [{
            title: 'Example',
            dueDate: 'xxxx-xx-xx',
            id: 'id'
        }]
    } else if (unfinished_checkList === null) {
        unfinished_checkList = [{
            title: 'Example',
            dueDate: 'xxxx-xx-xx',
            id: 'id'
        }]
    }

    document.getElementById('today-checklist').innerHTML = '';
    document.getElementById('today-finishlist').innerHTML = '';
    document.getElementById('checklist').innerHTML = '';
    document.getElementById('unfinished-checklist').innerHTML = '';

    if (checkList.length > 0) {
        checkList = checkList.filter(function (list) {
            dueDate = new Date(list.dueDate.replace(/-/g, '\/'));
            todayDate = new Date(currentDate().replace(/-/g, '\/'));

            if (compareDate(dueDate, todayDate) === 'past') {
                unfinished_checkList.push(list);
                return false;
            } else if (compareDate(dueDate, todayDate) === 'sameday') {
                today_checkList.push(list);
                return false;
            } else {
                return true;
            } 
        });
        checkList.forEach(function (list) {       
            const element1 = document.createElement('div');
            let date = new Date(list.dueDate.replace(/-/g, '\/'));
            date = date.toDateString();
            date.slice(0, 11);
            date = dateCovert(date);
            date = monthCovert(date);
            element1.innerText = list.title + ' due date: ' +  date;

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.style = 'margin-left: 12px;'
            deleteButton.onclick = deleteChecklist;
            deleteButton.id = list.id;
            element1.appendChild(deleteButton);

            const checkLists = document.getElementById('checklist');
            checkLists.appendChild(element1);
        });
    } else {
        const checklistNothing = document.createElement('div');
        checklistNothing.innerText = 'No Upcoming Work!';
        const checklistNothings = document.getElementById('checklist');
        checklistNothings.appendChild(checklistNothing);
    }
    if (today_checkList.length > 0) {
        today_checkList = today_checkList.filter(function (list) {
            dueDate = new Date(list.dueDate.replace(/-/g, '\/'));
            todayDate = new Date(currentDate().replace(/-/g, '\/'));
            if (compareDate(dueDate, todayDate) === 'sameday') {
                return true;
            } else {
                unfinished_checkList.push(list);
                return false;
            }
        });
        today_checkList.forEach(function (list) {
            const element2 = document.createElement('div');
            element2.innerText = 'Today: ' + list.title;

            const finishButton = document.createElement('button');
            finishButton.innerText = '✔';
            finishButton.style = 'margin-left: 12px;'
            finishButton.onclick = finishChecklist;
            finishButton.id = list.id;
            element2.appendChild(finishButton);

            const today_checkLists = document.getElementById('today-checklist');
            today_checkLists.appendChild(element2);
        });
    } else {
        const todayNothing = document.createElement('div');
        todayNothing.innerText = 'No Work to Do Today!';
        const todayNothings = document.getElementById('today-checklist');
        todayNothings.appendChild(todayNothing);
    }
    if (today_finishList.length > 0) {
        today_finishList = today_finishList.filter(function (list) {
            dueDate = new Date(list.dueDate.replace(/-/g, '\/'));
            todayDate = new Date(currentDate().replace(/-/g, '\/'));
            if (compareDate(dueDate, todayDate) === 'sameday') {
                return true;
            } else {
                return false;
            }
        });
        today_finishList.forEach(function (list) {
            const element3 = document.createElement('div');
            element3.innerText = list.title;
    
            const today_finishLists = document.getElementById('today-finishlist');
            today_finishLists.appendChild(element3);
        });
    } else {
        const finishNothing = document.createElement('div');
        finishNothing.innerText = 'N/A';
        const finishNothings = document.getElementById('today-finishlist');
        finishNothings.appendChild(finishNothing);
    }
    if (unfinished_checkList.length > 0) {
        unfinished_checkList.forEach(function (list) {
            const element4 = document.createElement('div');
            date = new Date(list.dueDate.replace(/-/g, '\/'));
            date = date.toDateString();
            date.slice(0, 11);
            date = dateCovert(date);
            date = monthCovert(date);
            element4.innerText = list.title + ' due date: ' + date;

            const dismissButton = document.createElement('button');
            dismissButton.innerText = 'Dismiss';
            dismissButton.style = 'margin-left: 12px;'
            dismissButton.onclick = dismissChecklist;
            dismissButton.id = list.id;
            element4.appendChild(dismissButton)
            
            const unfinished_checkLists = document.getElementById('unfinished-checklist');
            unfinished_checkLists.appendChild(element4);
        });
    } else {
        const unfinishedNothing = document.createElement('div');
        unfinishedNothing.innerText = 'No Unfinished Work!';
        const unfinishedNothings = document.getElementById('unfinished-checklist');
        unfinishedNothings.appendChild(unfinishedNothing);
    }
}

renderChecklist();