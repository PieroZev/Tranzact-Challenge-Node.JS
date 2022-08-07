const periods = require('../data/period');
const appConfig = require('../config/app-config');

    exports.get = (req, res) =>{

        data = periods;
        if(!data){
                res.writeHead(500, appConfig.getResources(req, res).headerError, {"Content-Type":"text/html"});
                res.write(appConfig.getResources(req, res).bodyError);
            }
        else{
                res.writeHead(200, {"Content-Type":"application/json"});
                res.write(JSON.stringify(data));
            }
        res.end();
    }
    
    exports.post = (req, res) =>{
        //TODO IMPLEMENT POST
    }
    
    exports.put = (req, res) =>{
        //TODO IMPLEMENT PUT
    }
    
    exports.del = (req, res) =>{
        //TODO IMPLEMENT DELETE
    }