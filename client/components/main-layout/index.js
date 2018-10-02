const blessed = require('blessed');

const MainMenu = require('./main-menu');
const MapList = require('./map-list');
const MapDisplay = require('./map-display');
const PartyList = require('./party-list');
const CreatePartyForm = require('./party-create');

const { style, border} = require('../../styles/main');

const MainLayout = function ($scope) {

    const mainLayout = blessed.box({
        align: 'left',
        label: '',
        bottom: 3,
        top: 3,
        left: 0,
        right: 0,
        style,
    });

    const mainMenu = MainMenu($scope);
    const mapDisplay = MapDisplay($scope);
    const mapList = MapList($scope);
    const partyList = PartyList($scope);
    const createPartyForm = CreatePartyForm($scope);

    mainLayout.append(mapDisplay);
    mainLayout.append(mapList);
    mainLayout.append(mainMenu);
    mainLayout.append(partyList);
    mainLayout.append(createPartyForm);

    return mainLayout;
};

module.exports = MainLayout;