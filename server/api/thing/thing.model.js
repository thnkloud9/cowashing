'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  address_1: String,
  address_2: String,
  city: String,
  country: String,
  postal_code: String,
  lat: Number,
  lng: Number,
  geometry: String
});

module.exports = mongoose.model('Thing', ThingSchema);