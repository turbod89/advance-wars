const blessed = require('blessed');
const { style, border} = require('../styles/main');

const tileSets = require('../tilesSet');
const tileSet = tileSets[0];


const MapDisplay = function ($scope) {

    const mapDisplay = this;
    let map = {};
    let offset = [0,0];

    const box = blessed.box({
        align: 'left',
        label: 'Map',
        top: 0,
        bottom: 3,
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
        box.render();
        box.show();
        box.focus();
        $scope.ioClient.emit('get map',map_name);
        $scope.refresh();
    };

    box.key(['escape', 'q'], (ch,key) => {
        box.hide();
        $scope.focus.mapList();
    });

    box.key(['up','down','left','right'], (ch,key) => {

        let refresh = false;
        if (key.name === 'up' && offset[0] > 0) {
            offset[0]--;
            refresh = true;
        } else if (key.name === 'left' && offset[1] > 0) {
            offset[1]--;
            refresh = true;
        } else if (key.name === 'down' && offset[0] < map.size[0] - 1) {
            offset[0]++;
            refresh = true;
        } else if (key.name === 'right' && offset[1] < map.size[1] - 1) {
            offset[1]++;
            refresh = true;
        }

        if (refresh) {
            mapDisplay.display();
            $scope.refresh();
        }
    });

    $scope.ioClient.on('get map', mapData => {
        map = mapData;
        offset[0] = 0;
        offset[1] = 0;
        mapDisplay.display();
        $scope.refresh();
    });


    this.display = () => {
        const height = box.height -2;
        const width = box.width -2;
        const lines = box.getLines();
        lines.forEach ((line,line_cnt) => {
            box.clearLine(line_cnt);
        });

        let s = '';
        for (let i = offset[0], line_cnt = 0; i < map.size[0] && (i-offset[0]) * tileSet.size[0] < height; i++) {
            for (let y = 0; y < tileSet.size[0] && (i-offset[0]) *tileSet.size[0] + y < height; y++, line_cnt++) {

                let line = '';
                for (let j = offset[1]; j < map.size[1] && (j-offset[1]) * tileSet.size[1] < width; j++) {

                    const cell = map.cells ? map.cells[i * map.size[1] + j] : map[i * map.size[1] + j];

                    for (let x = 0; x < tileSet.size[1] && (j-offset[1])*tileSet.size[1] + x < width; x++) {
                        const tileName = cell.terrain.type || cell.terrain;
                        const tile = tileSet.terrains[tileName] || tileSet.terrains['Unknown'];
                        line += tile.chars[y][x];
                    }
                }
                line += '{'+style.fg+'-fg}{'+style.bg+'-bg}';
                box.setLine(line_cnt,line);
                s += line + '\n';
            }
        }
    };


    box.hide();

    return box;

};

module.exports = MapDisplay;