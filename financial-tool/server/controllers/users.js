const users = require('../models').Users;

module.exports = {
    register
};

function register(req, res) {
    users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(response => res.status(200).send ({
        message: 'User ' + response.username + ' has been created!',
    })).catch(error =>{
        console.log(error);
    });
}