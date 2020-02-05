const queries=require('../../helper/queries/patientContQueries');

describe('Patient Controller queries test',()=>{
    it('getBabyAppearsModel_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyAppearsModel_query();
        expect(queries.PatientContQueries.getBabyAppearsModel_query()).toBe(result);
        done();
    })

    it('getBabyRespModel_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyRespModel_query();
        expect(queries.PatientContQueries.getBabyRespModel_query()).toBe(result);
        done();
    })
    it('getBabyCVModel_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyCVModel_query();
        expect(queries.PatientContQueries.getBabyCVModel_query()).toBe(result);
        done();
    })
    it('getBabyCNSModel_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyCNSModel_query();
        expect(queries.PatientContQueries.getBabyCNSModel_query()).toBe(result);
        done();
    })
    it('getBabyGITModel_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyGITModel_query();
        expect(queries.PatientContQueries.getBabyGITModel_query()).toBe(result);
        done();
    })
    it('getBabyInvestigationModel_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyInvestigationModel_query();
        expect(queries.PatientContQueries.getBabyInvestigationModel_query()).toBe(result);
        done();
    })
    it('getBabyAntibioticModel_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyAntibioticModel_query();
        expect(queries.PatientContQueries.getBabyAntibioticModel_query()).toBe(result);
        done();
    })
    it('getBabyFinalModel_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyFinalModel_query();
        expect(queries.PatientContQueries.getBabyFinalModel_query()).toBe(result);
        done();
    })
    it('searchReadingIdByStudyIdAndMrn_query test',(done)=>{
        var result=queries.PatientContQueries.searchReadingIdByStudyIdAndMrn_query();
        expect(queries.PatientContQueries.searchReadingIdByStudyIdAndMrn_query()).toBe(result);
        done();
    })
    it('generateReport_query test',(done)=>{
        var result=queries.PatientContQueries.generateReport_query();
        expect(queries.PatientContQueries.generateReport_query()).toBe(result);
        done();
    })
    it('getBabyMedicalRecord_searchTextNull test',(done)=>{
        var result=queries.PatientContQueries.getBabyMedicalRecord_searchTextNull(1,10,true);
        expect(queries.PatientContQueries.getBabyMedicalRecord_searchTextNull(1,10,true)).toBe(result);
        var result=queries.PatientContQueries.getBabyMedicalRecord_searchTextNull(1,10,false);
        expect(queries.PatientContQueries.getBabyMedicalRecord_searchTextNull(1,10,false)).toBe(result);
        done();
    })
    it('getBabyMedicalRecord_searchText test',(done)=>{
        var result=queries.PatientContQueries.getBabyMedicalRecord_searchText(1,10,1);
        expect(queries.PatientContQueries.getBabyMedicalRecord_searchText(1,10,1)).toBe(result);
        done();
    })
    it('getBabyMedicalRecord_query test',(done)=>{
        var result=queries.PatientContQueries.getBabyMedicalRecord_query();
        expect(queries.PatientContQueries.getBabyMedicalRecord_query()).toBe(result);
        done();
    })
    it('babyMedicalRecordCount_searchText test',(done)=>{
        var result=queries.PatientContQueries.babyMedicalRecordCount_searchText(1);
        expect(queries.PatientContQueries.babyMedicalRecordCount_searchText(1)).toBe(result);
        done();
    })
    it('babyMedicalRecordCount_searchTextNull test',(done)=>{
        var result=queries.PatientContQueries.babyMedicalRecordCount_searchTextNull(1);
        expect(queries.PatientContQueries.babyMedicalRecordCount_searchTextNull(1)).toBe(result);
        done();
    })
   
    it('scoreGeneratedReport_query test',(done)=>{
        var result=queries.PatientContQueries.scoreGeneratedReport_query(1,101);
        expect(queries.PatientContQueries.scoreGeneratedReport_query(1,101)).toBe(result);
        done();
    })
})