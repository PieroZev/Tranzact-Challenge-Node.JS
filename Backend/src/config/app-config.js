
exports.port = 5000; //open localhost:5000 in browser

//paths: add to url (i.e. localhost:5000/periods)
exports.urlPeriods = "/periods";
exports.urlPlans = "/plans";
exports.urlPremium = "/premium";
exports.urlStates = "/states";

//Console log display text
exports.stringStart = "Starting web server";
exports.stringError = "Encountered error";
exports.stringPort = "Started listening at: ";
exports.stringDOB = "Age must correspond the date of birth";
exports.empty = "Premium price list was not sent";
exports.sent = "Premium price list sent";

//Setting the language
exports.getResources = (req, res)=>{
    var resources;
    var lang = parseLanguage(req.headers["accept-language"]);
    if (lang === "es" || lang === "es-US" || lang === "es-419" || lang === "es-ES") resources = require('./string-resources-ES');
    else resources = require('./string-resources-EN');
    return resources;
};

function parseLanguage(str){
    //es-US,es-419;q=0.9,es;q=0.8,de;q=0.7
    if(str) return str.split(",")[0];
    else    return 'en';
}


