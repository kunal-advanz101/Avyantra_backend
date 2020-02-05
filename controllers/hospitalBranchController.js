const pReadingModels = require('../sequelize')
const { validationResult } = require('express-validator/check')
const responseHelper = require('../helper/res')
const constant = require('../helper/constant')
const { sequelize } = require('../sequelize')
const queries = require('../helper/queries')
const mapper = require('../mapper/mapper')
const enumConst = require('../helper/enum')
const nodeMailer = require('nodemailer');
const allQueries = require('../helper/queries/hospitalBranchContQueries');

exports.registerHospitalBranch = (req, res, next) => {
    var branchUser = {}
    var branch = {}
    var roles = {}
    branchUser = mapper.hospBranchUserMapper(branchUser, req)
    pReadingModels.hospital_branch_model.hasMany(pReadingModels.user_model, { foreignKey: 'user_id' });
    pReadingModels.user_model.belongsTo(pReadingModels.hospital_branch_model, { foreignKey: 'user_id', targetKey: 'user_id' })
    pReadingModels.user_model.findAll({
        where: {
            $or: [{
                '$m_hospitals_branch.branch_name$': req.body.name,
                '$m_hospitals_branch.hospital_id$': req.params.hospitalId
            }, {
                contact_number: req.body.contact_number
            }, {
                user_name: req.body.user_name
            }, {
                email_address: req.body.email
            }]
        },
        include: [{
            model: pReadingModels.hospital_branch_model,
            required: true
        }
        ]
    }).then(result => {
        if (result.length > 0) {
            let contactNumber = result.find((data) => {
                if (data["contact_number"]) {
                    return data["contact_number"].toString() == req.body.contact_number.toString()
                }
            });
            let emailAddress = result.find((data) => { return data["email_address"] == req.body.email });
            let branchName = result.find((data) => { return data["m_hospitals_branch"]["branch_name"] === req.body.name });
            let userName = result.find((data) => { return data["user_name"].toLowerCase() == req.body.user_name.toLowerCase() });

            if (branchName) {
                res.json(responseHelper.alreadyExist('Branch name already exist', result))
            } else if (contactNumber) {
                res.json(responseHelper.alreadyExist('Contact number already exist', result))
            } else if (emailAddress) {
                res.json(responseHelper.alreadyExist('Email address already exist', result))
            } else if (userName) {
                res.json(responseHelper.alreadyExist('Username already exist', result))
            } else {
                res.json(responseHelper.alreadyExist('Invalid entries', result))
            }
        } else {
            pReadingModels.user_model.create(branchUser)
                .then(result => {
                    if (!result.isEmpty) {
                        roles = mapper.branchRoleMapper(roles, result)
                        pReadingModels.user_role_model.create(roles).then(result => {
                            if (!result.isEmpty) {
                                console.log("hospital role data inserted", result)
                            }
                        }).catch(err => {
                            res.json(responseHelper.serveError(constant.error_msg, err))
                        })
                        branch = mapper.hospBranchMapper(branch, result, req)
                        pReadingModels.hospital_branch_model.create(branch)
                            .then(result => {

                                if (result != null) {

                                    pReadingModels.speciality_model.findAll({
                                        where: {
                                            created_by: 1
                                        }
                                    }).then(sresult => {
                                        sresult.forEach((data, index) => {
                                            pReadingModels.hospital_branch_speciality_model.create(
                                                {
                                                    speciality_id: data.speciality_id,
                                                    hospital_id: req.params.hospitalId,
                                                    hospital_branch_id: result.hospital_branch_id,
                                                    deleted_flag: 0,
                                                    active_flag: 1
                                                }
                                            ).then(sresult => {
                                                console.log('Ceated speciality for hospital branch', sresult.speciality_id);

                                            })

                                        })
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
                                                subject: 'Avyantra- Login Credential',

                                                html: `<b> Hi </b>` +
                                                    `<br> Please find your login credential for Avyantra- A neonatal sepsis prediction score generation platform.</br>` +
                                                    `<br>Username -` + req.body.user_name + `</br>` +
                                                    `<br>Password -` + req.body.password + `</br>` +
                                                    `<br>Keeping your password safe </br>
              <br>Do not share your username and password with anyone.</br>
              <br><b> Thanks <b></br>`
                                            }
                                            transporter.sendMail(mailOptions, function (error, info) {
                                                if (error) {
                                                    console.log('Unsuccessfull', error);
                                                } else {
                                                    console.log('Email successfully sent', info);
                                                }
                                            });
                                        }
                                        res.json(responseHelper.success(constant.hospital_branch_creation, result))
                                    })
                                }

                            }).catch(err => {
                                res.json(responseHelper.serveError(constant.error_msg, err))
                            })
                    }
                })
        }
        return result
        // pReadingModels.hospital_branch_model.findAll({
        //     where: {
        //         branch_name: req.body.name,
        //         hospital_id: req.params.hospitalId
        //     }
        // }).then((bResult) => {
        //     console.log(bResult);
        // });

    }).catch(err => {
        res.json(responseHelper.serveError(constant.error_msg, err))
    })
}

exports.getHospitalBranches = (req, res, next) => {
    let searchText = '%' + req.query.searchText + '%'
    let query = null
    if (req.query.searchText == "null") {
        query = allQueries.HospitalBranchContQueries.getHospitalBranches_searchTextNull();
    }
    else {
        query = allQueries.HospitalBranchContQueries.getHospitalBranches_searchText();
    }
    sequelize.query(query,
        {
            replacements: {
                hospitalId: req.params.hospitalId,
                searchText: searchText
            }, type: sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.json(responseHelper.success(constant.success, result))
    })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.addRole = (req, res, next) => {
    var roles = {}
    var hospitalBranchRole = {}
    roles = mapper.hospitalBranchRoleMapper(roles, req)

    pReadingModels.role_model.findAll({
        where: {
            role: req.body.role
        }
    }).then(result => {
        if (result.length > 0) {
            pReadingModels.hospital_branch_roles_model.findAll({
                where: {
                    role_id: result[0].role_id,
                    hospital_branch_id: req.params.hospitalBranchId
                }
            }).then(hbresult => {
                if (hbresult.length > 0) {
                    res.json(responseHelper.alreadyExist('Role already exist'))
                } else {
                    hospitalBranchRole.role_id = result[0].role_id
                    hospitalBranchRole.hospital_id = req.params.hospitalId
                    hospitalBranchRole.hospital_branch_id = req.params.hospitalBranchId
                    hospitalBranchRole.deleted_flag = 0
                    hospitalBranchRole.active_flag = 1
                    pReadingModels.hospital_branch_roles_model.create(hospitalBranchRole)
                        .then(result => {
                            res.json(responseHelper.success(constant.role_add_successfully, result))
                        })
                }
            })
        }
        else {
            pReadingModels.role_model.create(roles).then(result => {
                if (!result.isEmpty) {
                    hospitalBranchRole.role_id = result.role_id
                    hospitalBranchRole.hospital_id = req.params.hospitalId
                    hospitalBranchRole.hospital_branch_id = req.params.hospitalBranchId
                    hospitalBranchRole.deleted_flag = 0
                    hospitalBranchRole.active_flag = 1
                    pReadingModels.hospital_branch_roles_model.create(hospitalBranchRole)
                        .then(result => {
                            res.json(responseHelper.success(constant.role_add_successfully, result))
                        })
                }
            })
        }
    })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.removeRole = (req, res, next) => {
    pReadingModels.hospital_branch_roles_model.findByPk(req.params.hospitalBranchRoleId)
        .then(result => {
            return result.destroy()
        })
        .then(result => {
            res.json(responseHelper.success(constant.deletion_successfull, result))
        })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.getHopitalBranchRoles = (req, res, next) => {
    let query = allQueries.HospitalBranchContQueries.getHopitalBranchRoles_query();
    sequelize.query(query,
        {
            replacements: {
                hospital_id: req.params.hospitalId,
                hospital_branch_id: req.params.hospitalBranchId
            }, type: sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.json(responseHelper.success(constant.success, result))
    })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.updateHospitalBrancheRoles = (req, res, next) => {
    var roles = {}
    var hospitalBranchRole = {}

    pReadingModels.hospital_branch_roles_model
        .findByPk(req.params.hospitalBranchRoleId)
        .then(result => {
            result.deleted_flag = 1
            result.save()
        })

    roles.created_by = enumConst.userType.hospital_branch,
        roles.updated_by = enumConst.userType.hospital_branch,
        roles.deleted_flag = 0,
        roles.active_flag = 1,
        roles.role = req.body.role

    pReadingModels.role_model.create(roles)
        .then(result => {

            if (!result.isEmpty) {
                hospitalBranchRole.role_id = result.role_id
                hospitalBranchRole.hospital_id = req.params.hospitalId
                hospitalBranchRole.hospital_branch_id = req.params.hospitalBranchId
                hospitalBranchRole.deleted_flag = 0
                hospitalBranchRole.active_flag = 1

                pReadingModels.hospital_branch_roles_model.create(hospitalBranchRole)
                    .then(result => {
                        res.json(responseHelper.success(constant.role_add_successfully, result))
                    })
            }
        })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.addSpeciality = (req, res, next) => {
    var speciality = {}
    var hospitalBranchSpeciality = {}
    speciality = mapper.hospitalBranchSpecialityMapper(speciality, req)
    pReadingModels.speciality_model.findAll({
        where: {
            speciality: req.body.speciality
        }
    })
        .then(result => {
            debugger;
            if (result.length > 0) {
                if (result[0].created_by == 1) {
                    res.json(responseHelper.alreadyExist('Speciality already exist'))
                }
                pReadingModels.hospital_branch_speciality_model.findAll({
                    where: {
                        speciality_id: result[0].speciality_id,
                        hospital_branch_id: req.params.hospitalBranchId
                    }
                }).then(hbresult => {
                    if (hbresult.length > 0) {
                        res.json(responseHelper.alreadyExist('Speciality already exist'))
                    } else {
                        hospitalBranchSpeciality.speciality_id = result[0].speciality_id
                        hospitalBranchSpeciality.hospital_id = req.params.hospitalId
                        hospitalBranchSpeciality.hospital_branch_id = req.params.hospitalBranchId
                        hospitalBranchSpeciality.deleted_flag = 0
                        hospitalBranchSpeciality.active_flag = 1
                        pReadingModels.hospital_branch_speciality_model.create(hospitalBranchSpeciality)
                            .then(result => {
                                res.json(responseHelper.success(constant.speciality_add_successfully, result))
                            })
                    }
                })
            } else {
                pReadingModels.speciality_model.create(speciality).then(result => {
                    if (!result.isEmpty) {
                        hospitalBranchSpeciality.speciality_id = result.speciality_id
                        hospitalBranchSpeciality.hospital_id = req.params.hospitalId
                        hospitalBranchSpeciality.hospital_branch_id = req.params.hospitalBranchId
                        hospitalBranchSpeciality.deleted_flag = 0
                        hospitalBranchSpeciality.active_flag = 1
                        pReadingModels.hospital_branch_speciality_model.create(hospitalBranchSpeciality)
                            .then(result => {
                                res.json(responseHelper.success(constant.speciality_add_successfully, result))
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.getHopitalBranchspecialities = async (req, res, next) => {
    let query = allQueries.HospitalBranchContQueries.getHopitalBranchspecialities_query();
    sequelize.query(query,
        {
            replacements: {
                hospital_id: req.params.hospitalId,
                hospital_branch_id: req.params.hospitalBranchId
            }, type: sequelize.QueryTypes.SELECT
        }
    )
        .then(result => {
            res.json(responseHelper.success(constant.success, result))
        })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.removeSpeciality = (req, res, next) => {
    pReadingModels.hospital_branch_speciality_model.findByPk(req.params.hospitalBranchSpecialityId)
        .then(result => {
            return result.destroy()
        })
        .then(result => {
            res.json(responseHelper.success(constant.deletion_successfull, result))
        })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.updateHospitalBrancheSpecialities = (req, res, next) => {
    var speciality = {}
    var hospitalBranchSpeciality = {}

    pReadingModels.hospital_branch_speciality_model
        .findByPk(req.params.hospitalBranchSpecialityId)
        .then(result => {
            result.deleted_flag = 1
            result.save()
        })

    speciality.created_by = enumConst.userType.hospital_branch,
        speciality.updated_by = enumConst.userType.hospital_branch,
        speciality.deleted_flag = 0,
        speciality.active_flag = 1,
        speciality.speciality = req.body.speciality

    pReadingModels.speciality_model.create(speciality)
        .then(result => {

            if (!result.isEmpty) {
                hospitalBranchSpeciality.speciality_id = result.speciality_id
                hospitalBranchSpeciality.hospital_id = req.params.hospitalId
                hospitalBranchSpeciality.hospital_branch_id = req.params.hospitalBranchId
                hospitalBranchSpeciality.deleted_flag = 0
                hospitalBranchSpeciality.active_flag = 1

                pReadingModels.hospital_branch_speciality_model.create(hospitalBranchSpeciality)
                    .then(result => {
                        res.json(responseHelper.success(constant.speciality_updated_successfully, result))
                    })
            }
        })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.getHopitalBranchProfile = (req, res, next) => {
    let query = allQueries.HospitalBranchContQueries.getHopitalBranchProfile_query()
    sequelize.query(query,
        {
            replacements: {
                hospital_branch_id: req.params.hospitalBranchId,
            }, type: sequelize.QueryTypes.SELECT
        }
    ).then(result => {
        res.json(responseHelper.success(constant.success, result))
    })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}

exports.updateHopitalBranchProfile = (req, res, next) => {
    pReadingModels.hospital_branch_model.findByPk(req.params.hospitalBranchId)
        .then(result => {
            result.branch_name = req.body.branchName
            return result.save()
        })
        .then(result => {
            var userResult = pReadingModels.user_model.findByPk(result.user_id)
            return userResult
        })
        .then(userResult => {
            pReadingModels.user_model.findAll({
                where: {
                    $not: { user_id: userResult.user_id },
                    $or: [{
                        email_address: req.body.emailAddress
                    }, {
                        contact_number: req.body.contactNumber
                    }, {
                        user_name: req.body.userName
                    }]
                }
            }).then((resData) => {
                if (resData.length > 0) {
                    let contactNumber = resData.find((data) => {
                        if (data["contact_number"]) {
                            return data["contact_number"].toString() == req.body.contactNumber.toString()
                        }
                    });
                    let emailAddress = resData.find((data) => { return data["email_address"] == req.body.emailAddress });
                    let userName = resData.find((data) => { return data["user_name"].toLowerCase() == req.body.userName.toLowerCase() });
                    // console.log(userName);

                    if (userName) {
                        res.json(responseHelper.alreadyExist('Username already exist', resData))
                    } else if (emailAddress) {
                        res.json(responseHelper.alreadyExist('Email address already exist', resData))
                    } else if (contactNumber) {
                        res.json(responseHelper.alreadyExist('Contact number already exist', resData))
                    } else {
                        res.json(responseHelper.alreadyExist('Invalid entries', resData))
                    }
                } else {
                    userResult.user_name = req.body.userName
                    userResult.contact_number = req.body.contactNumber
                    userResult.email_address = req.body.emailAddress
                    userResult.state = req.body.state
                    userResult.city = req.body.city
                    userResult.address = req.body.address
                    userResult.pincode = req.body.pincode
                    userResult.password = req.body.password
                    userResult.save()
                    res.json(responseHelper.success(constant.success))
                }
            });

        })
        .catch(err => {
            res.json(responseHelper.serveError(constant.error_msg, err))
        })
}
