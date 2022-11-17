const express = require('express');
const enrollController = require('../controllers/enroll');
module.exports = function () {
  app.post('/enrollUser', enrollController.enrollUser);
};
