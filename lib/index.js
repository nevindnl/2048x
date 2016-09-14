import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementsByTagName('canvas')[0];
	const ctx = canvas.getContext('2d');

	const game = new Game(ctx);
	game.draw();
});
