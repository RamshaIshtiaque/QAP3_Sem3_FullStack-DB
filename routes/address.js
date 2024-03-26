const express = require('express');
const router = express.Router();
const addressDal = require('../services/addresses.dal');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    try {
        const addresses = await addressDal.getAddresses();
        if (DEBUG) console.table(addresses);
        res.render('addresses', { addresses });
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});

router.get('/addressAdd', (req, res) => {
    if(DEBUG) console.log("address.add");
    res.render('addressAdd');
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("address.POST");
    try {
        await addressDal.addAddress(req.body.user_id, req.body.address_line1, req.body.address_line2, req.body.city, req.body.state, req.body.postal_code, req.body.country );
        res.redirect('/addresses');
    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});

router.get('/:id/update', async (req, res) => {
    if (DEBUG) console.log('address.Update : ' + req.params.id);
    try {
        const address = await addressDal.getAddressById(req.params.id);
        if (address)
            res.render('addressPut', { address });
        else
            res.render('norecord');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});

router.post('/:id/update', async (req, res) => {
    if (DEBUG) console.log('address.Update : ' + req.params.id);
    try {
        await addressDal.putAddress(
            req.params.id, // Assuming ID is part of the URL params
            req.body.address_line1,
            req.body.address_line2,
            req.body.city,
            req.body.state,
            req.body.postal_code,
            req.body.country
        );
        res.redirect('/addresses'); // Redirect to view updated address
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});



// router.post('/', async (req, res) => {
//     if (DEBUG) console.log("addresses.POST");
//     try {
//         await addressDal.addAddress(
//             req.body.user_id,
//             req.body.address_line1,
//             req.body.address_line2,
//             req.body.city,
//             req.body.state,
//             req.body.postal_code,
//             req.body.country
//         );
//         res.redirect('/address/');
//     } catch (error) {
//         console.error(error);
//         res.render('503');
//     }
// });

router.post('/:id/delete-address', async (req, res) => {
    if (DEBUG) console.log('addresses.DELETE: ' + req.params.id);
    try {
        const user_ID = req.params.id; // Get the ID entered by the user from the request body
        console.log(user_ID);
        await addressDal.deleteAddress(user_ID); // Call the deleteAddress function from your DAL
        res.redirect('/addresses');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});


module.exports = router;