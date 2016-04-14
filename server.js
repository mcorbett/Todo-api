var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos =[{
    id: 1,
    description: 'Meet Mum for lunch',
    completed: false
},{
    id: 2,
    description: 'Go to market',
    boolean: false
},{
    id:3,
    description: 'Feed Tia',
    boolean: true
},{
    id:4,
    description: 'Feed Ralphy as well',
    boolean: true
}];

app.get('/todos', function (req, res){
    res.json(todos)
});

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

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!');
});
