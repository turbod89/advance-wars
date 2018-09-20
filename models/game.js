const Game = function () {

    const args = Array.prototype.slice.call(arguments);
    const $a = args[0] || {};

    const units = [];


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
    });

    //
    //
    //

    this.map.cells.forEach( cell => {
        if (cell.unit !== null) {
            const player = this.players[cell.unit.team];
            const Type = cell.unit.type;
            cell.unit = new Type();
            cell.owner = player;
        }
    });
};

Object.defineProperties(Game.prototype,{
    'start': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function () {

        },
    },
});

module.exports = Game;