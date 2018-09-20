const Map = function () {

    const args = Array.prototype.slice.call(arguments);
    const $a = args[0] || {};
    const terrains = $a['terrains'];
    const units = $a['units'];

    Object.defineProperties(this,{
        'size': {
            'enumerable': true,
            'configurable': false,
            'writable': false,
            'value': $a['size'] || []
        },
        'offset': {
            'enumerable': true,
            'configurable': false,
            'writable': false,
            'value': $a['offset'] || []
        },
        'dim': {
            'enumerable': true,
            'configurable': false,
            'writable': false,
            'value': 2
        },
        'cells': {
            'enumerable': true,
            'configurable': false,
            'writable': false,
            'value': $a['cells'] || []
        },
    });

    //
    //
    //

    this.cells.forEach( cell => {
        cell.terrain = terrains[cell.terrain];

        if (cell.unit !== null) {
            cell.unit.type = units[cell.unit.type];
        }
    });
};

Object.defineProperties(Map.prototype,{
    'cellIndex': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function (i, j) {
            return (i - this.offset[0])*this.size[1] + (j - this.offset[1])
        }
    },
    'cell': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function (i, j = null) {
            if (j === null && typeof i === 'number') {
                return this.cells[i]
            } else if (j === null && Array.isArray(i)) {
                return this.cell(i[0],i[1]);
            }

            if ( i < this.offset[0] || i >= this.offset[0] + this.size[0] || j < this.offset[1] || j >= this.offset[1] + this.size[1]) {
                return null;
            }

            return this.cells[this.cellIndex(i,j)];
        }
    },
});

module.exports = Map;