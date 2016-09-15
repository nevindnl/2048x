import Board from './board.js';

class Game{
	constructor(ctx){
		this.ctx = ctx;

		this.base = 2;
		this.size = 4;
		this.minDim = 100;
		this.maxDim = 500;
		this.highProb = .9;

		this.board = new Board({size: this.size, base: this.base, highProb: this.highProb});

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

		const gridCellBorder = 6; //mutable

		const gridCellDim = this.cellDim - 2 * gridCellBorder + 'px';
		for (let i = 0; i < Math.pow(this.size, 2); i++){
			const div = document.createElement('div');
			div.style.width = gridCellDim;
			div.style.height = gridCellDim;
			document.getElementsByClassName('grid')[0].appendChild(div);
		}

		this.board.draw(this.ctx, this.cellDim);
	}

	installHandlers(){
		document.addEventListener('keydown', e => {
			switch(e.key){
				case 'ArrowUp':
				case 'w':
				case 'j':
					this.tilt([0, -1]);
					break;
				case 'ArrowDown':
				case 's':
				case 'k':
					this.tilt([0, 1]);
					break;
				case 'ArrowLeft':
				case 'a':
				case 'h':
					this.tilt([-1, 0]);
					break;
				case 'ArrowRight':
				case 'd':
				case 'l':
					this.tilt([1, 0]);
					break;
				default:
					break;
			}
		});
	}

	tilt(vec){
		const newBoard = this.board.tilt(vec);
	}
}

export default Game;
