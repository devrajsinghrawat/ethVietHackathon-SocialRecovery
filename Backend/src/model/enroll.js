const q = require('q'),
  pool = require('../common/pool');
let enrollModel = {};

enrollModel.enrollUser = async function (body) {
  let { type, walletAddress, userAddressMM, spAddress, fee, status } = body;
  type.toLowerCase();
  status.toLowerCase();

  let deferred = q.defer();
  let sql = 'INSERT INTO user_request SET ? ';

  pool.query(
    sql,
    [{ type, walletAddress, userAddressMM, spAddress, fee, status }],
    function (error, result) {
      if (error) {
        console.log(error);
        deferred.reject(error);
      } else {
        deferred.resolve({
          status: true,
          message: result.insertId,
        });
      }
    }
  );
  return deferred.promise;
};
module.exports = enrollModel;
