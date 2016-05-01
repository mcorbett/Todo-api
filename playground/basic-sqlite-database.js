var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
    description: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1,250]
        }
    },
    completed: {
        type:Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

sequelize.sync({
    force: false
}).then(function () {
    console.log('Everything is synced');

    Todo.findById(1).then(function (todo) {
        if (todo) {
            console.log(todo.toJSON());
        } else {
            console.log('Todo id not found');
        }
    });

    // Todo.create({
    //     description: 'Going to Sainsburys',
    //     completed: false
    // }).then(function (todo) {
    //     console.log('Finished');
    //     console.log(todo);
    // }).then(function (msc) {
    //     return Todo.findById(1);
    //     console.log('syntax ok');
    //     console.log(msc.toJson());
    // }).catch(function (e) {
    //     console.log(e);
    // });
});
