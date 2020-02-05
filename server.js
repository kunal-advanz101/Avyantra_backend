
const express=require('express');
const Cors=require('cors');
const bodyParser=require('body-parser');
const logger=require('morgan');

// const responseHelper = require('./helper/res')
// const constant = require('./helper/constant')
// const multer = require('multer');
require('custom-env').env()
const app = express();

const proutes = require('./routes/patientRoutes')
const hroutes = require('./routes/hospitalRoutes')
const hbroutes = require('./routes/hospitalBranchRoutes')
const hsroutes = require('./routes/hospitalStaffRoutes')
const usroutes = require('./routes/userRoutes')

console.error(process.env.API_PORT)
const API_PORT = process.env.API_PORT || 8081;



app.use(Cors());
app.use(bodyParser.urlencoded({extended: true }));

app.use(express.static('public'));
//app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));

//app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/patient',proutes)
app.use('/hospital',hroutes)
app.use('/hospitalBranch',hbroutes)
app.use('/hospitalStaff',hsroutes)
app.use('/',usroutes)


// require('./routes/loginUser')(app);
//require('./routes/patient')(app);
// require('./routes/get_tabs')(app);


// require('./routes/findUsers1')(app);
// require('./routes/deleteUser')(app);
// require('./routes/updateUser1')(app);

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//    cb(null, './public/upload/')
//   },
//   filename: function (req, file, cb) {
//     //cb(null, file.fieldname)
//     cb(null, "Himani")
//   }
// })
// var upload = multer({ storage: storage }).any()

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app
// console.log(app)
exports.port = API_PORT;
    
