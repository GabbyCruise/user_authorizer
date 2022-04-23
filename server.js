const express = require('express');
const config = require('./config/app_config');
const route = require('./routes/main_route');
// const apiv1 = require('./routes/api.v1.routes/api.v1.routes');

var app = express();

//------------- SETTING UP APP PORT --------------//
app.set('port', process.env.PORT || 2022);
app = config(app);

//------------------ ROUTES ----------------------//
app.use(route);
// app.use(indexRoute);

//--------------  MIDDLEWARE CONFIG --------------//
app.use(function (req, res, next){
 res.status(404).send('PAGE NOT FOUND, TRY AGAIN');
});

app.use(function(err, req, res, next) {
 console.error(err.stack);
 res.status(500).send('Ooops, Internal Server Error Occured. but hold on, we are fixing it.');
 return next();
});


//-------------- APP IGNITION -----------------//
app.listen(app.get('port'), function() {
 console.log('User Authorizer started on port ' + app.get('port'));
});
