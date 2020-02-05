// const loginUser=require('../../routes/loginUser');
const userController=require('../../controllers/userController');
const pReadingModels = require('../../sequelize')
const { sequelize } = require('../../sequelize')
const nodeMailer = require('nodemailer');
let Validator = require('validatorjs');



describe('UserController test',()=>{
    it('resetPassword',(done)=>{
        var spy = spyOn(pReadingModels.user_model, 'findOne')
        var req = {
            body: {
                passcode: 12345,
                password:"test123",
                active_flag:1
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
            "password":"test123",
             save: () => { }

        })

        spy.andReturn(result)
        userController.resetPassword(req, res, {})
        spy.plan().then((data) => {
            expect(data.password).toBe(req.body.password)
            done();
        })
        

    });

    it('forgetPassword',(done)=>{
        var spy = spyOn(pReadingModels.user_model, 'findOne');
      
        var req = {
            body: {
                email:"test@gmail.com"
            },
        }
        // let transporter = nodeMailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //       user:'test@mail.com',
        //       pass: '34567454543'
        //     }
        //   })
        //   var spy1=spyOn(transporter,'sendMail')
        var res = {
            json: () => { }
        }

        var result = Promise.resolve({
            passcode:"test"
        })

        spy.andReturn(result)
        userController.forgetPassword(req, res, {})
        spy.plan().then((data) => {
            expect(data.passcode).toBe("test")
            done()
        })
        // spy1.andReturn(result)
        // userController.forgetPassword(req,res,{})
        // spy1.plan().then((data)=>{
        //     expect(data.passcode).toBe('test')
        //     done();
        // })
        var result1=Promise.resolve("test")
        spy.andReturn(result1)
        userController.forgetPassword(req, res, {})
        spy.plan().then((data) => {
            expect(data).toBe("test")
            done()
        })
        
        // transporter.sendMail('meassge',()=>{})
        // done();
    });

    // iit('signup method',(done)=>{
    //     var req = {
    //         body: {
    //             email:"test@gmail.com",
    //             username:"test",
    //             password:"test",
    //             hospital_name:"test",
    //             hospital_branch_name:"test",
    //             user_type:"Hospital"
    //         },
    //     }
    //     var res = {
    //         json: () => { return "test"}
    //     }
    //     var spy = spyOn(res, 'json');
    //     userController.signup(req, res, {})
    //     var result1="test"
    //     spy.andReturn(result1)

    //     spy.plan().then((data) => {
    //         expect(data).toBe("test")
    //         done()
    //     })


    // });

    // it('login',(done)=>{
    //     var spy = spyOn(pReadingModels.user_model, 'findOne')
    //     var spy2 = spyOn(pReadingModels.user_type_model, 'findOne')
    //     var req = {
    //         body: {
    //             username: "testuser",
    //             password:"1234"
    //         },
    //     }
      
    //     var res = {
    //         json: () => { }
    //     }

    //     var result = Promise.resolve({
    //         user_name:"test",
    //         email_address:"test@gmail.com",
    //         user_type_id:2,
    //         user_type:"hospital",
    //         user_id:123
    //     })

    //     spy.andReturn(result)
    //     spy2.andReturn(result)
    //     userController.login(req, res, {})
    //     spy.plan().then((data) => {
    //         spy2.plan().then((data) => {
    //             expect(data.user_type_id).toBe(2)
    //             done();
    //         })
    //         expect(data.user_type_id).toBe(2)
    //         done();
    //     })
        

    // });
  
})