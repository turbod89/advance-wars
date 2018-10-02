const blessed = require('blessed');
const { style, border} = require('../../styles/main');

const MainMenu = function ($scope) {

    const mainMenu = this;
    let _list = [];

    const optionsList = blessed.list({
        label: 'Main menu',
        top: 0,
        left: 'right',
        bottom: 0,
        width: '100%',
        // height: items.length + 2,
        align: 'center',
        keys: true,
        border,
        style,
    });

    $scope.focus.mainMenu = () => {
        optionsList.show();
        optionsList.focus();
        $scope.refresh();
    };

    this.parseList = function (list) {
        if (!Array.isArray(list)) {
            return list;
        } else if (list.length <= 0) {
            return list;
        } else if ( typeof list[0] !== 'object' || !('name' in list[0]) || !('items' in list[0])) {
            return list;
        }

        const parsedItems = [];

        list.forEach(section => {
            // separation
            if (false && parsedItems.length > 0) {
                parsedItems.push({
                    'label': '',
                });
            }

            // parse section
            const parsedSection = mainMenu.parseList(section.items);
            parsedSection.forEach(e => parsedItems.push(e));
        });

        _list = parsedItems;

        return parsedItems;
    };

    this.setItems = list => {
        const parsedList = parseList(list);
        optionsList.setItems(parsedList.map(item => item.label));
    };

    optionsList.on('select', function (e, i) {
        const item = _list[i];
        if (item && ('select' in item)) {
            return item.select();
        } else {

        }
    });

    this.setItems([
        {
            name: 'options',
            items: [
                {
                    'label': 'List maps',
                    'select': () => {
                        optionsList.hide();
                        $scope.focus.mapList();
                    },
                },
                {
                    'label': 'List parties',
                    'select': () => {
                        optionsList.hide();
                        $scope.focus.partyList();
                    },
                },
                {
                    'label': 'Change name',
                },
            ]
        },
        {
            name: 'system',
            items: [
                {
                    'label': 'Exit',
                    'select': () => {
                        if ('quit' in $scope) {
                            $scope['quit']();
                        }
                    }
                }
            ],
        },
    ]);


    optionsList.key(['escape', 'q'], (ch,key) => {
        $scope.quit();
    });


    return optionsList;
};

module.exports = MainMenu;