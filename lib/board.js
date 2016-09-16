import Cell from './cell';
import Util from './util';

class Board{
  constructor({size, highProb}){
		this.size = size;
		this.highProb = highProb;

		this.grid = Util.squareMatrix(size, new Cell(-1));

		this.addRandom(2);
  }

	get(i, j){
		if (i < 0 || j < 0 || i >= this.size || j >= this.size){
			return undefined;
		} else {
			return this.grid[i][j];
		}
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

	someCell(cb){
		return this.grid.some((row, i) => (
			row.some((cell, j) => (
				cb(cell, i, j)
			))
		));
	}

	adjCells(i, j){
		const cells = [];
		[-1, 1].forEach(d => {
			cells.push(this.get(i + d, j));
			cells.push(this.get(i, j + d));
		});
		return cells.filter(cell => cell !== undefined && cell.n !== -1);
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

	draw(ctx, cellDim, base){
		this.forEachCell(cell => {
			cell.draw(ctx, cellDim, base);
		});
	}

	tilt(i, j){
		function toLeft(){
			if (j !== 0){
				this.grid = Util.transpose(this.grid);
			}
			if (i + j > 0){
				this.grid = this.grid.map(row => row.reverse());
			}
		}

		function fromLeft(){
			if (i + j > 0){
				this.grid = this.grid.map(row => row.reverse());
			}
			if (j !== 0){
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
			const tilted = row.filter(cell => cell.n !== -1);

			//merge
			let j = 0;
			while(j < tilted.length - 1){
				let [cell, nextCell] = tilted.slice(j, j + 2);

				if (cell.n === nextCell.n){
					cell.n += 1;
					cell.merged = true;
					tilted.splice(j + 1, 1);
				}

				j += 1;
			}

			//append spaces as needed
			while(tilted.length < this.size){
				tilted.push(new Cell(-1));
			}

			return tilted;
		});
	}

	updatePositions(){
		let updated = false;

		this.forEachCell((cell, i, j) => {
			if (cell.n !== -1){
				if (cell.merged){
					cell.merged = false;
					updated = true;
				}
				if (cell.i !== i || cell.j !== j){
					updated = true;
				}
				cell.i = i;
				cell.j = j;
			}
		});

		return updated;
	}

	full(){
		return !this.someCell(cell => cell.n === -1);
	}

	over(){
		return this.full() && !this.someCell((cell, i, j) => (
				this.adjCells(i, j).some(otherCell => cell.n === otherCell.n)
		));
	}

	won(){
		return this.someCell(cell => cell.n === 11);
	}
}

export default Board;
