module.exports = function(){
    var relayrService = require('./relayr-service');

    relayrService.start();
    console.log("starting relayrService");
};
