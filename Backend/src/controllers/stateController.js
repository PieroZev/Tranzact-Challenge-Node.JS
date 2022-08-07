const states = require('../data/states');
const appConfig = require('../config/app-config');

    exports.get = function(req, res){

        data = states;
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
    
    exports.post = function(req, res){
        //TODO IMPLEMENT POST
    }
    
    exports.put = function(req, res){
        //TODO IMPLEMENT PUT
    }
    
    exports.del = function(req, res){
        //TODO IMPLEMENT DELETE
    }