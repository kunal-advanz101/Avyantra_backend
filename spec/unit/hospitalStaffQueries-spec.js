const queries=require('../../helper/queries/hospitalStaffContQueries');

describe('Hospital Staff Queries test',()=>{
    it('getHospitalStaffRoles_query',(done)=>{
        var result=queries.HospitalStaffQueries.getHospitalStaffRoles_query();
        expect(queries.HospitalStaffQueries.getHospitalStaffRoles_query()).toBe(result);
        done();
    })

    it('getHospitalStaffSpecialities_query',(done)=>{
        var result=queries.HospitalStaffQueries.getHospitalStaffSpecialities_query();
        expect(queries.HospitalStaffQueries.getHospitalStaffSpecialities_query()).toBe(result);
        done();
    })
    it('getReferralDoctor_searchTxtNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralDoctor_searchTxtNull(10,1);
        expect(queries.HospitalStaffQueries.getReferralDoctor_searchTxtNull(10,1)).toBe(result);
        done();
    })
    it('getReferralDoctor_NotNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralDoctor_NotNull();
        expect(queries.HospitalStaffQueries.getReferralDoctor_NotNull()).toBe(result);
        done();
    })
    it('getReferralDoctor_then_query',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralDoctor_then_query();
        expect(queries.HospitalStaffQueries.getReferralDoctor_then_query()).toBe(result);
        done();
    })
    it('getReferralDoctorCount_searchTxtNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralDoctorCount_searchTxtNull();
        expect(queries.HospitalStaffQueries.getReferralDoctorCount_searchTxtNull()).toBe(result);
        done();
    })
    it('getReferralDoctorCount_NotNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralDoctorCount_NotNull();
        expect(queries.HospitalStaffQueries.getReferralDoctorCount_NotNull()).toBe(result);
        done();
    })
    it('getStaffProfile_query',(done)=>{
        var result=queries.HospitalStaffQueries.getStaffProfile_query();
        expect(queries.HospitalStaffQueries.getStaffProfile_query()).toBe(result);
        done();
    })

    it('getStaffProfile_then_one_query',(done)=>{
        var result=queries.HospitalStaffQueries.getStaffProfile_then_one_query();
        expect(queries.HospitalStaffQueries.getStaffProfile_then_one_query()).toBe(result);
        done();
    })
    it('getStaffProfile_then_two_query',(done)=>{
        var result=queries.HospitalStaffQueries.getStaffProfile_then_two_query();
        expect(queries.HospitalStaffQueries.getStaffProfile_then_two_query()).toBe(result);
        done();
    })
    it('getReferralProfile_query',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralProfile_query();
        expect(queries.HospitalStaffQueries.getReferralProfile_query()).toBe(result);
        done();
    })
    it('getReferralHospital_searchTxtNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralHospital_searchTxtNull(10,1);
        expect(queries.HospitalStaffQueries.getReferralHospital_searchTxtNull(10,1)).toBe(result);
        done();
    })
    it('getReferralHospital_notNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralHospital_notNull();
        expect(queries.HospitalStaffQueries.getReferralHospital_notNull()).toBe(result);
        done();
    })
    it('getReferralHospital_result_query',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralHospital_result_query(100);
        expect(queries.HospitalStaffQueries.getReferralHospital_result_query(100)).toBe(result);
        done();
    })
    it('getReferralHospitalCount_searchTxtNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralHospitalCount_searchTxtNull();
        expect(queries.HospitalStaffQueries.getReferralHospitalCount_searchTxtNull()).toBe(result);
        done();
    })
    it('getReferralHospitalCount_notNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralHospitalCount_notNull();
        expect(queries.HospitalStaffQueries.getReferralHospitalCount_notNull()).toBe(result);
        done();
    })
    it('getReferralHospitalCount_notNull',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralHospitalCount_notNull();
        expect(queries.HospitalStaffQueries.getReferralHospitalCount_notNull()).toBe(result);
        done();
    })
    it('getStaffForMessageCenter_query',(done)=>{
        var result=queries.HospitalStaffQueries.getStaffForMessageCenter_query();
        expect(queries.HospitalStaffQueries.getStaffForMessageCenter_query()).toBe(result);
        done();
    })
    it('getRefferalStaff_query',(done)=>{
        var result=queries.HospitalStaffQueries.getRefferalStaff_query();
        expect(queries.HospitalStaffQueries.getRefferalStaff_query()).toBe(result);
        done();
    })
    it('getReferralConnectedStaff_ruser_query',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralConnectedStaff_ruser_query();
        expect(queries.HospitalStaffQueries.getReferralConnectedStaff_ruser_query()).toBe(result);
        done();
    })
    it('getReferralConnectedStaff_query',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralConnectedStaff_query();
        expect(queries.HospitalStaffQueries.getReferralConnectedStaff_query()).toBe(result);
        done();
    })
    it('getConnectedStaff_suser_query',(done)=>{
        var result=queries.HospitalStaffQueries.getConnectedStaff_suser_query();
        expect(queries.HospitalStaffQueries.getConnectedStaff_suser_query()).toBe(result);
        done();
    })
    it('getConnectedStaff_query',(done)=>{
        var result=queries.HospitalStaffQueries.getConnectedStaff_query();
        expect(queries.HospitalStaffQueries.getConnectedStaff_query()).toBe(result);
        done();
    })


    it('getStaffReferral_sUser_query',(done)=>{
        var result=queries.HospitalStaffQueries.getStaffReferral_sUser_query();
        expect(queries.HospitalStaffQueries.getStaffReferral_sUser_query()).toBe(result);
        done();
    })
    it('getStaffReferral_query',(done)=>{
        var result=queries.HospitalStaffQueries.getStaffReferral_query();
        expect(queries.HospitalStaffQueries.getStaffReferral_query()).toBe(result);
        done();
    })
    it('getBranchStaff_sUser_query',(done)=>{
        var result=queries.HospitalStaffQueries.getBranchStaff_sUser_query();
        expect(queries.HospitalStaffQueries.getBranchStaff_sUser_query()).toBe(result);
        done();
    })
    it('getBranchStaff_query',(done)=>{
        var result=queries.HospitalStaffQueries.getBranchStaff_query();
        expect(queries.HospitalStaffQueries.getBranchStaff_query()).toBe(result);
        done();
    })
    it('getDashBoardDetail_query',(done)=>{
        var result=queries.HospitalStaffQueries.getDashBoardDetail_query();
        expect(queries.HospitalStaffQueries.getDashBoardDetail_query()).toBe(result);
        done();
    })
    it('getReferralDetail_query',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralDetail_query(10,1);
        expect(queries.HospitalStaffQueries.getReferralDetail_query(10,1)).toBe(result);
        done();
    })


    it('getReferralDetail_then_query',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralDetail_then_query();
        expect(queries.HospitalStaffQueries.getReferralDetail_then_query()).toBe(result);
        done();
    })
    it('getStaffBranches_query',(done)=>{
        var result=queries.HospitalStaffQueries.getStaffBranches_query();
        expect(queries.HospitalStaffQueries.getStaffBranches_query()).toBe(result);
        done();
    })
    it('getReferralOpinion_query',(done)=>{
        var result=queries.HospitalStaffQueries.getReferralOpinion_query();
        expect(queries.HospitalStaffQueries.getReferralOpinion_query()).toBe(result);
        done();
    })
   
})