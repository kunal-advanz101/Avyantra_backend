const HospitalStaffController = require('../../controllers/hospitalStaffController')
const pReadingModels = require('../../sequelize')
const { sequelize } = require('../../sequelize');
const multer = require('multer');


describe('Hospital Staff Controlloer', () => {
    it('getHospitalStaffRoles method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                name: 'test'
            },
            params: {
                hospitalId: 92
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")
        spy.andReturn(result)
        HospitalStaffController.getHospitalStaffRoles(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('getHospitalStaffSpecialities method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                name: 'test'
            },
            params: {
                hospitalId: 92
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getHospitalStaffSpecialities(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('getHospitalBranchesByHospitalId method', (done) => {
        var spy = spyOn(pReadingModels.hospital_branch_model, 'findAll');
        var req = {
            body: {
                name: 'test'
            },
            params: {
                hospitalId: 92
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getHospitalBranchesByHospitalId(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('downloadFile method', (done) => {
        var spy = spyOn(pReadingModels.referral_files_model, 'findAll');
        var req = {
            body: {
                name: 'test'
            },
            params: {
                fileId: 92
            }
        }
        var res = {
            json: () => { },
            download: () => { }
        }
        var spy2 = spyOn(res, 'download');

        var result = Promise.resolve([
            {
                filepath: 'test',
                filename: 'test'
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.downloadFile(req, res, {})
        spy.plan().then((data) => {
            expect(spy2.wasCalled).toBe(true)
            done()
        })

    })

    it('addStaff method', (done) => {
        var spy = spyOn(pReadingModels.user_model, 'findAll')
        var spy1 = spyOn(pReadingModels.user_model, 'create')
        var req = {
            body: {
                contactNumber: 1234567890,
                username: "test",
                email: "test@mail.com",
                branch: ["test"]
            },
            params: {
                hospitalId: 123
            }
        }
        var res = {
            json: () => { }
        }
        var result = Promise.resolve(["test"])
        spy.andReturn(result)
        HospitalStaffController.addStaff(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

        var result1 = Promise.resolve([])
        spy.andReturn(result1)
        spy1.andReturn(result)

        HospitalStaffController.addStaff(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(0)
            done()
        })


    })
    it('getStaffs method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var spy_1 = spyOn(pReadingModels.hospital_staff_model, 'findAll')
        var req = {
            body: {
                end: '123456789'
            },
            params: {
                hospitalId: 123,
                hospitalBranchId: 123,
                hospitalStaffFlag: 0,
                start: 0,
                end: 10
            },
            query: {
                searchText: "null"
            }
        }
        var req1 = {
            body: {
                end: '123456789'
            },
            params: {
                hospitalId: 123,
                hospitalBranchId: 123,
                hospitalStaffFlag: 0,
                start: 0,
                end: 10
            },
            query: {
                searchText: "test"
            }
        }
        var req2 = {
            body: {
                end: '123456789'
            },
            params: {
                hospitalId: 123,
                hospitalBranchId: 123,
                hospitalStaffFlag: 1,
                start: 0,
                end: 10
            },
            query: {
                searchText: "test"
            }
        }
        var req4 = {
            body: {
                end: '123456789'
            },
            params: {
                hospitalId: 123,
                hospitalBranchId: 123,
                hospitalStaffFlag: 1,
                start: 0,
                end: 10
            },
            query: {
                searchText: "null"
            }
        }
        var res = {
            json: () => { }
        }
        var result = Promise.resolve([{
            permission_id: "null",
            length: 1,
            dataEntry_review_permission: 0,
            hospital_branch_id: 123,
            staff_id: 123,
            dataEntry_review_permission: 0,
            scoreGenerate: 0
        }])
        spy_1.andReturn([{ permission_id: 0 }])
        spy.andReturn(result)
        HospitalStaffController.getStaffs(req, res, {})
        spy.plan().then((data) => {
            expect(spy_1.wasCalled).toBe(true)
            done()
        })
        HospitalStaffController.getStaffs(req1, res, {})
        spy.plan().then((data) => {
            expect(spy_1.wasCalled).toBe(true)
            done()
        })
        HospitalStaffController.getStaffs(req2, res, {})
        spy.plan().then((data) => {
            expect(spy_1.wasCalled).toBe(true)
            done()
        })
        HospitalStaffController.getStaffs(req4, res, {})
        spy.plan().then((data) => {
            expect(spy_1.wasCalled).toBe(true)
            done()
        })
    })
    it('getStaffCount method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                end: '123456789'
            },
            params: {
                hospitalStaffFlag: 0
            },
            query: {
                searchText: "null"
            }
        }
        var req1 = {
            body: {
                end: '123456789'
            },
            params: {
                hospitalStaffFlag: 0
            },
            query: {
                searchText: "test"
            }
        }
        var req2 = {
            body: {
                end: '123456789'
            },
            params: {
                hospitalStaffFlag: 1
            },
            query: {
                searchText: "test"
            }
        }
        var req4 = {
            body: {
                end: '123456789'
            },
            params: {
                hospitalStaffFlag: 1
            },
            query: {
                searchText: "null"
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getStaffCount(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        HospitalStaffController.getStaffCount(req1, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        HospitalStaffController.getStaffCount(req2, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        HospitalStaffController.getStaffCount(req4, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    // it('updateStaff method', (done) => {
    //     var spy = spyOn(pReadingModels.hospital_staff_model, 'findAll');
    //     var spy1 = spyOn(pReadingModels.staff_model, 'findByPk');
    //     var spy2 = spyOn(pReadingModels.user_model, 'findByPk');
    //     var req = {
    //         body: {
    //             contactNumber: 1234567809,
    //             status: 2,
    //             firstName: "testfirst",
    //             lastName: 'testLast',
    //             speciality: "doctosr",
    //             assignRole: "doc",
    //             branch: 1,
    //             reportTo: "rrrs"
    //         },
    //         params: {
    //             hospitalId: 92,
    //             staffId: 12
    //         }
    //     }
    //     var res = {
    //         json: () => { }
    //     }

    //     var result = Promise.resolve([{
    //         user_id:123,
    //         contact_number:1231231231,
    //         email_address:"test@gmil.com",
    //         user_name:"test",
    //         password:"test",
    //         active_flag:0,
    //         deleted_flag:1,
    //         save: ()=>{ }
    //     }])

    //     var result2 = Promise.resolve({
    //         user_id:123,
    //         contact_number:1231231231,
    //         email_address:"test@gmil.com",
    //         user_name:"test",
    //         password:"test",
    //         active_flag:0,
    //         deleted_flag:1,
    //         save: ()=>{ }
    //     })

    //     var r3 = Promise.resolve({
    //         contact_number:1231231231,
    //         email_address:"test@gmil.com",
    //         user_name:"test",
    //         password:"test",
    //         active_flag:0,
    //         deleted_flag:1,
    //         save: ()=>{ }
    //     })
    //     spy.andReturn(result)
    //     spy1.andReturn(result2)
    //     spy2.andReturn(r3)
    //     HospitalStaffController.updateStaff(req, res, {})
    //     spy.plan().then((data) => {
    //         expect(data.length).toBe(1)
    //         done()
    //     })
    //     // spy1.plan().then((data) => {
    //     //     expect(data.active_flag).toBe(1)
    //     //     done()
    //     // })

    // })
    it('updateStaffPermission method', (done) => {
        var spy = spyOn(pReadingModels.hospital_staff_model, 'findAll')
        var req = {
            body: {
                hospital_branch_id: 1,
                staff_id: 101,
                dataEntry_review_permission: 1,
                scoreGenerate: 1
            }
        }
        var res = {
            json: () => { }
        }
        var result = Promise.resolve()
        spy.andReturn(result)
        HospitalStaffController.updateStaffPermission(req, res, {})
        spy.plan().then((data) => {
            done()
        })


    })
    it('addReferralDoctor method', (done) => {
        var spy = spyOn(pReadingModels.user_model, 'findAll');
        var req = {
            body: {
                email: 'test@mail.com',
                contactNumber: 1223546546,
                staff_id: 12
            },
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.addReferralDoctor(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
    })
    it('getReferralOpinion method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                email: 'test@mail.com',
            },
            params: {
                studyId: 1
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getReferralOpinion(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('sendReferralOpinion method', (done) => {
        var spy = spyOn(pReadingModels.referral_opinion_model, 'create');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                staffReffHospId: 1
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.sendReferralOpinion(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })

    it('submitForReferralOpinion method', (done) => {
        var spy = spyOn(pReadingModels.staff_referral_hospital_model, 'create');
        var req = {
            body: {
                referral_id: [1],
                fileNames: ["TEST"]
            },
            params: {
                staffReffHospId: 1
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.submitForReferralOpinion(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })


    it('getReferralDetail method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                start: 1,
                end: 10,
                referralId: 101
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                staff_id: 123,
                hospital_branch_id: 123,
                study_id: 123,
                createdAt: new Date(),
                file: null,
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getReferralDetail(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('acceptRequest method', (done) => {
        var spy = spyOn(pReadingModels.referral_hospitals_model, 'findAll');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                passcode: 1,
            }
        }
        var res = {
            json: () => { },
            send: () => { }
        }

        var result = Promise.resolve([
            {
                user_id:123,
                is_read:1,
                createdAt:1,
                save: ()=>{}
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.acceptRequest(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getStaffBranches method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                staffId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                user_type: 'Hospital Staff'
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getStaffBranches(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

        result = Promise.resolve([
            {
                user_type: 'Hospital Staff',
                permission_id: 1
            }
        ])
        spy.andReturn(result)
        HospitalStaffController.getStaffBranches(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

        result = Promise.resolve([
            {
                user_type: 'Hospital Staff',
                permission_id: 2
            }
        ])
        spy.andReturn(result)
        HospitalStaffController.getStaffBranches(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

        result = Promise.resolve([
            {
                user_type: 'Hospital Staff',
                permission_id: 3
            }
        ])
        spy.andReturn(result)
        HospitalStaffController.getStaffBranches(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getReferralDashBoardDetail method', (done) => {
        var spy = spyOn(pReadingModels.referral_hospitals_model, 'findAll');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                referralId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getReferralDashBoardDetail(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('getDashBoardDetail method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                staffId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getDashBoardDetail(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('getRefferalSpeciality method', (done) => {
        var spy = spyOn(pReadingModels.speciality_model, 'findAll');
        var req = {
            body: {
                opinion: 'takecare',
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getRefferalSpeciality(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('getBranchStaff method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                hospitalBranchId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                user_id: 123,
                is_read: 1,
                createdAt: 1
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getBranchStaff(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getStaffReferral method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                staffId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                user_id: 123,
                is_read: 1,
                createdAt: 1
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getStaffReferral(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getConnectedStaff method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                staffId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                user_id: 123,
                is_read: 1,
                createdAt: 1
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getConnectedStaff(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getReferralConnectedStaff method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                referralId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                user_id: 123,
                is_read: 1,
                createdAt: 1
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getReferralConnectedStaff(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getRefferalStaff method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                userId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                user_id: 123,
                is_read: 1,
                createdAt: 1
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getRefferalStaff(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getStaffForMessageCenter method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            body: {
                opinion: 'takecare',
                prescription: "medicine"
            },
            params: {
                userId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                user_id: 123,
                is_read: 1,
                createdAt: 1
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getStaffForMessageCenter(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('updateRefferalInitiationStatus method', (done) => {
        var spy = spyOn(pReadingModels.referral_hospitals_model, 'create');
        var spy1 = spyOn(pReadingModels.referral_hospitals_model, 'findByPk')
        var req = {
            body: {
                requesterType: 'takecare',
                hospitalActionStatus: "1",
                referralActionStatus: "1",
                previousStatus: "1"
            },
            params: {
                hospitalId: 1,
                referralId: 12
            }
        }
        var req1 = {
            body: {
                requesterType: 'takecare',
                hospitalActionStatus: "1",
                referralActionStatus: "1",
                previousStatus: "2"
            },
            params: {
                hospitalId: 1,
                referralId: 12
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                user_id:123,
                is_read:1,
                createdAt:1
            }
        ])

        var result2 = Promise.resolve({
                save:()=>{}
            })


        spy.andReturn(result)
        spy1.andReturn(result2)
        HospitalStaffController.updateRefferalInitiationStatus(req, res, {})
        HospitalStaffController.updateRefferalInitiationStatus(req1, res, {})
        expect(spy1.wasCalled).toBe(true)
        done()

    })
    it('getReferralHospitalCount method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            query: {
                searchText: 'takecare',
            },
            params: {
                end: 10,
                start: 1
            }
        }
        var req1 = {
            query: {
                searchText: "null",
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                hospital_id: 123,
                user_id: 123,
                is_read: 1,
                createdAt: 1
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getReferralHospitalCount(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })
        HospitalStaffController.getReferralHospitalCount(req1, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getReferralHospital method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            query: {
                searchText: 'takecare',
            },
            params: {
                end: 10,
                start: 1
            }
        }
        var req1 = {
            query: {
                searchText: "null",
            },
            params: {
                end: 10,
                start: 1
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                hospital_id: 123,
                user_id: 123,
                is_read: 1,
                createdAt: 1
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getReferralHospital(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })
        HospitalStaffController.getReferralHospital(req1, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getReferralProfile method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            params: {
                referralId: 1,
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getReferralProfile(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('getReferralDoctorCount method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            params: {
                referralId: 1,
            },
            query: {
                searchText: "null"
            }
        }
        var req1 = {
            params: {
                referralId: 1,
            },
            query: {
                searchText: "text"
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getReferralDoctorCount(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        HospitalStaffController.getReferralDoctorCount(req1, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('registerReferralDoctor method', (done) => {
        var spy = spyOn(pReadingModels.user_model, 'findAll');
        var spy2 = spyOn(pReadingModels.user_model, 'create');
        var spy3 = spyOn(pReadingModels.referral_doctor_model, 'create');
        var req = {
            body: {
                address: "test",
                city: "test",
                contactNumber: "test",
                email: "test@gmail.com",
                pincode: "test",
                state: "test",
                user_type_id: "test",
                created_by: "test",
                deleted_flag: 0,
                active_flag: 1,
                parent_user_id: 123,
                password: "test",
                userName: "test",
            },
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([])

        spy.andReturn(result)
        spy2.andReturn(result)
        spy3.andReturn(result)
        HospitalStaffController.registerReferralDoctor(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(0)
            done()
        })


        var result2 = Promise.resolve([
            {
                contact_number: 1232342423,
                email_address: "test@gmail.com",
                user_name: "test"
            }
        ])

        spy.andReturn(result2)

        HospitalStaffController.registerReferralDoctor(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(1)
            done()
        })

    })
    it('getReferralDoctor method', (done) => {
        var spy = spyOn(pReadingModels.user_model, 'findAll');
        var req = {
            body: {
                contact_number: 'takecare',
                email_address: "medicine",
                user_name: "test"
            },
            params: {
                end: 10,
                start: 1,
                hospitalId: 10,
                hospitalBranchId: 12
            },
            query: {
                searchText: "null"
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve("test")

        spy.andReturn(result)
        HospitalStaffController.getReferralDoctor(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    })
    it('getStaffProfile method', (done) => {
        var spy = spyOn(sequelize, 'query');
        var req = {
            params: {
                staffId: 1
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve([
            {
                test: "test"
            }
        ])

        spy.andReturn(result)
        HospitalStaffController.getStaffProfile(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].test).toBe("test")
            done()
        })

    })
    it('updateStaffProfile method', (done) => {
        var spy = spyOn(pReadingModels.staff_model, 'findByPk')
        var spy1 = spyOn(pReadingModels.user_model, 'findByPk')

        var req = {
            body: {
                firstName: "testfirst",
                lastName: "testlast"
            },
            params: {
                staffId: 1
            }
        }
        var res = {
            json: () => { }
        }
        var result = Promise.resolve("test")

        spy.andReturn(result)

        HospitalStaffController.updateStaffProfile(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            //   expect(spy1.wasCalled).toBe(true)
            done()
        })


    })
    it('updateReferralProfile method', (done) => {
        var spy = spyOn(pReadingModels.referral_doctor_model, 'findByPk');
        var spy2 = spyOn(pReadingModels.user_model, 'findByPk');
        var spy3 = spyOn(pReadingModels.user_model, 'findAll');
        var req = {
            body: {
                firstName: 'test',
                lastName: "testlast",
                emailAddress: "test",
                contactNumber: 1234567890,
                userName: "test"
            },
            params: {
                referralId: 92
            }
        }
        var res = {
            json: () => { }
        }

        var result = Promise.resolve({
            test: "test",
            save: () => {
                return Promise.resolve({
                    user_id: 123
                })
            }
        })

        var r2 = Promise.resolve({
            user_id: 123,
            save: ()=>{}
        })
        var r3 = Promise.resolve([])

        spy.andReturn(result)
        spy2.andReturn(r2)
        spy3.andReturn(r3)
        HospitalStaffController.updateReferralProfile(req, res, {})
        spy.plan().then((data) => {
            expect(data.test).toBe("test")
            done()
        })

    })

})