const COLORS = {
	1: 'red',
	2: 'orange',
	3: 'green',
	4: 'blue',
	5: 'purple'
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
		ctx.font = '24pt sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const [x, y] = [this.i * cellDim, this.j * cellDim];

		ctx.fillStyle = COLORS[this.n];
		ctx.fillRect(x, y, cellDim, cellDim);

		ctx.fillStyle = 'white';
		ctx.fillText(JSON.stringify(Math.pow(this.b, val)), x + cellDim / 2, y + cellDim / 2);
	}
}

export default Cell;
