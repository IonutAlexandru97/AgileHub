const express = require('express');

const router = express.Router();
const passport = require('./config/passport');
const usersController = require('./controllers/users');
const resourcesController = require('./controllers/resources');
const availabilityController = require('./controllers/availability');

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

// Availability controller
router.get('/resources/availability', availabilityController.getAll);
router.post('/resources/availability/:id', availabilityController.addAvailability);
router.put('/resources/availability/:id', availabilityController.updateAvailability);
router.get('/resources/availability/:resourceId', availabilityController.getByResourceId);



module.exports = router;