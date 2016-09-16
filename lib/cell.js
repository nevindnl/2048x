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
	10: '#210026',
	11: '#ffd700'
};

class Cell{
	constructor(n, i, j){
		this.n = n;
		this.i = i;
		this.j = j;

		this.prevI = null;
		this.prevJ = null;
		this.merged = false;
	}

	draw(ctx, cellDim, base){
		if (this.n === -1){
			return;
		}

		let fontSize;
		if (cellDim <= 20){
			fontSize = 6;
		} else if (cellDim <= 35){
			fontSize = 12;
		} else if (cellDim <= 77){
			fontSize = 16;
		} else {
			fontSize = 24;
		}

		ctx.font = `${fontSize}pt sans-serif`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const [x, y] = [this.j * cellDim, this.i * cellDim];

		ctx.fillStyle = COLORS[this.n];
		ctx.fillRect(x, y, cellDim, cellDim);

		ctx.fillStyle = 'white';
		ctx.fillText(JSON.stringify(Math.pow(base, this.n)), x + cellDim / 2, y + cellDim / 2);
	}
}

export default Cell;
