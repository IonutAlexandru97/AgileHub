const express = require('express');

const router = express.Router();
const passport = require('./config/passport');
const usersController = require('./controllers/users');
const resourcesController = require('./controllers/resources');

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

// Resources controller
router.post('/resources', resourcesController.addResource);
router.get('/resources', resourcesController.getAllResources);
router.put('/resources/:id', resourcesController.updateResource);
router.delete('/resources/:id', resourcesController.deleteResource);



module.exports = router;