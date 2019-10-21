const availability = require('../models').Availability;
const resources = require('../models').Resources;

module.exports = {
    getAll,
    addAvailability,
    updateAvailability,
    getByResourceId
};

function getAll (req, res) {
    resources.findAll({
        include: [{
            model: availability,
            as: 'availabilities'
        }]
    }).then(result => {
        res.status(200).send(result);
    }).catch(error => {
        res.json(error);
    });
}

function addAvailability (req, res) {
    availability.create({
        resourceId: req.params.id,
        availability: req.body.availability,
        month: req.body.month
    }).then(result => {
        res.status(200).send({
            message: result
        });
    }).catch(error => {
        res.json(error);
    });
}

function updateAvailability (req, res) {
    availability.update({
        availability: req.body.availability
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(200).send({
            message: 'Availability was updated!'
        });
    }).catch(error => {
        res.json(error);
    });
}

function getByResourceId (req, res) {
    availability.findAll({
        where: {
            resourceId: req.params.resourceId
        }
    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.json(error);
    });
}