const server=require('../../server');
const express=require('express');
const Cors=require('cors');
const bodyParser=require('body-parser');
const logger=require('morgan');
 
// const responseHelper = require('./helper/res')
// const constant = require('./helper/constant')
// const multer = require('multer');
require('custom-env').env()
const app = express();
 
const proutes = require('../../routes/patientRoutes')
const hroutes = require('../../routes/hospitalRoutes')
const hbroutes = require('../../routes/hospitalBranchRoutes')
const hsroutes = require('../../routes/hospitalStaffRoutes')
const usroutes = require('../../routes/userRoutes')