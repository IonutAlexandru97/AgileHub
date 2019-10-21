var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var models = require('./models');

var app = express();
const PORT = process.env.PORT || 5000;
const routes = require('./routes');
var passport = require('./config/passport');

models.sequelize.sync().then(function() {
    console.log('Database is synced!');
}).catch(function (err) {
    console.log("Error!", err);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));


