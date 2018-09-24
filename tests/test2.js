const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const { Unit, Terrain, Game, Map, Player} = require('../models');
const mapData = require('../data/map2');

const map = new Map(mapData);
map.build({
    terrains: Terrain.types,
    units: Unit.types,
});

const players = (new Array(mapData.teams)).fill(null).map( (e,i) => {

    const player = new Player();

    player.doTurn = async function ( turn ) {};

    return player;

});

const game = new Game({
    players,
    map,
});

let s = '';

for (let i = 0; i < map.size[0]; i++) {
    for (let j = 0; j < map.size[1]; j++) {

        const cell = map.getCell(i,j);

        if (cell.unit) {
            s += '!';
        } else {
            s += '.';
        }
    }
    s +='\n';
}

console.log('\n'+s+'\n');

const unit = game.units[0];
const gen = game.getUnitReachableCells(unit);
let cell = gen.next();
while(!cell.done) {
    console.log(game.map.getCellCoordinates(cell.value));
    cell = gen.next();
}

const player = players[0];

const visible_cells_gen = game.getPlayerVisibleCells(player);
console.log([...visible_cells_gen].map(cell => cell.coordinates));