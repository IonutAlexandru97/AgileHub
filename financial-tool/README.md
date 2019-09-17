# 1. Backend

## 1.1 Creare proiect initial npm 
Pentru a crea un proiect cu NodeJS si NPM se ruleaza comanda: <br />
***npm init*** <br />
Aceasta comanda creaza un fisier **_package.json_**  care are urmatoarele elemente:
- **_name_**: seteaza numele aplicatiei/pachetului
- **_version_**: indica versiunea curenta
- **_description_**: o scurta descriere a aplicatiei
- **_main_**: seteaza *entry point-ul* aplicatiei = unde se executa primele instructiuni ale programului
- **_private_**: daca e setat **_true_** previne ca aplicatia/pachetul sa fie publicate acccidental pe npm
- **_scripts_**: defineste un set de instructiuni care pot fi executate cu comanda **_npm start_**
- **_dependencies_**: o lista cu pachete npm care sunt instalate ca dependinte
- **_devDependencies_**: o lista cu pachete npm care sunt instalate ca dependinte de development


## 1.2 Instalare Sequelize si generare model
Pentru  a instala pachete cu npm se executa: 
```node
npm install <package_name>
```
Se instaleaza pechetele *sequelize, sequelize-cli si mysql2*:
```node
npm install --save sequelize
npm install --save-dev sequelize-cli
npm install --save mysql2
```
Se testeaza instalarea sequelize-cli:
```node
npx sequelize --help
```
Se foloseste comanda:
```node
npx sequelize init
```
Creare model *Users*:
```node
npx sequelize model:generate --name Users --attributes first_name:String,last_name:String,username:String,email:String,password:String
```
Creare baza de date *agilehub* </br>
Editare *config.json*

## 1.3 Creare API cu Express

### 1.3.1 Instalare pachete
```node
npm install --save express body-parser
npm install --save-dev logger
npm install --save-dev nodemon
```
- **_express_**: este un framework pentru NodeJS folosit pentru crearea aplicatiilor web si a API-urilor
- **_body-parser_**: extrage portiune a body-ului unui flux de cereri si le expune intr-o maniera mai usoara de a le manipula
- **_morgan_**: folosit pentru loguri in terminal
- **_nodemon_**: este un tool folosit in development care ajuta la restartarea automata a aplicatiei la momentul schimbarii unui fisier

### 1.3.2 Creare fisier server.js
```Javascript
var models = require('./models');
var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var logger = require('morgan');

models.sequelize.sync().then(function() {
    console.log('Database is synced!');
}).catch(function(err) {
    console.log("Error!", err);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
```
### 1.3.3 Creare controller si rute pentru Users 
#### 1.3.3.1 Users.js fara bcrypt si error handling
```Javascript
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
        message: 'User' + response.username + ' has been created!',
    })).catch(error =>{
        console.log(error);
    });
}
```
#### 1.3.3.1 routes.js
```Javascript
const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users');

// Users controller
router.post('/register', usersController.register);

module.exports = router;
```

#### 1.3.3.2 server.js
```Javascript
var models = require('./models');
var express = require("express");
var app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('morgan');
var passport = require('./config/passport');

models.sequelize.sync().then(function(){
    console.log('Database is synced!');
}).catch(function(err){
    console.log("Error!", err);
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// 1.3.3.2
app.use('/api', routes);
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));
```

#### 1.3.3.3 Testare cu Postman

### 1.3.2 Encriptare parola utilizator
#### 1.3.2.1 Instalare pachete
```node
npm install --save brcyptjs
```
- **_bcryptjs_**: librarie folosita pentru criptarea datelor sub forma de hash  

#### 1.3.2.2 Modificare models/users.js
```Javascript
'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      // UUID (universally unique identifier) = is a 128-bit number used to identify information in computer systems
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };

// 1.3.2.2
  Users.beforeCreate(users => {
    users.password = bcrypt.hashSync(
      users.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Users;
};
```

