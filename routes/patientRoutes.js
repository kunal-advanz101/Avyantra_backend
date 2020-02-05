const express = require('express')
const patientValidation = require('../validation/patientValidation')
const patientController = require('../controllers/patientController')

const prouter = express.Router()

prouter.put('/update/babyProfile/:studyId/:sUserId',patientController.updateBabyProfileByStudyId)

prouter.put('/update/motherProfile/:studyId/:sUserId',patientController.updateMotherProfileByStudyId)

prouter.post('/models/save/:sUserId',patientValidation.validate('savePatientModels'),patientController.savePatientModels)

prouter.get('/readingId/:study_id',patientController.getReadingIdByStudyId)

prouter.get('/search/:id/:hospitalId/:hospitalBranchId' , patientController.searchReadingIdByStudyIdAndMrn)

prouter.get('/models/:studyId',patientController.getPatientModels)

prouter.get('/baby_appears/:studyId/:hospitalId/:pageNo/:readingId', patientController.getBabyAppearsModel)

prouter.get('/baby_resp/:studyId/:hospitalId/:pageNo/:readingId',patientController.getBabyRespModel)

prouter.get('/baby_cv/:studyId/:hospitalId/:pageNo/:readingId',patientController.getBabyCVModel)

prouter.get('/baby_cns/:studyId/:hospitalId/:pageNo/:readingId',patientController.getBabyCNSModel)

prouter.get('/baby_git/:studyId/:hospitalId/:pageNo/:readingId',patientController.getBabyGITModel)

prouter.get('/baby_investigation/:studyId/:hospitalId/:pageNo/:readingId',patientController.getBabyInvestigationModel)

prouter.get('/baby_antibiotic/:studyId/:hospitalId/:pageNo/:readingId',patientController.getBabyAntibioticModel)

prouter.get('/baby_final/:studyId/:hospitalId/:pageNo/:readingId',patientController.getBabyFinalModel)

prouter.put('/update/baby_appears/:study_id/:reading/:sUserId',patientValidation.validate('updateBabyAppearsModel') ,patientController.updateBabyAppearsModel)

prouter.put('/update/baby_resp/:study_id/:reading/:sUserId', patientValidation.validate('updateBabyRespModel'),patientController.updateBabyRespModel)

prouter.put('/update/baby_cv/:study_id/:reading/:sUserId',patientValidation.validate('updateBabyCVModel'), patientController.updateBabyCVModel)

prouter.put('/update/baby_cns/:study_id/:reading/:sUserId',patientValidation.validate('updateBabyCNSModel'),patientController.updateBabyCNSModel)

prouter.put('/update/baby_git/:study_id/:reading/:sUserId',patientValidation.validate('updateBabyGITModel'),patientController.updateBabyGITModel)

prouter.put('/update/baby_investigation/:study_id/:reading/:sUserId',patientValidation.validate('updateBabyInvestigationModel') ,patientController.updateBabyInvestigationModel)

prouter.put('/update/baby_antibiotic/:study_id/:reading/:sUserId',patientValidation.validate('updateBabyAntibioticModel'), patientController.updateBabyAntibioticModel)

prouter.put('/update/baby_final/:study_id/:reading/:sUserId',patientValidation.validate('updateBabyFinalModel'),patientController.updateBabyFinalModel)

prouter.get('/generateReport',patientController.generateReport)

prouter.post('/medicalRecord/:hospitalId/:hospitalBranchId',patientController.saveBabyMedicalRecord)

prouter.get('/medicalRecord/:hospitalId/:hospitalBranchId/:staffId/:start/:end/:isStaff',patientController.getBabyMedicalRecord)

prouter.put('/medicalRecord/:studyId/:patientId/:hospitalId/:hospitalBranchId/:userTypeConst',patientController.updateBabyMedicalRecord)

prouter.get('/medicalRecordCount/:hospitalId/:hospitalBranchId/:staffId/:isStaff',patientController.babyMedicalRecordCount)

prouter.get('/downloadReport/:studyId/:reading',patientController.scoreGeneratedReport)

prouter.get('/getScore/:bmrn/:reading',patientController.getGeneratedScrore);


prouter.post('/signup',patientController.patientSignup)

// prouter.post('/baby_cv/add',patientController.BabyCvAdd)

// prouter.post('/baby_appears/add',patientController.BabyAppearAdd)

// prouter.post('/baby_resp/add',patientController.BabyRespAdd)

prouter.post('/basic/add_dup/:hospital_id',patientController.BabyBasicDupAdd)

prouter.post('/general/add/:uStaffId',patientController.GeneralAddByUid)

// prouter.post('/baby_cns/add',patientController.BabyCnsAdd)

// prouter.post('/baby_git/add',patientController.BabyGitAdd)

// prouter.post('/baby_investigation/add',patientController.BabyInvestAdd)

// prouter.post('/baby_antibiotic/add',patientController.BabyAntiBioticAdd)

// prouter.post('/baby_final/add',patientController.BabyFinalAdd)

prouter.post('/get_patients',patientController.BabyGetPatient)

prouter.post('/get_level/:id',patientController.GetLevelById)

prouter.post('/like',patientController.patientLike)

prouter.post('/get_patient/:id',patientController.getPatientById)

prouter.post('/maternal/add/:uStaffId',patientController.MaternalAdd)

prouter.post('/basic/add',patientController.BasicAdd)


module.exports= prouter
