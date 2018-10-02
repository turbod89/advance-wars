const Tile = {
    neutral: {
        frames: 1,
        chars: [
            [
                [
                    '{#000000-fg}{#528938-bg}.',
                    ' ',
                    ' {/#528938-bg}{/#000000-fg}',
                ],
                [
                    '{#000000-fg}{#528938-bg} ',
                    ' ',
                    '.{/#528938-bg}{/#000000-fg}',
                ],
            ],
        ],
    },
    cursor: {
        frames: 1,
        chars: [
            [
                [
                    '{#000000-fg}{#74cc4b-bg}.',
                    ' ',
                    ' {/#74cc4b-bg}{/#000000-fg}',
                ],

                [
                    '{#000000-fg}{#74cc4b-bg} ',
                    ' ',
                    '.{/#74cc4b-bg}{/#000000-fg}',
                ],
            ],

        ],
    }
};

module.exports = Tile;