const res = require('../../helper/res');

describe('res Helper testing', () => {
    it('resourceAlreadyExist test', (done) => {
        ans = {
            message: 'This Info already exists..',
            response: [],
            status: 409,
            error: true,
            success: false
        }
        var result = res.resourceAlreadyExist(message = 'This Info already exists..', response = [], status = 409, error = true, success = false);
       // console.log(result);
        // expect(res.resourceAlreadyExist(message = 'This Info already exists..', response = [], status = 409, error = true, success = false)).toBe(ans);
        done();
    })
    it('alreadyExist test', (done) => {
        ans = {
            message: 'This Info already exists..',
            response: [],
            status: 422,
            error: true,
            success: false
        }
        var result = res.alreadyExist(message = 'This Info already exists..', response = [], status = 422, error = true, success = false) ;
        //console.log(result);
        done();
    });
    it('serveError test', (done) => {
        ans = {
            message: 'internal server error.',
            response: [],
            status: 500,
            error: true,
            success: false
        }
        var result = res.serveError(message = 'internal server error.', response = [], status = 500, error = true, success = false);
        //console.log(result);
        done();
    })
    it('notFound test', (done) => {
        ans = {
            message: 'this is resource not found',
            response: [],
            status: 404,
            error: true,
            success: false
        }
        var result = res.notFound(message = 'this is resource not found', response = [], status = 404, error = true, success = false);
        //console.log(result);
        done();
    })
    it('success test', (done) => {
        ans = {
            message: 'success',
            response: [],
            status: 200,
            error: false,
            success: true
        }
        var result = res.success(message = 'success', response = [], status = 200, error = false, success = true);
        //console.log(result);
        done();
    })
    it('validationFails test', (done) => {
        ans = {
            message: 'validation fail',
            response: [],
            status: 404,
            error: true,
            success: false
        }
        var result = res.validationFails(message = 'validation fail', response = [], status = 200, error = true, success = false);
        //console.log(result);
        done();
    })
    it('failedAuthenticationToken test', (done) => {
        ans = {
            message: 'Failed to authenticate token',
            status: 500,
            auth: false,
        }
        var result = res.failedAuthenticationToken(message = 'Failed to authenticate token', status = 500,auth= false);
        //console.log(result);
        done();
    })
})