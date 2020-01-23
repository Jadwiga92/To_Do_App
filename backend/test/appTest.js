const app = require("../index");
const task = require ('../routes/tasks');
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Server!", () => {
    it("welcomes user to the api", done => {
        chai
            .request(task)
        .get("/")
        .end((err,res)=>{
            expect(res).to.have.status(200);
            done()
        })
        })
    });

it("post task to database", done=>{
    chai.request(task)
        .post("/")
        .send({user_id:1, status: "to_do", description:"some task that needs to be done by monday"})
        .end((err,res)=>{
            expect(res).to.have.status(200);
        })

    });
