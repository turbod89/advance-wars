const Player = function () {

};

Object.defineProperties(Player.prototype, {
    'name': {
        'enumerable': true,
        'modificable': false,
        'writable': true,
        'value': 'Player_'+Math.floor(Math.random()*100000),
    },


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