const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users');
const passport = require('./config/passport');

// Users controller
router.post('/register', usersController.register);
router.post('/login', passport.authenticate("local"), function(req, res, info) {
    if(req.user.username !== null) {
        res.status(200).json({
            statusText: 200,
            message: 'User ' + req.user.username + ' logged in!'
        });
    }else{
        console.log(info);
    }
});

module.exports = router;