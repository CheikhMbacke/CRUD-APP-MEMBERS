const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 8000;
const membersController = require('./controllers/membersController');
/**
 * Connect to Database
 */
require('./models/DB');
/**
 * Url parser with express
 */
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
/**
 * Express-handlebars
 */
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs', exphbs({extname:'hbs', defaultLayout:'mainLayout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');

/**
 * Middleware endpoints
 */
app.use('/members',membersController);
/**
 * Listen
 */
app.listen(PORT,console.log(`Server running on ${PORT}`));