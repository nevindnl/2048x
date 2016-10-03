const COLORS = {
	1: 'red',
	2: 'orange',
	3: 'green',
	4: 'blue',
	5: 'purple',
	6: '#730202',
	7: '#D74B03',
	8: '#1B3719',
	9: '#020659',
	0: '#210026'
};

class Cell{
	constructor(n, i, j){
		this.n = n;
		this.i = i;
		this.j = j;

		this.merged = false;

		this.prevI = null;
		this.prevJ = null;
	}

	draw(ctx, cellDim, base){
		if (this.n === -1){
			return;
		}

		let fontSize;
		if (cellDim <= 14){
			fontSize = 0;
		} else if (cellDim <= 23){
			fontSize = 4;
		} else if (cellDim <= 30){
			fontSize = 6;
		} else if (cellDim <= 40){
			fontSize = 8;
		} else if (cellDim <= 53){
			fontSize = 10;
		} else if (cellDim <= 77){
			fontSize = 14;
		} else {
			fontSize = 22;
		}

		const number = JSON.stringify(Math.round(Math.pow(base, this.n) * 100)/100);
		
		const resizeFactor = number.length - 4;
	  fontSize = resizeFactor > 0 ? Math.floor(fontSize * Math.pow(.87, resizeFactor)) : fontSize;

		ctx.font = `100 ${fontSize}pt Arial`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const [x, y] = [this.j * cellDim, this.i * cellDim];

		ctx.fillStyle = this.n === 11 ? '#ffd700' : COLORS[this.n % 10];
		ctx.fillRect(x, y, cellDim, cellDim);

		ctx.fillStyle = 'white';
		ctx.fillText(number, x + cellDim / 2, y + cellDim / 2);

		// var image = new Image;
		// image.src = 'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;amp;lang=en';
		// image.onerror = function() {
		// 	ctx.font = `300 ${fontSize}pt Roboto`;
			// ctx.fillText(number, x + cellDim / 2, y + cellDim / 2);
		// };
	}
}

export default Cell;
