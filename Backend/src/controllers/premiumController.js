const carriers = require('../data/carriers');
const plans = require('../data/plan');
const states = require('../data/states');
const months = require('../data/months');
const appConfig = require('../config/app-config');
var premiumPrice = new Array();

    exports.get = (req, res) =>{
    //TODO IMPLEMENT GET

    }
    
    exports.post = async(req, res) =>{

        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        const data = Buffer.concat(buffers).toString();

        var body = new Object();

        try{
            body.birthDate = data.split("&")[0].split("=")[1];
            body.state = data.split("&")[1].split("=")[1].split("+")[0] + " " + data.split("&")[1].split("=")[1].split("+")[1];
            body.age = data.split("&")[2].split("=")[1];
            body.plan = data.split("&")[3].split("=")[1];
        }catch(e){
            body = JSON.parse(data);
        }
        

        try{
            var birthDate = new Date(body.birthDate);
            var month = birthDate.getMonth();
            var calculatedAge = Math.round(calculateAge(birthDate));
            if(calculatedAge === parseInt(body.age)){
                calculatePremium(body, month);
                verifyPrice(req, res);
            }
             else throw appConfig.stringDOB;  
        
        }catch(e){
            console.log(appConfig.stringError, e);
            res.writeHead(500, appConfig.getResources(req, res).headerError, {"Content-Type":"text/html"});
            res.write(appConfig.getResources(req, res).bodyError);
            res.end();
        }
    }
    
    exports.put = (req, res) =>{
        //TODO IMPLEMENT PUT
    }
    
    exports.del = (req, res) =>{
        //TODO IMPLEMENT DELETE
    }

    var verifyPrice = (req, res)=>{
        try{
            if(premiumPrice === null || premiumPrice === undefined){
                console.log(appConfig.empty);
                res.writeHead(500, appConfig.getResources(req, res).headerError, {"Content-Type":"text/html"});
                res.write(appConfig.getResources(req, res).bodyError);
            }
            else {
                console.log(appConfig.sent);
                res.writeHead(200, {"Content-Type":"application/json"});
                res.write(JSON.stringify(premiumPrice));
            }
            res.end();
        }catch(e){
            console.log(appConfig.stringError, e);
            res.end();
        }
    }

    var calculateAge = (dob)=>{

        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
  
        return parseInt(Math.abs(age_dt.getUTCFullYear() - 1970)+"");
    }

    var calculatePremium = (body, month)=>{

        premiumPrice = [];

        switch(body.plan){
            case plans[0] : switch(body.state){
                            case states[31] :   switch(month){
                                                case 8 : if(body.age >= 21 && body.age <= 45){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "150"
                                                                    });
                                                            }
                                                        if(body.age >= 18 && body.age <= 65){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "120.99"
                                                                    }, {
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "90"
                                                                    }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "129.95"
                                                                    }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "89.99"
                                                                    });
                                                            }
                                                        else premiumPrice = [];
                                                break;
                                                case 9 : if(body.age >= 21 && body.age <= 65){
                                                            premiumPrice.push({
                                                                "carrier" : carriers[1],
                                                                "premium" : "150"
                                                            });
                                                            }
                                                            if(body.age >= 18 && body.age <= 65){
                                                                premiumPrice.push({
                                                                    "carrier" : carriers[0],
                                                                    "premium" : "120.99"
                                                                }, {
                                                                    "carrier" : carriers[0],
                                                                    "premium" : "90"
                                                                }, {
                                                                    "carrier" : carriers[1],
                                                                    "premium" : "129.95"
                                                                }, {
                                                                    "carrier" : carriers[1],
                                                                    "premium" : "89.99"
                                                                });
                                                            }
                                                        else premiumPrice = [];
                                                break;
                                                default :   if(body.age >= 18 && body.age <= 65){
                                                                premiumPrice.push({
                                                                    "carrier" : carriers[0],
                                                                    "premium" : "120.99"
                                                                }, {
                                                                    "carrier" : carriers[0],
                                                                    "premium" : "90"
                                                                }, {
                                                                    "carrier" : carriers[1],
                                                                    "premium" : "129.95"
                                                                }, {
                                                                    "carrier" : carriers[1],
                                                                    "premium" : "89.99"
                                                                });
                                                            }
                                                        else premiumPrice = [];
                                                break;
                                                }
                                break;
                            case states[0] : switch(month){
                                                case 10 : if(body.age >= 18 && body.age <= 65){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "85.5"
                                                                     }, {
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "90"
                                                                    }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "84.5"
                                                                     }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "89.99"
                                                                    });
                                                                    }
                                                            else premiumPrice = [];
                                                break;
                                                default: if(body.age >= 18 && body.age <= 65){
                                                                premiumPrice.push({
                                                                    "carrier" : carriers[0],
                                                                    "premium" : "90"
                                                                }, {
                                                                    "carrier" : carriers[1],
                                                                    "premium" : "89.99"
                                                                });
                                                                }
                                                        else premiumPrice = [];
                                                break;
                                                }
                            break;
                            case states[3] : switch(month){
                                            case 11 :   if(body.age >= 65 && body.age <= 120){
                                                            premiumPrice.push({
                                                                "carrier" : carriers[0],
                                                                "premium" : "175.2"
                                                            });
                                                        }
                                                        if(body.age >= 18 && body.age <= 64){
                                                                premiumPrice.push({
                                                                    "carrier" : carriers[0],
                                                                    "premium" : "125.16"
                                                                });
                                                        }
                                                        if(body.age >= 18 && body.age <= 65){
                                                            premiumPrice.push({
                                                                "carrier" : carriers[1],
                                                                "premium" : "89.99"
                                                            });
                                                        }
                                                        else premiumPrice = [];
                                            break;
                                            default: if(body.age >= 18 && body.age <= 65){
                                                                premiumPrice.push({
                                                                    "carrier" : carriers[0],
                                                                    "premium" : "90"
                                                                }, {
                                                                    "carrier" : carriers[1],
                                                                    "premium" : "89.99"
                                                                });
                                                                }
                                                        else premiumPrice = [];
                                            break;
                                            }
                            break;
                            default: switch(month){
                                            default : if(body.age >= 18 && body.age <= 65){
                                                            premiumPrice.push({
                                                                "carrier" : carriers[0],
                                                                "premium" : "90"
                                                            }, {
                                                                "carrier" : carriers[1],
                                                                "premium" : "89.99"
                                                            });
                                                        }
                                                        else premiumPrice = [];
                                            break;
                                    }
                            break;
            }
            break;
            case plans[1] : switch(body.state){
                            case states[31] : switch(month){
                                                case 0 : if(body.age >= 46 && body.age <= 65){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "200.5"
                                                                    }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "184.5"
                                                                    });
                                                            }
                                                            else premiumPrice = [];
                                                break;
                                                default: premiumPrice = [];
                                                break;  
                                                }
                            break;
                            case states[3] : switch(month){
                                                default : if(body.age >= 18 && body.age <= 65){
                                                                premiumPrice.push({
                                                                    "carrier" : carriers[0],
                                                                    "premium" : "100.8"
                                                                }, {
                                                                    "carrier" : carriers[1],
                                                                    "premium" : "100.8"
                                                                });
                                                            }
                                                            else premiumPrice = [];
                                                break;
                                                }
                            break;
                            case states[49] : switch(month){
                                                default : if(body.age >= 18 && body.age <= 65){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "100"
                                                                    });
                                                            }
                                                            else premiumPrice = [];
                                                break;        
                                                }
                            break;
                            default: premiumPrice = [];
                            break;
                            }
            break;
            case plans[2] : switch(body.state){
                            case states[31] : switch(month){
                                                default :   if(body.age >= 18 && body.age <= 65){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "120.99"
                                                                    }, {
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "90"
                                                                    }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "89.99"
                                                                    });
                                                            }
                                                            else premiumPrice = [];
                                                break;
                                                }
                            break;
                            case states[0] : switch(month){
                                                default : if(body.age >= 18 && body.age <= 65){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "100"
                                                                    }, {
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "90"
                                                                    }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "89.99"
                                                                    });
                                                            }
                                                            else premiumPrice = [];
                                                break;
                                                }
                            break;
                            case states[3] : switch(month){
                                                default : if(body.age >= 18 && body.age <= 65){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "100.8"
                                                                    }, {
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "90"
                                                                    }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "89.99"
                                                                    });
                                                            }
                                                            else premiumPrice = [];
                                                break;
                                                }
                            break;
                            default: switch(month){
                                                default : if(body.age >= 18 && body.age <= 65){
                                                                    premiumPrice.push({
                                                                        "carrier" : carriers[0],
                                                                        "premium" : "90"
                                                                    }, {
                                                                        "carrier" : carriers[1],
                                                                        "premium" : "89.99"
                                                                    });
                                                            }
                                                            else premiumPrice = [];
                                                break;
                                                }
                            break;
                            }
            break;
            default :   premiumPrice = [];
            break;

    }
}