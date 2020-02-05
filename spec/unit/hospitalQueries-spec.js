const queries= require('../../helper/queries/hospitalContQueries');

describe('Hospital Controller Queries',()=>{
    it('getRegisteredRefferal_searchTextNull test',(done)=>{
        let end={};
        let start={};
        var result=queries.HospitalContQueries.getRegisteredRefferal_searchTextNull(10,1);
        expect(queries.HospitalContQueries.getRegisteredRefferal_searchTextNull(10,1)).toBe(result);
     done();
    })
    it('getHospitalProfile_query test',(done)=>{
        var result=queries.HospitalContQueries.getHospitalProfile_query();
        expect(queries.HospitalContQueries.getHospitalProfile_query()).toBe(result);
     done();
    })
    it('getRegisteredRefferal_searchText test',(done)=>{
        let searchText='test'
        var result=queries.HospitalContQueries.getRegisteredRefferal_searchText(searchText);
        expect(queries.HospitalContQueries.getRegisteredRefferal_searchText(searchText)).toBe(result);
     done();
    }) 
    it('getRegisteredRefferal_mQuery test',(done)=>{
        let referralIds=12
        var result=queries.HospitalContQueries.getRegisteredRefferal_mQuery(referralIds);
        expect(queries.HospitalContQueries.getRegisteredRefferal_mQuery(referralIds)).toBe(result);
     done();
    }) 
    it('getRefferalCount_searchTextNull test',(done)=>{
        var result=queries.HospitalContQueries.getRefferalCount_searchTextNull();
        expect(queries.HospitalContQueries.getRefferalCount_searchTextNull()).toBe(result);
     done();
    })
     it('getRefferalCount_searchText test',(done)=>{
        var result=queries.HospitalContQueries.getRefferalCount_searchText();
        expect(queries.HospitalContQueries.getRefferalCount_searchText()).toBe(result);
     done();
    })
    it('getStaffAdmin_m_staffs test',(done)=>{
        var result=queries.HospitalContQueries.getStaffAdmin_m_staffs();
        expect(queries.HospitalContQueries.getStaffAdmin_m_staffs()).toBe(result);
     done();
    }) 
    it('getDashBoardDetail_getStaffQuery test',(done)=>{
        let userType='test'
        var result=queries.HospitalContQueries.getDashBoardDetail_getStaffQuery(userType);
        expect(queries.HospitalContQueries.getDashBoardDetail_getStaffQuery(userType)).toBe(result);
     done();
    }) 
    it('getDashBoardDetail_getReferralQuery test',(done)=>{
        var result=queries.HospitalContQueries.getDashBoardDetail_getReferralQuery();
        expect(queries.HospitalContQueries.getDashBoardDetail_getReferralQuery()).toBe(result);
     done();
    }) 
    it('getStaffAdmin_map_staff_hospitals test',(done)=>{
        var result=queries.HospitalContQueries.getStaffAdmin_map_staff_hospitals();
        expect(queries.HospitalContQueries.getStaffAdmin_map_staff_hospitals()).toBe(result);
     done();
    }) 
    it('getStaffAdmin_map_staff_hospitals_two test',(done)=>{
        var result=queries.HospitalContQueries.getStaffAdmin_map_staff_hospitals_two();
        expect(queries.HospitalContQueries.getStaffAdmin_map_staff_hospitals_two()).toBe(result);
     done();
    }) 

    it('getMessage_query test',(done)=>{
        let senderId=10
        let receiverId=10
        var result=queries.HospitalContQueries.getMessage_query(senderId,receiverId);
        expect(queries.HospitalContQueries.getMessage_query(senderId,receiverId)).toBe(result);
     done();
    })
    it('getReferralAdmin_m_referral_doctors test',(done)=>{
        var result=queries.HospitalContQueries.getReferralAdmin_m_referral_doctors();
        expect(queries.HospitalContQueries.getReferralAdmin_m_referral_doctors()).toBe(result);
     done();
    })
    it('getReferralAdmin_map_referral_hospitals test',(done)=>{
        let end={};
        let start={};
        var result=queries.HospitalContQueries.getReferralAdmin_map_referral_hospitals();
        expect(queries.HospitalContQueries.getReferralAdmin_map_referral_hospitals()).toBe(result);
     done();
    })
    it('getReferralAdmin_map_referral_hospitals_two test',(done)=>{
        var result=queries.HospitalContQueries.getReferralAdmin_map_referral_hospitals_two();
        expect(queries.HospitalContQueries.getReferralAdmin_map_referral_hospitals_two()).toBe(result);
     done();
    })


    it('getDashBoardDetail_hquery test',(done)=>{
        let hospitalId=100;
        var result=queries.HospitalContQueries.getDashBoardDetail_hquery(hospitalId);
        expect(queries.HospitalContQueries.getDashBoardDetail_hquery(hospitalId)).toBe(result);
     done();
    })
    it('getDashBoardDetail_hbquery test',(done)=>{
        let hospitalBranchId=101;
        var result=queries.HospitalContQueries.getDashBoardDetail_hbquery(hospitalBranchId);
        expect(queries.HospitalContQueries.getDashBoardDetail_hbquery(hospitalBranchId)).toBe(result);
     done();
    })
    it('getDashBoardDetail_rquery test',(done)=>{
        var result=queries.HospitalContQueries.getDashBoardDetail_rquery();
        expect(queries.HospitalContQueries.getDashBoardDetail_rquery()).toBe(result);
     done();
    })
    it('getRegisterRefferalCount_query test',(done)=>{
        var result=queries.HospitalContQueries.getRegisterRefferalCount_query();
        expect(queries.HospitalContQueries.getRegisterRefferalCount_query()).toBe(result);
     done();
    })
    it('getAllReferralDoctors_query test',(done)=>{
        var result=queries.HospitalContQueries.getAllReferralDoctors_query();
        expect(queries.HospitalContQueries.getAllReferralDoctors_query()).toBe(result);
     done();
    })
})