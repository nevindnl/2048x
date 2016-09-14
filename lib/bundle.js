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
		game.draw();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cell = __webpack_require__(3);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	var _board2 = __webpack_require__(2);
	
	var _board3 = _interopRequireDefault(_board2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
		function Game(ctx) {
			_classCallCheck(this, Game);
	
			this.ctx = ctx;
	
			this.b = 2;
			this.size = 4;
			this.min_dim = 100;
			this.max_dim = 1000;
	
			this.board = new _board3.default(this.b, this.size);
	
			this.dim = Math.min(this.max_dim, this.size * this.min_dim);
			this.cellDim = this.dim / this.size;
		}
	
		_createClass(Game, [{
			key: 'draw',
			value: function draw() {
				var dim = this.dim + 'px';
				document.getElementsByClassName('grid')[0].style.width = dim;
				document.getElementsByClassName('grid')[0].style.height = dim;
				document.getElementsByTagName('canvas')[0].height = dim.slice(0, -2);
				document.getElementsByTagName('canvas')[0].width = dim.slice(0, -2);
	
				var cellDim = this.cellDim - 12 + 'px';
				for (var i = 0; i < Math.pow(this.size, 2); i++) {
					var div = document.createElement('div');
					div.style.width = cellDim;
					div.style.height = cellDim;
					document.getElementsByClassName('grid')[0].appendChild(div);
				}
	
				for (var _i = 0; _i < 2; _i++) {
					var _board;
	
					var n = Math.random() < .9 ? 1 : 2;
					var pos = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
					(_board = this.board).set.apply(_board, pos.concat([new _cell2.default(n, pos)]));
				}
	
				this.board.draw(this.ctx, this.cellDim);
			}
		}]);
	
		return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _cell = __webpack_require__(3);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var COLORS = {
		1: 'red',
		2: 'orange',
		3: 'yellow',
		4: 'greed'
	};
	
	var Board = function () {
		function Board(b, size) {
			_classCallCheck(this, Board);
	
			this.b = b;
	
			this.grid = [];
			for (var i = 0; i < size; i++) {
				this.grid.push(new Array(size));
			}
		}
	
		_createClass(Board, [{
			key: 'draw',
			value: function draw(ctx, cellDim) {
				var cells = this.grid.reduce(function (arr, row) {
					return arr.concat(row);
				}, []);
				cells.forEach(function (cell) {
					if (cell !== undefined) {
						ctx.fillStyle = COLORS[cell.n];
						ctx.fillRect(cell.i * cellDim, cell.j * cellDim, cellDim, cellDim);
					}
				});
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
		}]);
	
		return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = function Cell(n, pos) {
		_classCallCheck(this, Cell);
	
		this.n = n;
	
		var _pos = _slicedToArray(pos, 2);
	
		this.i = _pos[0];
		this.j = _pos[1];
	};
	
	exports.default = Cell;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map