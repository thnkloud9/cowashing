'use strict';

var service = null;

var relayrService = function(){
  var Thing = require('../api/thing/thing.model');
  var Relayr = require('relayr');
  //var mail = require("../mail");

  if(service == null){
    service = "";
    service = new relayrService();
  } else{
    this.registerRelayr = function(){
      // TODO: get dev_id from thing.model
      var relayrKeys = {
        app_id: '79a77b7b-08e9-4e7a-9545-ac0d75d30fe6',
        dev_id: 'e91b598e-0553-4357-8da6-4e0da48be34a',
        token:  'YFiGGzZrwnPFId0xYtIFUhVxN-l5om0z'
      };

      var relayr = new Relayr(relayrKeys.app_id);
      relayr.connect(relayrKeys.token, relayrKeys.dev_id);

      relayr.on('data', function (topic, msg) {
        var value = msg.readings[0].value / 100;
        console.log(topic + ":" + value);
      });
    };

    this.start = function(){
      var service = this;
      service.registerRelayr();
    }
  }
}

relayrService();

module.exports = service;
