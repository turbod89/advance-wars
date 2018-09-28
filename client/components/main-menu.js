const blessed = require('blessed');
const { style, border} = require('../styles/main');

const items = [
    'list maps',
    'list parties',
    'change name',
];

const MainMenu = function (ioClient) {

    const optionsList = blessed.list({
        top: 0,
        left: 'right',
        // bottom: 0,
        width: '100%',
        height: items.length + 2,
        align: 'left',
        keys: true,
        border,
        style: {
            ...style,
            selected: {
                fg: 'red',
            }
        },
        items,
    });

    const systemList = blessed.list({
        top: items.length + 3,
        left: 'right',
        // bottom: 0,
        width: '100%',
        height: 3,
        align: 'left',
        keys: true,
        border,
        style: {
            ...style,
            selected: {
                fg: 'red',
            }
        },
        items: [
            'exit',
        ],
    });

    const mainBox = blessed.box({
        label: '',
        top: 1,
        left: 'right',
        // bottom: 0,
        width: 20,
        height: items.length + 2,
        align: 'left',
        keys: true,
        border,
        style,
    });


    mainBox.append(optionsList);
    mainBox.append(systemList);
    

    return mainBox;
};

module.exports = MainMenu;