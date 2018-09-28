const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:8000");

const readline = require('readline');

const printer = require('./tests/printer');

ioClient.on('onError', msg => console.error(msg));
ioClient.on('get map files', msg => console.log(msg));
ioClient.on('get parties', partiesData => {
    partiesData.forEach( partyData => {
        console.log(`*${partyData.name}* in map '${ partyData.map }' created by ${partyData.owner} ( ${partyData.players.length} )`);
    })
});

ioClient.on('get map', mapData => {
    printer(mapData);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
});

const ask = async function () {
    const isCmd = (needle,haystack) => haystack.some( command => needle.toLowerCase() === command.toLowerCase());

    let isEnd = false;

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

                } else if (isCmd(words[0],['set'])) {

                    if ( words.length < 2) {
                        console.error('set party | name');
                    } else if (isCmd(words[1],['party'])) {

                        if ( words.length < 4) {
                            console.error('set party <new-party-name> <map>');
                        } else {
                            ioClient.emit('set party', {name: words[2], map_name: words[3]});
                        }

                    } else if (isCmd(words[1],['name'])) {

                        if ( words.length < 3) {
                            console.error('what name?');
                        } else {
                            ioClient.emit('set name', words[2]);
                        }
                    } else if (true) {
                        console.error('set what?');
                    }

                } else if (isCmd(words[0],['get'])) {

                    if ( words.length < 2) {
                        console.error('get what?');
                    } else if (isCmd(words[1],['maps'])) {
                        ioClient.emit('get map files');
                    } else if (isCmd(words[1],['parties'])) {
                        ioClient.emit('get parties');
                    } else if (isCmd(words[1],['map'])) {

                        if ( words.length < 3) {
                            console.error(`get map [<filename> | files]`);
                        } else if (isCmd(words[2],['files'])) {
                            ioClient.emit('get map files');
                        } else {
                            ioClient.emit('get map', words[2]);
                        }
                    } else if (true) {
                        console.error('get what?');
                    }

                } else if (true) {
                    console.error(`Unknown command '${words[0]}'.`);
                } else { }

                rl.prompt();
            });
        });
    }
};

ask();