const queries=require('../../helper/queries/hospitalBranchContQueries');

describe('Hospital Branch Controller Queries',()=>{
    it('getHospitalBranches_searchTextNull test',(done)=>{
        var result=queries.HospitalBranchContQueries.getHospitalBranches_searchTextNull();
        expect(queries.HospitalBranchContQueries.getHospitalBranches_searchTextNull()).toBe(result);
        done();
    })

    it('getHospitalBranches_searchText test',(done)=>{
        var result=queries.HospitalBranchContQueries.getHospitalBranches_searchText();
        expect(queries.HospitalBranchContQueries.getHospitalBranches_searchText()).toBe(result);
        done();
    })
    it('getHopitalBranchRoles_query test',(done)=>{
        var result=queries.HospitalBranchContQueries.getHopitalBranchRoles_query();
        expect(queries.HospitalBranchContQueries.getHopitalBranchRoles_query()).toBe(result);
        done();
    })
    it('getHopitalBranchspecialities_query test',(done)=>{
        var result=queries.HospitalBranchContQueries.getHopitalBranchspecialities_query();
        expect(queries.HospitalBranchContQueries.getHopitalBranchspecialities_query()).toBe(result);
        done();
    })
    it('getHopitalBranchProfile_query test',(done)=>{
        var result=queries.HospitalBranchContQueries.getHopitalBranchProfile_query();
        expect(queries.HospitalBranchContQueries.getHopitalBranchProfile_query()).toBe(result);
        done();
    })
   
})