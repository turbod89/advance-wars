const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const { Unit, Terrain, Game, Map, Player} = require('../models');
const mapData = require('../data/map1');

const map = new Map({...mapData,terrains: Terrain.types, units: Unit.types});

const players = (new Array(mapData.teams)).fill(null).map( (e,i) => {

    const player = new Player();

    player.doTurn = async function ( turn ) {
        console.log('Player ' + i + ' turn in round '+turn.round);

        let isEnd = false;

        const isCmd = (needle,haystack) => haystack.some( command => needle.toLowerCase() === command.toLowerCase());

        while (!isEnd) {

            await new Promise( (resolve, reject) => {

                rl.resume();

                rl.prompt();

                rl.on('line', (line) => {

                    const words = line.trim().split(' ');

                    if (isCmd(words[0],['end', 'finish', 'q'])) {
                        isEnd = true;
                        rl.pause();
                        resolve();

                    } else if (isCmd(words[0],['help'])) {
                        console.log(`
    Avaliable commands:
    
    - end
    - help

`);
                    } else if (true) {
                        console.error(`Unknow command '${words[0]}'. Type 'help' for help.`);
                    } else { }

                    rl.prompt();
                });
            });
        }

    };

    return player;

});

const game = new Game({
    players,
    map,
});

game.start();