const router = require('express').Router();
const db = require('../models');
const axios = require('axios');
const constants = require('../constants');

// Fetches trail data for specified lat, lng and range
router.get('/:lat/:lng/:range', (req, res) => {
    axios.get(constants.TRAILS_URL(req.params.lat, req.params.lng, req.params.range))
    .then( async (response) => {
        const trails = response.data.trails.map((trail) => {
            console.log(trail)
            return {
                _id: trail.id,
                latitude: trail.latitude,
                longitude: trail.longitude,
                name: trail.name,
                difficulty: trail.difficulty,
                distance: trail.distance,
                ascent: trail.ascent,
                descent: trail.descent,
                high: trail.high,
                low: trail.low,
                rating: trail.rating,
                location: trail.location,
                description: trail.description,
                distance: trail.length
            }
        })
        const trailPromises =  trails.map((trail) => {
           return db.Trail.findOne({
                _id: trail._id
            })
            .then((dbTrail) => {
                if (dbTrail) {
                    return dbTrail;
                }
                else{
                     return db.Trail.create(trail)
                    .then((dbTrail2) => {
                        dbTrail2.animals = getAnimals(dbTrail2)
                        dbTrail2.save()
                        return dbTrail2
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }

            })
            .catch((err) => {
                console.log(err);
            })
        })
        Promise.all(trailPromises)
        .then((trails) => {
            res.send(trails)
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    })

})



// router.get('/:id', (req, res) => {
//     db.Trail.findById(req.params.id)
//         .then((trail) => {
//             res.send({ trail })
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

const getAnimals = (trail) => {
    const uniqueAnimals = [];
    const latRange = `${(trail.latitude - (constants.LAT_MILES * trail.distance)).toFixed(5)},${(trail.latitude + (constants.LAT_MILES * trail.distance)).toFixed(5)}`;
    const lngRange = `${(trail.longitude + (constants.LNG_MILES(trail.latitude) * trail.distance)).toFixed(5)},${(trail.longitude - (constants.LNG_MILES(trail.latitude) * trail.distance)).toFixed(5)}`;
    axios.get(constants.ANIMALS_URL(latRange, lngRange))
    .then((response) => {
        response.data.results.forEach((result) => {
            if (!uniqueAnimals.some(animal => animal.scientificName === result.species)) {
                if (result.species) {
                    uniqueAnimals.push({
                        scientificName: result.species,
                        class: result.class
                    })
                }
            }
        })
        axios.post((constants.GET_ANIMAL_DATA), { data: uniqueAnimals })
        .then((response) => {
            const animalPromises = response.data.map((animal) => {
                return db.Animal.findOne({
                    scientificName: animal.scientificName
                })
                .then((animal) => {
                    if (animal) {
                        return animal;
                    }
                    else {
                        console.log(animal)
                        return db.Animal.create(animal)
                        .then((createdAnimal) => {
                            console.log(createdAnimal)
                            return createdAnimal
                        })
                        .catch((err) => console.log(err))
                    }
                })
                .catch(err => console.log(err))
            })
            console.log(animalPromises)
            return Promise.all(animalPromises)
            .then((animals) => {
                console.log(animals)
                return animals.map(animal => animal._id)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

module.exports = router;