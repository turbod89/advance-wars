const blessed = require('blessed');
const { style, border} = require('../../../styles/main');

const tileSets = require('../../../tilesSet/index');
const tileSet = tileSets[1];


const MapDisplay = function ($scope) {

    const mapDisplay = this;
    let map = {};
    let offset = [0,0];
    let cursor = [0,0];

    let boxHeight = 0;
    let boxWidth = 0;

    this.frameInterval = null;
    this.frameRate = 100;
    this.frameCounter = 0;

    const box = blessed.box({
        align: 'left',
        label: 'Map',
        top: 0,
        bottom: 0,
        left: '20%',
        right: 0,
        keys: true,
        tags: true,
        type: 'overlay',
        border,
        style,
    });

    $scope.focus.mapDisplay = map_name => {
        box.setLabel(map_name);
        $scope.refresh();
        box.show();
        box.focus();
        $scope.ioClient.emit('get map',map_name);
        $scope.refresh();
    };

    box.on('prerender', function () {
       boxHeight = box.height-2;
       boxWidth = box.width- 2;
    });

    box.key(['escape', 'q'], (ch,key) => {
        box.hide();
        $scope.focus.mapList();
    });

    box.key(['up','down','left','right'], (ch,key) => {


        if (key.name === 'up' && cursor[0] > 0) {
            cursor[0]--;
        } else if (key.name === 'left' && cursor[1] > 0) {
            cursor[1]--;
        } else if (key.name === 'down' && cursor[0] < map.size[0] - 1) {
            cursor[0]++;
        } else if (key.name === 'right' && cursor[1] < map.size[1] - 1) {
            cursor[1]++;
        }


        if (cursor[0] < offset[0]) {
            offset[0] = cursor[0];
        } else if (cursor[1] < offset[1]) {
            offset[1]  = cursor[1];
        } else if (cursor[0] >= offset[0] + Math.floor(boxHeight/tileSet.size[0]) ) {
            offset[0] = cursor[0] - Math.floor(boxHeight/tileSet.size[0]) + 1;
        } else if (cursor[1] >= offset[1] + Math.floor(boxWidth/tileSet.size[1]) ) {
            offset[1] = cursor[1] - Math.floor(boxWidth/tileSet.size[1]) + 1;
        }

    });

    $scope.ioClient.on('get map', mapData => {
        map = mapData;
        offset[0] = 0;
        offset[1] = 0;
        cursor[0] = 0;
        cursor[1] = 0;
        clearInterval(this.frameInterval);
        this.frameCounter = 0;
        this.frameInterval = setInterval( () => this.display(), this.frameRate );
        $scope.refresh();
    });


    this.display = () => {

        const lines = box.getLines();
        lines.forEach ((line,line_cnt) => {
            box.clearLine(line_cnt);
        });

        let s = '';
        for (let i = offset[0], line_cnt = 0; i < map.size[0] && (i-offset[0]) * tileSet.size[0] < boxHeight; i++) {
            for (let y = 0; y < tileSet.size[0] && (i-offset[0]) *tileSet.size[0] + y < boxHeight; y++, line_cnt++) {

                let line = '';
                for (let j = offset[1]; j < map.size[1] && (j-offset[1]) * tileSet.size[1] < boxWidth; j++) {

                    const cell = map.cells ? map.cells[i * map.size[1] + j] : map[i * map.size[1] + j];

                    for (let x = 0; x < tileSet.size[1] && (j-offset[1])*tileSet.size[1] + x < boxWidth; x++) {
                        const tileName = cell.terrain.type || cell.terrain;
                        const tile = tileSet.terrains[tileName] || tileSet.terrains['Unknown'];
                        if ( cursor[0] === i && cursor[1] === j && ('cursor' in tile)) {
                            line += tile.cursor.chars[this.frameCounter % tile.cursor.frames][y][x];
                        } else {
                            line += tile.neutral.chars[this.frameCounter % tile.neutral.frames][y][x];
                        }
                    }
                }
                line +='{'+(style.fg || 'white')+'-fg}{'+ (style.bg || 'black')+'-bg}';
                box.setLine(line_cnt,line);
                s += line + '\n';
            }
        }
        this.frameCounter++;
        $scope.refresh();
    };


    box.hide();

    return box;

};

module.exports = MapDisplay;