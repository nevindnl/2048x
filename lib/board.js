import Cell from './cell.js';
import Util from './util.js';

class Board{
  constructor({base, size, highProb}){
		this.base = base;
		this.size = size;
		this.highProb = highProb;

		this.grid = [];
		for(let i = 0; i < size; i++){
			this.grid.push(new Array(size));
		}

		this.addRandom();
  }

	addRandom(){
		const positions = [];
		while(positions.length < 2){
			const pos = [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size)];
			if (!positions.includes(JSON.stringify(pos))){
				const n = Math.random() < this.highProb ? 1 : 2;
				this.board.set(...pos, new Cell(n, ...pos));

				positions.push(JSON.stringify(pos));
			}
		}
	}

	get(i, j){
		return this.grid[i][j];
	}

	set(i, j, val){
		this.grid[i][j] = val;
	}

	draw(ctx, cellDim){
		const cells = this.grid.reduce()
	}





	col(j){
		return this.grid.map(row => row[j]);
	}

	tilt(dir){
		let [x, y] = dir;
		let newGrid;

		if (x !== 0){
			newGrid = this.grid.map((row, i) => {
				tiltSlice(row, x);
			});
		} else {
			newGrid = Util.transpose(Util.transpose(this.grid.map((col, j) => {
				tiltSlice(col, y);
			})));
		}

		function tiltSlice(slice){
			const newSlice = [];

			let i = 0;
			while (i < slice.length){
				if (slice[i] !== undefined){
					if(slice[i + 1] !== undefined && slice[i - 1].n === slice[i].n){
						newSlice.push()
					}
				}
			}

			return newSlice;
		}


		return new Board(this.b, this.size, newGrid);
	}


}

export default Board;
