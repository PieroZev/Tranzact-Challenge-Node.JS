const http = require("http");
const appConfig = require('../config/app-config');
const periods = require('../controllers/periodController');
const plans = require('../controllers/planController');
const states = require('../controllers/stateController');
const premium = require('../controllers/premiumController');

exports.start = () =>{
        let port = appConfig.port;

        http.createServer(async(req, res) =>{
            
            enableCORS(req, res);
            switch(req.method){
                case "GET":
                    if(req.url === "/") res.end();
                    if(req.url === appConfig.urlPeriods) periods.get(req, res);
                    if(req.url === appConfig.urlPlans) plans.get(req, res);
                    if(req.url === appConfig.urlStates) states.get(req, res);
                    else sendPageNotFound(req, res);
                    break;
                case "POST":
                    if(req.url === "/") res.end();
                    if(req.url === appConfig.urlPremium) premium.post(req, res);
                    else sendPageNotFound(req, res);
                    break;
                case "PUT":
                    sendPageNotFound(req, res);
                    break;
                case "DELETE":
                    sendPageNotFound(req, res);
                    break;
                default: sendPageNotFound(req, res);
                    break;    
            }

        }).listen(port, () =>{
            console.log(appConfig.stringPort + port);
        });
        
}

var enableCORS = (req, res)=>{

    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

var sendPageNotFound = (req, res)=>{

    /* res.writeHead(404, appConfig.getResources(req, res).notFound);
    res.write(appConfig.getResources(req, res).notFoundBody); */
    res.end();
}