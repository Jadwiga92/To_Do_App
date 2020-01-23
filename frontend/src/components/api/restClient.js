import axios from "axios";
// create creates instance of axios client with a few default properties
const tokenProvider = require('axios-token-interceptor');


let instance = axios.create({
    baseURL:'http://localhost:3001',


});

instance.interceptors.request.use(function (config) {
 const token =localStorage.getItem('token');
 if(token!=null){
     config.headers['x-auth'] =  token;
 }

    return config;
});


export default instance;