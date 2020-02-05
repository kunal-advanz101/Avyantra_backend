const pReadingModels = require('../sequelize')
const {validationResult} = require('express-validator/check')
const responseHelper = require('../helper/res')
const constant = require('../helper/constant')
const {sequelize} = require('../sequelize')
const queries = require('../helper/queries')
const mapper = require('../mapper/mapper')
const enumConst = require('../helper/enum')
const util = require('../helper/util')
const excel = require('exceljs');
const nodeMailer = require('nodemailer');
const alert = require('alert-node');
// const app = require('../server') 
const multer = require('multer');
const allQueries = require('../helper/queries/hospitalStaffContQueries');



exports.getHospitalStaffRoles =(req,res,next)=>{
    let query=allQueries.HospitalStaffQueries.getHospitalStaffRoles_query();
    sequelize.query(query,
    { replacements: { 
        hospital_id:req.params.hospitalId
    }, type: sequelize.QueryTypes.SELECT }
    ).then(result => {

console.log("result :" , result)

      res.json({
          result:result
      })
        res.json( responseHelper.success(constant.success,result))
    })
    .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}

exports.getHospitalStaffSpecialities =(req,res,next)=>{
    let query=allQueries.HospitalStaffQueries.getHospitalStaffSpecialities_query();
    sequelize.query(query,
    { replacements: { 
        hospital_id:req.params.hospitalId
    }, type: sequelize.QueryTypes.SELECT }
    ).then(result => {
        res.json( responseHelper.success(constant.success,result))
    })
    .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}

exports.getHospitalBranchesByHospitalId =(req,res,next)=>{
   
    pReadingModels.hospital_branch_model.findAll({
        where:{
            hospital_id:req.params.hospitalId
        },
        attributes: ['hospital_branch_id','branch_name','user_id','hospital_id']
    })
    .then(result=>{
        res.json( responseHelper.success(constant.success,result))
    })
    .catch(err=>{
        res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.addStaff=async(req,res,next)=>{
    var staffUser ={}
    var staff={}
    var staffHospitalMapper={}
    var staffPermission={}

//    var sResult = await pReadingModels.hospital_branch_speciality_model.create({
//         hospital_id:req.params.hospitalId ,
//         hospital_branch_id:req.params.hospitalBranchId ,
//         active_flag: 1,
//         speciality_id :req.body.speciality
//     })

    staffUser = mapper.staffUserMapper(staffUser,req)  
     pReadingModels.user_model.findAll({
            where:{
              //  user_name: req.body.username,
                //password : req.body.password,
               // contact_number:req.body.contact_number,
                //email_address:req.body.email

                $or: [{
                    contact_number: req.body.contactNumber
                    },{
                    user_name: req.body.username
                    },{
                    email_address: req.body.email
                    }
                ]
            }
        }).then(result => {
            if(result.length >0){
                let contactNumber = result.find((data)=>{
                    if(data["contact_number"]){
                        return data["contact_number"].toString() == req.body.contactNumber.toString()
                    }
                }); 
            //    let contactNumber = result.find((data)=>{return data["contact_number"] === eval(req.body.contactNumber)}); 
               let emailAddress = result.find((data)=>{return data["email_address"] == req.body.email}); 
                let userName = result.find((data) => { return data["user_name"].toLowerCase() == req.body.username.toLowerCase() });

               if(contactNumber){
                  res.json( responseHelper.alreadyExist('Contact number already exists',result));
               }
               else if(emailAddress){
                   res.json( responseHelper.alreadyExist('Email ID already exists',result));                  
               } else if(userName){
                res.json(responseHelper.alreadyExist('Username already exist', result))
            } else {
                res.json(responseHelper.alreadyExist('Invalid entries', result))
            } 
            }else{
                pReadingModels.user_model.create(staffUser)
                .then(result=>{ 
                    if(result!=null){
                  pReadingModels.permission_model.findAll()
                  .then(pResult=>{
                  if(pResult.length > 0){
                    pResult.forEach((data,index)=>{
                        staffPermission.user_id=result.user_id
                        staffPermission.permission_id= data.permision_Id
                        staffPermission.active_flag=0
                        pReadingModels.staff_permission_model.create(staffPermission)
                    })
                  }
               })
                  staff=mapper.staff(staff,result,req)
                  pReadingModels.staff_model.create(staff)
                     .then(staffResult=>{
                         if(staffResult!=null){
                            staffHospitalMapper = mapper.staffHospitalMapper(staffHospitalMapper,staffResult,req)
                             for(var i =0 ; i<req.body.branch.length;i++){   
                                staffHospitalMapper.hospital_branch_id=req.body.branch[i]
                                pReadingModels.hospital_staff_model.create(staffHospitalMapper)
                                .then( )
                                }
                             res.json( responseHelper.success(constant.staff_add_successfull,staffResult))
                            }
                        })
                    }
                })
            }
        })
    .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.getStaffs = async (req, res, next) => {
    var start = (req.params.start - 1) * req.params.end;
    var searchText = '%' + req.query.searchText + '%'
    var hospitalStaffFlag = eval(req.params.hospitalStaffFlag);
    var query = null;
    if (req.query.searchText == "null") {
    // query = 'SELECT * FROM vw_get_staffs WHERE hospital_id=:hospital_id AND hospital_branch_id=:hospital_branch_id LIMIT ' + req.params.end +' OFFSET ' +start;
    query = `SELECT vw_get_staffs.hospital_id, vw_get_staffs.hospital_branch_id, 
    vw_get_staffs.staff_id, vw_get_staffs.first_name,
    vw_get_staffs.last_name,vw_get_staffs.hospital_branch_speciality_id,
    vw_get_staffs.user_id, vw_get_staffs.hospital_branch_role_id,
    vw_get_staffs.contact_number, vw_get_staffs.email_address,
    vw_get_staffs.speciality_id, vw_get_staffs.speciality,
    vw_get_staffs.role_id, vw_get_staffs.role,
    vw_get_staffs.user_name, vw_get_staffs.reporting_user_id,
    vw_get_staffs.password, vw_get_staffs.deleted_flag,
    vw_get_staffs.branch_name,
    map_staff_hospitals.active_flag as status FROM vw_get_staffs
    join map_staff_hospitals on 
    (map_staff_hospitals.hospital_id = vw_get_staffs.hospital_id 
    and map_staff_hospitals.hospital_branch_id = vw_get_staffs.hospital_branch_id 
    and map_staff_hospitals.staff_id = vw_get_staffs.staff_id)
    WHERE vw_get_staffs.hospital_id=:hospital_id AND vw_get_staffs.hospital_branch_id=:hospital_branch_id ` 
    if(hospitalStaffFlag === 0){
        query += ` AND map_staff_hospitals.active_flag =1`;
        }
    query += ` order by map_staff_hospitals.active_flag desc `+` LIMIT ` + req.params.end + ` OFFSET ` + start
  
    } else if (hospitalStaffFlag === 0) {
    // query = `SELECT * FROM vw_get_staffs WHERE hospital_id=:hospital_id AND hospital_branch_id=:hospital_branch_id 
    // AND ( first_name LIKE(:searchText)
    // OR last_name LIKE(:searchText)
    // OR role LIKE(:searchText))`;
    query = `SELECT vw_get_staffs.hospital_id, vw_get_staffs.hospital_branch_id, 
    vw_get_staffs.staff_id, vw_get_staffs.first_name,
    vw_get_staffs.last_name,vw_get_staffs.hospital_branch_speciality_id,
    vw_get_staffs.user_id, vw_get_staffs.hospital_branch_role_id,
    vw_get_staffs.contact_number, vw_get_staffs.email_address,
    vw_get_staffs.speciality_id, vw_get_staffs.speciality,
    vw_get_staffs.role_id, vw_get_staffs.role,
    vw_get_staffs.user_name, vw_get_staffs.reporting_user_id,
    vw_get_staffs.password, vw_get_staffs.deleted_flag,
    vw_get_staffs.branch_name,
    map_staff_hospitals.active_flag as status FROM vw_get_staffs
    join map_staff_hospitals on 
    (map_staff_hospitals.hospital_id = vw_get_staffs.hospital_id 
    and map_staff_hospitals.hospital_branch_id = vw_get_staffs.hospital_branch_id 
    and map_staff_hospitals.staff_id = vw_get_staffs.staff_id)
    AND ( first_name LIKE(:searchText)
    OR last_name LIKE(:searchText)
    OR role LIKE(:searchText))
    WHERE vw_get_staffs.hospital_id=:hospital_id AND vw_get_staffs.hospital_branch_id=:hospital_branch_id`
    if(hospitalStaffFlag === 0){
    query += ` AND map_staff_hospitals.active_flag =1`;
    }
    query += ` order by map_staff_hospitals.active_flag desc LIMIT ` + req.params.end + ` OFFSET ` + start;
    // LIMIT ` + req.params.end + ` OFFSET ` + start;
    } else {
    // query = `SELECT * FROM vw_get_staffs WHERE hospital_id=:hospital_id AND hospital_branch_id=:hospital_branch_id 
    // AND ( first_name LIKE(:searchText)
    // OR last_name LIKE(:searchText)
    // OR contact_number LIKE(:searchText)
    // OR role LIKE(:searchText) 
    // OR status LIKE(:searchText) 
    // OR speciality LIKE(:searchText))`;
    query = `SELECT vw_get_staffs.hospital_id, vw_get_staffs.hospital_branch_id, 
    vw_get_staffs.staff_id, vw_get_staffs.first_name,
    vw_get_staffs.last_name,vw_get_staffs.hospital_branch_speciality_id,
    vw_get_staffs.user_id, vw_get_staffs.hospital_branch_role_id,
    vw_get_staffs.contact_number, vw_get_staffs.email_address,
    vw_get_staffs.speciality_id, vw_get_staffs.speciality,
    vw_get_staffs.role_id, vw_get_staffs.role,
    vw_get_staffs.user_name, vw_get_staffs.reporting_user_id,
    vw_get_staffs.password, vw_get_staffs.deleted_flag,
    vw_get_staffs.branch_name,
    map_staff_hospitals.active_flag as status FROM vw_get_staffs
    join map_staff_hospitals on 
    (map_staff_hospitals.hospital_id = vw_get_staffs.hospital_id 
    and map_staff_hospitals.hospital_branch_id = vw_get_staffs.hospital_branch_id 
    and map_staff_hospitals.staff_id = vw_get_staffs.staff_id)
    AND ( first_name LIKE(:searchText)
    OR last_name LIKE(:searchText)
    OR contact_number LIKE(:searchText)
    OR role LIKE(:searchText) 
    OR status LIKE(:searchText) 
    OR speciality LIKE(:searchText))
    WHERE vw_get_staffs.hospital_id=:hospital_id AND vw_get_staffs.hospital_branch_id=:hospital_branch_id`
    if(hospitalStaffFlag === 0){
    query += ` AND map_staff_hospitals.active_flag =1`;
    }
    query += ` order by map_staff_hospitals.active_flag desc LIMIT ` + req.params.end + ` OFFSET ` + start;
    // LIMIT ` + req.params.end + ` OFFSET ` + start;
    }
    var result = await sequelize.query(query,
    {
    replacements: {
    hospital_id: req.params.hospitalId,
    hospital_branch_id: req.params.hospitalBranchId,
    searchText: searchText
    }, type: sequelize.QueryTypes.SELECT
    })
    
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            var sresult = await pReadingModels.hospital_staff_model.findAll({
                where: {
                    hospital_branch_id: result[i].hospital_branch_id,
                    staff_id: result[i].staff_id,
                    active_flag: 1
                }
            })
            if (sresult.length > 0) {
                if (sresult[0].permission_id == null) {
                    result[i].dataEntry_review_permission = 0
                    result[i].scoreGenerate = 0
                } else if (sresult[0].permission_id == 1) {
                    result[i].dataEntry_review_permission = 1
                    result[i].scoreGenerate = 0
                } else if (sresult[0].permission_id == 2) {
                    result[i].dataEntry_review_permission = 0
                    result[i].scoreGenerate = 1
                } else if (sresult[0].permission_id == 3) {
                    result[i].dataEntry_review_permission = 1
                    result[i].scoreGenerate = 1
                }
            }
        }
    }
    res.json(responseHelper.success(constant.success, result))
}

exports.getStaffCount= async (req,res,next)=>{
    var searchText = '%'+req.query.searchText+'%'
    var hospitalStaffFlag = eval(req.params.hospitalStaffFlag);
    var query = null;
    if(req.query.searchText == "null"){
        // query = 'SELECT COUNT(*) FROM vw_get_staffs WHERE hospital_id=:hospital_id AND hospital_branch_id=:hospital_branch_id ';
        query = `SELECT vw_get_staffs.hospital_id, vw_get_staffs.hospital_branch_id, 
            vw_get_staffs.staff_id, vw_get_staffs.first_name,
            vw_get_staffs.last_name,vw_get_staffs.hospital_branch_speciality_id,
            vw_get_staffs.user_id, vw_get_staffs.hospital_branch_role_id,
            vw_get_staffs.contact_number, vw_get_staffs.email_address,
            vw_get_staffs.speciality_id, vw_get_staffs.speciality,
            vw_get_staffs.role_id, vw_get_staffs.role,
            vw_get_staffs.user_name, vw_get_staffs.reporting_user_id,
            vw_get_staffs.password, vw_get_staffs.deleted_flag,
            vw_get_staffs.branch_name,
            map_staff_hospitals.active_flag as status, count(*) as total FROM vw_get_staffs
            join map_staff_hospitals on 
            (map_staff_hospitals.hospital_id = vw_get_staffs.hospital_id 
            and map_staff_hospitals.hospital_branch_id = vw_get_staffs.hospital_branch_id 
            and map_staff_hospitals.staff_id = vw_get_staffs.staff_id)
            WHERE vw_get_staffs.hospital_id=:hospital_id AND vw_get_staffs.hospital_branch_id=:hospital_branch_id`;
        if(hospitalStaffFlag === 0){
            query += ` AND map_staff_hospitals.active_flag =1`;
        }
            // query += ` LIMIT ` + req.params.end + ` OFFSET ` + start;

    }else if(hospitalStaffFlag === 0){
        // query = `SELECT COUNT(*) FROM vw_get_staffs WHERE hospital_id=:hospital_id AND hospital_branch_id=:hospital_branch_id 
        //      AND ( first_name LIKE(:searchText)
        //      OR last_name LIKE(:searchText)
        //      OR role LIKE(:searchText))`;
        query = `SELECT vw_get_staffs.hospital_id, vw_get_staffs.hospital_branch_id, 
            vw_get_staffs.staff_id, vw_get_staffs.first_name,
            vw_get_staffs.last_name,vw_get_staffs.hospital_branch_speciality_id,
            vw_get_staffs.user_id, vw_get_staffs.hospital_branch_role_id,
            vw_get_staffs.contact_number, vw_get_staffs.email_address,
            vw_get_staffs.speciality_id, vw_get_staffs.speciality,
            vw_get_staffs.role_id, vw_get_staffs.role,
            vw_get_staffs.user_name, vw_get_staffs.reporting_user_id,
            vw_get_staffs.password, vw_get_staffs.deleted_flag,
            vw_get_staffs.branch_name,
            map_staff_hospitals.active_flag as status, count(*) as total FROM vw_get_staffs
            join map_staff_hospitals on 
            (map_staff_hospitals.hospital_id = vw_get_staffs.hospital_id 
            and map_staff_hospitals.hospital_branch_id = vw_get_staffs.hospital_branch_id 
            and map_staff_hospitals.staff_id = vw_get_staffs.staff_id)
            AND ( first_name LIKE(:searchText)
            OR last_name LIKE(:searchText)
            OR role LIKE(:searchText))
            WHERE vw_get_staffs.hospital_id=:hospital_id AND vw_get_staffs.hospital_branch_id=:hospital_branch_id`;
        if(hospitalStaffFlag === 0){
            query += ` AND map_staff_hospitals.active_flag =1`;
        }
    }else{
        // query = `SELECT COUNT(*) FROM vw_get_staffs WHERE hospital_id=:hospital_id AND hospital_branch_id=:hospital_branch_id 
        //      AND ( first_name LIKE(:searchText)
        //      OR last_name LIKE(:searchText)
        //      OR contact_number LIKE(:searchText)
        //      OR role LIKE(:searchText) 
        //      OR status LIKE(:searchText) 
        //      OR speciality LIKE(:searchText))`;
        query = `SELECT vw_get_staffs.hospital_id, vw_get_staffs.hospital_branch_id, 
            vw_get_staffs.staff_id, vw_get_staffs.first_name,
            vw_get_staffs.last_name,vw_get_staffs.hospital_branch_speciality_id,
            vw_get_staffs.user_id, vw_get_staffs.hospital_branch_role_id,
            vw_get_staffs.contact_number, vw_get_staffs.email_address,
            vw_get_staffs.speciality_id, vw_get_staffs.speciality,
            vw_get_staffs.role_id, vw_get_staffs.role,
            vw_get_staffs.user_name, vw_get_staffs.reporting_user_id,
            vw_get_staffs.password, vw_get_staffs.deleted_flag,
            vw_get_staffs.branch_name,
            map_staff_hospitals.active_flag as status, count(*) as total FROM vw_get_staffs
            join map_staff_hospitals on 
            (map_staff_hospitals.hospital_id = vw_get_staffs.hospital_id 
            and map_staff_hospitals.hospital_branch_id = vw_get_staffs.hospital_branch_id 
            and map_staff_hospitals.staff_id = vw_get_staffs.staff_id)
            AND ( first_name LIKE(:searchText)
            OR last_name LIKE(:searchText)
            OR contact_number LIKE(:searchText)
            OR role LIKE(:searchText) 
            OR status LIKE(:searchText) 
            OR speciality LIKE(:searchText))
            WHERE vw_get_staffs.hospital_id=:hospital_id AND vw_get_staffs.hospital_branch_id=:hospital_branch_id`;
        if(hospitalStaffFlag === 0){
            query += ` AND map_staff_hospitals.active_flag =1`;
        }
    }

    var response = await sequelize.query(query,
        {
            replacements: {
                hospital_id: req.params.hospitalId,
                hospital_branch_id: req.params.hospitalBranchId,
                searchText: searchText
            }, type: sequelize.QueryTypes.SELECT
        }
    )
    
    var result = response[0]['total'];
    res.json( responseHelper.success(constant.success,{staff_count:result}));

    // pReadingModels.hospital_staff_model
    //     .findAndCountAll({
    //         where: {
    //             hospital_id: req.params.hospitalId,
    //             hospital_branch_id: req.params.hospitalBranchId,
    //             deleted_flag: 0
    //         }
    //     })
    // .then(result => {
    //   res.json( responseHelper.success(constant.success,{staff_count:result.count}))
    // });

}

exports.updateStaff = (req, res, next) => {
    var isActiveInBranch = true;
    var mResponse;
    pReadingModels.hospital_staff_model.findAll({
        where: {
            hospital_id: req.params.hospitalId,
            staff_id: req.params.staffId,
        }
    }).then((hospitalStaffModelResult) => {
        mResponse = hospitalStaffModelResult;
        let branchIdArrray = hospitalStaffModelResult.map((data) => { return data.hospital_branch_id });
        let activeFlagsArr = hospitalStaffModelResult.map((data) => { return data.active_flag });
        let index = branchIdArrray.indexOf(req.body.branch[0]);

        if (hospitalStaffModelResult[index].active_flag != req.body.status) {
            hospitalStaffModelResult[index].active_flag = req.body.status;
            activeFlagsArr[index] = req.body.status === '0' ? false : true;
            hospitalStaffModelResult[index].deleted_flag = (req.body.status === "0") ? 1 : 0;
            hospitalStaffModelResult[index].save();
        }
        let count1 = activeFlagsArr.filter((data) => { return data == true }).length;
        if (count1 === 0) {
            isActiveInBranch = false;
        }
    });
    pReadingModels.staff_model.findByPk(req.params.staffId)
        .then(result => {
            result.first_name = req.body.firstName
            result.last_name = req.body.lastName
            result.hospital_branch_speciality_id = req.body.speciality
            result.hospital_branch_role_id = req.body.assignRole
            if (isActiveInBranch) {
                result.active_flag = 1;
                result.deleted_flag = 0;
            } else {
                result.active_flag = 0;
                result.deleted_flag = 1;
            }
            result.reporting_user_id = req.body.reportTo
            result.save()
            if (result != null) {
                pReadingModels.user_model.findAll({
                    where: {
                        $not:{user_id : result.user_id},
                        $or:[{
                            contact_number: req.body.contactNumber
                        },{
                            email_address: req.body.email
                        },{
                            user_name: req.body.username
                        }]
                    }
                }).then((uData) => {
                    if (uData.length > 0) {
                        let contactNumber = uData.find((data) => {
                            if (data["contact_number"]) {
                                return data["contact_number"].toString() == req.body.contactNumber.toString()
                            }
                        });
                        let emailAddress = uData.find((data) => { return data["email_address"] == req.body.email });
                        let userName = uData.find((data) => { return data["user_name"].toLowerCase() == req.body.username.toLowerCase() });

                        if (contactNumber) {
                            res.json(responseHelper.alreadyExist('Contact number already exist', result))
                        } else if (emailAddress) {
                            res.json(responseHelper.alreadyExist('Email address already exist', result))
                        } else if(userName){
                            res.json(responseHelper.alreadyExist('Username already exist', result))
                        } else {
                            res.json(responseHelper.alreadyExist('Invalid entries', result))
                        } 
                    } else {
                        pReadingModels.user_model.findByPk(result.user_id)
                            .then(userResult => {
                                userResult.contact_number = req.body.contactNumber
                                userResult.email_address = req.body.email
                                userResult.user_name = req.body.username
                                userResult.password = req.body.password
                                if (isActiveInBranch) {
                                    userResult.active_flag = 1
                                    userResult.deleted_flag = 0
                                } else {
                                    userResult.active_flag = 0;
                                    userResult.deleted_flag = 1;
                                }
                                userResult.save();

                                res.json(responseHelper.success(constant.staff_updated_successfully, mResponse));
                            })
                    }
                });
                
            }
        });
}

exports.updateStaffPermission= async (req,res)=>{

    var reqData = req.body
  
    for(var i =0 ; i<reqData.length ; i++ ){
  
       var staffDetail = reqData[i]
  
      var spResult =await pReadingModels.hospital_staff_model.findAll({
        where:{
          hospital_branch_id:staffDetail.hospital_branch_id,
          staff_id:staffDetail.staff_id
         }
       })

        if(staffDetail.dataEntry_review_permission==1 && staffDetail.scoreGenerate==0){
            spResult[0].permission_id=1
        }else if(staffDetail.dataEntry_review_permission==0 && staffDetail.scoreGenerate==1){
            spResult[0].permission_id=2
        }else if(staffDetail.dataEntry_review_permission==1 && staffDetail.scoreGenerate==1){
            spResult[0].permission_id=3
        }else{
            spResult[0].permission_id=null
        }
        spResult[0].save()
        res.json( responseHelper.success(constant.staff_updated_successfully,spResult))
    }  
   } 

exports.addReferralDoctor = async (req,res,next) =>{
var user ={}
var referral ={}
var referralHospital ={}
var passcode =''
user = mapper.User(user,req)
var emailValidation = await pReadingModels.user_model.findAll({
    where:{
        email_address :req.body.email
    }
})
if(emailValidation.length >0){
    res.json( responseHelper.alreadyExist(constant.email_validation,emailValidation))
}
pReadingModels.user_model.findAll({
    where :{
        contact_number:req.body.contactNumber,
    }
})
.then(result => {
    if(result.length >0){
       res.json( responseHelper.alreadyExist(constant.contact_validation,result))
    }
  return result
})
.then(result=>{
    if(result.length == 0){
    pReadingModels.user_model.create(user)
    .then(result=>{
        if(result != null){
            referral = mapper.UnregisteredReferral(referral,req ,result)
            var result = pReadingModels.referral_doctor_model.create(referral)
            return result 
        }
    })
    .then(result=>{
        if(result != null){
            passcode = util.generatePasscode()
            referralHospital = mapper.unRegisteredReferralHospital(referralHospital,req ,result,passcode)
            var result = pReadingModels.referral_hospitals_model.create(referralHospital)
            return result
        }
    })
    .then(result=>{
    if(result != null){
        var acceptLink = `http://13.234.214.254:8081/hospitalStaff/acceptRequest/`+passcode
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'avyantra@yahoo.com',
                pass: 'knrao2017'
             }
         })
         let mailOptions = {
            from: 'avyantra@yahoo.com',
            to: req.body.email, 
            subject: 'Registration Confirmation.', 
           html: '<b> Hi '+req.body.firstName+' '+req.body.lastName+'</b>' +
           `<br> Congratulations! Your registration is confirmed!
           You’ve successfully completed registration for Avyantra- A neonatal sepsis prediction score generation platform. 
           From now on,Please login into your account using your username and Password.</br>`+
           `<br><b><a href=`+acceptLink+`>Accept Invitation</a><b></br>`
           + `<br><b> Thanks <b></br>`
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.json(responseHelper.serveError(constant.error_msg,error))
            } else {
              console.log('Email sent: ' + info.response);
              res.json( responseHelper.success(constant.success,result))
            }
          });
        }
      }) 
    }
  })
}

exports.getReferralDoctor =(req,res,next) =>{

    var start = (req.params.start-1)*req.params.end
    var searchText = '%'+req.query.searchText+'%'
    var query = null;
    if(req.query.searchText == "null"){
        query=allQueries.HospitalStaffQueries.getReferralDoctor_searchTxtNull(req.params.end,start);
    }else{
        query=allQueries.HospitalStaffQueries.getReferralDoctor_NotNull();
    }

    sequelize.query(query, 
    { replacements: { 
        hospital_id:req.params.hospitalId,
        hospital_branch_id:req.params.hospitalBranchId,
        searchText:searchText
    }, type: sequelize.QueryTypes.SELECT }
    ).then(result =>{
        sequelize.query(allQueries.HospitalStaffQueries.getReferralDoctor_then_query(),
        { replacements: { 
            hospital_id:req.params.hospitalId,
            hospital_branch_id:req.params.hospitalBranchId
        }, type: sequelize.QueryTypes.SELECT }
        ).then(specialityResult=>{

            result.forEach((data,index)=>{
                data.speciality_id=null
                data.speciality=null
            })

            if(specialityResult.length > 0){
                result.forEach((data,index)=>{
                    specialityResult.forEach((sdata,index)=>{
                        if(data.referral_id == sdata.referral_id){
                            data.speciality_id=sdata.speciality_id
                            data.speciality=sdata.speciality
                        }
                     })
                  })
                }
            res.json( responseHelper.success(constant.success,result))
        })
    })
    .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}

exports.getReferralDoctorCount = async(req,res,next) =>{

    var searchText = '%'+req.query.searchText+'%'
    var query = null;
    if(req.query.searchText == "null"){
        query = allQueries.HospitalStaffQueries.getReferralDoctorCount_searchTxtNull();
    }else{
        query = allQueries.HospitalStaffQueries.getReferralDoctorCount_NotNull();
    }

    var result = await sequelize.query(query,
        {
          replacements: {
            hospital_id: req.params.hospitalId,
            hospital_branch_id: req.params.hospitalBranchId,
            searchText: searchText
          }, type: sequelize.QueryTypes.SELECT
        }
      )
    
    var count = result[0]['total'];
    res.json( responseHelper.success(constant.success,{referral_count:count}));

    // pReadingModels.referral_hospitals_model
    // .findAndCountAll({
    //    where: {
    //     hospital_id:req.params.hospitalId,
    //     hospital_branch_id:req.params.hospitalBranchId,
    //     active_flag:1 
    //    }   
    //  })
    // .then(result => {
    //   res.json( responseHelper.success(constant.success,{referral_count:result.count}))
    // });

}

exports.getStaffProfile =(req,res,next)=>{
    var branches=[];
    let query=allQueries.HospitalStaffQueries.getStaffProfile_query();
    sequelize.query(query,
     { replacements: { 
        staff_id:req.params.staffId,
     }, type: sequelize.QueryTypes.SELECT }
     )
     .then(result =>{
        sequelize.query(allQueries.HospitalStaffQueries.getStaffProfile_then_one_query(),
        { replacements: { 
           staff_id:req.params.staffId,
        }, type: sequelize.QueryTypes.SELECT }
        ).then(rResult =>{ 
       if(rResult.length > 0){
        result[0].reporting_user= rResult[0].reporting_user
        console.log('if reporting_user :' , result)

       }else{
        result[0].reporting_user= null
        console.log('else reporting_user :' , result)

       }
     })
     return result
    })
     .then(result=>{
         sequelize.query(allQueries.HospitalStaffQueries.getStaffProfile_then_two_query(),
         { replacements: { 
            staff_id:req.params.staffId,
         }, type: sequelize.QueryTypes.SELECT }
         ).then(bResult =>{
            bResult.forEach((data,index)=>{
             branches.push(data.branch_name)
         })
         result[0].branches = branches
         return result
         })
         .then(result => {
            res.json( responseHelper.success(constant.success,result))
        }) 
     })
     .catch(err => {
         res.json(responseHelper.serveError(constant.error_msg,err))
      })
}

exports.updateStaffProfile =(req,res,next)=>{

 pReadingModels.staff_model.findByPk(req.params.staffId)
    .then(result=>{
        result.first_name=req.body.firstName
        result.last_name=req.body.lastName
        return result.save()
     }).then(result=>{
        var userResult = pReadingModels.user_model.findByPk(result.user_id)
        return userResult
     })
     .then(userResult=>{
         pReadingModels.user_model.findAll({
            where: {
                $not:{user_id: userResult.user_id},
                $or: [{
                    email_address: req.body.emailAddress
                },{
                    contact_number: req.body.contactNumber
                },{
                    user_name: req.body.userName
                }]
            }
         }).then((resData)=>{
            if (resData.length > 0) {
                let contactNumber = resData.find((data) => {
                    if (data["contact_number"]) {
                        return data["contact_number"].toString() == req.body.contactNumber.toString()
                    }
                });
                let emailAddress = resData.find((data) => { return data["email_address"] == req.body.emailAddress });
                let userName = resData.find((data) => { return data["user_name"].toLowerCase() == req.body.userName.toLowerCase() });

                if (contactNumber) {
                    res.json(responseHelper.alreadyExist('Contact number already exist', resData))
                } else if (emailAddress) {
                    res.json(responseHelper.alreadyExist('Email address already exist', resData))
                } else if(userName){
                    res.json(responseHelper.alreadyExist('Username already exist', resData))
                } else {
                    res.json(responseHelper.alreadyExist('Invalid entries', resData))
                } 
            }else{
                userResult.user_name = req.body.userName
                userResult.email_address =req.body.emailAddress
                userResult.contact_number= req.body.contactNumber
                userResult.password= req.body.password
                userResult.save()
                pReadingModels.hospital_staff_model.findOne({
                    where:{
                       staff_id:req.params.staffId
                       }
                    }).then(hospitalStaffResult =>{
                    var hospitalResult = pReadingModels.hospital_model.findByPk(hospitalStaffResult.hospital_id)
                    return hospitalResult
                 })
                 .then(hospitalResult=>{
                    hospitalResult.hospital_name= req.body.hospitalName
                    return hospitalResult.save()
                 })
                 .then(result=>{
                    res.json( responseHelper.success(constant.success))
                 })
            }
         })
        
     })
     .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}

exports.getReferralProfile =(req,res,next)=>{
    sequelize.query(allQueries.HospitalStaffQueries.getReferralProfile_query(),
     { replacements: { 
        referral_id:req.params.referralId,
     }, type: sequelize.QueryTypes.SELECT }
     ).then(result => {
         res.json( responseHelper.success(constant.success,result))
     })
     .catch(err => {
         res.json(responseHelper.serveError(constant.error_msg,err))
      })
}

exports.updateReferralProfile =(req,res,next)=>{
    pReadingModels.referral_doctor_model.findByPk(req.params.referralId)
    .then(result=>{
        result.first_name=req.body.firstName
        result.last_name=req.body.lastName
        return result.save()
    })
    .then(result=>{
     pReadingModels.user_model.findByPk(result.user_id)
     .then(userResult=>{
        pReadingModels.user_model.findAll({
            where:{
                $not:{ user_id:userResult.user_id },
                $or: [{
                    email_address: req.body.emailAddress
                },{
                    contact_number: req.body.contactNumber
                },{
                    user_name: req.body.userName
                }]
            }
        }).then((resData)=>{
            if (resData.length > 0) {
                let contactNumber = resData.find((data) => {
                    if (data["contact_number"]) {
                        return data["contact_number"].toString() == req.body.contactNumber.toString()
                    }
                });
                let emailAddress = resData.find((data) => { return data["email_address"] == req.body.emailAddress });
                let userName = resData.find((data) => { return data["user_name"].toLowerCase() == req.body.userName.toLowerCase() });

                // let userName = resData.find((data) => { return data["user_name"] == req.body.userName });

                if (contactNumber){
                    res.json(responseHelper.alreadyExist('Contact number already exist', resData))
                } else if (emailAddress) {
                    res.json(responseHelper.alreadyExist('Email address already exist', resData))
                } else if(userName){
                    res.json(responseHelper.alreadyExist('Username already exist', resData))
                } else {
                    res.json(responseHelper.alreadyExist('Invalid entries', resData))
                }  
            }else{
                userResult.user_name=req.body.userName
                userResult.contact_number=req.body.contactNumber
                userResult.email_address=req.body.emailAddress
                userResult.state=req.body.state
                userResult.city=req.body.city
                userResult.address=req.body.address
                userResult.pincode=req.body.pincode
                userResult.password=req.body.password
                userResult.save()
                res.json( responseHelper.success(constant.success,userResult))
            }
        });
      })
    })
}

exports.registerReferralDoctor = (req, res, next) => {
    var user = {}
    var referral = {}
    user = mapper.referralUserRegister(user, req)
    if (user.user_name != undefined && user.user_name.length != 0 && user.password != undefined && user.password.length != 0) {
        pReadingModels.user_model.findAll({
            where: {
                $or: [
                    { contact_number: user.contact_number },
                    { email_address: user.email_address },
                    { user_name: user.user_name },
                ]
            }
        })
            .then(result => {
                if (result.length > 0) {
                    let contactNumber = result.find((data) => {
                        if (data["contact_number"]) {
                            return data["contact_number"].toString() == user.contact_number.toString()
                        }
                    });
                    let emailAddress = result.find((data) => { return data["email_address"] == user.email_address });
                    let userName = result.find((data) => { return data["user_name"].toLowerCase() == user.user_name.toLowerCase() });

                    if (contactNumber) {
                        res.json(responseHelper.alreadyExist('Contact number already exist', result))
                    } else if (emailAddress) {
                        res.json(responseHelper.alreadyExist('Email address already exist', result))
                    } else if(userName){
                        res.json(responseHelper.alreadyExist('Username already exist', result))
                    } else {
                        res.json(responseHelper.alreadyExist('Invalid entries', result))
                    }  
                } else {
                    pReadingModels.user_model.create(user)
                        .then(result => {
                            referral = mapper.RegisteredReferral(referral, req, result)
                            pReadingModels.referral_doctor_model.create(referral)
                                .then(result => {
                                    if (result != null) {
                                        let transporter = nodeMailer.createTransport({
                                            host: 'smtp.gmail.com',
                                            port: 465,
                                            secure: true,
                                            auth: {
                                                user: 'avyantra@yahoo.com',
                                                pass: 'knrao2017'
                                            }
                                        })

                                        let mailOptions = {
                                            from: 'avyantra@yahoo.com',
                                            to: req.body.email,
                                            subject: 'Registration Confirmation.',

                                            html: `<br><b> Hi` +" "+result.first_name+" "+result.last_name+`</b></br>`+
                                                `<br> Congratulations! Your registration is confirmed! </br>` +
                                                `<br> You’ve successfully completed registration for Avyantra- A neonatal sepsis prediction score generation platform. 
                                                From now on,Please login into your account using your username and Password.</br>`+
                                                `<br><b> Thanks <b></br>`
                                        }
                                        transporter.sendMail(mailOptions, function (error, info) {
                                            if (error) {
                                                console.log('Unsuccessfull', error);
                                            } else {
                                                console.log('Email successfully sent', info);
                                            }
                                        });
                                    }
                                    res.json(responseHelper.success(constant.successfully_registered, result))
                                })
                        })
                }
            })
    } else {
        res.json(responseHelper.notFound(constant.credential_required))
    }
}

exports.getReferralHospital=(req,res,next)=>{
    var start = (req.params.start-1)*req.params.end
    var hospitalIds =[];
    let searchText = '%' + req.query.searchText + '%'
    let query = null;
    if(req.query.searchText=="null")
    {
        query=allQueries.HospitalStaffQueries.getReferralHospital_searchTxtNull(req.params.end,start);
    }
    else{
        query=allQueries.HospitalStaffQueries.getReferralHospital_notNull();  
    }  
        sequelize.query(query,
       
     {replacements:{
        searchText: searchText           
     } ,type: sequelize.QueryTypes.SELECT }
      )
      .then(result=>{
        if(result.length > 0){
            result.forEach((data,index)=>{
                hospitalIds.push(data.hospital_id)
            })
        sequelize.query(allQueries.HospitalStaffQueries.getReferralHospital_result_query(),
        { replacements: { 
            referral_id:req.params.referralId,
            searchText: searchText
         },type: sequelize.QueryTypes.SELECT })
         .then(referralHospitalResult =>{

       for(var i =0 ; i<result.length;i++){
           result[i].hospital_initiation_status='Request Initiation'
           result[i].hospital_initiation_status_id =1
           result[i].referral_hospital_id=null
           result[i].referral_initiation_status='Request Initiation'
           result[i].refferal_initiation_status_id =1
      }

            if(referralHospitalResult.length > 0){

                for(var i =0;i<result.length;i++){

                for(var j=0;j<referralHospitalResult.length;j++){

                 if(result[i].hospital_id==referralHospitalResult[j].hospital_id){
                    result[i].hospital_initiation_status=referralHospitalResult[j].hospital_initiation_status
                    result[i].hospital_initiation_status_id =referralHospitalResult[j].hospital_action_status
                    result[i].referral_hospital_id=referralHospitalResult[j].referral_hospital_id
                    result[i].referral_initiation_status=referralHospitalResult[j].refferal_initiation_status
                    result[i].refferal_initiation_status_id =referralHospitalResult[j].referral_action_status
                 } 
               }
            }
         }
         return result
    })
    .then(result => {
        res.json( responseHelper.success(constant.success,result))
     }).catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
    })
  }
 })
}

exports.getReferralHospitalCount = async(req,res,next) =>{
    let searchText = '%' + req.query.searchText + '%'
    let query = null;
    if(req.query.searchText=="null")
    {
        query=allQueries.HospitalStaffQueries.getReferralHospitalCount_searchTxtNull();
    }
    else{
        query=allQueries.HospitalStaffQueries.getReferralHospitalCount_notNull();
    }
    var result = await sequelize.query(query,
        {
          replacements: {
            searchText: searchText
          }, type: sequelize.QueryTypes.SELECT
        }
      )

      res.json(responseHelper.success(constant.success, { referral_hospital_count: result[0].count}))
      
  
    // pReadingModels.hospital_model
    // .findAndCountAll()
    // .then(result => {
    //   res.json( responseHelper.success(constant.success,{referral_hospital_count:result.count}))
    // });
}

exports.updateRefferalInitiationStatus =(req,res,next) =>{
    var referralHospital={
        hospital_id:req.params.hospitalId,
        referral_id:req.params.referralId,
        requester_type:util.getRequesterType(req.body.requesterType),
        hospital_action_status:req.body.hospitalActionStatus,
        referral_action_status:req.body.referralActionStatus,
        active_flag:1,
        created_by:5,
        deleted_flag:0
    }
if(req.body.previousStatus===1){
    pReadingModels.referral_hospitals_model.create(referralHospital)
    .then(result=>{
        res.json( responseHelper.success('status updated successfully',result))
    })
}else {
    pReadingModels.referral_hospitals_model.findByPk(req.body.referralHospitalId)
     .then(result=>{
        result.hospital_action_status=req.body.hospitalActionStatus,
        result.referral_action_status=req.body.referralActionStatus
        return result.save()
      })
      .then(result =>{
        res.json( responseHelper.success('status updated successfully',result))
      })
   }
}

exports.getStaffForMessageCenter =(req,res,next) =>{
sequelize.query(allQueries.HospitalStaffQueries.getStaffForMessageCenter_query(),
  { replacements: { 
    user_id:req.params.userId,
  }, type: sequelize.QueryTypes.SELECT }
  )
  .then(result=>{
        result.forEach((data,index)=>{
            if(result.length > 0){
            pReadingModels.message_model.findAll({
                where:{
                    sender :data.user_id,
                    receiver:req.params.userId
                },
                order:[
                    ['createdAt', 'DESC']
                   ],
                   limit: 1
            }).then(mResult=>{
                if(mResult.length > 0){
                  data.is_read =mResult[0].is_read
                  data.createdAt = mResult[0].createdAt
                }else{
                    data.is_read =null
                    data.createdAt =null
                }
            })
        }
    })
    setTimeout(function() {
        var sortedArray  = result.sort(function(a, b){
            return b.createdAt-a.createdAt 
           });
        res.json( responseHelper.success(constant.success,sortedArray))
     }, 400)
  })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getRefferalStaff =(req,res,next)=>{
    sequelize.query(allQueries.HospitalStaffQueries.getRefferalStaff_query(),
      { replacements: { 
        user_id:req.params.userId,
      }, type: sequelize.QueryTypes.SELECT }
      )
      .then(result=>{
        result.forEach((data,index)=>{
            if(result.length > 0){
            pReadingModels.message_model.findAll({
                where:{
                    sender :data.user_id,
                    receiver:req.params.userId
                },
                order:[
                    ['createdAt', 'DESC']
                   ],
                   limit: 1
            }).then(mResult=>{
                if(mResult.length > 0){
                   data.is_read =mResult[0].is_read
                  data.createdAt = mResult[0].createdAt
                }else{
                    data.is_read =null
                    data.createdAt =null
                }
            })
        }
    })
    setTimeout(function() {
        var sortedArray  = result.sort(function(a, b){
            return b.createdAt-a.createdAt 
           });
        res.json( responseHelper.success(constant.success,sortedArray))
     }, 400)
   })
  .catch(err => {
          res.json(responseHelper.serveError(constant.error_msg,err))
  })
}

exports.getReferralConnectedStaff =async (req,res,next)=>{

var rUser = await sequelize.query(allQueries.HospitalStaffQueries.getReferralConnectedStaff_ruser_query(),
  { 
  replacements: { 
    referral_id:req.params.referralId,
   }, 
  type: sequelize.QueryTypes.SELECT }
  )

sequelize.query(allQueries.HospitalStaffQueries.getReferralConnectedStaff_query(),
  { 
  replacements: { 
    referral_id:req.params.referralId,
   }, 
  type: sequelize.QueryTypes.SELECT }
  ).then(result=>{
    result.forEach((data,index)=>{
        if(result.length > 0){
        pReadingModels.message_model.findAll({
            where:{
                sender :data.user_id,
                receiver:rUser[0].user_id
            },
            order:[
                ['createdAt', 'DESC']
               ],
               limit: 1
        }).then(mResult=>{
            if(mResult.length > 0){
              data.is_read =mResult[0].is_read
              data.createdAt = mResult[0].createdAt
            }else{
                data.is_read =null
                data.createdAt =null
            }
        })
    }
})
setTimeout(function() {
    var sortedArray  = result.sort(function(a, b){
        return b.createdAt-a.createdAt 
       });
    res.json( responseHelper.success(constant.success,sortedArray))
 }, 400)
})
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })

}

exports.getConnectedStaff =async(req,res,next)=>{

var sUser = await sequelize.query(allQueries.HospitalStaffQueries.getConnectedStaff_suser_query(),
{ 
replacements: { 
    staff_id:req.params.staffId,
 }, 
 type: sequelize.QueryTypes.SELECT }
  )

sequelize.query(allQueries.HospitalStaffQueries.getConnectedStaff_query(),
  { 
  replacements: { 
    staff_id:req.params.staffId,
   }, 
  type: sequelize.QueryTypes.SELECT }
  )  .then(result=>{
    result.forEach((data,index)=>{
        if(result.length > 0){
        pReadingModels.message_model.findAll({
            where:{
                sender :data.user_id,
                receiver:sUser[0].user_id
            },
            order:[
                ['createdAt', 'DESC']
               ],
               limit: 1
        }).then(mResult=>{
            if(mResult.length > 0){
              data.is_read =mResult[0].is_read
              data.createdAt = mResult[0].createdAt
            }else{
                data.is_read =null
                data.createdAt =null
            }
        })
    }
})
 setTimeout(function() {
    var sortedArray  = result.sort(function(a, b){
        return b.createdAt-a.createdAt 
       });
     res.json( responseHelper.success(constant.success,sortedArray))
  }, 400)
 })
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getStaffReferral =async(req,res,next)=>{

    var sUser = await sequelize.query(allQueries.HospitalStaffQueries.getStaffReferral_sUser_query(),
    { 
    replacements: { 
        staff_id:req.params.staffId,
     }, 
    type: sequelize.QueryTypes.SELECT }
    )

    sequelize.query(allQueries.HospitalStaffQueries.getStaffReferral_query(),
  { 
  replacements: { 
    staff_id:req.params.staffId,
   }, 
  type: sequelize.QueryTypes.SELECT }
  ) .then(result=>{
    result.forEach((data,index)=>{
        if(result.length > 0){
        pReadingModels.message_model.findAll({
            where:{
                sender : data.user_id,
                receiver: sUser[0].user_id
            },
            order:[
                ['createdAt', 'DESC']
               ],
               limit: 1
        }).then(mResult=>{
            if(mResult.length > 0){
              data.is_read =mResult[0].is_read
              data.createdAt = mResult[0].createdAt
            }else{
                data.is_read =null
                data.createdAt =null
            }
        })
    }
})
setTimeout(function() {
    var sortedArray  = result.sort(function(a, b){
        return b.createdAt-a.createdAt 
       });
    res.json( responseHelper.success(constant.success,sortedArray))
 }, 400)
})
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getBranchStaff =async(req,res,next)=>{

    var sUser = await sequelize.query(allQueries.HospitalStaffQueries.getBranchStaff_sUser_query(),
    { 
    replacements: { 
        hospital_branch_id:req.params.hospitalBranchId,
     }, 
    type: sequelize.QueryTypes.SELECT }
    )

    sequelize.query(allQueries.HospitalStaffQueries.getBranchStaff_query(),
  { 
  replacements: { 
    hospital_branch_id:req.params.hospitalBranchId,
   }, 
  type: sequelize.QueryTypes.SELECT }
  ) .then(result=>{
    result.forEach((data,index)=>{
        if(result.length > 0){
        pReadingModels.message_model.findAll({
            where:{
                sender : data.user_id ,
                receiver: sUser[0].user_id
            },
            order:[
                ['createdAt', 'DESC']
               ],
               limit: 1
        }).then(mResult=>{
            if(mResult.length > 0){
              data.is_read =mResult[0].is_read
              data.createdAt = mResult[0].createdAt
            }else{
                data.is_read =null
                data.createdAt =null
            }
        })
    }
})
setTimeout(function() {
    var sortedArray  = result.sort(function(a, b){
        return b.createdAt-a.createdAt 
       });
    res.json( responseHelper.success(constant.success,sortedArray))
 }, 400)
})
  .catch(err => {
      res.json(responseHelper.serveError(constant.error_msg,err))
   })
}

exports.getRefferalSpeciality =(req,res,next)=>{
    pReadingModels.speciality_model.findAll({
        where:{
            created_by:1
        },
        attributes:['speciality_id','speciality','active_flag','created_by']
    }).then(result=>{
        res.json( responseHelper.success(constant.success,result))
    }).catch(err=>{
        res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.getDashBoardDetail =(req,res,next)=>{
   
    var query = allQueries.HospitalStaffQueries.getDashBoardDetail_query();

    sequelize.query(query,
        { replacements: { 
            staff_id:req.params.staffId
        }, type: sequelize.QueryTypes.SELECT }
        ).then(result =>{
           result[0].probable_sepsis = null     
           result[0].positive_sepsis = null
           res.json( responseHelper.success(constant.success,result))
     }).catch(err=>{
        res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.getReferralDashBoardDetail = async(req,res,next)=>{
  var result ={}
   var associatedHospital = await pReadingModels.referral_hospitals_model.findAll({
        where:{
            referral_id:req.params.referralId,
            hospital_action_status:[4]
        }
    })
    
    var pendingRequest = await pReadingModels.referral_hospitals_model.findAll({
        where:{
            referral_id:req.params.referralId,
            referral_action_status: [2,3]
        }
    })
    result.associated_hospitals = associatedHospital.length  
    result.pending_requests = pendingRequest.length
    result.pending_review = null
    res.json( responseHelper.success(constant.success,result))
}

exports.getStaffBranches =(req,res,next)=>{

    var query = allQueries.HospitalStaffQueries.getStaffBranches_query();

    sequelize.query(query,
        { replacements: { 
            staff_id:req.params.staffId
        }, type: sequelize.QueryTypes.SELECT }
        ).then(result =>{

            if(result.length>0){
                result.forEach((data,index)=>{

        data.user_type= "Hospital Staff"

      if(data.permission_id == null){
         data.data_entry=false
         data.generate_score=false
      }
      else if(data.permission_id == 1){
        data.data_entry=true
        data.generate_score=false
      }
      else if(data.permission_id == 2){
        data.data_entry=false
        data.generate_score=true
      }
      else if(data.permission_id == 3){
        data.data_entry=true
        data.generate_score=true
      }
   })
}
           res.json( responseHelper.success(constant.success,result))
     }).catch(err=>{
        res.json(responseHelper.serveError(constant.error_msg,err))
    })

}

exports.acceptRequest = (req,res,next)=>{

    pReadingModels.referral_hospitals_model.findAll(
        {
            where:{
                passcode:req.params.passcode
            }
        }
    ).then(result=>{
        result[0].hospital_action_status=4
        result[0].referral_action_status=4
        result[0].save()
    })
    .then(result=>{
    //   alert("Status updated successfully !")
      res.send();
     //res.json( responseHelper.success(constant.status_update,result))
    })
}

exports.submitForReferralOpinion =(req,res,next)=>{
    var obj ={
        "referral_id" :'' ,
        "hospital_branch_id":req.params.hospitalBranchId ,
        "staff_id" : req.params.staffId,
        "deleted_flag":0 ,
        "active_flag" : 1,
        "study_id":req.body.study_id,
        "reading":req.body.reading
    }
    var file ={
        "deleted_flag":0,
        "active_flag":1
    }
    var referralIds = req.body.referral_id
    var files = req.body.fileNames

    referralIds.forEach((data,index)=>{

       obj.referral_id=data

       pReadingModels.staff_referral_hospital_model.create(obj).then(result =>{

        console.log("staff referral hospital :" , result)

        files.forEach((data,index)=>{

            file.filename = data.filename
            file.filepath=data.path
            file.staff_referral_hospital_id = result.id

            pReadingModels.referral_files_model.create(file).then(fileResult =>{

              console.log("referral files :" , fileResult)  

            })
        })
    })
 })
   res.json( responseHelper.success(constant.referral_select))
}

exports.getReferralDetail=async(req,res,next)=>{

    var start = (req.params.start-1)*req.params.end

    var query = allQueries.HospitalStaffQueries.getReferralDetail_query(req.params.end,start);

    var result =await sequelize.query(query,
        { replacements: { 
            referral_id:req.params.referralId
        }, type: sequelize.QueryTypes.SELECT }
        )
    
        result.forEach(async (data,index)=>{

            var file =[]

            var fQuery = allQueries.HospitalStaffQueries.getReferralDetail_then_query();
              
            var fResult= await sequelize.query(fQuery,
                    { replacements: { 
                        referral_id:req.params.referralId,
                        staff_id:data.staff_id,
                        hospital_branch_id:data.hospital_branch_id,
                        study_id:data.study_id
                    }, type: sequelize.QueryTypes.SELECT }
                    )
                    fResult.forEach(async(fdata,index)=>{
                        if(data.createdAt === fdata.createdAt){
                            file.push(fdata)
                        }
                    })
                 data.file=file
                })

                setTimeout(function() {
                    res.json( responseHelper.success(constant.success,result))
                }, 200)
}

exports.sendReferralOpinion=(req,res,next)=>{
     var obj ={
      "opinion":req.body.opinion,
      "prescription":req.body.prescription,
      "staff_referral_hospital_id":req.params.staffReffHospId,
      "deleted_flag":0,
      "active_flag":1
    }
    pReadingModels.referral_opinion_model.create(obj)
    .then(result=>{
        res.json( responseHelper.success(constant.success,result))
    })
    .catch(err =>{
        res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.getReferralOpinion =(req,res,next)=>{

    var query = allQueries.HospitalStaffQueries.getReferralOpinion_query();

    sequelize.query(query,
        { replacements: { 
            study_id:req.params.studyId
        }, type: sequelize.QueryTypes.SELECT }
        ).then(result =>{
            if(result.length>0){
                result[0].score =null
                res.json( responseHelper.success(constant.success,result))
            }else{
                res.json(responseHelper.serveError("No opinion found",result,400))
            }
     }).catch(err=>{ 
        res.json(responseHelper.serveError(constant.error_msg,err))
    })
}

exports.uploadFile = (req,res,next)=>{

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
         cb(null, './public/upload/')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
      })
      var upload = multer({ storage: storage }).any()

     upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
        } else if (err) {
        }
        res.json(responseHelper.success("File successfully uploaded !",req.files))
    })
}

exports.downloadFile =(req,res,next)=>{
    pReadingModels.referral_files_model.findAll({
        where:{
            id:req.params.fileId
        }
      }
    )
    .then(result=>{
     var filePath = result[0].filepath
     var fileName = result[0].filename
     res.download(filePath, fileName);
    })
}