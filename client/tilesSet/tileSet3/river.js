const Tile = {
    neutral: {
        frames: 4,
        frameRate: 500,
        chars: [
            [
                [
                    '{#ffffff-fg}{#387593-bg}~',
                ],
            ],
            [
                [
                    '{#ffffff-fg}{#387593-bg}-',
                ],
            ],
            [
                [
                    '{#ffffff-fg}{#387593-bg} ',
                ],
            ],
            [
                [
                    '{#ffffff-fg}{#387593-bg}-',
                ],
            ],
        ],
    },
    cursor: {
        frames: 4,
        frameRate: 1000,
        chars: [
            [
                [
                    '{#ffffff-fg}{#50abd8-bg}~',
                ],

            ],
            [
                [
                    '{#ffffff-fg}{#50abd8-bg}-',
                ],
            ],
            [
                [
                    '{#ffffff-fg}{#50abd8-bg}~',
                ],
            ],
            [
                [
                    '{#ffffff-fg}{#50abd8-bg}-',
                ],
            ],
        ],
    }
};

module.exports = Tile;