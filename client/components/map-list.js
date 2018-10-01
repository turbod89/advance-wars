const blessed = require('blessed');
const { style, border} = require('../styles/main');

const MapList = function ($scope) {

    const mapList = this;
    let _list = [];

    const list = blessed.list({
        label: 'Maps',
        top: 0,
        left: 0,
        bottom: 3,
        width: '20%',
        // height: items.length + 2,
        align: 'left',
        keys: true,
        border,
        style: {
            ...style,
            selected: {
                fg: 'red',
            }
        },
    });

    $scope.focus.mapList = () => {
        list.focus();
        list.show();
        $scope.refresh();
        $scope.ioClient.emit('get map files');
    };

    list.on('select', function (e, i) {
        const item = _list[i];
        if (item && ('select' in item)) {
            return item.select();
        } else {

        }
    });


    $scope.ioClient.on('get map files', function (mapFiles) {
        const parsed = mapFiles.map(mapFile => {
            return {
                'label': mapFile,
                'select': () => {
                    $scope.focus.mapDisplay(mapFile);
                }
            }
        });

        parsed.push({
            'label': 'Back',
            'select': () => {
                $scope.focus.mainMenu();
                list.hide();
                $scope.refresh();
            },
        });

        _list = parsed;

        list.setItems(parsed.map(e => e.label));
    });


    list.key(['escape', 'q'], (ch,key) => {
        $scope.focus.mainMenu();
        list.hide();
        $scope.refresh();
    });

    $scope.ioClient.emit('get map files');

    list.hide();

    return list;
};

module.exports = MapList;