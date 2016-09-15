/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
		var canvas = document.getElementsByTagName('canvas')[0];
		var ctx = canvas.getContext('2d');
	
		var game = new _game2.default(ctx);
		game.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(3);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
		function Game(ctx) {
			_classCallCheck(this, Game);
	
			this.ctx = ctx;
	
			this.base = 2;
			this.size = 6;
			this.minDim = 100;
			this.maxDim = 500;
			this.highProb = .9;
	
			this.board = new _board2.default({ size: this.size, highProb: this.highProb });
	
			this.dim = Math.min(this.maxDim, this.size * this.minDim);
			this.cellDim = this.dim / this.size;
		}
	
		_createClass(Game, [{
			key: 'start',
			value: function start() {
				this.draw();
				this.installHandlers();
			}
		}, {
			key: 'draw',
			value: function draw() {
				document.getElementsByClassName('grid')[0].style.width = this.dim + 'px';
				document.getElementsByClassName('grid')[0].style.height = this.dim + 'px';
				document.getElementsByTagName('canvas')[0].height = this.dim;
				document.getElementsByTagName('canvas')[0].width = this.dim;
	
				var gridCellBorder = 6; //styling
	
				var gridCellDim = this.cellDim - 2 * gridCellBorder + 'px';
				for (var i = 0; i < Math.pow(this.size, 2); i++) {
					var div = document.createElement('div');
					div.style.width = gridCellDim;
					div.style.height = gridCellDim;
					document.getElementsByClassName('grid')[0].appendChild(div);
				}
	
				this.drawBoard();
			}
		}, {
			key: 'drawBoard',
			value: function drawBoard() {
				this.ctx.clearRect(0, 0, this.dim, this.dim);
				this.board.draw(this.ctx, this.cellDim, this.base);
			}
		}, {
			key: 'installHandlers',
			value: function installHandlers() {
				var game = this;
				document.addEventListener('keydown', function (e) {
					switch (e.key) {
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
		}, {
			key: 'tilt',
			value: function tilt(i, j) {
				this.board.tilt(i, j);
				if (this.board.updatePositions()) {
					this.board.addRandom();
					this.drawBoard();
				}
			}
		}]);
	
		return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var COLORS = {
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
	
	var Cell = function () {
		function Cell(n, i, j) {
			_classCallCheck(this, Cell);
	
			this.n = n;
			this.i = i;
			this.j = j;
	
			this.prevI = null;
			this.prevJ = null;
			this.merged = false;
		}
	
		_createClass(Cell, [{
			key: 'draw',
			value: function draw(ctx, cellDim, base) {
				if (this.n === undefined) {
					return;
				}
	
				ctx.font = '24pt sans-serif'; //styling
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
	
				var x = this.j * cellDim;
				var y = this.i * cellDim;
	
	
				ctx.fillStyle = COLORS[this.n];
				ctx.fillRect(x, y, cellDim, cellDim);
	
				ctx.fillStyle = 'white'; //styling
				ctx.fillText(JSON.stringify(Math.pow(base, this.n)), x + cellDim / 2, y + cellDim / 2);
			}
		}]);
	
		return Cell;
	}();
	
	exports.default = Cell;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cell = __webpack_require__(2);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
		function Board(_ref) {
			var size = _ref.size;
			var highProb = _ref.highProb;
	
			_classCallCheck(this, Board);
	
			this.size = size;
			this.highProb = highProb;
	
			this.grid = _util2.default.squareMatrix(size, new _cell2.default(-1));
			this.addRandom(2);
		}
	
		_createClass(Board, [{
			key: 'addRandom',
			value: function addRandom() {
				var toAdd = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
				var added = 0;
				while (added < toAdd) {
					var i = Math.floor(Math.random() * this.size);
					var j = Math.floor(Math.random() * this.size);
	
	
					if (this.get(i, j).n === -1) {
						var n = Math.random() < this.highProb ? 1 : 2;
						this.set(i, j, new _cell2.default(n, i, j));
	
						added += 1;
					}
				}
			}
		}, {
			key: 'get',
			value: function get(i, j) {
				return this.grid[i][j];
			}
		}, {
			key: 'set',
			value: function set(i, j, val) {
				this.grid[i][j] = val;
			}
		}, {
			key: 'forEachCell',
			value: function forEachCell(cb) {
				this.grid.forEach(function (row, i) {
					row.forEach(function (cell, j) {
						cb(cell, i, j);
					});
				});
			}
		}, {
			key: 'draw',
			value: function draw(ctx, cellDim, base) {
				this.forEachCell(function (cell) {
					cell.draw(ctx, cellDim, base);
				});
			}
		}, {
			key: 'tilt',
			value: function tilt(i, j) {
				function toLeft() {
					if (j !== 0) {
						this.grid = _util2.default.transpose(this.grid);
					}
					if (i + j > 0) {
						this.grid = this.grid.map(function (row) {
							return row.reverse();
						});
					}
				}
	
				function fromLeft() {
					if (i + j > 0) {
						this.grid = this.grid.map(function (row) {
							return row.reverse();
						});
					}
					if (j !== 0) {
						this.grid = _util2.default.transpose(this.grid);
					}
				}
	
				toLeft.call(this);
				this.leftTilt();
				fromLeft.call(this);
			}
		}, {
			key: 'leftTilt',
			value: function leftTilt() {
				var _this = this;
	
				this.grid = this.grid.map(function (row) {
					//remove spaces
					row = row.filter(function (cell) {
						return cell.n !== -1;
					});
	
					//merge
					var j = 0;
					while (j < row.length - 1) {
						var _row$slice = row.slice(j, j + 2);
	
						var _row$slice2 = _slicedToArray(_row$slice, 2);
	
						var cell = _row$slice2[0];
						var nextCell = _row$slice2[1];
	
	
						if (cell.n === nextCell.n) {
							cell.n += 1;
							cell.merged = true;
							row.splice(j + 1, 1);
						}
	
						j += 1;
					}
	
					//add back spaces
					while (row.length < _this.size) {
						row.push(new _cell2.default(-1));
					}
	
					return row;
				});
			}
		}, {
			key: 'updatePositions',
			value: function updatePositions() {
				var updated = false;
	
				this.forEachCell(function (cell, i, j) {
					if (cell.n !== -1) {
						if (cell.merged) {
							cell.merged = false;
							updated = true;
						}
						if (cell.i !== i || cell.j !== j) {
							updated = true;
						}
						cell.i = i;
						cell.j = j;
					}
				});
	
				return updated;
			}
		}]);
	
		return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Util = {
		transpose: function transpose(arr) {
			return arr.map(function (row, i) {
				return row.map(function (el, j) {
					return arr[j][i];
				});
			});
		},
		squareMatrix: function squareMatrix(n, el) {
			var matrix = [];
			for (var i = 0; i < n; i++) {
				var row = [];
				for (var j = 0; j < n; j++) {
					row.push(el);
				}
				matrix.push(row);
			}
			return matrix;
		}
	};
	
	exports.default = Util;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map