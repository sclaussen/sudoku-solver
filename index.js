'use strict';


// node index
main(process.argv);


function main(args) {
    let input1 = [
        ['5','3','.','.','7','.','.','.','.'],
        ['6','.','.','1','9','5','.','.','.'],
        ['.','9','8','.','.','.','.','6','.'],
        ['8','.','.','.','6','.','.','.','3'],
        ['4','.','.','8','.','3','.','.','1'],
        ['7','.','.','.','2','.','.','.','6'],
        ['.','6','.','.','.','.','2','8','.'],
        ['.','.','.','4','1','9','.','.','5'],
        ['.','.','.','.','8','.','.','7','9']
    ];

    let input2 = [
        ['.','.','.','.','.','2','9','.','.'],
        ['3','6','.','9','8','.','.','4','.'],
        ['8','.','1','4','.','.','.','6','7'],
        ['.','.','9','8','5','.','.','7','.'],
        ['.','3','7','.','.','.','8','1','.'],
        ['.','2','.','.','6','1','3','.','.'],
        ['9','7','.','.','.','4','1','.','8'],
        ['.','5','.','.','9','8','.','3','6'],
        ['.','.','3','5','.','.','.','.','.']
    ];

    sudokuSolver(input2);
}


function sudokuSolver(board) {
    let solved = false;
    while (!solved) {

        let unsolvedCells = [];

        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {

                // Skip processing the solved cells
                if (board[row][column] !== '.') {
                    continue;
                }

                // For unsolved cells, determine all the values in the
                // row, column, and matrix the cell is associated
                // with, then determine the numbers not in the
                // intersection of those values, which are the
                // remaining possible values for the cell.
                let rowValues = getRowValues(board, row);
                let columnValues = getColumnValues(board, column);
                let matrixValues = getMatrixValues(board, row, column);
                let possibleValuesRowColumn = getPossibleValues(rowValues.concat(columnValues).concat(matrixValues));

                unsolvedCells.push({
                    'row': row,
                    'column': column,
                    'possible': possibleValuesRowColumn
                });
            }
        }


        // Print out the board
        printBoard(board);


        // If there are no unsolved cells, return
        if (unsolvedCells.length === 0) {
            return board;
        }


        // If an unsolved cell only has one possible value, that is
        // its solution
        for (let cell of unsolvedCells) {
            if (cell.possible.length === 1) {
                console.log('    [' + cell.row + '][' + cell.column + '] = ' + cell.possible[0]);
                board[cell.row][cell.column] = cell.possible[0];
            }
        }
    }
}


function getRowValues(board, row) {
    let values = [];
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === '.') {
            continue;
        }
        values.push(board[row][i]);
    }
    return values;
}


function getColumnValues(board, column) {
    let values = [];
    for (let row = 0; row < 9; row++) {
        if (board[row][column] === '.') {
            continue;
        }
        values.push(board[row][column]);
    }
    return values;
}


function getMatrixValues(board, row, column) {
    let startingRow = 0;
    let startingColumn = 0;

    if (row < 3) {
        startingRow = 0;
    } else if (row < 6) {
        startingRow = 3;
    } else {
        startingRow = 6;
    }

    if (column < 3) {
        startingColumn = 0;
    } else if (column < 6) {
        startingColumn = 3;
    } else {
        startingColumn = 6;
    }

    let values = [];
    for (let i = startingRow; i < startingRow + 3; i++) {
        for (let j = startingColumn; j < startingColumn + 3; j++) {
            if (board[i][j] === '.') {
                continue;
            }
            values.push(board[i][j]);
        }
    }

    return values;
}


// Given an array of values containing some subset of numbers 1
// through 9 return the numbers 1 through 9 that are not conatined in
// the array.
function getPossibleValues(values) {
    let possibleValues = [];
    if (values.includes('1') === false) {
        possibleValues.push('1');
    }
    if (values.includes('2') === false) {
        possibleValues.push('2');
    }
    if (values.includes('3') === false) {
        possibleValues.push('3');
    }
    if (values.includes('4') === false) {
        possibleValues.push('4');
    }
    if (values.includes('5') === false) {
        possibleValues.push('5');
    }
    if (values.includes('6') === false) {
        possibleValues.push('6');
    }
    if (values.includes('7') === false) {
        possibleValues.push('7');
    }
    if (values.includes('8') === false) {
        possibleValues.push('8');
    }
    if (values.includes('9') === false) {
        possibleValues.push('9');
    }
    return possibleValues;
}


function printBoard(board) {
    console.log();
    process.stdout.write('        ');
    for (let column = 0; column < 9; column++) {
        process.stdout.write(' ' + column);
    }
    console.log();
    console.log();

    for (let row = 0; row < 9; row++) {
        process.stdout.write('     ' + row + '  ');
        for (let column = 0; column < 9; column++) {
            process.stdout.write(' ' + board[row][column]);
        }
        console.log();
    }

    console.log();
}
