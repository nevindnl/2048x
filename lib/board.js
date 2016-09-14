import Cell from './cell.js';

const COLORS = {
	1: 'red',
	2: 'orange',
	3: 'yellow',
	4: 'greed'
};

class Board{
  constructor(b, size){
		this.b = b;

    this.grid = [];
		for(let i = 0; i < size; i++){
			this.grid.push(new Array(size));
		}
  }

	draw(ctx, cellDim){
		const cells = this.grid.reduce((arr, row) => arr.concat(row), []);
		cells.forEach(cell => {
			if (cell !== undefined){
				ctx.fillStyle = COLORS[cell.n];
				ctx.fillRect(cell.i * cellDim, cell.j * cellDim, cellDim, cellDim);
			}
		});
	}

	get(i, j){
		return this.grid[i][j];
	}

	set(i, j, val){
		this.grid[i][j] = val;
	}
}

export default Board;
