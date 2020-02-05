const pReadingModels = require('../sequelize')
const {validationResult} = require('express-validator/check')
const responseHelper = require('../helper/res')
const constant = require('../helper/constant')
const {sequelize} = require('../sequelize')
const queries = require('../helper/queries')
const mapper = require('../mapper/mapper')
const enumConst = require('../helper/enum')
const nodeMailer = require('nodemailer');
const allQueries = require('../helper/queries/hospitalContQueries');


exports.hospitalSignUp = (req,res,next)=>{

  var user ={}
  user = mapper.userMapper(user,req)

  var hospital={}
  hospital = mapper.hospitalMapper(hospital,req)

  var roles ={}
  roles= mapper.roleMapper(roles,req)
  pReadingModels.hospital_model.hasMany(pReadingModels.user_model, { foreignKey: 'user_id' });
  pReadingModels.user_model.hasMany(pReadingModels.hospital_model, { foreignKey: 'user_id', targetKey: 'user_id' });
  pReadingModels.user_model.findAll({
    where :{
       // user_name: req.body.username,
        //password : req.body.password
        $or: [{
            '$m_hospitals.hospital_name$':req.body.hospital_name
        },{
            user_name: req.body.username
        },{
            email_address: req.body.email
        }]
    },
    include: [{
        model: pReadingModels.hospital_model,
        required: true
    }]
}).then(result => {
    if(result.length >0){
        let hosName = result.find((data)=>{return data["m_hospitals"][0]["hospital_name"] === req.body.hospital_name}); 
        let emailAddress = result.find((data)=>{return data["email_address"] == req.body.email}); 
        let userName = result.find((data) => { return data["user_name"].toLowerCase() == req.body.username.toLowerCase() });

        if(hosName){
            res.json(responseHelper.alreadyExist('Hospital name already exist', result))
        } else if(emailAddress){
            res.json(responseHelper.alreadyExist('Email address already exist', result))
        }else if(userName){
            res.json(responseHelper.alreadyExist('Username already exist', result))
        }else {
            res.json(responseHelper.alreadyExist('Invalid entries', result))
        }  
    }else{
        pReadingModels.user_model.create(user)
        .then(result => {
            if(!result.isEmpty){
               roles.user_id=result.user_id
               roles.role_id = enumConst.roles.hospital_admin
               hospital.user_id=result.user_id
        
                pReadingModels.hospital_model.create(hospital)
                .then(result => {
                if(!result.isEmpty){
                   console.log('hospital saved successfully :' , result) 
                }
                })
      pReadingModels.user_role_model.create(roles).then(result=>{
        if(result != null){
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
             html: '<b>'+req.body.hospital_name+'</b>'+
             `<br> Congratulations! Your registration is confirmed!
             You’ve successfully completed registration for Avyantra- A neonatal sepsis prediction score generation platform. 
             From now on,Please login into your account using your username and Password.<br>
             <b>Thanks<b>`
            }
              transporter.sendMail(mailOptions, function(error, info){
               if (error) {
                 res.json(responseHelper.serveError(constant.error_msg,error))
                } else {
                res.json( responseHelper.success(constant.successfully_registered,req.body))
                }
               });
             } 
           })
          }
       })
    }
})
.catch(err=>{
    res.json(responseHelper.serveError(constant.error_msg,err))})
}

// exports.addRole= (req,res,next)=>{

//     var roles ={}
//     roles= mapper.hospitalRoleMapper(roles,req)

//     pReadingModels.role_model.create(roles).then(result=>{
//         if(!result.isEmpty){
//             res.json( responseHelper.success(constant.role_add_successfully,result))
//         }
//     }).catch(err=>{
//          res.json(responseHelper.serveError(constant.error_msg,err))
//     })

// }

exports.getHospitalProfile = (req, res, next)=>{
    
    let query = allQueries.HospitalContQueries.getHospitalProfile_query();
    sequelize.query(query,
    { replacements: { 
        hospital_id:req.params.hospitalId,
    }, type: sequelize.QueryTypes.SELECT }
    ).then(result => {
        res.json( responseHelper.success(constant.success,result))
    })
    .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}

exports.updateHospitalProfile = (req, res, next) => {

    pReadingModels.hospital_model.hasMany(pReadingModels.user_model, { foreignKey: 'user_id' });
    pReadingModels.user_model.hasMany(pReadingModels.hospital_model, { foreignKey: 'user_id', targetKey: 'user_id' });
    pReadingModels.user_model.findAll({
        where: {
            $not: { user_id: req.body.user_id },
            $or: [{
                '$m_hospitals.hospital_name$': req.body.hospital_name
            }, {
                user_name: req.body.user_name
            }, {
                email_address: req.body.email_address
            }]
        },
        include: [{
            model: pReadingModels.hospital_model,
            required: true
        }]
    }).then((mResult) => {
        if (mResult.length > 0) {
            let hosName = mResult.find((data) => { return data["m_hospitals"][0]["hospital_name"] === req.body.hospital_name });
            let emailAddress = mResult.find((data) => { return data["email_address"] == req.body.email_address });
            let userName = mResult.find((data) => { return data["user_name"].toLowerCase() == req.body.user_name.toLowerCase() });

            if (hosName) {
                res.json(responseHelper.alreadyExist('Hospital name already exist', mResult))
            } else if (emailAddress) {
                res.json(responseHelper.alreadyExist('Email address already exist', mResult))
            } else if(userName){
                res.json(responseHelper.alreadyExist('Username already exist', mResult))
            } else {
                res.json(responseHelper.alreadyExist('Invalid entries', mResult))
            } 
        } else {
            pReadingModels.user_model.findOne({
                where: {
                    user_id: req.body.user_id
                }
            })
                .then(result => {

                    if (result == null) {
                        res.json(responseHelper.notFound(constant.no_record_found, result))
                    }

                    result.address = req.body.address
                    result.city = req.body.city
                    result.contact_number = req.body.contact_number
                    result.email_address = req.body.email_address
                    result.pincode = req.body.pincode
                    result.state = req.body.state
                    result.user_name = req.body.user_name
                    result.password = req.body.password
                    return result.save()
                })
                .then(result => {

                    var hospitalResult = pReadingModels.hospital_model.findOne({
                        where: {
                            hospital_id: req.params.hospitalId
                        }
                    })

                    return hospitalResult
                })
                .then(result => {

                    result.hospital_name = req.body.hospital_name
                    return result.save()
                })
                .then(result => {

                    res.json(responseHelper.success(constant.hospital_profile_updated_successfully, result))

                })
                .catch(err => {
                    res.json(responseHelper.serveError(constant.error_msg, err))
                })
        }
    });
}

exports.getRegisteredRefferal=(req,res,next)=>{
var start = (req.params.start-1)*req.params.end
var referralIds =[]
let searchText = '%'+req.query.searchText+'%'
let rquery = null 

if(req.query.searchText == "null"){
rquery = allQueries.HospitalContQueries.getRegisteredRefferal_searchTextNull(req.params.end, start);
}else{
    rquery = allQueries.HospitalContQueries.getRegisteredRefferal_searchText(searchText);
}
   sequelize.query(rquery,
     { type: sequelize.QueryTypes.SELECT }
      )
      .then(result=>{
        if(result.length > 0){
            result.forEach((data,index)=>{
                referralIds.push(data.referral_id)
        })
        let mQuery = allQueries.HospitalContQueries.getRegisteredRefferal_mQuery(referralIds);
        sequelize.query(mQuery,
        { replacements: { 
            hospital_id:req.params.hospitalId
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
                 if(result[i].referral_id==referralHospitalResult[j].referral_id){
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
  }else{
    res.json( responseHelper.success(constant.success,result))
  }
 })
}

exports.getRefferalCount =async(req,res,next) =>{

    let searchText = '%' + req.query.searchText + '%'
    let rquery = null

    if (req.query.searchText == "null") {
        rquery = allQueries.HospitalContQueries.getRefferalCount_searchTextNull();
        
    } else {
        rquery = allQueries.HospitalContQueries.getRefferalCount_searchText();

    }
    
    var response = await sequelize.query(rquery,
        {
            replacements: {
                searchText: searchText
            }, type: sequelize.QueryTypes.SELECT
        }
    );
    var total = response[0]["total"];
    res.json( responseHelper.success(constant.success,{refferal_count:total}))

    // pReadingModels.referral_hospitals_model
    // .findAndCountAll({
    //    where: {
    //     hospital_id:req.params.hospitalId,
    //     created_by:5
    //    }   
    //  })
    // .then(result => {
    //   res.json( responseHelper.success(constant.success,{refferal_count:result.count}))
    // })
    // .catch(err => {
    //     res.json(responseHelper.serveError(constant.error_msg,err))
    //  })
}

exports.sendMsgfrmHospToStaff =async(req,res,next)=>{
     var message={
        message:req.body.message,
        is_read:0,
        createdBy:req.params.hospitalId,
        deleted_flag:0,
        active_flag:1,
        sender:req.params.hUserId,
        receiver:req.params.sUserId
     }
        pReadingModels.message_model.create(message)
        .then(result=>{
            res.json( responseHelper.success(constant.message_send,result))
        }).catch(err=>{
            res.json(responseHelper.serveError(constant.error_msg,err))
          })
}

exports.getStaffAdmin = async (req,res,next)=>{
    let query = allQueries.HospitalContQueries.getStaffAdmin_m_staffs()
    var sUser = await sequelize.query(query,
    { 
    replacements: { 
        staff_id:req.params.staffId
    }, 
    type: sequelize.QueryTypes.SELECT }
    )
    let m_query = allQueries.HospitalContQueries.getStaffAdmin_map_staff_hospitals()
    var result = await sequelize.query(m_query,
         { replacements: { 
            staff_id:req.params.staffId,
         }, type: sequelize.QueryTypes.SELECT }
         )

         if(result.length>0){
            for(let data of result){
                data.user ='Hospital'
                if(result.length > 0){
               var  mResult = await pReadingModels.message_model.findAll({
                where:{
                    sender:data.user_id ,
                    receiver:sUser[0].user_id
                 },
                 order:[
                    ['message_log_id', 'DESC']
                   ],
                   limit: 1
                 })

                 if(mResult.length>0){
                    data.is_read =mResult[0].is_read
                    data.createdAt = mResult[0].createdAt
                    }else{
                       data.is_read =null
                       data.createdAt =null
                    }
          
              }
        }
    let nQuery = allQueries.HospitalContQueries.getStaffAdmin_map_staff_hospitals_two()
     var bResult = await sequelize.query(nQuery ,
        { replacements: { 
            staff_id:req.params.staffId,
        }, type: sequelize.QueryTypes.SELECT })

        if(bResult.length>0){
            for(let data of bResult){
                  data.user = 'Hospital Branch'
                  var  bmResult = await pReadingModels.message_model.findAll({
                     where:{
                         sender:data.user_id,
                         receiver:sUser[0].user_id
                      },
                      order:[
                         ['message_log_id', 'DESC']
                        ],
                        limit: 1
                    })
                    if(bmResult.length > 0){
                      data.is_read =bmResult[0].is_read
                      data.createdAt = bmResult[0].createdAt
                    }else{
                      data.is_read =null
                      data.createdAt =null
                    }
                    if(result.length>0){
                      result.push(data)
                    }
              }
              if(result.length>0){
                var sortedArray  = result.sort(function(a, b){
                    return b.createdAt-a.createdAt 
                   });
                res.json( responseHelper.success(constant.success,sortedArray))
              }else{
                var sortedArray  = bResult.sort(function(a, b){
                    return b.createdAt-a.createdAt 
                   });
                  res.json( responseHelper.success(constant.success,bResult))
              }
          }else{
            var sortedArray  = result.sort(function(a, b){
                return b.createdAt-a.createdAt 
               });
              res.json( responseHelper.success(constant.success,result))
          }
          }
    }
    
exports.getMessage =(req,res,next)=>{
    let query = allQueries.HospitalContQueries.getMessage_query(req.params.senderId, req.params.receiverId);
    sequelize.query(query,
     { type: sequelize.QueryTypes.SELECT }
     ).then(result => {
       result.forEach((data,index)=>{
        if(data.sender == req.params.senderId){
             data.isSender = true
        }else{
            data.isSender = false;
        }
       })
        return result
     }).then(result=>{
        res.json( responseHelper.success(constant.success,result))
     })
     .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}

exports.getReferralAdmin =async(req,res,next)=>{
    let query = allQueries.HospitalContQueries.getReferralAdmin_m_referral_doctors();
    var rUser = await sequelize.query(query,
    { 
    replacements: { 
        referral_id:req.params.referralId,
     }, 
    type: sequelize.QueryTypes.SELECT }
    )
    let mQuery = allQueries.HospitalContQueries.getReferralAdmin_map_referral_hospitals();

    var result = await sequelize.query(mQuery,
      { replacements: { 
         referral_id:req.params.referralId,
      }, type: sequelize.QueryTypes.SELECT }
      )
 
      if(result.length>0){
         for(let data of result){
             data.user ='Hospital'
            var  mResult = await pReadingModels.message_model.findAll({
                 where:{
                    sender:data.user_id,
                    receiver:rUser[0].user_id 
                 },
                 order:[
                    ['message_log_id', 'DESC']
                   ],
                   limit: 1
              })
              if(mResult.length>0){
              data.is_read =mResult[0].is_read
              data.createdAt = mResult[0].createdAt
              }else{
                 data.is_read =null
                 data.createdAt =null
              }
         }
     }
     let nQuery = allQueries.HospitalContQueries.getReferralAdmin_map_referral_hospitals_two()
   var bResult = await sequelize.query(nQuery,
      { replacements: { 
         referral_id:req.params.referralId,
      }, type: sequelize.QueryTypes.SELECT }
      )
 
     if(bResult.length>0){
               for(let data of bResult){
                     data.user = 'Hospital Branch'
                     var  bmResult = await pReadingModels.message_model.findAll({
                        where:{
                            sender:data.user_id,
                            receiver:rUser[0].user_id
                         },
                         order:[
                            ['message_log_id', 'DESC']
                           ],
                           limit: 1
                       })
                       if(bmResult.length > 0){
                         data.is_read =bmResult[0].is_read
                         data.createdAt = bmResult[0].createdAt
                       }else{
                         data.is_read =null
                         data.createdAt =null
                       }
                       if(result.length>0){
                         result.push(data)
                       }
                 }
                 if(result.length>0){

                    var sortedArray  = result.sort(function(a, b){
                        return b.createdAt-a.createdAt 
                       });

                     res.json( responseHelper.success(constant.success,sortedArray))
                 }else{

                    var sortedArray  = bResult.sort(function(a, b){
                        return b.createdAt-a.createdAt 
                       });

                     res.json( responseHelper.success(constant.success,bResult))
                 }
             }else{
                var sortedArray  = result.sort(function(a, b){
                    return b.createdAt-a.createdAt 
                   });

                 res.json( responseHelper.success(constant.success,sortedArray))
             }
 }
  
exports.updateIsReadFlag =(req,res,next)=>{
    pReadingModels.message_model.findAll({
        where:{
            sender:req.params.sUserId ,
            receiver:req.params.rUserId
        }
    })
    .then(result=>{
        res.json({
            result:result
        })
        result.forEach((data,index)=>{
            data.is_read = 1
            data.save()
        })
      return result
     })
     .then(result=>{
        res.json( responseHelper.success(constant.success,result))
     })
     .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}

exports.getRegisterRefferalCount =(req,res,next)=>{
    let query = allQueries.HospitalContQueries.getRegisterRefferalCount_query()
    sequelize.query(query ,
     { type: sequelize.QueryTypes.SELECT }
     ).then(result=>{
        res.json( responseHelper.success(constant.success,result))
     })
     .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}

exports.getDashBoardDetail =async(req,res,next)=>{
     var messages =[]
     var query =''
     var hquery = allQueries.HospitalContQueries.getDashBoardDetail_hquery(req.params.hospitalId);
     var hbquery = allQueries.HospitalContQueries.getDashBoardDetail_hbquery(req.params.hospitalBranchId);
     var rquery = allQueries.HospitalContQueries.getDashBoardDetail_rquery();
     var getStaffQuery = allQueries.HospitalContQueries.getDashBoardDetail_getStaffQuery(req.query.userType);
     var getReferralQuery = allQueries.HospitalContQueries.getDashBoardDetail_getReferralQuery();
     if(req.query.userType === 'Hospital Branch'){
     query = hbquery
     rquery = rquery + ' WHERE referral_source =1'
     getStaffQuery = getStaffQuery + ' JOIN m_hospitals_branches ON m_hospitals_branches.hospital_branch_id= map_staff_hospitals.hospital_branch_id WHERE map_staff_hospitals.hospital_branch_id= ' + req.query.hospitalBranchId
     var referralResult = await sequelize.query(rquery,{ type: sequelize.QueryTypes.SELECT } )
     var staffMessages = await sequelize.query(getStaffQuery,{ type: sequelize.QueryTypes.SELECT } )
     staffMessages.forEach((data,index)=>{
        pReadingModels.message_model.findAll({
            where:{
                sender:data.hospital_branch_user_id ,
                receiver:data.staff_user_id
            },
            order:[
                ['message_log_id', 'DESC']
               ],
            limit: 1
        }).then(dResult=>{
            if(dResult.length > 0){
            data.message_log_id = dResult[0].message_log_id
            data.message = dResult[0].message
            messages.push(data)
           }
        })
     })
   }
    else{
        if(req.query.hospitalBranchId != 'null'){
        query = hbquery  
        }
        else{
        query = ` SELECT hospital_name FROM m_hospitals WHERE m_hospitals.hospital_id= `+req.params.hospitalId
        query = query  
        }
     rquery = rquery + ' WHERE referral_source =2'
     getStaffQuery = getStaffQuery + ' JOIN m_hospitals ON m_hospitals.hospital_id=map_staff_hospitals.hospital_id WHERE map_staff_hospitals.hospital_id = ' + req.params.hospitalId
     getReferralQuery = getReferralQuery + ' WHERE map_referral_hospitals.hospital_id = ' + req.params.hospitalId
     var referralResult = await sequelize.query(rquery,{ type: sequelize.QueryTypes.SELECT } )
     var staffMessages = await sequelize.query(getStaffQuery,{ type: sequelize.QueryTypes.SELECT } )
     staffMessages.forEach((data,index)=>{
        pReadingModels.message_model.findAll({
            where:{
                sender:data.hospital_user_id ,
                receiver:data.staff_user_id
            },
            order:[
                ['message_log_id', 'DESC']
               ],
            limit: 1
        }).then(dResult=>{
            if(dResult.length > 0){
            data.message_log_id = dResult[0].message_log_id
            data.message = dResult[0].message
            messages.push(data)
           }
        })
     })

     var referralMessages = await sequelize.query(getReferralQuery,{ type: sequelize.QueryTypes.SELECT } )
     referralMessages.forEach((data,index)=>{
        pReadingModels.message_model.findAll({
            where:{
                sender:data.hospital_user_id ,
                receiver:data.referral_user_id
            },
            order:[
                ['message_log_id', 'DESC']
               ],
            limit: 1
        }).then(dResult=>{
            if(dResult.length > 0){
            data.message_log_id = dResult[0].message_log_id
            data.message = dResult[0].message
            messages.push(data)
           }
        })
     })
   }
    sequelize.query(query,
        { type: sequelize.QueryTypes.SELECT }
     ).then(result=>{
        if(req.query.hospitalBranchId == 'null'){
            result[0].total_staff=0
            result[0].medical_record_count=0
            result[0].branch_name=null
        }
        if(result.length >0){
            result[0].referral_doctor_count =referralResult[0].referral_doctor_count
           if(messages.length > 0){
            var sortedArray  = messages.sort(function(a, b){
                 return b.message_log_id-a.message_log_id 
                }).slice(0,5);
             result[0].messages = sortedArray  
             setTimeout(function() {
                res.json( responseHelper.success(constant.success,result))
             }, 200)
           }else{
            result[0].messages = []   
            res.json( responseHelper.success(constant.success,result))
           }
        }
     })
     .catch(err => {
        res.json(responseHelper.serveError(constant.error_msg,err))
     })
}


exports.getAllReferralDoctors =async(req,res,next)=>{
    var query = allQueries.HospitalContQueries.getAllReferralDoctors_query();
    var result = await sequelize.query(query,
        {
        replacements: {
            staffId: req.params.staffId
        }, type: sequelize.QueryTypes.SELECT
        })

    res.json(responseHelper.success(constant.success, result))
}
