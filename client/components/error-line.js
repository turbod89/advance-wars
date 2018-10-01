const blessed = require('blessed');
const { style, border} = require('../styles/main');

const ErrorLine = function ($scope) {

    const errorLine = blessed.box({
        orientation: 'horizontal',
        align: 'left',
        label: 'Error Line',
        bottom: 0,
        left: 0,
        height: 3,
        width: '100%',
        border,
        style,
    });

    $scope.ioClient.on('onError', msg => {
        errorLine.setText(msg);
    });

    return errorLine;
};

module.exports = ErrorLine;