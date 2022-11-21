const q = require('q'),
  pool = require('../common/pool');
let enrollModel = {};
const { isServiceProvider } = require('../util');
enrollModel.enrollUser = async function (body) {
  let { type, walletAddress, userAddressMM, spAddress, fee } = body;
  type.toLowerCase();
  let status = 'pending';

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

enrollModel.getEnrollData = async function (body) {
  const { userAddress } = body;
  let sql;
  let deferred = q.defer();
  userAddress.toLowerCase();
  console.log("Sp provider",userAddress);
  // SP login
  console.log("Sp provider",isServiceProvider(userAddress));
  if (isServiceProvider(userAddress)) {
    
    sql =
      'SELECT `enrollReqId`,`type`,`fee`,`status` FROM `user_request` WHERE `spAddress` = ?  AND `status` IN ("pending")';
    pool.query(sql, [userAddress], (error, result) => {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve({
          status: true,
          message: result,
        });
      }
    });
    return deferred.promise;
  }
  // User login
  else {
    sql =
      'SELECT * FROM `user_request` WHERE `userAddressMM` = ? AND `status` IN ("pending","approved")';
    pool.query(sql, [userAddress], (error, result) => {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve({
          status: true,
          message: result,
        });
      }
    });
    return deferred.promise;
  }
};
enrollModel.actUserEnrollRequest = async function (body) {
  const { reqId: enrollReqId, action: status } = body;
  let deferred = q.defer();
  let sql = 'UPDATE `user_request` SET `status` = ? WHERE `enrollReqId` = ? ';
  pool.query(sql, [status, enrollReqId], (error, result) => {
    if (error) {
      deferred.reject(error);
    } else {
      deferred.resolve({
        status: true,
        message: 'Status is updated',
      });
    }
  });
  return deferred.promise;
};

enrollModel.userConfirmEnrollRequest = async function (body) {
  const { reqId: enrollReqId } = body;
  let status = 'confirmed';
  let deferred = q.defer();
  let sql = 'UPDATE `user_request` SET `status` = ? WHERE `enrollReqId` = ? ';
  pool.query(sql, [status, enrollReqId], (error, result) => {
    if (error) {
      deferred.reject(error);
    } else {
      sql = 'SELECT * FROM `user_request` WHERE `enrollReqId` = ?';
      pool.query(sql, [enrollReqId], (error, result) => {
        if (error) {
          deferred.reject(error);
        } else {
          const { spAddress, userAddressMM, fee, walletAddress } = result[0];
          sql = 'INSERT INTO `guarding_details` SET ? ';
          pool.query(
            sql,
            [{ spAddress, userAddressMM, fee, walletAddress }],
            (error, result) => {
              if (error) {
                deferred.reject(error);
              } else {
                deferred.resolve({
                  status: true,
                  message:
                    'Status is confirmed and guarding_details table is updated',
                });
              }
            }
          );
        }
      });
    }
  });
  return deferred.promise;
};

enrollModel.getGuardMeDetails = async function (body) {
  const { userAddress: userAddressMM } = body;
  let deferred = q.defer();
  sql = 'SELECT * FROM `guarding_details` WHERE `userAddressMM` = ?';
  pool.query(sql, [userAddressMM], (error, result) => {
    if (error) {
      deferred.reject(error);
    } else {
      // let data = result.map((item) => {
      //   return { spAddress: item.spAddress, fee: item.fee };
      // });
      // console.log(result);

      let walletData = result.map((item) => {
        return item.walletAddress;
      });

      walletData = new Set(walletData);
      walletData = [...walletData];
      // console.log(walletData);
      let obj = [];
      walletData.forEach((wallet) => {
        obj.push(
          result.filter((item) => {
            if (item.walletAddress === wallet) {
              return item;
            }
          })
        );
      });
      let test = obj.map((item) => {
        return item.map((newItem) => {
          return { sp: newItem.spAddress, fee: newItem.fee };
        });
      });
      // console.log(test);
      const map = new Map();
      for (let i = 0; i < walletData.length; i++) {
        map.set(walletData[i], test[i]);
      }
      let arr = Array.from(map);
      // arr.forEach((item, i) => {
      //   console.log(`wallet${i}: `, item[0]);
      //   console.log(`sp and fee details for wallet${i}: `, item[1]);
      // });
      deferred.resolve({
        status: true,
        message: arr,
      });
    }
  });
  return deferred.promise;
};
module.exports = enrollModel;
