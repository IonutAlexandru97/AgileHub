const resources = require('../models').Resources;

module.exports = {
    addResource,
    getAllResources,
    updateResource,
    deleteResource
};

function addResource (req, res) {
    resources.create({
        name: req.body.name,
        comment: req.body.comment,
        main_cluster: req.body.main_cluster,
        main_apps: req.body.main_apps,
        rate: req.body.rate,
        skills: req.body.skills,
    }).then(result => res.status(200).send({
        message: 'Resource with id ' + result.id + ' was added!'
    })).catch(error => {
        for(var i in error.errors) {
            if(error.errors[i].message === 'Validation isFloat on rate failed') {
                res.status(403).json({
                    statusText: 403 + ' Forbidden!',
                    message: 'Rate must be FLOAT type!',
                    error_message: error.errors[i].message
                });
            }else {
                res.json(error);
            }
        }
    });
}

function getAllResources(req, res) {
    resources.findAll().then(result => {
        res.status(200).send({
            message: 'Resources were fetched from database!',
            data: result
        });
    }).catch(error => {
        res.json(error);
    });
}

function updateResource(req, res) {
    resources.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        if(result != null) {
            resources.update({
                name: req.body.name,
                comment: req.body.comment,
                main_cluster: req.body.main_cluster,
                main_apps: req.body.main_apps,
                rate: req.body.rate,
                skills: req.body.skills
            },
            {
                where: {
                    id: req.params.id
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Resource with id ' + req.params.id + ' was updated!'
                });
            }).catch(error => {
                for (var i in error.errors) {
                    if (error.errors[i].message === 'Validation isFloat on rate failed') {
                        res.status(403).json({
                            statusText: 403 + ' Forbidden!',
                            message: 'Rate must be FLOAT type!',
                            error_message: error.errors[i].message
                        });
                    } else {
                        res.json(error);
                    }
                }
            });
        }else{
            res.status(404).send({
                statusText: 404 + ' Not Found!',
                message: 'Resource with id ' + req.params.id + ' was not found!'
            });
        }
    });
}

function deleteResource(req, res) {
    resources.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        if (result != null) {
            resources.destroy({
                where: {
                    id: result.id
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Resource with id ' + req.params.id + ' was deleted!'
                });
            });
        } else {
            res.status(404).send({
                statusText: 404 + ' Not Found!',
                message: 'Resource with id ' + req.params.id + ' was not found!',
            });
        }
    });

}