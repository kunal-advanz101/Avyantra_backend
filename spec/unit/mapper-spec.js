const mapper=require('../../mapper/mapper');

describe('Mapper test',() =>{
    it('babyBasicProfileMapper test',(done) =>{
        var req={
            body:{
                name:'test',
                hospital_id:'',
                hospital_name:'',
                hospital_branch_name:'',
                babyMedicalRecord:'',
                babyMotherMedicalRecord:'',
                is_update:''
            }
        }
        var result={

        }
        var ans =mapper.babyBasicProfileMapper(result,req);
        expect(mapper.babyBasicProfileMapper(result,req)).toBe(ans);
        done();
    })
    it('hospitalBranchSpecialityMapper test',(done) =>{
        var req={
            body:{
                speciality:'test'
            }
        }
        var result={  }
        var ans =mapper.hospitalBranchSpecialityMapper(result,req);
        expect(mapper.hospitalBranchSpecialityMapper(result,req)).toBe(ans);
        done();
    });
    it('staffUserMapper test',(done) =>{
        var req={
            body:{
                username:'test',
                password:'',
                email:'',
                contactNumber:''
            }
        }
        var result={

        }
        var ans =mapper.staffUserMapper(result,req);
        expect(mapper.staffUserMapper(result,req)).toBe(ans);
        done();
    });
    it('staff test',(done) =>{
        var req={
            body:{
                speciality:'test',
                assignRole:'',
                reportTo:'',
                firstName:'',
                lastName:''
            }
        }
        var staff={};
        var result={};
        var sResult={};
        var ans =mapper.staff(staff,result,req,sResult);
        expect(mapper.staff(staff,result,req,sResult)).toBe(ans);
        done();
    });
    it('staffHospitalMapper test',(done) =>{
        var req={
            body:{
                branch:'test',
            },
            params:{
                hospitalId:92
            }
        }
        var staff={};
        var result={};
        var ans =mapper.staffHospitalMapper(staff,result,req);
        expect(mapper.staffHospitalMapper(staff,result,req)).toBe(ans);
        done();
    });
    it('User test',(done) =>{
        var req={
            body:{
                address:'test',
                contactNumber:'',
                email:'',
                pincode:'',
                state:'',
                password:'',
                userName:''
            }
        }
        var User={};
        var ans =mapper.User(User,req);
        expect(mapper.User(User,req)).toBe(ans);
        done();
    });
    it('referralUserRegister test',(done) =>{
        var req={
            body:{
                address:'test',
                contactNumber:'',
                email:'',
                pincode:'',
                state:'',
                password:'',
                userName:''
            }
        }
        var User={};
        var ans =mapper.referralUserRegister(User,req);
        expect(mapper.referralUserRegister(User,req)).toBe(ans);
        done();
    });
    it('UnregisteredReferral test',(done) =>{
        var req={
            body:{
                speciality:'test',
                firstName:'',
                lastName:'',
            }
        }
        var referral={};
        var result={};
        var passcode={};
        var ans =mapper.UnregisteredReferral(referral,req,result,passcode);
        expect(mapper.UnregisteredReferral(referral,req,result,passcode)).toBe(ans);
        done();
    });
    it('RegisteredReferral test',(done) =>{
        var req={
            body:{
                speciality:'test',
                firstName:'',
                lastName:'',
            }
        }
        var referral={};
        var result={};
        var ans =mapper.RegisteredReferral(referral,req,result);
        expect(mapper.RegisteredReferral(referral,req,result)).toBe(ans);
        done();
    });
    it('ReferralHospital test',(done) =>{
        var req={
          params:{
            hospitalId:'',
            hospitalBranchId:''
          }
        }
        var referralHospital={};
        var result={};
        var ans =mapper.ReferralHospital(referralHospital,req,result);
        expect(mapper.ReferralHospital(referralHospital,req,result)).toBe(ans);
        done();
    });
    it('unRegisteredReferralHospital test',(done) =>{
        var req={
          params:{
            hospitalId:'',
            hospitalBranchId:''
          }
        }
        var referralHospital={};
        var result={};
        var passcode={};
        var ans =mapper.unRegisteredReferralHospital(referralHospital,req,result,passcode);
        expect(mapper.unRegisteredReferralHospital(referralHospital,req,result,passcode)).toBe(ans);
        done();
    });
    it('hospitalBranchRoleMapper test',(done) =>{
        var req={
          params:{
            hospitalId:'',
            hospitalBranchId:''
          },
          body:{
            role:''
          }
        }
        var roles={};
        var ans =mapper.hospitalBranchRoleMapper(roles,req);
        expect(mapper.hospitalBranchRoleMapper(roles,req)).toBe(ans);
        done();
    });
    it('hospBranchMapper test',(done) =>{
        var req={
          params:{
            hospitalId:'',
          },
          body:{
            name:'',
            contact_person:''
          }
        }
        var branch={};
        var result={};
        var ans =mapper.hospBranchMapper(branch,result,req);
        expect(mapper.hospBranchMapper(branch,result,req)).toBe(ans);
        done();
    });
    it('hospBranchUserMapper test',(done) =>{
        var req={
          params:{
            hospitalId:'',
          },
          body:{
            contact_number:'test',
            email:'',
            address:'',
            city:'',
            state:'',
            pin_code:'',
            user_name:'',
            password:''
          }
        }
        var branchUser={};
        var ans =mapper.hospBranchUserMapper(branchUser,req);
        expect(mapper.hospBranchUserMapper(branchUser,req)).toBe(ans);
        done();
    });
    it('branchRoleMapper test',(done) =>{
        var req={}
        var roles={};
        var result={};
        var ans =mapper.branchRoleMapper(roles,result);
        expect(mapper.branchRoleMapper(roles,result)).toBe(ans);
        done();
    });
    it('roleMapper test',(done) =>{
        var req={}
        var roles={};
        var ans =mapper.roleMapper(roles,req);
        expect(mapper.roleMapper(roles,req)).toBe(ans);
        done();
    });
    it('hospitalMapper test',(done) =>{
        var req={
          body:{
            hospital_name:''
          }
        }
        var hospital={};
        var ans =mapper.hospitalMapper(hospital,req);
        expect(mapper.hospitalMapper(hospital,req)).toBe(ans);
        done();
    });
    it('userMapper test',(done) =>{
        var req={
          body:{
            username:'',
            password:'',
            email:''
          }
        }
        var user={};
        var ans =mapper.userMapper(user,req);
        expect(mapper.userMapper(user,req)).toBe(ans);
        done();
    });
})