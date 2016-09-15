import Board from './board.js';

class Game{
	constructor(ctx){
		this.ctx = ctx;

		this.base = 2;
		this.size = 6;
		this.minDim = 100;
		this.maxDim = 500;
		this.highProb = .9;

		this.board = new Board({size: this.size, highProb: this.highProb});

		this.dim = Math.min(this.maxDim, this.size * this.minDim);
		this.cellDim = this.dim / this.size;
	}

	start(){
		this.draw();
		this.installHandlers();
	}

	draw(){
		document.getElementsByClassName('grid')[0].style.width = this.dim + 'px';
		document.getElementsByClassName('grid')[0].style.height = this.dim + 'px';
		document.getElementsByTagName('canvas')[0].height = this.dim;
		document.getElementsByTagName('canvas')[0].width = this.dim;

		const gridCellBorder = 6; //styling

		const gridCellDim = this.cellDim - 2 * gridCellBorder + 'px';
		for (let i = 0; i < Math.pow(this.size, 2); i++){
			const div = document.createElement('div');
			div.style.width = gridCellDim;
			div.style.height = gridCellDim;
			document.getElementsByClassName('grid')[0].appendChild(div);
		}

		this.drawBoard();
	}

	drawBoard(){
		this.ctx.clearRect(0, 0, this.dim, this.dim);
		this.board.draw(this.ctx, this.cellDim, this.base);
	}

	installHandlers(){
		const game = this;
		document.addEventListener('keydown', e => {
			switch(e.key){
				case 'ArrowUp':
				case 'w':
				case 'j':
					game.tilt(0, -1);
					break;
				case 'ArrowDown':
				case 's':
				case 'k':
					game.tilt(0, 1);
					break;
				case 'ArrowLeft':
				case 'a':
				case 'h':
					game.tilt(-1, 0);
					break;
				case 'ArrowRight':
				case 'd':
				case 'l':
					game.tilt(1, 0);
					break;
				default:
					break;
			}
		});
	}

	tilt(i, j){
		this.board.tilt(i, j);
		if (this.board.updatePositions()){
			this.board.addRandom();
			this.drawBoard();
		}
	}
}

export default Game;
