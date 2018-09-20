const { Unit, Terrain, Game, Map } = require('../models');
const entities = require('../data/entities');
const mapData = require('../data/map1');

const map = new Map({...mapData,terrains: Terrain.types, units: Unit.types});
const players = new Array(mapData.teams);
const game = new Game({
    players,
    map,
});

console.log(map);