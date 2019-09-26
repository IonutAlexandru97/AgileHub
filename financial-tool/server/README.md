# 1. Creare proiect initial npm 
Creare director *server*:
```batch
mkdir server
```
Accesare director *server*:
```batch
cd server
```
La entrypoint se introduce *server.js* </br>
Pentru a crea un proiect cu NodeJS si NPM se ruleaza comanda: 
```node
npm init
```
Aceasta comanda creaza un fisier **_package.json_**  care are urmatoarele elemente:
- **_name_**: seteaza numele aplicatiei/pachetului
- **_version_**: indica versiunea curenta
- **_description_**: o scurta descriere a aplicatiei
- **_main_**: seteaza *entry point-ul* aplicatiei = unde se executa primele instructiuni ale programului
- **_private_**: daca e setat **_true_** previne ca aplicatia/pachetul sa fie publicate acccidental pe npm
- **_scripts_**: defineste un set de instructiuni care pot fi executate cu comanda **_npm start_**
- **_dependencies_**: o lista cu pachete npm care sunt instalate ca dependinte
- **_devDependencies_**: o lista cu pachete npm care sunt instalate ca dependinte de development


# 2. Instalare Sequelize si generare model
Pentru  a instala pachete cu npm se executa: 
```node
npm install <package_name>
```
## 2.1 Instalare pachete:
```node
npm install --save sequelize  mysql2
npm install --save-dev sequelize-cli
```
## 2.2 Se testeaza instalarea sequelize-cli:
```node
npx sequelize --help
```
## 2.3 Se foloseste comanda:
```node
npx sequelize init
```
## 2.4 Creare model *Users*:
```node
npx sequelize model:generate --name Users --attributes first_name:String,last_name:String,username:String,email:String,password:String
```
## 2.5 Creare baza de date *agilehub* 
## 2.6 Editare *config.json*
```JSON
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "agilehub",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }  
}
```

# 3 Creare API cu Express

## 3.1 Instalare pachete
```node
npm install --save express body-parser
npm install --save-dev morgan nodemon
```
- **_express_**: este un framework pentru NodeJS folosit pentru crearea aplicatiilor web si a API-urilor
- **_body-parser_**: extrage portiune a body-ului unui flux de cereri si le expune intr-o maniera mai usoara de a le manipula
- **_morgan_**: folosit pentru loguri in terminal
- **_nodemon_**: este un tool folosit in development care ajuta la restartarea automata a aplicatiei la momentul schimbarii unui fisier

## 3.2 Creare fisier server.js
```Javascript
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var models = require('./models');

var app = express();
const PORT = process.env.PORT || 5000;

models.sequelize.sync().then(function() {
    console.log('Database is synced!');
}).catch(function (err) {
    console.log("Error!", err);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));



```

## 3.3 Creare fisier .jshintrc
```JSON
 {
    "esversion": 9
}
```

## 3.4 Executare comanda
```npm
npx nodemon
```
## 3.5 Creare controller si rute pentru Users 

### 3.5.1 controllers/users.js 
```Javascript
const users = require('../models/users').Users;

module.exports =  {
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
    })).catch(error => {
        console.log(error);
    });
}
```
###  3.5.2 routes.js
```Javascript
const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users');

// Users controller
router.post('/register', usersController.register);

module.exports = router;
```

### 3.5.3 Modificare server.js
```Javascript
const routes = require('./routes');

app.use('/api', routes);
```

### 3.5.4 Testare cu Postman
http://localhost:5000/api/register --> POST method
```JSON
{
	"first_name": "Ionut Alexandru",
	"last_name": "Candea",
	"username": "admin",
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}
```

### 3.5.5 Verficare in baza de date

## 3.6 Encriptare parola utilizator
### 3.6.1 Instalare pachete
```node
npm install --save brcyptjs
```
- **_bcryptjs_**: librarie folosita pentru criptarea datelor sub forma de hash  

### 3.6.2 Modificare models/users.js
```Javascript
id: {
      // UUID (universally unique identifier) = is a 128-bit number used to identify information in computer systems
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:  true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      validate: {
        notEmtpty: true
      }
    },

 Users.beforeCreate(users => {
    users.password = bcrypt.hashSync (
      users.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
```

### 3.6.3 Testare cu Postman
http://localhost:5000/api/register --> POST method
```JSON
{
	"first_name": "Ionut Alexandru",
	"last_name": "Candea",
	"username": "admin",
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}
```
### 3.6.4 Stergere tabel *users*
### 3.6.5 Verificare in Baza de date

## 3.7 Adaugare constrangeri asupra tabelului *users* si error handling
### 3.7.1 Modificare models/users.js
```Javascript
first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
```

### 3.7.2 Stergere table *users*
### 3.7.3 Verificare cu postman 
Introducere de 2 ori http://localhost:5000/api/register --> POST method
```JSON
{
	"first_name": "Ionut Alexandru",
	"last_name": "Candea",
	"username": "admin",
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}
```

### 3.7.4 Modificare controllers/users.js
```JS
.catch(error => {
        res.json(error);
    });
```

### 3.7.5 Testare cu Postman
http://localhost:5000/api/register --> POST method
```JSON
{
	"first_name": "Ionut Alexandru",
	"last_name": "Candea",
	"username": "admin",
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}
```

### 3.7.6 Modificare controllers/users.js
```JS
.catch(error => {
        for(var i in error.errors){
            if(error.errors[i].type === 'unique violation'){
                res.status(403).json({
                    statusText: 403 + ' Forbidden!',
                    message: 'This email is already registered!',
                    error_message: error.errors[i].type
                });
            }else{
                res.json(error);
            }
        }
    });
```

### 3.7.7 Testare cu Postman
http://localhost:5000/api/register --> POST method
```JSON
{
	"first_name": "",
	"last_name": "Candea",
	"username": "admin",
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}
```

### 3.7.8 Modificare controllers/users.js
```JS
 if(error.errors[i].type === 'Validation error') {
                res.status(403).json({
                    statusText: 403 + ' Forbidden!',
                    message: 'A filed cannot be empty!',
                    error_message: error.errors[i].type
                });
            } 
```

### 3.7.9 Testare cu Postman
http://localhost:5000/api/register --> POST method
```JSON
{
	"first_name": "",
	"last_name": "Candea",
	"username": "admin",
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}
```
### 3.7.10 Testare cu Postman
http://localhost:5000/api/register --> POST method
```JSON
{
	"first_name": null,
	"last_name": "Candea",
	"username": "admin",
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}
```

### 3.7.11 Modificare controllers/users.js
```JS
 if(error.errors[i].type === 'notNull Violation') {
                res.status(403).json({
                    statusText: 403 + ' Forbidden!',
                    message: 'A filed cannot be null!',
                    error_message: error.errors[i].type
                });
            } 
```

### 3.7.12 Testare cu Postman
http://localhost:5000/api/register --> POST method
```JSON
{
	"first_name": null,
	"last_name": "Candea",
	"username": "admin",
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}

```

## 3.8  Logare utilizator folosind PassportJS
### 3.8.1 Instalare pachete
```node
npm install --save passport passport-local
```
- **_passport.js_**: este un middleware folosit pentru autentificare

### 3.8.2 Creare config/passport.js
```Javascript
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models').Users;
const passportJWT = require('passport-jwt');

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy (
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },

    function(req ,email, password, done) {
        db.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                return done(null, false, {
                    message: "Incorrect e-mail"
                });
            } else if(!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password!"
                });
            }
            return done(null, dbUser);
        });
    }
));

  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'secret'
// }, function(jwtPayload, cb) {
//     return db.findOne({
//         where: {
//             id: jwtPayload.id
//         }
//     }).then(user => {
//         return cb(null, user);
//     }).catch(err => {
//         return cb(err);
//     });
// }));

module.exports = passport;
```
### 3.8.3 Modificare models/users.js
```Javascript
  Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
```

### 3.8.4 Modificare routes.js
```Javascript
router.post('/login', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err || !user) {
            return res.status(400).send(info);
        }
        req.login(user, (err) => {
            if(err){
                res.send(err);
            }
            // const token = jwt.sign(user.toJSON(), 'secret');
            return res.json({user});
        });
    })(req, res);
});
```
### 3.8.5 Modificare server.js
```JS
var passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
```
### 3.8.6 Testare Postman
http://localhost:5000/api/login  --> *POST* method
```JSON
{
	"email": "ionut_alexandru.candea@yahoo.com",
	"password": "admin"
}
```

# 4. Resources
## 4.1 Creare model Resources
```node
npx sequelize model:generate --name Resources --attributes name:String,comment:String,main_cluster:String,main_apps:String,rate:Float,skills:String
```
## 4.2 Editare models/resources.js
```JS
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resources = sequelize.define('Resources', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    name: DataTypes.STRING,
    comment: DataTypes.STRING,
    main_cluster: DataTypes.STRING,
    main_apps: DataTypes.STRING,
    rate: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00,
      validate: {
        isFloat: true
      }
    },
    skills: DataTypes.STRING
  }, {});
  Resources.associate = function(models) {
    // associations can be defined here
  };
  return Resources;
};
```

## 4.3 Add Resource API
### 4.3.1 Creare controllers/resources.js
```JS
const resources = require('../models').Resources;

module.exports = {
    addResource
};

function addResource (req, res) {
    resources.create({
        name: req.body.name,
        comment: req.body.comment,
        main_cluster: req.body.main_cluster,
        main_apps: req.body.main_apps,
        rate: req.body.rate,
        skills: req.body.skills,
    }).then(response => res.status(200).send({
        message: 'Resource with id ' + response.id + ' was added!'
    })).catch(error => {
        res.json(error);
    });
}
```
### 4.3.2 Modificare routes.js
```JS
const resourcesController = require('./controllers/resources');

router.post('/resource', resourcesController.addResource);
```
### 4.3.3 Testare postman 
- POST Method --> http://localhost:5000/api/resources
```JSON
{
	"name": "Ionut Alexandru Candea",
	"comment": "This is a comment",
	"main_cluster": "Main Cluster",
	"main_apps": "Main Apps",
	"rate": "200",
	"skills": "Dev"
}
```
### 4.3.4 Testare Postman
- POST Method --> http://localhost:5000/api/resources
```JSON
{
	"name": "Ionut Alexandru Candea",
	"comment": "This is a comment",
	"main_cluster": "Main Cluster",
	"main_apps": "Main Apps",
	"rate": "da",
	"skills": "Dev"
}
```

### 4.3.5 Modificare controllers/resources.js
```JS
.catch(error => {
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
  };
```
### 4.3.6 Testare Postman
- POST Method --> http://localhost:5000/api/resources
```JSON
{
	"name": "Ionut Alexandru Candea",
	"comment": "This is a comment",
	"main_cluster": "Main Cluster",
	"main_apps": "Main Apps",
	"rate": "da",
	"skills": "Dev"
}
```

# 5. Get All Resources API
## 5.1 Modificare controllers/resources.js
```JS
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
```
## 5.2 Modificare routes.js
```JS
router.get('/resources', resourcesController.getAllResources);
```
## 5.3 Testare Postman
- GET Method --> http://localhost:5000/api/resources

# 6. Update Resource API
## 6.1 Modificare controllers/resources.js
```JS
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
                res.json(error);
            });
        }else{
            res.status(404).send({
                statusText: 404 + ' Not Found!',
                message: 'Resource with id ' + req.params.id + ' was not found!'
            });
        }
    });
}
```

## 6.2 Modificare routes.js
```JS
router.put('/resources/:id', resourcesController.updateResource);
```
- Testare cu Postman

## 6.3 Modificare controllers/resources.js
```JS
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
```
- Testare POSTMAN

# 7. Delete Resource API
```JS
function deleteResource(req, res) {
    resources.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        if (result != null) {
            resource.destroy({
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
```

# 8. Resource availability API
## 8.1 Generare model
```node
npx sequelize model:generate --name Availability --attributes availability:Integer,month:Dateonly
```
## 8.2 Modificare models/availability.js
```JS
'use strict';
module.exports = (sequelize, DataTypes) => {

  var month = new Date().getMonth();
  var year = new Date().getFullYear();
  var defaultValue = new Date(year, month, 1);

  const Availability = sequelize.define('Availability', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    availability: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    month: {
      type: DataTypes.DATEONLY,
      defaultValue: defaultValue
    }
  }, {});
  Availability.associate = function(models) {
    // associations can be defined here
    Availability.belongsTo(models.Resources, {
      foreignKey: 'resourceId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Availability;
};
```

## 8.3 Creare asocieri
### 8.3.1 models/resources.js
```JS
 Resources.associate = function(models) {
    // associations can be defined here
    Resources.hasMany(models.Availability, {
      foreignKey: 'resourceId',
      as: 'availabilities'
    });
  };
```
### 8.3.2 models/availability.js
```JS
Availability.associate = function(models) {
    // associations can be defined here
    Availability.belongsTo(models.Resources, {
      foreignKey: 'resourceId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    });
  };
```

## 8.4 AddWithAvailability API --> controllers/resources.js
```JS
const availability = require('../models').Availability;
function addResource (req, res) {
    resources.create({
        name: req.body.name,
        comment: req.body.comment,
        main_cluster: req.body.main_cluster,
        main_apps: req.body.main_apps,
        rate: req.body.rate,
        skills: req.body.skills,
        availabilities: req.body.availabilities
    }, {
        include: [{
            model: availability,
            as: 'availabilities'
        }]
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
```
## 8.5 Testare POSTMAN 
- POST Methdod --> http://localhost:5000/api/resources
```JSON
{
	"name": "test",
	"comment": "this is a test",
	"main_cluster": "CAEE",
	"main_apps": "Catia",
	"rate": "200",
	"skills": "N/A",
	"availabilities":{
		"availability": "5"
	}
}
```

# 9. Availability API
## 9.1 Get ALL
### 9.1.1 controllers/availability.js
```JS
const availability = require('../models').Availability;
const resources = require('../models').Resources;

module.exports = {
    getAll
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
```

### 9.1.2 routes.js
```JS
const availabilityController = require('./controllers/availability');
// Availability controller
router.get('/resources/availability', availabilityController.getAll);
```
- Postman GET Method --> localhost:5000/api/resources/availability

## 9.2 AddAvailability
### 9.2.1 controllers/availability.js
```JS
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
```

### 9.2.1 routes.js
```JS
router.post('/resources/availability/:id', availabilityController.addAvailability);
```
- Postman POST Method --> http://localhost:5000/api/resources/availability/:id
```JSON
{
	"availability": "8",
	"month": "2019-08-01"
}
```

## 9.3 Update Availability
### 9.3.1 controllers/availability.js
```JS
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
```
### 9.3.2 routes.js
```JS
router.put('/resources/availability/:id', availabilityController.updateAvailability);
```
- Postman PUT method --> http://localhost:5000/api/resources/availability/:id
```JSON
{
	"availability": "8",
	"month": "2019-08-01"
}
```

## 9.4 Get By Resource ID
### 9.4.1 controllers/availability.js
```JS
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
```
### 9.4.2 routes.js
```JS
router.get('/resources/availability/:resourceId', availabilityController.getByResourceId);
```
- Postman GET method --> localhost:5000/api/resources/availability/:id

# 10. JWT
## 10.1 Instalare pachete
```node
npm install --save passport-jwt jsonwebtoken
```

## 10.1 Adaugare passportJWT --> config/passport.js
```JS
const passportJWT = require('passport-jwt');

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}, function(jwtPayload, cb) {
    return db.findOne({
        where: {
            id: jwtPayload.id
        }
    }).then(user => {
        return cb(null, user);
    }).catch(err => {
        return cb(err);
    });
}));
```

## 10.2 Securizare ruta resources --> routes.js
```JS
router.post('/login', function(req, res, next) {
    passport.authenticate('local',{session: false}, (err, user, info) => {
        if(err || !user) {
            return res.status(400).send(info);
        }
        req.login(user, {session: false}, (err) => {
            if(err){
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), 'secret');
            return res.json({user, token});
        });
    })(req, res);
});

router.get('/resources', passport.authenticate('jwt'), resourcesController.getAllResources);
```

## 10.3 Testare postman



