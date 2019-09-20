const express = require('express');

const router = express.Router();
const passport = require('./config/passport');
const usersController = require('./controllers/users');

// Users controller
router.post('/register', usersController.register);
router.post('/login', passport.authenticate('local'), function(req, res) {
    if(req.user) {
        res.status(200).json({
            statusText: 200,
            message: 'User ' + req.user.username + ' logged in!'
        });
    }
});


module.exports = router;