var bcrypt = require('bcrypt');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
    var user = sequelize.define('user', {
=======
    return sequelize.define('user', {
>>>>>>> aa543a59f4878ee14930d1f9215a6106d3a21a03
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
<<<<<<< HEAD
            type:DataTypes.VIRTUAL,
=======
            type: DataTypes.VIRTUAL,
>>>>>>> aa543a59f4878ee14930d1f9215a6106d3a21a03
            allowNull: false,
            validate: {
                len: [7, 100]
            },
<<<<<<< HEAD
            set: function (value) {
=======
            set: function(value) {
>>>>>>> aa543a59f4878ee14930d1f9215a6106d3a21a03
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
<<<<<<< HEAD
    },{
=======
    }, {
>>>>>>> aa543a59f4878ee14930d1f9215a6106d3a21a03
        hooks: {
            beforeValidate: function(user, options) {
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
<<<<<<< HEAD
        classMethods: {
            authenticate: function (body) {
                return new Promise(function (user, options) {
                    if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                        return reject();
                    }

                    user.findOne({ where: {email: body.email} }).then(function (user) {
                        if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                            return reject();
                        }
                        resolve(user);
                    }, function (e) {
                        reject();
                    });
                });
            }
        },
        instanceMethods: {
            toPublicJSON: function () {
                var json = this.toJSON();
                return _.pick(json, 'email','id','createdAt','updatedAt');
            }
        }
    });
    return user;
=======
        instanceMethods: {
            toPublicJSON: function() {
                var json = this.toJSON();
                return _.pick(json, 'email', 'id', 'createdAt', 'updatedAt');
            }
        }
    });
>>>>>>> aa543a59f4878ee14930d1f9215a6106d3a21a03
};
