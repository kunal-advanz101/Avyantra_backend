const enumConst = require('../helper/enum')
// const server = require('../server')
const {sequelize} = require('../sequelize')


exports.getStaffPermission = (permissionId, result, permissionResult) => {
    console.log('permissionResult :', permissionResult)

    switch (permissionId) {
        case 1: result.dataEntry_review_permission = permissionResult.active_flag
            return result
        //  break
        case 2: result.scoreGenerate = permissionResult.active_flag
            return result
        //   break
    }
}


// exports.getStaffPermissionId = (permission) => {

//     console.log("permission :", permission)

//     switch (permission) {
//         case dataEntry_review_permission:
//             return 1
//         //  break
//         case scoreGenerate:
//             return 2
//         //    break
//     }
// }

exports.getRefferalInitiationStatusId = (status) => {

    switch (status) {
        case 'Request Initiation':
            return 1
        //   break
        case 'Pending Initiation':
            return 2
        //   break
        case 'Accept Initiation':
            return 3
        //  break
        case 'Active':
            return 4
        //   break
    }
}

exports.getRequesterType = (type) => {

    switch (type) {
        case 'Referral Doctor':
            return 5
        //   break
        case 'Hospital':
            return 2
        //   break
    }
}

exports.generatePasscode = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.isExistsWhere = (schmea, where_obj, cb) => {
    const whereObj = {}
    // whereObj[col_name_text] = col_value;
    const queryStr = "SELECT * FROM patient_basic_infos WHERE hospital_id = '" + where_obj.hospital_id + "' AND baby_medical_record_number='" + where_obj.baby_medical_record_number + "' ORDER BY createdAt DESC LIMIT 1";
    sequelize.query(queryStr, {
        type: sequelize.QueryTypes.SELECT,
        raw: true
    }).then(response => {
        if (response.length > 0) {
            cb(true, response[0]);
        } else {
            cb(false, []);
        }
    }).catch(err => {
        cb(false, [])
    });
}
exports.isExists=(schmea,col_name_text,col_value,cb)=>{
    const whereObj = {}
    whereObj[col_name_text] = col_value;
    schmea.findOne({
      where: whereObj,
    })
      .then(response => {
        if (response != null) {
          cb(true, response);
        } else {
          cb(false, []);
        }
      }).catch(err => {
        cb(false, [])
      });
}
 
exports.portDecider = ()=>{
   var be_port = 8081
//    var be_port = server.port
   var fe_port;
   switch (be_port) {
       case 8080:
           fe_port = ":"+4200
           break;z
       case 8081:
           fe_port = ''
           break;
       case 8082:
           fe_port = ":"+4300
           break;
   }
   return fe_port;
}

