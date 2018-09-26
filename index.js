const fs = require('fs');
const io = require("socket.io");
const server = io.listen(8000);

const { Unit, Terrain, Game, Map: GameMap, Player} = require('./models');

const folder = './data/';
const files = fs.readdirSync(folder);

const mapFiles = files.reduce ( (result,filename) => {

    if (/map\d+\.json/.test(filename)) {
        result.add(filename.replace(/(map\d+)\.json/g,'$1'));
    }

    return result;
},new Set());

const playersByClient = new Map();
const games = new Set();

server.on('connection', socket => {
    console.info(`Client connected [id=${socket.id}]`);

    playersByClient.set(socket, new Player());

    socket.on('disconnect', () => {
        playersByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });


    socket.on('set name', new_name => {
        for (const [actual_socket, player] of playersByClient.entries()) {
            if (player.name === new_name && socket !== actual_socket) {
                socket.emit('onError', `Player name ${new_name} already exists`);
                return false;
            }
        }

        playersByClient.get(socket).name = new_name;
    });

    socket.no('set party', data => {
        const {name = null, map_name = null, } = data;
        if (!mapFiles.has(map_name)) {
            socket.emit('onError',`Map ${map_name} does not exists.`);
        } else if (name === null || !([...games].map(game => game.name).some(game_name => game_name === name))) {

        }
    });

    socket.on('get map files', () => {
        socket.emit('get map files', [...mapFiles]);
    });

    socket.on('get parties', () => {
        socket.emit('get parties', [...games].map( game => ({
            name: game.name,
            owner: game.owner.name,
        })));
    });

    socket.on('get map', map_name => {
        if (mapFiles.has(map_name)) {
            socket.emit('get map', require('./data/'+map_name+'.json'));
        } else {
            socket.emit('onError',`Map ${map_name} does not exists.`);
        }
    });
});