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
    "esversion": 8
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

passport.use(new LocalStrategy (
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },

    function(req, email, password, done) {
        db.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                return done(null, false, {
                    message: "Unauthorized"
                });
            } else if(!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Unauthorized"
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
const passport = require('./config/passport');
router.post('/login', passport.authenticate('local'), function(req, res) {
    if(req.user) {
        res.status(200).json({
            statusText: 200,
            message: 'User ' + req.user.username + ' logged in!'
        });
    }
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



