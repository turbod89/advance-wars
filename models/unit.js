const EntityFactory = require('./entityFactory');

const name = 'Unit';
const attr = ['type','cost','move','vision','fuel','ammo','environment'];

EntityFactory.create('Unit',attr, function () {

});

const entitity = EntityFactory.entities[name];

module.exports = entitity;