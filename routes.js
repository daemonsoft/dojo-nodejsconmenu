var express = require('express');
var router = express.Router();

var db = require('./queries');

router.get('/api/restaurants', db.getAllRestaurants);
router.get('/api/restaurants/:name', db.getRestaurantByName);
router.post('/api/restaurants', db.createRestaurant);
router.delete('/api/restaurants/:id', db.removeRestaurant);
router.put('/api/restaurants/:id', db.updateRestaurant);

router.get('/api/menu', db.getAllMenu);
router.get('/api/menu/:id', db.getMenuByRestaurant);
router.post('/api/menu', db.createMenu);
router.delete('/api/menu/:id', db.removeMenu);
router.put('/api/menu/:id', db.updateMenu);

module.exports = router;