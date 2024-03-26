const dal = require("./pdb");

var getAddresses = function() {
  if(DEBUG) console.log("addresses.dal.getAddresses()");
  return new Promise(function(resolve, reject) {

    const sql = "SELECT user_id, address_line1, address_line2, city, state, postal_code, country FROM user_addresses ORDER BY user_id ASC;"

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

var getAddressById = function(theId) {
    if(DEBUG) console.log("addresses.dal.getAddressById()");
    if(DEBUG) console.log(`the user id is: ${theId}`);
    return new Promise(function(resolve, reject) {
      const sql = "SELECT user_id, address_line1, address_line2, city, state, postal_code, country  FROM user_addresses \
        WHERE user_id = $1;"; // Using parameterized query
  
      dal.query(sql, [theId], (err, result) => {
        if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          if(DEBUG) console.log("inside the addresses.dal.getAddressById() function");
          if(DEBUG) console.log(result.rows);
          resolve(result.rows);
        }
      }); 
    }); 
  };

var addAddress = function(user_id, address_line1, address_line2, city, state, postal_code, country) {
    if (DEBUG) console.log("addresses.dal.addAddress()");
    return new Promise(function(resolve, reject) {
        const sql = `INSERT INTO user_addresses (user_id, address_line1, address_line2, city, state, postal_code, country) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7) 
                    RETURNING id, user_id, address_line1, address_line2, city, state, postal_code, country;`;
        dal.query(sql, [user_id, address_line1, address_line2, city, state, postal_code, country], (err, result) => {
        if (err) {
            if (DEBUG) console.log(err);
            reject(err);
        } else {
            if (DEBUG) console.log(`Success: New address ID(${result.rows[0].id})`);
            resolve(result.rows);
        }
        }); 
    });
};
  

var putAddress = function(user_id, address_line1, address_line2, city, state, postal_code, country) {
    if (DEBUG) console.log("addresses.dal.putAddress()");
    return new Promise(function(resolve, reject) {
        const sql = "UPDATE user_addresses SET address_line1=$2, address_line2=$3, city=$4, state=$5, postal_code=$6, country=$7 WHERE user_id=$1;";
        dal.query(sql, [user_id, address_line1, address_line2, city, state, postal_code, country], (err, result) => {
        if (err) {
            reject(err);
            } else {
            resolve(result.rows);
            }
        }); 
    });
};
  
var patchAddress = function(id, user_id, address_line1, address_line2, city, state, postal_code, country) {
    if (DEBUG) console.log("addresses.dal.patchAddress()");
    return new Promise(function(resolve, reject) {
        const sql = "UPDATE user_addresses SET user_id=$2, address_line1=$3, address_line2=$4, city=$5, state=$6, postal_code=$7, country=$8 WHERE id=$1;";
        dal.query(sql, [id, user_id, address_line1, address_line2, city, state, postal_code, country], (err, result) => {
        if (err) {
            reject(err);
            } else {
            resolve(result.rows);
            }
        }); 
    });
};

var deleteAddress = function(id) {
    if (DEBUG) console.log("addresses.dal.deleteAddress()");
    return new Promise(function(resolve, reject) {
        const sql = "DELETE FROM user_addresses WHERE user_id = $1;";
        dal.query(sql, [id], (err, result) => {
        if (err) {
            reject(err);
            } else {
            resolve(result.rows);
            }
        }); 
    });
};
  

module.exports = {
  getAddresses,
  getAddressById,
  addAddress,
  putAddress,
  patchAddress,
  deleteAddress,
}