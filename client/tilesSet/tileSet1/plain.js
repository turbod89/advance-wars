/*
const blessed = require('blessed');

const Tile = function (top,left) {
    const box = blessed.box({
        top,
        left,
        height: 2,
        width: 3,
        tags: true,
    });

    box.setContent('{#000000-fg}{#528938-bg}. `\n  ,');

    return box;
};
*/

const Tile = {
    chars: [
        [
            '{#000000-fg}{#528938-bg}.',
            '{#000000-fg}{#528938-bg} ',
            '{#000000-fg}{#528938-bg} ',
        ],

        [
            '{#000000-fg}{#528938-bg} ',
            '{#000000-fg}{#528938-bg} ',
            '{#000000-fg}{#528938-bg}.',
        ],
    ],
};

module.exports = Tile;