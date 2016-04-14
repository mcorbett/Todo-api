var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var PORT = process.env.PORT || 3000;
var todos =[];
var todoNextId=1;

app.use(bodyparser.json());

// GET /todos
app.get('/todos', function (req, res){
    res.json(todos)
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
    var todoId=parseInt(req.params.id, 10);
    todos.forEach (function (todo) {
        if (todoId === todo.id) {
            res.json(todo)
            exit;
        }
    });
    res.status(404).send()
});

app.get('/', function(req, res) {
    res.send('Todo Api Root');
});

//POST /todos
app.post('/todos', function (req, res) {
    var body = req.body;
    
    console.log('description ' + body.description);
    res.json(body);
});

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!');
});
