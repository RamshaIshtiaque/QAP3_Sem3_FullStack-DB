const express = require('express');
const router = express.Router();
const addressDal = require('../services/addresses.dal');

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
    res.render('addressAdd', { successMessage: '' }); // Pass an empty string initially
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

router.get('/:id', async (req, res) => {
    try {
        const address = await addressDal.getAddressById(req.params.id);
        if (DEBUG) console.log(`addresses.router.get/:id ${address}`);
        if (address)
            res.render('address', { address });
        else
            res.render('norecord');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});


router.get('/:id/edit', async (req, res) => {
    if (DEBUG) console.log('address.Edit : ' + req.params.id);
    res.render('addressPatch.ejs', {
        address_line1: req.query.address_line1,
        address_line2: req.query.address_line2,
        city: req.query.city,
        state: req.query.state,
        postal_code: req.query.postal_code,
        country: req.query.country,
        theId: req.params.id
    });
});



router.post('/', async (req, res) => {
    if (DEBUG) console.log("addresses.POST");
    try {
        await addressDal.addAddress(
            req.body.user_id,
            req.body.address_line1,
            req.body.address_line2,
            req.body.city,
            req.body.state,
            req.body.postal_code,
            req.body.country
        );
        res.redirect('/address/');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});

router.patch('/:id', async (req, res) => {
    if (DEBUG) console.log('addresses.PATCH: ' + req.params.id);
    try {
        await addressDal.patchAddress(
            req.params.id,
            req.body.user_id,
            req.body.address_line1,
            req.body.address_line2,
            req.body.city,
            req.body.state,
            req.body.postal_code,
            req.body.country
        );
        res.redirect('/address/');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});

router.get('/:id/delete', async (req, res) => {
    // if (DEBUG) console.log('address.Delete : ' + req.params.id);
    res.render('addressDelete.ejs');
});

router.post('/delete-address', async (req, res) => {
    if (DEBUG) console.log('addresses.DELETE: ' + req.params.id);
    try {
        const id = req.body.addressId; // Get the ID entered by the user from the request body
        await addressDal.deleteAddress(id); // Call the deleteAddress function from your DAL
        res.redirect('/addresses');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});

router.route('/:id/replace')
    .get(async (req, res) => {
        try {
            if (DEBUG) console.log('address.Replace GET: ' + req.params.id); 

            // Fetch address details based on ID
            const addressDetails = await addressDal.getAddressById(req.params.id);

            if (!addressDetails) {
                // Handle the case where address details are not found
                console.error('Address details not found for ID: ' + req.params.id); 
                return res.status(404).send('Address not found');
            }

            console.log('Rendering addressPut.ejs with address details:', addressDetails); 
            res.render('addressPut.ejs', {
                user_id: addressDetails.user_id,
                address_line1: addressDetails.address_line1,
                address_line2: addressDetails.address_line2,
                city: addressDetails.city,
                state: addressDetails.state,
                postal_code: addressDetails.postal_code,
                country: addressDetails.country,
                theId: req.params.id
            });
        } catch (error) {
            console.error('Error while handling GET request:', error); 
            res.render('503');
        }
    })
    .put(async (req, res) => {
        try {
            if (DEBUG) console.log('addresses.PUT: ' + req.params.id); 

            console.log('Received PUT request with body:', req.body); 

            await addressDal.putAddress(
                req.params.id, // Corrected to include address ID
                req.body.user_id,
                req.body.address_line1,
                req.body.address_line2,
                req.body.city,
                req.body.state,
                req.body.postal_code,
                req.body.country
            );

            console.log('Address updated successfully.'); 
            // Redirect to the addresses page after successfully updating the address
            res.redirect('/addresses');
        } catch (error) {
            console.error('Error while handling PUT request:', error); 
            res.render('503');
        }
    });


module.exports = router;