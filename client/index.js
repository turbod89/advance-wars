const blessed = require('blessed');
const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:8000");

const { MainLayout, InfoLine, ErrorLine } = require('./components');

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
const mainLayout = MainLayout($scope);
const infoLine = InfoLine($scope);
const errorLine = ErrorLine($scope);

screen.append(mainLayout);
screen.append(infoLine);
screen.append(errorLine);

screen.key(['C-c'], (ch,key) => {
    $scope.quit();
});

$scope.focus.mainMenu();

screen.render();