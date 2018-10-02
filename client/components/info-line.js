const blessed = require('blessed');
const { style, border} = require('../styles/main');

const InfoLine = function ($scope) {

    const infoLine = blessed.box({
        orientation: 'horizontal',
        align: 'left',
        //label: 'Info Line',
        top: 0,
        left: 0,
        height: 3,
        width: '100%',
        tags: true,
        border,
        style,
    });

    $scope.ioClient.on('whoiam', msg => {
        $scope.me = {
            name: msg,
        };
        infoLine.setContent('Welcome {bold}'+$scope.me.name+'{/bold}!');
    });

    $scope.ioClient.emit('whoiam');

    return infoLine;
};

module.exports = InfoLine;