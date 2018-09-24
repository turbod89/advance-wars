const Turn = require('./turn');


const dijkstra = function * (cell, remaining_moves, map, calcule_cost, already_visited = []) {

    already_visited.push(cell);
    const adjacent_cell_gen = map.getAdjacent(cell);
    let adjacent_cell = adjacent_cell_gen.next();
    while (! adjacent_cell.done) {
        const cost =  calcule_cost(adjacent_cell.value);
        const isCellAlreadyVisited = already_visited.some(cell => cell === adjacent_cell.value);
        if (!isCellAlreadyVisited && typeof cost === 'number' && cost <= remaining_moves) {
            yield adjacent_cell.value;
            yield* dijkstra(adjacent_cell.value, remaining_moves - cost,map,calcule_cost, already_visited);
        }

        adjacent_cell = adjacent_cell_gen.next();
    }
};

const Game = function () {

    const args = Array.prototype.slice.call(arguments);
    const $a = args[0] || {};

    const max_turns = 10;

    const units = [];
    let turn_cnt = null;
    let status = 'CREATED';




    Object.defineProperties(this,{
        'length': {
            'enumerable': true,
            'configurable': false,
            'writable': false,
            'value': ( $a['players'] && $a['players'].length) || 0
        },
        'players': {
            'enumerable': true,
            'configurable': false,
            'writable': false,
            'value': $a['players'] || []
        },
        'map': {
            'enumerable': true,
            'configurable': false,
            'writable': false,
            'value': $a['map'] || null
        },
        'turn': {
            'enumerable': true,
            'configurable': false,
            'get': () => turn_cnt,
        },
        'status': {
            'enumerable': true,
            'configurable': false,
            'get': () => status,
        },
        'units': {
            'enumerable': true,
            'configurable': false,
            'get': () => units,
        },
        'start': {
            'enumerable': true,
            'configurable': false,
            'writable': false,
            'value': async function () {

                turn_cnt = 0;
                status = 'STARTED';

                while (!this.isEnd) {
                    const turn = new Turn(this);
                    await turn.dealer.doTurn(turn);

                    turn_cnt++;

                    if (this.turn > max_turns) {
                        status = 'FINISHED';
                    }
                }

            },
        },
    });

    //
    //
    //

    this.map.cells.forEach( cell => {
        if (cell.unit && cell.unit !== null) {
            const player = this.players[cell.unit.team];
            const Type = cell.unit.type;
            cell.unit = new Type();
            cell.unit.owner = player;
            units.push(cell.unit);
        }
    });
};

Object.defineProperties(Game.prototype,{
    'isEnd': {
        'enumerable': true,
        'configurable': false,
        'get': function () {
            return this.status === 'FINISHED';
        },
    },



    'getUnitById': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function (id) {
            const index = this.units.findIndex(unit => unit.id === id);
            return index < 0 ? null : this.units[index];
        }
    },

    'getUnitReachableCells': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function * (unit) {
            const cellIndex = this.map.getUnitCellIndex(unit);

            if (cellIndex === null) {

            } else {
                const cell = this.map.getCell(cellIndex);
                yield* dijkstra(cell, unit.move, this.map, cell => cell.terrain.cost[unit.type]);
            }

        }
    },

    'getUnitVisibleCells': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function * (unit) {
            const cellIndex = this.map.getUnitCellIndex(unit);

            if (cellIndex === null) {

            } else {
                const cell = this.map.getCell(cellIndex);
                yield* dijkstra(cell, unit.vision, this.map, cell => cell.terrain.visibility[unit.type]);
            }

        }
    },

    'getPlayerVisibleCells': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function * (player) {

            const visited_cells = [];
            for (let unit of this.units) {
                if (unit.owner === player) {
                    const visible_cells_gen = this.getUnitVisibleCells(unit);
                    for (let cell of visible_cells_gen) {
                        const already_visited = visited_cells.some(visited_cell => visited_cell === cell);
                        if (!already_visited) {
                            visited_cells.push(cell);
                            yield cell;
                        }
                    }
                }
            }
        }
    },


});

module.exports = Game;