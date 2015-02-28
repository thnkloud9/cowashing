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
  geometry: String,
  booking_requests: [bookingRequestSchema],
  volume: Number,
  relayr_data: [],
});

var bookingRequestSchema = new mongoose.Schema({
    user: String,
    date: Date,
    accepted: Boolean,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Thing', ThingSchema);
