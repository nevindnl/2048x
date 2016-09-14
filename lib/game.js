import Cell from './cell.js';
import Board from './board.js';

class Game{
	constructor(ctx){
		this.ctx = ctx;
		
		this.b = 2;
		this.size = 4;
		this.min_dim = 100;
		this.max_dim = 1000;

		this.board = new Board(this.b, this.size);

		this.dim = Math.min(this.max_dim, this.size * this.min_dim);
		this.cellDim = this.dim / this.size;
	}

	draw(){
		const dim = this.dim + 'px';
		document.getElementsByClassName('grid')[0].style.width = dim;
		document.getElementsByClassName('grid')[0].style.height = dim;
		document.getElementsByTagName('canvas')[0].height = dim.slice(0,-2);
		document.getElementsByTagName('canvas')[0].width = dim.slice(0,-2);

		const cellDim = this.cellDim - 12 + 'px';
		for (let i = 0; i < Math.pow(this.size, 2); i++){
			const div = document.createElement('div');
			div.style.width = cellDim;
			div.style.height = cellDim;
			document.getElementsByClassName('grid')[0].appendChild(div);
		}

		for (let i = 0; i < 2; i++){
			const n = Math.random() < .9 ? 1 : 2;
			const pos = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
			this.board.set(...pos, new Cell(n, pos));
		}

		this.board.draw(this.ctx, this.cellDim);
	}
}

export default Game;
