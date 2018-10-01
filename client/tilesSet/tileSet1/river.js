const blessed = require('blessed');
/*
const Tile = function (top,left) {
    const box = blessed.box({
        top,
        left,
        height: 2,
        width: 3,
        tags: true,
    });

    box.setContent('{#ffffff-fg}{#387593-bg}~-~\n-~-');

    return box;
};
*/
const Tile = {
    chars: [
        [
            '{#ffffff-fg}{#387593-bg}~',
            '{#ffffff-fg}{#387593-bg}-',
            '{#ffffff-fg}{#387593-bg}~',
        ],
        [
            '{#ffffff-fg}{#387593-bg}-',
            '{#ffffff-fg}{#387593-bg}~',
            '{#ffffff-fg}{#387593-bg}-',
        ],
    ]
};

module.exports = Tile;