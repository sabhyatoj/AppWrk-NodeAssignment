const PORT = 3000;
// Including dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router;


// Intialize
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50 }));

// initialize DB
require('./Database/db');
// Require controllers
const routes = require('./routes/index');

app.use('/', routes);


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message || 'Something went wrong');
});

    app.listen(PORT, function(err) {
        if(err){
            console.error(err);
            process.exit(1);
        }
    console.log('nsPire listening on port ' + PORT);
})