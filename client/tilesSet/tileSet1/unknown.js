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
            '{#350000-fg}{#000000-bg}?',
            '{#350000-fg}{#000000-bg}?',
            '{#350000-fg}{#000000-bg}?',
        ],
        [
            '{#350000-fg}{#000000-bg}?',
            '{#350000-fg}{#000000-bg}?',
            '{#350000-fg}{#000000-bg}?',
        ],
    ]
};

module.exports = Tile;