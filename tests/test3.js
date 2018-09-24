/*
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    //input: fs.createReadStream('./data/map2.scheme.js'),
    output: process.stdout,
    prompt: '',
    crlfDelay: Infinity,
});
*/
const createJson = function (data) {
    const {size,charMap,charUnits,units} = data;
    const cells = [];
    for (let i =0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            if (charMap[ i * size[1] + j] === '.') {
                cells.push({
                    terrain: 'Plain',
                })
            } else if (charMap[ i * size[1] + j] === '~') {
                cells.push({
                    terrain: 'River',
                })
            } else if (charMap[ i * size[1] + j] === '"') {
                cells.push({
                    terrain: 'Wood',
                })
            } else if (charMap[ i * size[1] + j] === '=') {
                cells.push({
                    terrain: 'Road',
                })
            } else {
                cells.push({
                    terrain: 'Plain',
                })
            }
        }
    }

    let unit_cnt = 0;
    for (let i =0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            const index = '0123456789'.split('').findIndex( c => c === charUnits[ i * size[1] + j]);
            if (index >= 0 ) {
                cells[i *size[1]+ j]['unit'] = {
                    team: index,
                    type: units[unit_cnt],
                };
                unit_cnt++;
            }
        }
    }

    return {
        "teams": 2,
        size,
        "offset": [0,0],
        cells,
    };
};

const data = require('../data/map2.scheme');
console.log(JSON.stringify(createJson(data)));

/*
rl.resume();

rl.prompt();

const charMap = [];
const size = [];
let lines = 0;

rl.on('line', (line) => {
    const words = line.trim().split(' ');
    for (let word of words) {
        if (size.length < 2 && isNaN(word) === false) {
            size.push(Number(word));
        } else if ( size.length >= 2) {
            charMap.push(word);
            lines++;
            if (lines >= size[1]) {
                console.log(JSON.stringify(createJson(size,charMap)));
                rl.close();
            }
        }
    }

    rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});
*/