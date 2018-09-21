const Map = function () {

    const args = Array.prototype.slice.call(arguments);
    const $a = args[0] || {};

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

};

Object.defineProperties(Map.prototype,{
    'getCellIndex': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function (i, j) {
            return (i - this.offset[0])*this.size[1] + (j - this.offset[1])
        }
    },
    'getCellCoordinates': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function (targetCell) {
            const index = typeof targetCell === 'number' ?
                    targetCell
                 :
                    this.cells.findIndex(cell => cell === targetCell)
                ;

            return ( index < 0 || index >= this.size[0]*this.size[1] ) ? null : [ Math.floor(index / this.offset[0]),  index % this.offset[0]];
        }
    },
    'getCell': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function (i, j = null) {
            if (j === null && typeof i === 'number') {
                return this.cells[i]
            } else if (j === null && Array.isArray(i)) {
                return this.getCell(i[0],i[1]);
            }

            if ( i < this.offset[0] || i >= this.offset[0] + this.size[0] || j < this.offset[1] || j >= this.offset[1] + this.size[1]) {
                return null;
            }

            return this.cells[this.getCellIndex(i,j)];
        }
    },
    'build': {
        'enumerable': true,
        'configurable': false,
        'writable': false,
        'value': function ( data ) {

            const {terrains, units} = data;

            this.cells.forEach( cell => {
                cell.terrain = terrains[cell.terrain];

                if (cell.unit !== null) {
                    cell.unit.type = units[cell.unit.type];
                }
            });

            return this;
        },
    },
});

module.exports = Map;