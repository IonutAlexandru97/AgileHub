const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const passport = require('./config/passport');
const usersController = require('./controllers/users');
const resourcesController = require('./controllers/resources');
const availabilityController = require('./controllers/availability');

// Users controller
router.post('/register', usersController.register);
router.post('/login', function(req, res, next) {
    passport.authenticate('local',{session: false}, (err, user, info) => {
        if(err || !user) {
            return res.status(400).send(info);
        }
        req.login(user, {session: false}, (err) => {
            if(err){
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), 'secret', {expiresIn: '1h'});
            return res.json({user, token});
        });
    })(req, res);
});

// Resources controller
router.post('/resources', resourcesController.addResource);
router.get('/resources', passport.authenticate('jwt'), resourcesController.getAllResources);
router.put('/resources/:id', resourcesController.updateResource);
router.delete('/resources/:id', resourcesController.deleteResource);

// Availability controller
router.get('/resources/availability', availabilityController.getAll);
router.post('/resources/availability/:id', availabilityController.addAvailability);
router.put('/resources/availability/:id', availabilityController.updateAvailability);
router.get('/resources/availability/:resourceId', availabilityController.getByResourceId);



module.exports = router;