const blessed = require('blessed');
const { style, border} = require('../../styles/main');

const PartyList = function ($scope) {

    const partyList = this;
    let _list = [];

    const table = blessed.list({
        label: 'Parties',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        // height: items.length + 2,
        align: 'center',
        keys: true,
        border,
        style: {
            ...style,
            selected: {
                fg: 'red',
            }
        },
    });

    $scope.focus.partyList = () => {
        table.focus();
        table.show();
        $scope.refresh();
        $scope.ioClient.emit('get parties');
    };

    table.on('select', function (e, i) {
        const item = _list[i];
        if (item && ('select' in item)) {
            return item.select();
        } else {

        }
    });


    $scope.ioClient.on('get parties', function (partiesData) {
        const parsed = partiesData.map(partyData => {
            return {
                'label':`${partyData.name} at ${partyData.map} by @${partyData.owner}`,
                'select': () => {
                    $scope.focus.mapDisplay(partyData);
                }
            }
        });

        parsed.push({
            'label': 'New',
            'select': () => {
                $scope.focus.createPartyForm();
                table.hide();
                $scope.refresh();
            },
        });

        parsed.push({
            'label': 'Back',
            'select': () => {
                $scope.focus.mainMenu();
                table.hide();
                $scope.refresh();
            },
        });

        _list = parsed;

        table.setItems(parsed.map(e => e.label));
    });


    table.key(['escape', 'q'], (ch,key) => {
        $scope.focus.mainMenu();
        table.hide();
        $scope.refresh();
    });

    $scope.ioClient.emit('get parties');

    table.hide();

    return table;
};

module.exports = PartyList;