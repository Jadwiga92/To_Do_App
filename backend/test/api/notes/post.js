const expect = require('chai').expect;
const request = require ('supertest');
const app = require ('../../../index');
const login = require ('../../../routes/login');
const task = require('../../../routes/tasks')



describe('POST /notes', ()=>{
before((done)=>{
    app.connect()
        .then(()=> done())
        .catch((err)=> done (err))
})

    it('OK creating a new note works', (done)=>{
        request(task).post('/notes')
            .send({user_id:1, status: "to_do", description:"some task that needs to be done by monday"})
            .then((res)=>{
                const body= res.body;
                expect(body).to.contain.property('id');
                expect(body).to.contain.property('user_id');
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('description');
                expect(body).to.contain.property('created_at');
                done();

            })
            .catch((err)=>done (err))
    })
} );