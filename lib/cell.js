const COLORS = {
	1: 'red',
	2: 'orange',
	3: 'green',
	4: 'blue',
	5: 'purple',
	6: 'red',
	7: 'orange',
	8: 'green',
	9: 'blue',
	10: 'purple'
}; //styling

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
		if (this.n === undefined){
			return;
		}

		ctx.font = '24pt sans-serif'; //styling
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const [x, y] = [this.j * cellDim, this.i * cellDim];

		ctx.fillStyle = COLORS[this.n];
		ctx.fillRect(x, y, cellDim, cellDim);

		ctx.fillStyle = 'white'; //styling
		ctx.fillText(JSON.stringify(Math.pow(base, this.n)), x + cellDim / 2, y + cellDim / 2);
	}
}

export default Cell;
