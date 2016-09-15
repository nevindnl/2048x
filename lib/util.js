const Util = {
	transpose(arr){
		return arr.map((row, i) => (
			row.map((el, j) => (
				arr[j][i]
			))
		));
	},

	squareMatrix(n, el){
		const matrix = [];
		for(let i = 0; i < n; i++){
			const row = [];
			for (let j = 0; j < n; j++){
				row.push(el);
			}
			matrix.push(row);
		}
		return matrix;
	}
};

export default Util;
