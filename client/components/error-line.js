const blessed = require('blessed');
const { style, border} = require('../styles/main');

const ErrorLine = function (ioClient) {

    const errorLine = blessed.box({
        orientation: 'horizontal',
        align: 'left',
        label: '',
        bottom: 0,
        left: 0,
        height: 3,
        width: '100%',
        border,
        style,
    });

    ioClient.on('onError', msg => {
        errorLine.setText(msg);
    });

    return errorLine;
};

module.exports = ErrorLine;