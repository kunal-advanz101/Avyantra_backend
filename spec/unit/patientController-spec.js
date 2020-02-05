const pReadingModels = require('../../sequelize')
const patientController = require('../../controllers/patientController')
const { sequelize } = require('../../sequelize')
let Validator = require('validatorjs');
const baby_cv_model = require('../../sequelize');



describe('PatientController', () => {

    it("updateBabyProfileByStudyId test", (done) => {
        var spy = spyOn(pReadingModels.general_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            record_type: "test",
            save: () => {
                return Promise.resolve("test")
            }
        }])
        var result2 = Promise.resolve({
            test:"test",
            save:()=>{}
        })

        spy.andReturn(result)
        spy2.andReturn(result2)
        patientController.updateBabyProfileByStudyId(req, res, {})
        spy.plan().then((data) => {
            data.save().then((dt) => {
                expect(dt).toBe("test")
                done()
            })
        })
        spy2.plan().then((data) => {
            expect(data.test).toBe("test")
            done()

        })

    });

    it("updateMotherProfileByStudyId test", (done) => {
        var spy = spyOn(pReadingModels.maternal_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            record_type: "test",
            save: () => {
                return Promise.resolve("test")
            }
        }])
        var result2 = Promise.resolve({
            "test":"test",
            save: () => {
                return Promise.resolve('test')
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)
        patientController.updateMotherProfileByStudyId(req, res, {})
        spy.plan().then((data) => {
            data.save().then((dt) => {
                expect(dt).toBe("test")
                done()
            })
        })
        spy2.plan().then((data) => {
            expect(data.test).toBe("test")
            done()
        })
    });

    it("savePatientModels test", (done) => {
        var s=spyOn(pReadingModels.maternal_model,'findAll')
        var spy = spyOn(pReadingModels.patient_model, 'findOne')
        var spy2 = spyOn(pReadingModels.baby_investigation_model, 'create')
        var req = {
            "body": {
                "name": "test",
                "baby_appears": {
                    study_id: 1
                },
                "baby_resp": {
                    "baby_respiratory_support": '{"test":"test"}'
                }
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162,
                sUserId: 123
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve(Promise.resolve("test"))
        var result2 = Promise.resolve({
            "updated_by": 555,
            "save":()=>{
            }
        })

        spy.andReturn(result2)
        spy2.andReturn(result)
        s.andReturn(result)

        patientController.savePatientModels(req, res, {})
        s.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        spy2.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        spy.plan().then((data) => {
            expect(data.updated_by).toBe(555)
            done()
        })
       
    });

    it("getBabyAppearsModel test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        patientController.getBabyAppearsModel(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    });

    it("getBabyRespModel test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        patientController.getBabyRespModel(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    });

    it("getBabyCVModel test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        patientController.getBabyCVModel(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    });

    it("getBabyCNSModel test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        patientController.getBabyCNSModel(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    });

    it("getBabyGITModel test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        patientController.getBabyGITModel(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    });

    it("getBabyInvestigationModel test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        patientController.getBabyInvestigationModel(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    });

    it("getBabyAntibioticModel test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        patientController.getBabyAntibioticModel(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    });

    it("getBabyFinalModel test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        patientController.getBabyFinalModel(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    });

    it("getReadingIdByStudyId test", (done) => {
        var spy = spyOn(pReadingModels.baby_appear_model, 'findAll')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }
        var spy2 = spyOn(res, 'json')

        var result = Promise.resolve([])

        spy.andReturn(result)
        patientController.getReadingIdByStudyId(req, res, {})
        spy.plan().then((data) => {
            expect(spy2.wasCalled).toBe(true)
            done()
        })
        spy.reset()
        spy2.reset()
        result = Promise.resolve([{
            reading: 123
        }])
        spy.andReturn(result)
        patientController.getReadingIdByStudyId(req, res, {})
        spy.plan().then((data) => {
            expect(spy2.wasCalled).toBe(true)
            done()
        })
    });

    it("searchReadingIdByStudyIdAndMrn test", (done) => {
        var spy = spyOn(pReadingModels.basic_model, 'findAll')
        var spy2 = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123
        }])

        spy.andReturn(result)
        spy2.andReturn(Promise.resolve([1, 2, 3]))

        patientController.searchReadingIdByStudyIdAndMrn(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            done()
        })


    });

    it("getPatientModels test", (done) => {
        var spy = spyOn(pReadingModels.baby_appear_model, 'findAll')
        var spy2 = spyOn(pReadingModels.baby_resp_model, 'findAll')
        var spy3 = spyOn(pReadingModels.baby_cv_model, 'findAll')
        var spy4 = spyOn(pReadingModels.baby_cns_model, 'findAll')
        var spy5 = spyOn(pReadingModels.baby_git_model, 'findAll')
        var spy6 = spyOn(pReadingModels.baby_investigation_model, 'findAll')
        var spy7 = spyOn(pReadingModels.baby_antibiotic_model, 'findAll')
        var spy8 = spyOn(pReadingModels.baby_final_model, 'findAll')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162,
                studyId: 123
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123
        }])
        var result1=Promise.resolve("test")
        spy.andReturn(result1)
        spy2.andReturn(result1)
        spy3.andReturn(result1)
        spy4.andReturn(result1)
        spy5.andReturn(result1)
        spy6.andReturn(result1)
        spy7.andReturn(result1)
        spy8.andReturn(result1)

        patientController.getPatientModels(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        spy2.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        spy3.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        spy4.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        spy6.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        spy7.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        spy8.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        // done()
    });

    it("updateBabyAppearsModel test", (done) => {
        var spy = spyOn(pReadingModels.baby_appear_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        var result2 = Promise.resolve({
            updated_by: 123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.updateBabyAppearsModel(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            data[0].save().then((dt) => {
                expect(dt).toBe("test")
            })
            done()
        })


    });

    it("updateBabyRespModel test", (done) => {
        var spy = spyOn(pReadingModels.baby_resp_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                baby_respiratory_support: '{"test":"test"}',
                name: "test",
                groaning: "as",
                save: () => {
                    return Promise.resolve("test")
                }
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            groaning: "as",
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        var result2 = Promise.resolve({
            updated_by: 123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.updateBabyRespModel(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            data[0].save().then((dt) => {
                expect(dt).toBe("test")
            })
            done()
        })
    });

    it("updateBabyCVModel test", (done) => {
        var spy = spyOn(pReadingModels.baby_cv_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        var result2 = Promise.resolve({
            updated_by: 123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.updateBabyCVModel(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            done()
        })
    });

    it("updateBabyCNSModel test", (done) => {
        var spy = spyOn(pReadingModels.baby_cns_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        var result2 = Promise.resolve({
            updated_by: 123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.updateBabyCNSModel(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            done()
        })
    });

    it("updateBabyGITModel test", (done) => {
        var spy = spyOn(pReadingModels.baby_git_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        var result2 = Promise.resolve({
            updated_by: 123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.updateBabyGITModel(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            done()
        })
    });

    it("updateBabyInvestigationModel test", (done) => {
        var spy = spyOn(pReadingModels.baby_investigation_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        var result2 = Promise.resolve({
            updated_by: 123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.updateBabyInvestigationModel(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            done()
        })
    });

    it("updateBabyAntibioticModel test", (done) => {
        var spy = spyOn(pReadingModels.baby_antibiotic_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        var result2 = Promise.resolve({
            updated_by: 123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.updateBabyAntibioticModel(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            done()
        })
    });

    it("updateBabyFinalModel test", (done) => {
        var spy = spyOn(pReadingModels.baby_final_model, 'findAll')
        var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        var result2 = Promise.resolve({
            updated_by: 123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.updateBabyFinalModel(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            done()
        })
    });

    it("generateReport test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve([{
            time_of_reading_hours: null,
            time_of_reading_minute: null,
            reading_time: "test",
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }])

        spy.andReturn(result)

        patientController.generateReport(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].studyId).toBe(123)
            done()
        })
    });

    it("saveBabyMedicalRecord test", (done) => {
        var spy = spyOn(pReadingModels.basic_model, 'findAll')
        var spy2 = spyOn(pReadingModels.basic_model, 'create')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")
        var result2 = Promise.resolve(null)

        spy.andReturn(result)
        spy2.andReturn(result2)

        patientController.saveBabyMedicalRecord(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            // expect(spy2.wasCalled).toBe(true)
            done()
        })
        // done()
    });

    // iit("getBabyMedicalRecord test", (done) => {
    //     var spy = spyOn(sequelize, 'query')
    //     var req = {
    //         body: {
    //             name: "test"
    //         },
    //         params: {
    //             id: 123,
    //             hospitalId: 92,
    //             hospitalBranchRoleId: 162,
    //             start: 0,
    //             end: 1
    //         },
    //         query: {
    //             searchText: "test"
    //         }
    //     }

    //     var res = {
    //         json: () => { }
    //     }

    //     var resSpy = spyOn(res, 'json')

    //     var result = [{
    //         time_of_reading_hours: null,
    //         time_of_reading_minute: null,
    //         reading_time: "test",
    //         studyId: 123,
    //         user_type_id: 4,
    //         updated_by: "test",
    //         id: 123,
    //         baby_medical_record_number: 123,
    //         save: () => {
    //             return Promise.resolve("test")
    //         }
    //     }]

    //     spy.andReturn(Promise.resolve(result) )

    //     patientController.getBabyMedicalRecord(req, res, {})
    //     expect(spy.wasCalled).toBe(true)
    //     done()
    // });  
    
    it("getBabyMedicalRecord test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162,
                start: 0,
                end: 1
            },
            query: {
                searchText: "test"
            }
        }
        var req1 = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162,
                start: 0,
                end: 1
            },
            query: {
                searchText: "null"
            }
        }

        var res = {
            json: () => { }
        }

        var resSpy = spyOn(res, 'json')

        var result = [{
            time_of_reading_hours: null,
            time_of_reading_minute: null,
            reading_time: "test",
            studyId: 123,
            user_type_id: 4,
            updated_by: "test",
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve("test")
            }
        }]

        spy.andReturn(Promise.resolve(result))

        patientController.getBabyMedicalRecord(req, res, {})
        expect(spy.wasCalled).toBe(true)
        done()
        patientController.getBabyMedicalRecord(req1, res, {})
        expect(spy.wasCalled).toBe(true)
        done()
    });

    it("updateBabyMedicalRecord test", (done) => {
        var spy = spyOn(pReadingModels.basic_model, 'findOne')
        // var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test",
                babyName: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162,
                start: 0,
                end: 1
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { }
        }

        var resSpy = spyOn(res, 'json')

        var result = Promise.resolve({
            time_of_reading_hours: null,
            time_of_reading_minute: null,
            reading_time: "test",
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            save: () => {
                return Promise.resolve({
                    baby_name: "test",
                    active_flag: 1
                })
            }
        })

        spy.andReturn(result)
        resSpy.andReturn({})

        patientController.updateBabyMedicalRecord(req, res, {})

        spy.plan().then((data) => {
            expect(data.reading_time).toBe("test")
            // expect(resSpy.wasCalled).toBe(true)
            done()
        })
        // done()
    });

    it("babyMedicalRecordCount test", (done) => {
        var spy = spyOn(sequelize, 'query')
        // var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "test"
            }
        }
        var req1 = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
            query: {
                searchText: "null"
            }
        }

        var res = {
            json: () => { }
        }
        var resSpy = spyOn(res, 'json')

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            total: 5,
            save: () => {
                return Promise.resolve("test")
            }
        }])
        spy.andReturn(result)
        // resSpy.andReturn({})
        patientController.babyMedicalRecordCount(req, res, {})
        expect(spy.wasCalled).toBe(true)
        done()
        patientController.babyMedicalRecordCount(req1, res, {})
        expect(spy.wasCalled).toBe(true)
        done()
    });

    it("scoreGeneratedReport test", (done) => {
        var spy = spyOn(sequelize, 'query')
        // var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162,
                start: 0,
                end: 1
            },
            query: {
                searchText: "test"
            }
        }

        var res = {
            json: () => { },
            setHeader: () => { },
        }
        var resSpy = spyOn(res, 'setHeader')

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            time_of_reading_hours: null,
            time_of_reading_minute: null,
            total: 5,
            save: () => {
                return Promise.resolve("test")
            }
        }])
        spy.andReturn(result)
        patientController.scoreGeneratedReport(req, res, {})
        expect(spy.wasCalled).toBe(true)
        done()
    });

    it("getGeneratedScrore test", (done) => {
        var spy = spyOn(sequelize, 'query')
        // var spy2 = spyOn(pReadingModels.patient_model, 'findOne')
        var req = {
            body: {
                name: "test"
            },
            params: {
                id: 123,
                hospitalId: 92,
                hospitalBranchRoleId: 162,
                start: 0,
                end: 1
            },
        }

        var res = {
            json: () => { },
            setHeader: () => { },
        }
        var resSpy = spyOn(res, 'json')

        var result = Promise.resolve([{
            studyId: 123,
            id: 123,
            baby_medical_record_number: 123,
            time_of_reading_hours: null,
            time_of_reading_minute: null,
            total: 5,
            save: () => {
                return Promise.resolve("test")
            }
        }])
        spy.andReturn(result)
        patientController.getGeneratedScrore(req, res, {})
        expect(spy.wasCalled).toBe(true)
        done()
    });

    // it('patientSignup method',(done)=>{
    //     var reqData = {
    //         body: {
    //             patient_first_name: "test",
    //             patient_last_name: "test",
    //             phone: "test",
    //             city: "test",
    //             state: "test",
    //             country: "test",
    //         },
    //     }
    //     let rules = {
    //         patient_first_name: 'required',
    //         patient_last_name: 'required',
    //         phone: 'required',
    //         city: 'required',
    //         state: 'required',
    //         country: 'required'
    //       };

    //     var res = {
    //         json: () => {  },

    //     }
    //       let validation = new Validator(reqData, rules);
    //        patientController.patientSignup(reqData,res,{});
    //     done();

    // })


    // // it('BabyCvAdd method', (done) => {
    // //     var spy = spyOn(pReadingModels.baby_cv_model, 'create');
    // //     var reqData = {
    // //         body: {
    // //             urine_output: "test",
    // //             baby_blood_pressure_mean_arterial_bp: "test",
    // //             baby_blood_pressure_upper_limb: "test",
    // //             baby_blood_pressure_lower_limb: "test",
    // //             capillary_refill: "test",
    // //             capillary_refill_unit: "test",
    // //             low_peripheral_pulse_volume: "test",
    // //             cool_peripheries: "test",
    // //             two_d_echo_done: "test",
    // //             two_d_echo_done_if_yes: "test",
    // //             baby_on_ionotropes: "test",
    // //             heart_rate: "test",
    // //             central_line: "test",
    // //             skin_pustules: "test",
    // //             infusion_of_blood_products: "test",
    // //             study_id: "1234",

    // //         },
    // //     }
    // //     let rules = {
    // //         study_id: 'required'
    // //     };

    // //     var res = {
    // //         json: () => { },

    // //     }
    // //     var result2 = Promise.resolve("test")

    // //     spy.andReturn(result2)
    // //     let validation = new Validator(reqData, rules);
    // //     patientController.BabyCvAdd(reqData, res, {});
    // //     spy.plan().then((data) => {
    // //         expect(data).toBe("test")
    // //         // done()

    // //     })
    // //     done();
    // // })
    // // it('BabyAppearAdd method', (done) => {
    // //     var spy = spyOn(pReadingModels.baby_appear_model, 'create');
    // //     var reqData = {
    // //         body: {
    // //             patient_first_name: "test",
    // //             patient_last_name: "test",
    // //             study_id: "1234"
    // //         },
    // //     }
    // //     let rules = {
    // //         study_id: 'required'
    // //     };

    // //     var res = {
    // //         json: () => { },
    // //     }
    // //     var result2 = Promise.resolve("test")
    // //     spy.andReturn(result2)
    // //     let validation = new Validator(reqData, rules);
    // //     patientController.BabyAppearAdd(reqData, res, {});
    // //     spy.plan().then((data) => {
    // //         expect(data).toBe("test")
    // //     })
    // //     done();
    // // })
    // // it('BabyRespAdd method', (done) => {
    // //     var spy = spyOn(pReadingModels.baby_resp_model, 'create');
    // //     var reqData = {
    // //         body: {
    // //             urine_output: "test",
    // //             baby_blood_pressure_mean_arterial_bp: "test",
    // //             baby_blood_pressure_upper_limb: "test",
    // //             baby_blood_pressure_lower_limb: "test",
    // //             capillary_refill: "test",
    // //             capillary_refill_unit: "test",
    // //             low_peripheral_pulse_volume: "test",
    // //             cool_peripheries: "test",
    // //             two_d_echo_done: "test",
    // //             two_d_echo_done_if_yes: "test",
    // //             baby_on_ionotropes: "test",
    // //             heart_rate: "test",
    // //             central_line: "test",
    // //             skin_pustules: "test",
    // //             infusion_of_blood_products: "test",
    // //             study_id: "1234",

    // //         },
    // //     }
    // //     let rules = {
    // //         study_id: 'required'
    // //     };

    // //     var res = {
    // //         json: () => { },

    // //     }
    // //     var result2 = Promise.resolve("test")

    // //     spy.andReturn(result2)
    // //     let validation = new Validator(reqData, rules);
    // //     patientController.BabyRespAdd(reqData, res, {});
    // //     spy.plan().then((data) => {
    // //         expect(data).toBe("test")
    // //     })
    // //     done();
    // // })
  
    // it('BabyBasicDupAdd method', (done) => {
    //     var spy = spyOn(pReadingModels.basic_model, 'create');
    //     var reqData = {
    //         body: {
    //             hospital_name: "test",
    //             hospital_branch_name: "test",
    //             baby_mother_medical_record_number: "test",
    //             baby_medical_record_number: "test",
    //             is_update: false
    //         },
    //         params:{
    //             hospital_id: "test",
    //         }
    //     }
    //     let rules = {
    //         baby_medical_record_number: 'required',
    //         baby_mother_medical_record_number: 'required'
    //         }        

    //     var res = {
    //         json: () => { },

    //     }
    //     var result2 = Promise.resolve("test")

    //     spy.andReturn(result2)
    //     let validation = new Validator(reqData, rules);
    //     patientController.BabyBasicDupAdd(reqData, res, {});
    //     spy.plan().then((data) => {
    //         expect(data).toBe("test")
    //     })
    //     done();
    // })
    it('GeneralAddByUid method', (done) => {
        var spy = spyOn(pReadingModels.general_model, 'findAll');
        var spy1 = spyOn(pReadingModels.general_model, 'create');

        var reqData = {
            body: {
                study_id:""
            },
            params:{
                hospital_id: "test",
            }
        }       

        var res = {
            json: () => { },

        }
        var result2 = Promise.resolve("test")
        spy.andReturn(result2)
      //  let validation = new Validator(reqData, rules);
        patientController.GeneralAddByUid(reqData, res, {});
        spy.plan().then((data) => {
            expect(data).toBe("test")
            // expect(spy1.wasCalled).toBe(true)
            done();
        })
        // done();
    })
    // // it('BabyCnsAdd method', (done) => {
    // //     var spy = spyOn(pReadingModels.baby_cns_model, 'create');
    // //     var reqData = {
    // //         body: {
    // //             patient_first_name: "test",
    // //             patient_last_name: "test",
    // //             study_id: "1234"
    // //         },
    // //     }
    // //     let rules = {
    // //         study_id: 'required'
    // //     };

    // //     var res = {
    // //         json: () => { },
    // //     }
    // //     var result2 = Promise.resolve("test")
    // //     spy.andReturn(result2)
    // //     let validation = new Validator(reqData, rules);
    // //     patientController.BabyCnsAdd(reqData, res, {});
    // //     spy.plan().then((data) => {
    // //         expect(data).toBe("test")
    // //     })
    // //     done();
    // // })
    // // it('BabyGitAdd method', (done) => {
    // //     var spy = spyOn(pReadingModels.baby_git_model, 'create');
    // //     var reqData = {
    // //         body: {
    // //             patient_first_name: "test",
    // //             patient_last_name: "test",
    // //             study_id: "1234"
    // //         },
    // //     }
    // //     let rules = {
    // //         study_id: 'required'
    // //     };

    // //     var res = {
    // //         json: () => { },
    // //     }
    // //     var result2 = Promise.resolve("test")
    // //     spy.andReturn(result2)
    // //     let validation = new Validator(reqData, rules);
    // //     patientController.BabyGitAdd(reqData, res, {});
    // //     spy.plan().then((data) => {
    // //         expect(data).toBe("test")
    // //     })
    // //     done();
    // // })
    // // it('BabyInvestAdd method', (done) => {
    // //     var spy = spyOn(pReadingModels.baby_investigation_model, 'create');
    // //     var reqData = {
    // //         body: {
    // //             patient_first_name: "test",
    // //             patient_last_name: "test",
    // //             study_id: "1234"
    // //         },
    // //     }
    // //     let rules = {
    // //         study_id: 'required'
    // //     };

    // //     var res = {
    // //         json: () => { },
    // //     }
    // //     var result2 = Promise.resolve("test")
    // //     spy.andReturn(result2)
    // //     let validation = new Validator(reqData, rules);
    // //     patientController.BabyInvestAdd(reqData, res, {});
    // //     spy.plan().then((data) => {
    // //         expect(data).toBe("test")
    // //     })
    // //     done();
    // // })
    // // it('BabyAntiBioticAdd method', (done) => {
    // //     var spy = spyOn(pReadingModels.baby_antibiotic_model, 'create');
    // //     var reqData = {
    // //         body: {
    // //             patient_first_name: "test",
    // //             patient_last_name: "test",
    // //             study_id: "1234"
    // //         },
    // //     }
    // //     let rules = {
    // //         study_id: 'required'
    // //     };

    // //     var res = {
    // //         json: () => { },
    // //     }
    // //     var result2 = Promise.resolve("test")
    // //     spy.andReturn(result2)
    // //     let validation = new Validator(reqData, rules);
    // //     patientController.BabyAntiBioticAdd(reqData, res, {});
    // //     spy.plan().then((data) => {
    // //         expect(data).toBe("test")
    // //     })
    // //     done();
    // // })
    // // it('BabyFinalAdd method', (done) => {
    // //     var spy = spyOn(pReadingModels.baby_final_model, 'create');
    // //     var reqData = {
    // //         body: {
    // //             patient_first_name: "test",
    // //             patient_last_name: "test",
    // //             study_id: "1234"
    // //         },
    // //     }
    // //     let rules = {
    // //         study_id: 'required'
    // //     };

    // //     var res = {
    // //         json: () => { },
    // //     }
    // //     var result2 = Promise.resolve("test")
    // //     spy.andReturn(result2)
    // //     let validation = new Validator(reqData, rules);
    // //     patientController.BabyFinalAdd(reqData, res, {});
    // //     spy.plan().then((data) => {
    // //         expect(data).toBe("test")
    // //     })
    // //     done();
    // // })
    it('BabyGetPatient method', (done) => {
        var spy = spyOn(pReadingModels.basic_model, 'findAll');
        var reqData = {
            body: {
                is_update: false,
                hospital_name:"test"
            },
        }
        var res = {
            json: () => { },
        }
        var result2 = Promise.resolve("test")
        spy.andReturn(result2)
        patientController.BabyGetPatient(reqData, res, {});
        spy.plan().then((data) => {
            expect(data).toBe("test")
        })
        done();
    })
    it('GetLevelById method', (done) => {
        var spy = spyOn(pReadingModels.patient_level_model, 'findOne');
        var reqData = {
            body: {
                hospital_name:"test"
            },
            params:{
                id:1
            }
        }
        var res = {
            json: () => { },
        }
        var result2 = Promise.resolve("test")
        spy.andReturn(result2)
        patientController.GetLevelById(reqData, res, {});
        spy.plan().then((data) => {
            expect(data).toBe("test")
        })
        done();
    })
    it('patientLike method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var reqData = {
            body: {
                hospital_name:"test",
                like:"",
                hospital_id:""
            },
            params:{
                id:1
            }
        }
        var res = {
            json: () => { },
        }
        var result2 = Promise.resolve("test")
        spy.andReturn(result2)
        patientController.patientLike(reqData, res, {});
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done();
        })
        
    })
    it('getPatientById method', (done) => {
        var spy = spyOn(pReadingModels.basic_model, 'findAll');
        var reqData = {
            body: {
               is_update:false
            },
            params:{
                id:123
            }
        }
        var res = {
            json: () => { },
        }
        var result2 = Promise.resolve("test")
        spy.andReturn(result2)
        patientController.getPatientById(reqData, res, {});
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done();
        })
        
    })
   
    it('MaternalAdd method', (done) => {
        var spy = spyOn(pReadingModels.maternal_model, 'create');
        var spy1=spyOn(pReadingModels.patient_model,'findOne')
        var reqData = {
            body: {
                patient_first_name: "test",
                patient_last_name: "test",
                study_id: "1234"
            },
            params:{
                uStaffId:""
            }
        }
        let rules = {
            study_id: 'required'
        };
    

        var res = {
            json: () => { },
        }
        var result2 = Promise.resolve("test")
        spy.andReturn(result2)
        spy1.andReturn(result2)
        let validation = new Validator(reqData, rules);
        patientController.MaternalAdd(reqData, res, {});
        spy.plan().then((data) => {
            expect(data).toBe("test");
            // expect(spy1.wasCalled).toBe(true)
            done();
        })
        
    })

      it('BasicAdd method', (done) => {
        var spy = spyOn(pReadingModels.maternal_model, 'create');
        var spy1=spyOn(pReadingModels.patient_model,'findOne')
        var reqData = {
            body: {
                id: "test",
                hospital_name: "test",
                hospital_branch_name: "1234",
                baby_mother_medical_record_number:"123",
                baby_medical_record_number:"777",
                is_update: false
            },
            params:{
                uStaffId:""
            }
        }
        let rules = {
            baby_medical_record_number: 'required',
            baby_mother_medical_record_number: 'required'
          };
    

        var res = {
            json: () => { },
        }
        var result2 = Promise.resolve("test")
        spy.andReturn(result2)
        let validation = new Validator(reqData, rules);
        patientController.BasicAdd(reqData, res, {});
        spy.plan().then((data) => {
            expect(data).toBe("test");
            // expect(spy.wasCalled).toBe(true)
            done();
        })
        
    })
})