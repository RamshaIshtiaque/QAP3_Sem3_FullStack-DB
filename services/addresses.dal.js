const dal = require("./pdb");

//get all addresses.
var getAddresses = function() {
  if(DEBUG) console.log("addresses.dal.getAddresses()");
  return new Promise(function(resolve, reject) {

    const sql = "SELECT user_id, address_line1, address_line2 FROM user_addresses \
                ORDER BY user_id DESC LIMIT 2;"

    dal.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the addresses.dal.getAddresses() function");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};

var getAddressesById = function(theId) {
  if(DEBUG) console.log("addresses.dal.getAddressesById()");
  if(DEBUG) console.log(`the user id is: ${theId}`)
  return new Promise(function(resolve, reject) {

    const sql = "SELECT user_id, address_line1, address_line2 FROM user_addresses \
      WHERE user_id = 3;"

    dal.query(sql, [theId], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log("inside the addresses.dal.getAddressesById() function");
        if(DEBUG) console.log(result.rows);
        resolve(result.rows);
      }
    }); 
  }); 
};

// var addAddresses = function() {
//   if(DEBUG) console.log("films.dal.addActor()");
// };

// var updateActor = function() {
//   if(DEBUG) console.log("films.dal.updateActor()");
// };

module.exports = {
  getAddresses,
  getAddressesById,
}