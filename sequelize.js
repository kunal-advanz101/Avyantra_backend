// import Sequelize from 'sequelize';
const Sequelize = require('sequelize');
//import hospital_model from './models/hospital';
const patient = require('./models/patient');
const patient_level = require('./models/patient_level');
const basic = require('./models/basic');
const general = require('./models/general');
const maternal = require('./models/maternal');
const baby_appear = require('./models/baby_appear');
const baby_resp = require('./models/baby_resp');
const baby_cv = require('./models/baby_cv');
const baby_cns = require('./models/baby_cns');
const baby_final = require('./models/baby_final');
const baby_antibiotic = require('./models/baby_antibiotic');
const baby_investigation = require('./models/baby_investigation');
const baby_git = require('./models/baby_git');
const setting = require('./config/setting');
const hospital_model = require('./models/m_hospital');
const user_model = require('./models/user');
const user_role_model = require('./models/map_user_role');
const hospital_branch_model = require('./models/hospital_branch');
const role_model = require('./models/roles');
const user_type_model = require('./models/user_type');
const speciality_model = require('./models/speciality');
const staff_model = require('./models/staff');
const hospital_staff_model = require('./models/hospital_staff');
const hospital_branch_speciality_model = require('./models/hospital_branch_speciality');
const hospital_branch_roles_model = require('./models/hospital_branch_roles');
const user_module_permission_model = require('./models/map_user_module_permission');
const staff_permission_model = require('./models/map_user_permission');
const permission_model = require('./models/permission');
const patient_model = require('./models/patient_infos');
const referral_doctor_model = require('./models/referral_doctor');
const referral_hospitals_model = require('./models/referral_hospitals');
const message_model = require('./models/message');
const staff_referral_hospital_model = require('./models/staff_referral_hospital');
const referral_opinion_model = require('./models/referral_opinion');
const referral_files_model =require('./models/referral_files')

// const sequelize = new Sequelize(
//   setting.dev_db, setting.dev_user, setting.dev_password, {
//     host: setting.dev_host,
//     dialect: setting.db_type,
//   });

const sequelize = new Sequelize(
  setting.local_db, setting.local_user, setting.local_password, {
    host: setting.local_host,
    dialect: setting.db_type,
    logging: false
  });

const patient_db = patient(sequelize, Sequelize);
//const hospital_db = hospital_model(sequelize, Sequelize);
const patient_level_db = patient_level(sequelize, Sequelize);
const basic_db = basic(sequelize, Sequelize);
const general_db = general(sequelize, Sequelize);
const maternal_db = maternal(sequelize, Sequelize);
const baby_appear_db = baby_appear(sequelize, Sequelize);
const baby_resp_db = baby_resp(sequelize, Sequelize);
const baby_cv_db = baby_cv(sequelize, Sequelize);
const baby_cns_db = baby_cns(sequelize, Sequelize);
const baby_git_db = baby_git(sequelize, Sequelize);
const baby_final_db = baby_final(sequelize, Sequelize);
const baby_antibiotic_db = baby_antibiotic(sequelize, Sequelize);
const baby_investigation_db = baby_investigation(sequelize, Sequelize);
const hospital_db = hospital_model(sequelize,Sequelize);
const user_db = user_model(sequelize,Sequelize);
const user_role_db = user_role_model(sequelize,Sequelize)
const role_db = role_model(sequelize,Sequelize)
const user_module_permission_db = user_module_permission_model(sequelize,Sequelize)
const hospital_branch_db = hospital_branch_model(sequelize,Sequelize)
const user_type_db = user_type_model(sequelize,Sequelize)
const speciality_db =speciality_model(sequelize,Sequelize)
const hospital_staff_db =hospital_staff_model(sequelize,Sequelize)
const hospital_branch_speciality_db =hospital_branch_speciality_model(sequelize,Sequelize)
const hospital_branch_roles_db =hospital_branch_roles_model(sequelize,Sequelize)
const staff_db = staff_model(sequelize,Sequelize)
const staff_permission_db = staff_permission_model(sequelize,Sequelize)
const permission_db = permission_model(sequelize,Sequelize)
const patient_infos_db = patient_model(sequelize,Sequelize)
const referral_doctor_db = referral_doctor_model(sequelize,Sequelize)
const referral_hospitals_db = referral_hospitals_model(sequelize,Sequelize)
const message_db = message_model(sequelize,Sequelize)
const staff_referral_hospital_db = staff_referral_hospital_model(sequelize,Sequelize)
const referral_opinion_db =referral_opinion_model(sequelize,Sequelize) 
const referral_files_db =referral_files_model(sequelize,Sequelize)
sequelize.sync().then(() => {}).finally(() => {
  //sequelize.close();
});

module.exports = {
  sequelize: sequelize,
  hospital_model: hospital_db,
  user_model:user_db,
  patient_model: patient_db,
  patient_level_model: patient_level_db,
  basic_model: basic_db,
  general_model: general_db,
  maternal_model: maternal_db,
  baby_appear_model: baby_appear_db,
  baby_resp_model: baby_resp_db,
  baby_cv_model: baby_cv_db,
  baby_cns_model: baby_cns_db,
  baby_git_model: baby_git_db,
  baby_final_model: baby_final_db,
  baby_antibiotic_model: baby_antibiotic_db,
  baby_investigation_model: baby_investigation_db,
  user_role_model:user_role_db,
  user_module_permission_model:user_module_permission_db,
  hospital_branch_model:hospital_branch_db,
  role_model:role_db,
  user_type_model:user_type_db,
  hospital_branch_roles_model:hospital_branch_roles_db,
  hospital_branch_speciality_model:hospital_branch_speciality_db,
  speciality_model:speciality_db,
  staff_model:staff_db,
  hospital_staff_model:hospital_staff_db,
  staff_permission_model:staff_permission_db,
  permission_model:permission_db,
  patient_model:patient_infos_db,
  referral_doctor_model:referral_doctor_db,
  referral_hospitals_model:referral_hospitals_db,
  message_model:message_db,
  staff_referral_hospital_model:staff_referral_hospital_db,
  referral_opinion_model:referral_opinion_db,
  referral_files_model:referral_files_db
};