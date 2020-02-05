const util=require('../../helper/util');
const { sequelize } = require('../../sequelize')
const pReadingModels = require('../../sequelize')


describe('Util Helper',()=>{
    it('getRefferalInitiationStatusId test',(done)=>{
        expect(util.getRefferalInitiationStatusId('Request Initiation')).toBe(1);
        expect(util.getRefferalInitiationStatusId('Pending Initiation')).toBe(2);
        expect(util.getRefferalInitiationStatusId('Accept Initiation')).toBe(3);
        expect(util.getRefferalInitiationStatusId( 'Active' )).toBe(4);
        done();
    })
    it('getRequesterType test',(done)=>{
        expect(util.getRequesterType( 'Referral Doctor' )).toBe(5);
        expect(util.getRequesterType('Hospital')).toBe(2);
        done();
    });
    it('generatePasscode test',(done)=>{
        util.generatePasscode();
        done();
    })
    it('getStaffPermission test',(done)=>{
        let result={
            dataEntry_review_permission:'1'
        }
        let permissionResult={
            active_flag:'1'
        };
        var ans_1=util.getStaffPermission(1,result,permissionResult);
        expect(util.getStaffPermission(1,result,permissionResult)).toBe(ans_1)
        let result_1={
            scoreGenerate:'1'
        }
        let permissionResult_1={
            active_flag:'1'
        };
        var ans_2=util.getStaffPermission(2,result_1,permissionResult_1);
        expect(util.getStaffPermission(2,result_1,permissionResult_1)).toBe(ans_2)
        done();
    })
    it('isExistsWhere method',(done)=>{
       var spy=spyOn(sequelize,'query')
        let where_obj={
            hospital_id:92,
            baby_medical_record_number:101,
        }
        var res={
            json:()=>{}
        }
        var result=Promise.resolve('test');
        spy.andReturn(result)
        util.isExistsWhere(pReadingModels.basic_model, where_obj, res)
        spy.plan().then((data) => {
            expect(data).toBe("test")
          //  done()
        })
        done();
    })
    it('isExists method',(done)=>{
        var spy=spyOn(sequelize,'query')
        var reqData={
            phone:123456
        }
         var res={
             status:()=>{}
         }
         var result=Promise.resolve('test');
         spy.andReturn(result)
         util.isExists(pReadingModels.patient_model, 'phone', reqData.phone,res)
         spy.plan().then((data) => {
             expect(data).toBe("test")
           //  done()
         })
         done();
     })
})