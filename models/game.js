const Turn = require('./turn');

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
        if (cell.unit !== null) {
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

    'getUnitCell': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function (unit) {
            const index = this.cells.findIndex(cell => cell.unit === unit);
            return index < 0 ? null : index;
        },
    },
});

module.exports = Game;