const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {  // Don't put api/items because we are already in that route
    Item.find()         // Returns a query
        .sort({ date: -1 })     // descending date
        .then(items => res.json(items))     // fetch from the database, give us those items
});

// @route POST api/items
// @desc Create an Item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({      // Created in memory
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));    // Save to database
});

// @route DELETE api/items/:id
// @desc Delete an Item
// @access Public
router
    .delete('/:id', (req, res) => {
        Item.findById(req.params.id)        // Way to get id from the URI, returns a promise
            .then(item => item.remove().then(() => res.json({ success: true})))
            .catch(err => res.status(404).json({ success: false}));
});



module.exports = router;