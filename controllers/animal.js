const router = require('express').Router();
const db = require('../models');
const axios = require('axios');
const constants = require('../constants');

router.get('/:trailId', (req, res) => {
    db.Trail.findById(req.params.trailId)
    .populate('animals')
    .exec((err, trail) => {
        if (err) {
            console.log(err)
            res.send('Error, check server')
        }
        else {
            res.send(trail.animals)
        }
    })
})