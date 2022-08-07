const webServer = require('./src/services/web-server');
const appConfig = require('./src/config/app-config');

process.env.UV_THREADPOOL_SIZE = 20;

async function startUp(){
    try{
    console.log(appConfig.stringStart);
    await webServer.start();
    } catch (e){
        console.log(appConfig.stringError, e);
        process.exit(1);
    }
}

startUp();
