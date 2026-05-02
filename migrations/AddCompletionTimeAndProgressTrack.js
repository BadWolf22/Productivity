const path = require('path');
const fs = require('fs');

const todoDb = path.join(__dirname, '../db', 'todo.json');

fs.readFile(todoDb, 'utf-8', (err, data) => {
    let todos = JSON.parse(data);
    for (let todo of todos) {
        if (todo.dateTimeCompleted == undefined) {
            if (todo.status == 2) todo.dateTimeCompleted = new Date(todo.date);
            else todo.dateTimeCompleted = null;
        }
        if (todo.progressTrack == undefined) {
            todo.progressTrack = [];
        }
    }
    fs.writeFileSync(todoDb, JSON.stringify(todos, null, 4));
});