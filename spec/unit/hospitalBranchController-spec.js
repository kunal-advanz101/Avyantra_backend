const pReadingModels = require('../../sequelize')
const hospitalBranchController = require('../../controllers/hospitalBranchController')
const { sequelize } = require('../../sequelize')




describe('hospitalBranchController', () => {

    it("getHopitalBranchRoles test", (done) => {
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
        hospitalBranchController.getHopitalBranchRoles(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    });

    it("removeRole test", (done) => {
        var spy = spyOn(pReadingModels.hospital_branch_roles_model, 'findByPk')
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
        var result = Promise.resolve({
            destroy: () => {
                return Promise.resolve("test")
            }
        })
        spy.andReturn(result)
        hospitalBranchController.removeRole(req, res, {})
        spy.plan().then((data) => {
            // expect(data).toBe("test")
            data.destroy().then((dt) => {
                expect(dt).toBe("test")
                done()
            })
        })

    });

    
    it("registerHospitalBranch test", (done) => {
        var spy = spyOn(pReadingModels.user_model, 'findAll')
        var spy1 = spyOn(pReadingModels.user_model, 'create')
        var spy2 = spyOn(pReadingModels.hospital_branch_model, 'create')
        var spy3 = spyOn(pReadingModels.speciality_model, 'findAll')

        var req = {
            body: {
                name: "test",
                user_name:"testuser",
                contact_number:'test'
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
        // var result = Promise.resolve([{
        //     "test": "test",
        //     m_hospitals_branch: {
        //         branch_name: "test"
        //     }
        // }])

        var result = Promise.resolve([
            {
                contact_number:1234567890,
                m_hospitals_branch: {branch_name:"test"},
                user_name:"test"
            }
        ])

        // var result = [
        //     {
        //         contact_number:1234567890,
        //         m_hospitals_branch: {branch_name:"test"},
        //         user_name:"test"
        //     }
        // ]

        spy.andReturn(result)
        hospitalBranchController.registerHospitalBranch(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].user_name).toBe("test")
            done()
        })
        

        var result2 = Promise.resolve([])
        var resSpy = Promise.resolve([])
        var resSpy2 = Promise.resolve([])
        var resSpy3 = Promise.resolve([])
        spy.andReturn(result2)
        spy1.andReturn(resSpy)
        spy2.andReturn(resSpy2)
        spy3.andReturn(resSpy3)
        hospitalBranchController.registerHospitalBranch(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(0)
            spy1.plan().then((data) => {
                expect(data.length).toBe(0)
                spy2.plan().then((data) => {
                    expect(data.length).toBe(0)
                    spy3.plan().then((data) => {
                        expect(data.length).toBe(0)
                        done()
                    })
                    done()
                })
                done()
            })
            done()
        })
        
    });

    it("getHospitalBranches test", (done) => {
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
        var req1 = {
            body: {
                name: "test"
            },
            params: {
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
        var result = Promise.resolve("test")
        spy.andReturn(result)
        hospitalBranchController.getHospitalBranches(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        hospitalBranchController.getHospitalBranches(req1, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    });


    it("addRole test", (done) => {
        var spy = spyOn(pReadingModels.role_model, 'findAll')
        var spy1=spyOn(pReadingModels.hospital_branch_roles_model,'findAll')
        var spy2=spyOn(pReadingModels.role_model,'create')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
        }

        var res = {
            json: () => { }
        }
        var result = Promise.resolve(["test"])
        spy.andReturn(result)
        spy1.andReturn(result)
        hospitalBranchController.addRole(req, res, {})
        spy.plan().then((data) => {
            expect(data[0]).toBe("test")
            expect(spy1.wasCalled).toBe(true)
            done()
        })

        var result2 = Promise.resolve([])
        spy.andReturn(result2)
        spy1.andReturn(result2)
        hospitalBranchController.addRole(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(0)
            expect(spy1.wasCalled).toBe(true)
            done()
        })

        var result3 = Promise.resolve([])
        spy2.andReturn(result3)
        hospitalBranchController.addRole(req, res, {})
        spy.plan().then((data) => {
            expect(data.length).toBe(0)
            // expect(spy1.wasCalled).toBe(true)
            done()
        })

    });

    it("updateHospitalBrancheRoles test", (done) => {
        var spy = spyOn(pReadingModels.hospital_branch_roles_model, 'findByPk')
        var spy1=spyOn(pReadingModels.role_model,'create')
        var spy2=spyOn(pReadingModels.hospital_branch_roles_model,'create')
        var req = {
            body: {
                name: "test",
                role:"doctor"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
        }

        var res = {
            json: () => { }
        }
        var result2 = Promise.resolve({
            test:"test",
            save:()=>{}
        })

        spy.andReturn(result2)
        spy1.andReturn(result2)
        spy2.andReturn(result2)

        hospitalBranchController.updateHospitalBrancheRoles(req, res, {})
        spy.plan().then((data) => {
            expect(data.test).toBe("test")
            done()
        })
        spy1.plan().then((data) => {
            expect(data.test).toBe("test")
            expect(spy2.wasCalled).toBe(true);
            done()
        })


    });

    it("addSpeciality test", (done) => {
        var spy = spyOn(pReadingModels.speciality_model, 'findAll')
        var spy1=spyOn(pReadingModels.hospital_branch_speciality_model,'findAll')
        var spy2=spyOn(pReadingModels.speciality_model,'create')

        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchRoleId: 162
            },
        }

        var res = {
            json: () => { }
        }
        var result = Promise.resolve([{
                id: 123,
                save: () => {
                   return Promise.resolve("test")
                 }
        }])
        var result3=Promise.resolve([])
        spy.andReturn(result)
        spy1.andReturn(result3)
        
        hospitalBranchController.addSpeciality(req, res, {})
        spy.plan().then((data) => {
            expect(data[0].id).toBe(123)
            expect(spy1.wasCalled).toBe(true)
            done()
        })

        var result2 = Promise.resolve([])
        var resultSpy = Promise.resolve(["test"])

        spy.andReturn(result2)
        spy2.andReturn(resultSpy)
        hospitalBranchController.addSpeciality(req, res, {})
        spy.plan().then((data) => {
            expect(spy2.wasCalled).toBe(true)
            expect(data.length).toBe(0)
            done()
        })


    });


    it("getHopitalBranchspecialities test", (done) => {
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
        hospitalBranchController.getHopitalBranchspecialities(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    });

    it("removeSpeciality test", (done) => {
        var spy = spyOn(pReadingModels.hospital_branch_speciality_model, 'findByPk')
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
        var result = Promise.resolve({
            destroy: () => {
                return Promise.resolve("test")
            }
        })
        spy.andReturn(result)
        hospitalBranchController.removeSpeciality(req, res, {})
        spy.plan().then((data) => {
            // expect(data).toBe("test")
            data.destroy().then((dt) => {
                expect(dt).toBe("test")
                done()
            })
        })

    });


    it("updateHospitalBrancheSpecialities test", (done) => {
        var spy = spyOn(pReadingModels.hospital_branch_speciality_model, 'findByPk')
        var spy1=spyOn(pReadingModels.speciality_model,'create')
        var spy2=spyOn(pReadingModels.hospital_branch_speciality_model,'create')
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
        var result = Promise.resolve({
            "test":"test",
            save:()=>{}
        })
        spy.andReturn(result)
        spy1.andReturn(result)
        spy2.andReturn(result)

        hospitalBranchController.updateHospitalBrancheSpecialities(req, res, {})
        spy.plan().then((data) => {
            expect(data.test).toBe("test")
            done()
        })
        spy1.plan().then((data) => {
            expect(data.test).toBe("test")
            expect(spy2.wasCalled).toBe(true)
            done()
        })
    });

    it("getHopitalBranchProfile test", (done) => {
        var spy = spyOn(sequelize, 'query')
        var req = {
            body: {
                name: "test"
            },
            params: {
                hospitalId: 92,
                hospitalBranchId: 162
            },
        }

        var res = {
            json: () => { }
        }
        var result = Promise.resolve("test")
        spy.andReturn(result)
        hospitalBranchController.getHopitalBranchProfile(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })

    });

    it("updateHopitalBranchProfile test", (done) => {
        var spy = spyOn(pReadingModels.hospital_branch_model, 'findByPk')
        var spy2 = spyOn(pReadingModels.user_model, 'findByPk')
        var spy3 = spyOn(pReadingModels.user_model, 'findAll')

        var req = {
            body: {
                name: "test",
                userName:'test'
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
        var result = Promise.resolve({
            save: () => {
                return Promise.resolve("test")
            }
        })

        var result2 = Promise.resolve({
            user_id:123,
            save: () => {
                return Promise.resolve("test")
            }
        })

        var resSpy = Promise.resolve([])
        

        spy.andReturn(result)
        spy2.andReturn(result2)
        spy3.andReturn(resSpy)
        hospitalBranchController.updateHopitalBranchProfile(req, res, {})

        spy.plan().then((data) => {
            
            data.save().then((dt) => {
                expect(dt).toBe("test")
            })
            done()
        })
        spy2.plan().then((data)=>{
            expect(data.user_id).toBe(123)
            
            done()
        })
        

        // var resSpy2 = Promise.resolve([])
        // hospitalBranchController.updateHopitalBranchProfile(req, res, {})
        // spy3.andReturn(resSpy2)
        // spy2.plan().then((data)=>{
        //     expect(data.user_id).toBe(123)
            
        //     done()
        // })
        

    });

})