const Util = {
	transpose(arr){
		return arr.map((row, i) => {
			return row.map((el, j) => {
				return arr[j][i];
			});
		});
	}
};

export default Util;
