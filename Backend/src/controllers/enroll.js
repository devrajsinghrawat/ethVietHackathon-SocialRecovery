const enrollModel = require('../model/enroll');
const helper = require('../helpers/index');
let enroll = {};
enroll.enrollUser = async function (req, res) {
  enrollModel.enrollUser(req.body).then((result) => {
    if (result.status) {
      if (result.status == true) {
        helper.successHandler(res, { payload: result });
        // helper.successHandler(res, {
        //   payload: result,
        // });
      } else {
        helper.errorHandler(
          res,
          {
            status: false,
            message: result,
          },
          500
        );
      }
    } else {
      helper.errorHandler(
        res,
        {
          status: false,
          message: result,
        },
        500
      );
    }
  });
};
module.exports = enroll;
