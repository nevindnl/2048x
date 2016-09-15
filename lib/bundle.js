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
			this.size = 4;
			this.minDim = 100;
			this.maxDim = 500;
			this.highProb = .9;
	
			this.board = new _board2.default({ size: this.size, base: this.base, highProb: this.highProb });
	
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
	
				var gridCellBorder = 6; //mutable
	
				var gridCellDim = this.cellDim - 2 * gridCellBorder + 'px';
				for (var i = 0; i < Math.pow(this.size, 2); i++) {
					var div = document.createElement('div');
					div.style.width = gridCellDim;
					div.style.height = gridCellDim;
					document.getElementsByClassName('grid')[0].appendChild(div);
				}
	
				this.board.draw(this.ctx, this.cellDim);
			}
		}, {
			key: 'installHandlers',
			value: function installHandlers() {
				var _this = this;
	
				document.addEventListener('keydown', function (e) {
					switch (e.key) {
						case 'ArrowUp':
						case 'w':
						case 'j':
							_this.tilt([0, -1]);
							break;
						case 'ArrowDown':
						case 's':
						case 'k':
							_this.tilt([0, 1]);
							break;
						case 'ArrowLeft':
						case 'a':
						case 'h':
							_this.tilt([-1, 0]);
							break;
						case 'ArrowRight':
						case 'd':
						case 'l':
							_this.tilt([1, 0]);
							break;
						default:
							break;
					}
				});
			}
		}, {
			key: 'tilt',
			value: function tilt(vec) {
				var newBoard = this.board.tilt(vec);
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
		5: 'purple'
	};
	
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
				ctx.font = '24pt sans-serif';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
	
				var x = this.i * cellDim;
				var y = this.j * cellDim;
	
	
				ctx.fillStyle = COLORS[this.n];
				ctx.fillRect(x, y, cellDim, cellDim);
	
				ctx.fillStyle = 'white';
				ctx.fillText(JSON.stringify(Math.pow(this.b, val)), x + cellDim / 2, y + cellDim / 2);
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
			var base = _ref.base;
			var size = _ref.size;
			var highProb = _ref.highProb;
	
			_classCallCheck(this, Board);
	
			this.base = base;
			this.size = size;
			this.highProb = highProb;
	
			this.grid = [];
			for (var i = 0; i < size; i++) {
				this.grid.push(new Array(size));
			}
	
			this.addRandom();
		}
	
		_createClass(Board, [{
			key: 'addRandom',
			value: function addRandom() {
				var positions = [];
				while (positions.length < 2) {
					var pos = [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size)];
					if (!positions.includes(JSON.stringify(pos))) {
						var _board;
	
						var n = Math.random() < this.highProb ? 1 : 2;
						(_board = this.board).set.apply(_board, pos.concat([new (Function.prototype.bind.apply(_cell2.default, [null].concat([n], pos)))()]));
	
						positions.push(JSON.stringify(pos));
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
			key: 'draw',
			value: function draw(ctx, cellDim) {
				var cells = this.grid.reduce();
			}
		}, {
			key: 'col',
			value: function col(j) {
				return this.grid.map(function (row) {
					return row[j];
				});
			}
		}, {
			key: 'tilt',
			value: function tilt(dir) {
				var _dir = _slicedToArray(dir, 2);
	
				var x = _dir[0];
				var y = _dir[1];
	
				var newGrid = void 0;
	
				if (x !== 0) {
					newGrid = this.grid.map(function (row, i) {
						tiltSlice(row, x);
					});
				} else {
					newGrid = _util2.default.transpose(_util2.default.transpose(this.grid.map(function (col, j) {
						tiltSlice(col, y);
					})));
				}
	
				function tiltSlice(slice) {
					var newSlice = [];
	
					var i = 0;
					while (i < slice.length) {
						if (slice[i] !== undefined) {
							if (slice[i + 1] !== undefined && slice[i - 1].n === slice[i].n) {
								newSlice.push();
							}
						}
					}
	
					return newSlice;
				}
	
				return new Board(this.b, this.size, newGrid);
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
		}
	};
	
	exports.default = Util;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map