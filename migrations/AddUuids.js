const path = require('path');
const fs = require('fs');

const todoDb = path.join(__dirname, '../db', 'todo.json');

fs.readFile(todoDb, 'utf-8', (err, data) => {
    let todos = JSON.parse(data);
    for (let todo of todos) {
        if (todo.uuid == undefined) todo.uuid = crypto.randomUUID();
    }
    fs.writeFileSync(todoDb, JSON.stringify(todos, null, 4));
});