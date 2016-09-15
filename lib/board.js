import Cell from './cell.js';
import Util from './util.js';

class Board{
  constructor({size, highProb}){
		this.size = size;
		this.highProb = highProb;

		this.grid = Util.squareMatrix(size, new Cell(-1));
		this.addRandom(2);
  }

	addRandom(toAdd = 1){
		let added = 0;
		while(added < toAdd){
			const [i, j] = [Math.floor(Math.random() * this.size),
				Math.floor(Math.random() * this.size)];

			if (this.get(i, j).n === -1){
				const n = Math.random() < this.highProb ? 1 : 2;
				this.set(i, j, new Cell(n, i, j));

				added += 1;
			}
		}
	}

	get(i, j){
		return this.grid[i][j];
	}

	set(i, j, val){
		this.grid[i][j] = val;
	}

	forEachCell(cb){
		this.grid.forEach((row, i) => {
			row.forEach((cell, j) => {
				cb(cell, i, j);
			});
		});
	}

	draw(ctx, cellDim, base){
		this.forEachCell(cell => {
			cell.draw(ctx, cellDim, base);
		});
	}

	tilt(i, j){
		function toLeft(){
			if(j !== 0){
				this.grid = Util.transpose(this.grid);
			}
			if(i + j > 0){
				this.grid = this.grid.map(row => row.reverse());
			}
		}

		function fromLeft(){
			if(i + j > 0){
				this.grid = this.grid.map(row => row.reverse());
			}
			if(j !== 0){
				this.grid = Util.transpose(this.grid);
			}
		}

		toLeft.call(this);
		this.leftTilt();
		fromLeft.call(this);
	}

	leftTilt(){
		this.grid = this.grid.map(row => {
			//remove spaces
			row = row.filter(cell => cell.n !== -1);

			//merge
			let j = 0;
			while(j < row.length - 1){
				let [cell, nextCell] = row.slice(j, j + 2);

				if(cell.n === nextCell.n){
					cell.n += 1;
					cell.merged = true;
					row.splice(j + 1, 1);
				}

				j += 1;
			}

			//add back spaces
			while(row.length < this.size){
				row.push(new Cell(-1));
			}

			return row;
		});
	}

	updatePositions(){
		let updated = false;

		this.forEachCell((cell, i, j) => {
			if (cell.n !== -1){
				if(cell.merged){
					cell.merged = false;
					updated = true;
				}
				if(cell.i !== i || cell.j !== j){
					updated = true;
				}
				cell.i = i;
				cell.j = j;
			}
		});

		return updated;
	}


}

export default Board;
