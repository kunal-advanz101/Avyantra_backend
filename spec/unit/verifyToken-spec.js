const config = require('../../config/jwtConfig');
const jwt = require('jsonwebtoken');
const token=require('../../auth/verifyToken');

describe('auth testing',()=>{
    it('verify token method',(done)=>{
        var spy=spyOn(jwt,'verify')
        var req={
            headers:{
                'x-access-token':""
            }
        }
        var decoded={
            id:1
        }
        var res = {
            json:() =>{}
        }
        token(req,res,{});
        expect(spy.wasCalled).toBe(true)
        done();
    })
})