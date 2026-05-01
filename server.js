const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

//#region DEV STUFF
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLiveReload = require("connect-livereload");
app.use(connectLiveReload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//#endregion DEV STUFF

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const todoDb = path.join(__dirname, 'db', 'todo.json');
let dbExists = fs.existsSync(todoDb);
if (!dbExists) {
    fs.writeFileSync(todoDb, "[]");
}

//#region Controller
app.get('/todos', async (req, res) => {
    fs.readFile(todoDb, 'utf-8', (err, data) => {
        let todos = JSON.parse(data);
        let filtered = todos.filter(todo => todo.date == req.query.date);
        res.send({ date:req.query.date, todos:filtered });
    });
});

app.put('/todos', async (req, res) => {
    let uuid = crypto.randomUUID();
    let newTodo = {
        "date": req.body.date,
        "text": req.body.text,
        "status": req.body.status,
        "uuid": uuid,
    };
    fs.readFile(todoDb, 'utf-8', (err, data) => {
        let todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFileSync(todoDb, JSON.stringify(todos, null, 4));
        res.send(uuid);
    })
});
//#endregion Controller

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
