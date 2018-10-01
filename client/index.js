const blessed = require('blessed');
const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:8000");

const { ErrorLine, MainMenu, MapList, MapDisplay } = require('./components');

// Create a screen object.
const screen = blessed.screen({
    smartCSR: true
});

screen.title = 'Client';

const $scope = {};

$scope.screen = screen;
$scope.ioClient  = ioClient;
$scope.focus = $scope.focus || {};

$scope.quit = function() {
    screen.destroy();
    return process.exit(0);
};

$scope.refresh = () => screen.render();
const mainMenu = MainMenu($scope);
const errorLine = ErrorLine($scope);
const mapDisplay = MapDisplay($scope);
const mapList = MapList($scope);

screen.append(errorLine);
screen.append(mapDisplay);
screen.append(mapList);
screen.append(mainMenu);

screen.key(['escape', 'q', 'C-c'], (ch,key) => {

    if (mainMenu.focused) {
        $scope.quit();
    }

});

$scope.focus.mainMenu();

screen.render();