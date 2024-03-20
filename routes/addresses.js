const express = require('express');
const router = express.Router();
const addressDal = require('../services/pg.addresses.dal');

router.get('/', async (req, res) => {
    try {
        let addresses = await addressDal.getAddresses();
        if (DEBUG) console.table(addresses);
        res.render('addresses', { addresses });
    } catch (error) {
        console.error(error);
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

router.get('/:id/replace', async (req, res) => {
    if (DEBUG) console.log('address.Replace : ' + req.params.id);
    res.render('addressPut.ejs', {
        address_line1: req.query.address_line1,
        address_line2: req.query.address_line2,
        city: req.query.city,
        state: req.query.state,
        postal_code: req.query.postal_code,
        country: req.query.country,
        theId: req.params.id
    });
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

router.get('/:id/delete', async (req, res) => {
    if (DEBUG) console.log('address.Delete : ' + req.params.id);
    res.render('addressDelete.ejs', { theId: req.params.id });
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
        res.redirect('/addresses/');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});

router.put('/:id', async (req, res) => {
    if (DEBUG) console.log('addresses.PUT: ' + req.params.id);
    try {
        await addressDal.putAddress(
            req.params.id,
            req.body.user_id,
            req.body.address_line1,
            req.body.address_line2,
            req.body.city,
            req.body.state,
            req.body.postal_code,
            req.body.country
        );
        res.redirect('/addresses/');
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
        res.redirect('/addresses/');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});

router.delete('/:id', async (req, res) => {
    if (DEBUG) console.log('addresses.DELETE: ' + req.params.id);
    try {
        await addressDal.deleteAddress(req.params.id);
        res.redirect('/addresses/');
    } catch (error) {
        console.error(error);
        res.render('503');
    }
});

module.exports = router;
