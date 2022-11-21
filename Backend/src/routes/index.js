const express = require('express');
const enrollController = require('../controllers/enroll');
module.exports = function () {
  app.post('/enrollUser', enrollController.enrollUser);
  app.get('/getEnrollData', enrollController.getEnrollData);
  app.patch('/actUserEnrollRequest', enrollController.actUserEnrollRequest);
  app.post(
    '/userConfirmEnrollRequest',
    enrollController.userConfirmEnrollRequest
  );
  app.get('/getGuardMeDetails', enrollController.getGuardMeDetails);
};