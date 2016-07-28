var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var _ = require('underscore');
var bcrypt = require('bcrypt');
var db = require('./db.js');

var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyparser.json());

// GET /todos
app.get('/todos', function(req, res) {
    var query = req.query;
    var where = {};

    if (query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true;
    } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
        where.completed = false;
    }

    if (query.hasOwnProperty('q') && query.q.length > 0) {
        where.description = {
            $like: '%' + query.q + '%'
        };
    }
    db.todo.findAll({
        where: where
    }).then(function(todos) {
        res.json(todos);
    }, function(e) {
        res.status(500).send();
    })
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);

    db.todo.findById(todoId).then(function(todo) {
        if (!!todo) {
            res.json(todo.toJSON());
        } else {
            res.status(404).send();
        }
    }, function(e) {
        res.status(500).send();
    });
});

app.get('/', function(req, res) {
    res.send('Todo Api Root');
});

// POST /todos
app.post('/todos', function(req, res) {
    var body = _.pick(req.body, 'description', 'completed');

    db.todo.create(body).then(function(todo) {
        res.json(todo.toJSON());
    }, function(e) {
        res.status(400).json(e);
    });
});

app.delete('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);

    db.todo.destroy({
        where: {
            id: todoId
        }
    }).then(function(rowsDeleted) {
        if (rowsDeleted === 0) {
            console.log(rowsDeleted);
            res.status(404).json({
                error: 'No todo with that id'
            });
        } else {
            res.status(204).send();
        }
    }, function() {
        res.status(500).send();
    });
});

app.post('/users', function(req, res) {
    var body = _.pick(req.body, 'email', 'password');
    db.user.create(body).then(function(user) {
        res.json(user.toPublicJSON());
    }, function(e) {
        res.status(400).json(e);
    });
});

app.post('/users/login', function(req, res) {
<<<<<<< HEAD
    var body = _.pick(req.body, 'email','password');
    db.user.authenticate(body).then(function (user) {
        res.json(user.toPublicJSON());
    }, function (e) {
        res.status(401).send();
=======
    var body = _.pick(req.body, 'email', 'password');
    if (typeof body.email !== 'string' || typeof body.password !== 'string') {
        return res.status(400).send();
    }

    db.user.findOne({
        where: {
            email: body.email
        }
    }).then(function(user) {
        if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
            console.log('got here');
            return res.status(401).send();
        }
        res.json(user.toPublicJSON());
    }, function(e) {
        res.status(500).send();
>>>>>>> aa543a59f4878ee14930d1f9215a6106d3a21a03
    });
});

app.put('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'description', 'completed');
    var attributes = {};

    if (body.hasOwnProperty('completed')) {
        attributes.completed = body.completed;
    }

    if (body.hasOwnProperty('description')) {
        validAttributes.description = body.description;
    }

    db.todo.findById(todoId).then(function(todo) {
        if (todo) {
            todo.update(attributes).then(function(todo) {
                res.json(todo.toJSON());
            }, function(e) {
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function() {
        res.status(500).send();
    });
});

db.sequelize.sync({
    force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
