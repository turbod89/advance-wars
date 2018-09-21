const Player = function () {

};

Object.defineProperties(Player.prototype, {
    'doTurn': {
        'enumerable': true,
        'modificable': true,
        'writable': true,
        'value': async function ( turn ) {
            console.log('This is function is expected to be overwritten');
            return this;
        },
    },
});

module.exports = Player;