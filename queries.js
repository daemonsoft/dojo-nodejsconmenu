var promise = require('bluebird');

var options = {
	promiseLib:promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgres://nqlgzcrz:HCIXDui_bJ9f2tJtQj8kjFnLkcfilAUV@elmer.db.elephantsql.com:5432/nqlgzcrz';

var db = pgp(connectionString);

function getAllRestaurants(req, res, next){
	db.any('select * from restaurant').then(function(data){
		res.status(200)
		.json({
			status: 'Exitoso',
			data: data,
			message: 'Recuperados todos los restaurantes'
		});
	}).catch(function(err){
		return next(err);
	});
};

function getRestaurantByName(req, res, next){
	var name = req.params.name;
	db.any('select * from restaurant where name = $1', name)
	.then(function(data){
		res.status(200).json({
			status: 'Exitoso',
			data: data,
			message: 'Recuperados restaurantes por nombre'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function createRestaurant(req, res, next){
	db.none('insert into restaurant(name, city, address, phone) ' +
	'values($1, $2, $3, $4)',
	[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone)])
	.then(function(){
		res.status(200).json({
			status: 'Exitoso',
			message: 'insertado restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function removeRestaurant(req, res, next){
	var restaurantID = parseInt(req.params.id);
	db.result('delete from restaurant where id = $1' ,restaurantID)
	.then(function(){
		res.status(200).json({
			status: 'Exitoso',
			message: 'removido restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function updateRestaurant(req, res, next){
	db.none('update restaurant set name = $1, city=$2, address=$3, phone=$4 where id = $5)',
	[req.body.name, req.body.city, req.body.address, parseInt(req.body.phone), parseIn(req.params.id)])
	.then(function(){
		res.status(200).json({
			status: 'Exitoso',
			message: 'actualizado restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function getAllMenu(req, res, next){
	db.any('select * from menu').then(function(data){
		res.status(200)
		.json({
			status: 'Exitoso',
			data: data,
			message: 'Recuperados todos los menu'
		});
	}).catch(function(err){
		return next(err);
	});
};

function getMenuByRestaurant(req, res, next){
	var restaurantID = parseInt(req.params.id);
	db.any('select * from menu where restaurant = $1', restaurantID)
	.then(function(data){
		res.status(200).json({
			status: 'Exitoso',
			data: data,
			message: 'Recuperados menus por id restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function createMenu(req, res, next){
	db.none('insert into menu(name, description, price, restaurant) ' +
	'values($1, $2, $3, $4)',
	[req.body.name, req.body.description, req.body.price, parseInt(req.body.restaurant)])
	.then(function(){
		res.status(200).json({
			status: 'Exitoso',
			message: 'Insertado restaurante'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function removeMenu(req, res, next){
	var menuId = parseInt(req.params.id);
	db.result('delete from menu where id = $1' ,menuId)
	.then(function(){
		res.status(200).json({
			status: 'Exitoso',
			message: 'removido menu'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

function updateMenu(req, res, next){
	db.none('update menu set name = $1, description=$2, price=$3, restaurant=$4 where id = $5)',
	[req.body.name, req.body.description, parseInt(req.body.price), parseInt(req.body.id), parseInt(req.params.restaurant)])
	.then(function(){
		res.status(200).json({
			status: 'Exitoso',
			message: 'actualizado menu'
		});
	})
	.catch(function(err){
		return next(err);
	});
};

module.exports = {
	getAllRestaurants: getAllRestaurants,
	getRestaurantByName: getRestaurantByName,
	createRestaurant: createRestaurant,
	removeRestaurant: removeRestaurant,
	updateRestaurant: updateRestaurant,
	getAllMenu: getAllMenu,
	getMenuByRestaurant: getMenuByRestaurant,
	createMenu: createMenu,
	removeMenu: removeMenu,
	updateMenu: updateMenu
};