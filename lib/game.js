import Board from './board';
import $ from 'jquery';

class Game{
	constructor(ctx){
		this.ctx = ctx;

		this.base = 2;
		this.size = 4;
		this.minDim = 100;
		this.maxDim = 700;
		this.highProb = .9;

		this.board = new Board({size: this.size, highProb: this.highProb});

		this.dim;
		this.cellDim;
		this.cellBorder;

		this.setDim();

		this.gridBorder = 4;
		this.gridColor = "5b6f87";

		this.infinite = false;
	}

	setDim(){
		this.cellDim = parseInt(Math.min(this.maxDim, this.size * this.minDim) / this.size);
		this.dim = this.cellDim * this.size;

		if (this.size >= 15){
			this.cellBorder = 1;
		} else if (this.size >= 8){
			this.cellBorder = 2;
		} else {
			this.cellBorder = 4;
		}
	}

	start(){
		document.getElementsByClassName('new-game')[0].addEventListener('click', this.resetBoard.bind(this));
		document.getElementById('toggle').addEventListener('change', this.toggleInfinite.bind(this));
		document.getElementsByTagName('form')[0].addEventListener('submit', e => {
			e.preventDefault();
			const base = e.target[1].value;
			const size = e.target[2].value;

			if (base !== ''){
				this.changeBase.call(this, parseFloat(base));
			}
			if (size !== ''){
				this.changeSize.call(this, parseFloat(size));
			}
		});

		this.draw();
		this.installHandlers();
	}

	draw(){
		this.drawGrid();
		this.drawBoard();
	}

	drawGrid(){
		document.querySelectorAll('.grid-container div').forEach(div => {
			div.remove();
		});

		const grid = document.getElementsByClassName('grid-container')[0];
		const canvas = document.getElementsByTagName('canvas')[0];

		grid.style.width = this.dim + 'px';
		grid.style.height = this.dim + 'px';
		grid.style.border = `${this.gridBorder}px solid #${this.gridColor}`;
		canvas.width = this.dim;
		canvas.height = this.dim;

		const cellDim = this.cellDim - 2 * this.cellBorder + 'px';
		for (let i = 0; i < Math.pow(this.size, 2); i++){
			const div = document.createElement('div');
			div.style.width = cellDim;
			div.style.height = cellDim;
			div.style.border = `${this.cellBorder}px solid #${this.gridColor}`;
			grid.appendChild(div);
		}
	}

	drawBoard(){
		this.ctx.clearRect(0, 0, this.dim, this.dim);
		this.board.draw(this.ctx, this.cellDim, this.base);
	}

	installHandlers(){
		$(document).off();

		const game = this;
		const keys = ['ArrowUp', 'w', 'j', 'ArrowDown', 's', 'k', 'ArrowLeft',
			'a', 'h', 'ArrowRight', 'd', 'l'];
		$(document).on('keydown', e => {
			if (keys.includes(e.key)){
				e.preventDefault();
			}
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

	resetBoard(){
		this.board = new Board({size: this.size, highProb: this.highProb});

		this.draw();
		this.installHandlers();
	}

	tilt(i, j){
		this.board.tilt(i, j);

		if (this.board.updatePositions()){
			if (!this.infinite && this.board.won()){
				this.end('won');
				return;
			}

			if (!this.board.full()){
				this.board.addRandom();
			}

			if (this.board.over()){
				this.end('over');
			} else {
				this.drawBoard();
			}
		}
	}

	end(type){
		$(document).off();

		this.drawBoard();

		const div = document.createElement('div');
		div.className = 'alert';

		const caption = document.createElement('caption');
		const button = document.createElement('button');

		let captionText = type === 'won' ? 'You win.' : 'Game over.';
		let buttonText = type === 'won' ? 'Play again' : 'Try again';
		captionText = document.createTextNode(captionText);
		buttonText = document.createTextNode(buttonText);

		caption.appendChild(captionText);
		button.appendChild(buttonText);

		button.addEventListener('click', () => {
			document.getElementsByClassName('alert')[0].remove();
			this.resetBoard();
		});

		document.getElementsByClassName('grid-container')[0].appendChild(div);
		document.getElementsByClassName('alert')[0].appendChild(caption);
		document.getElementsByClassName('alert')[0].appendChild(button);
	}

	changeBase(base){
		if (base !== this.base){
			this.base = base;

			this.resetBoard();
		}
	}

	changeSize(size){
		if (size >= 3 && size <= 50 && size !== this.size){
			this.size = size;
			this.setDim();

			this.resetBoard();
		}
	}

	toggleInfinite(){
		this.infinite = !this.infinite;
	}
}
export default Game;
