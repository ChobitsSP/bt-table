/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _btTable = __webpack_require__(1);

	var _btTable2 = _interopRequireDefault(_btTable);

	var _btCol = __webpack_require__(3);

	var _btCol2 = _interopRequireDefault(_btCol);

	var _btPager = __webpack_require__(5);

	var _btPager2 = _interopRequireDefault(_btPager);

	var _btDropdown = __webpack_require__(8);

	var _btDropdown2 = _interopRequireDefault(_btDropdown);

	var _btShowColumns = __webpack_require__(11);

	var _btShowColumns2 = _interopRequireDefault(_btShowColumns);

	var _btColSort = __webpack_require__(13);

	var _btColSort2 = _interopRequireDefault(_btColSort);

	var _btRow = __webpack_require__(15);

	var _btRow2 = _interopRequireDefault(_btRow);

	var _checkboxAll = __webpack_require__(16);

	var _checkboxAll2 = _interopRequireDefault(_checkboxAll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* injects from baggage-loader */

	if (window.angular) {
	    var app = angular.module('bt-table', []);

	    app.directive('btTable', __webpack_require__(1));
	    app.directive('btCol', __webpack_require__(3));
	    app.directive('btPager', __webpack_require__(5));
	    app.directive('btDropdown', __webpack_require__(8));
	    app.directive('btShowColumns', __webpack_require__(11));
	    app.directive('btColSort', __webpack_require__(13));

	    app.directive('btRow', __webpack_require__(15));
	    app.directive('checkboxAll', __webpack_require__(16));
	} else {
	    window.BtTable = {};
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'E',
	        replace: true,
	        transclude: true,
	        scope: {
	            columns: '=',
	            items: '=rows',
	            pager: '=',
	            config: '=?',
	            loading: '=?',
	            refresh: '&?',
	            rowClick: '&?',
	            pageChanged: '&?',
	            cellCallback: '&?',
	            checkChange: '&?',
	            allCheckChange: '&?'
	        },
	        templateUrl: __webpack_require__(2),
	        controller: controller,
	        link: function link(scope, element, attr, ctrl) {
	            if (angular.isArray(scope.columns)) {
	                angular.forEach(scope.columns, function (col) {
	                    if (!col.hasOwnProperty('visible')) {
	                        col.visible = true;
	                    }
	                });
	            }
	        }
	    };
	};

	/* injects from baggage-loader */
	__webpack_require__(2);

	var controller = ['$scope', function ($scope) {

	    $scope.config = angular.extend({}, $scope.config);

	    $scope.$watch('[pager.sort_name,pager.is_desc]', function (newVal, oldVal) {
	        if (newVal == oldVal) return;
	        if (angular.isFunction($scope.refresh)) {
	            $scope.refresh();
	        }
	    });

	    $scope.row_click = function (item, index) {
	        if ($scope.config.checkbox) {
	            item.$checked = !item.$checked;
	            $scope.$broadcast('check_change', item);
	        }
	        if (angular.isFunction($scope.rowClick)) {
	            $scope.rowClick({ row: item, index: index });
	        }
	    };

	    $scope.all_check_change = function () {
	        if (angular.isFunction($scope.allCheckChange)) {
	            $scope.allCheckChange();
	        }
	    };

	    $scope.check_change = function (item) {
	        $scope.$broadcast('check_change');
	        if (angular.isFunction($scope.checkChange)) {
	            $scope.checkChange({ row: item });
	        }
	    };

	    $scope.rowClass = function (item) {
	        return item.$row_class || '';
	    };

	    $scope.tdCallback = function (args, item, index) {
	        if (angular.isFunction($scope.cellCallback)) {
	            $scope.cellCallback({ args: args, row: item, index: index });
	        }
	    };

	    // $scope.$on('resetView', function (event, data) {
	    //     if ($scope.height == data.height) return
	    //     $scope.height = data.height
	    //     $scope.$apply()
	    // })

	    $scope.getStyle = function () {
	        if ($scope.config.height) {
	            return {
	                height: $scope.config.height
	            };
	        }
	        return {};
	    };
	}];

/***/ },
/* 2 */
/***/ function(module, exports) {

	var path = 'src/components/btTable.html';
	var html = "<div class=\"bootstrap-table\">\r\n    <div class=\"fixed-table-toolbar\" ng-transclude>\r\n    </div>\r\n    <div class=\"fixed-table-container\">\r\n        <div class=\"fixed-table-body\">\r\n            <table class=\"table table-striped table-hover table-bordered dataTable no-footer\" ng-cloak>\r\n                <thead>\r\n                    <tr role=\"row\">\r\n                        <th class=\"bs-checkbox\" style=\"text-align: center; vertical-align: middle; width: 36px; \" ng-if=\"config.checkbox\">\r\n                            <div class=\"th-inner\">\r\n                                <checkbox-all select-field=\"$checked\" checkboxes=\"items\" check-change=\"all_check_change()\" class=\"checkbox\"></checkbox-all>\r\n                            </div>\r\n                        </th>\r\n                        <th ng-class=\"col.th_class\" ng-repeat=\"col in columns\" ng-show=\"col.visible\" bt-col=\"col\" pager=\"pager\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-show=\"!loading\" ng-cloak>\r\n                    <tr ng-repeat=\"item in items track by $index\" ng-class=\"{{item.$row_class}}\" ng-click=\"row_click(item, $index)\">\r\n                        <td class=\"bs-checkbox\" ng-if=\"config.checkbox\">\r\n                            <input type=\"checkbox\" ng-model=\"item.$checked\" ng-click=\"$event.stopPropagation();check_change(item)\" class=\"checkbox\" />\r\n                        </td>\r\n                        <td ng-class=\"col.td_class\" ng-repeat=\"col in columns\" ng-show=\"col.visible\" bt-row=\"item\" column=\"col\" callback=\"tdCallback(args, item, $parent.$index)\"></td>\r\n                    </tr>\r\n                    <tr class=\"no-records-found\" ng-show=\"items.length == 0\">\r\n                        <td colspan=\"999\" class=\"text-center\">没有记录</td>\r\n                    </tr>\r\n                </tbody>\r\n                <tbody ng-show=\"loading\">\r\n                    <tr>\r\n                        <td colspan=\"999\" class=\"text-center\">正在加载数据 ... </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div ng-if=\"pager\">\r\n            <bt-pager total-items=\"pager.total_result\" items-per-page=\"pager.page_size\" ng-model=\"pager.page_no\" page-changed=\"pageChanged()\">\r\n            </bt-pager>\r\n        </div>\r\n    </div>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'A',
	        scope: {
	            column: '=btCol',
	            pager: '=?'
	        },
	        templateUrl: __webpack_require__(4),
	        link: function link(scope, element, attr, ctrl) {
	            scope.sort_class = '';

	            if (scope.column.sortable && scope.pager) {
	                scope.change_sort = function () {
	                    if (scope.column.sortable === false) return;

	                    if (scope.pager.sort_name === scope.column.field) {
	                        scope.pager.is_desc = !scope.pager.is_desc;
	                        scope.sort_class = scope.pager.is_desc ? 'desc' : 'asc';
	                    } else {
	                        scope.pager.is_desc = false;
	                        scope.pager.sort_name = scope.column.field;
	                    }
	                };

	                scope.$watch('pager.sort_name', function (newVal) {
	                    if (scope.column.field !== newVal) {
	                        scope.sort_class = '';
	                    } else {
	                        scope.sort_class = scope.pager.is_desc ? 'desc' : 'asc';
	                    }
	                });
	            }
	        }
	    };
	};

	/* injects from baggage-loader */
	__webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports) {

	var path = 'src/components/btCol.html';
	var html = "<div class=\"th-inner {{sort_class}}\" ng-click=\"change_sort()\" ng-class=\"{ 'sortable both' : column.sortable }\">\r\n    {{column.title}}\r\n</div>\r\n<div class=\"fht-cell\">\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _PagerHelper = __webpack_require__(6);

	var _PagerHelper2 = _interopRequireDefault(_PagerHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* injects from baggage-loader */
	__webpack_require__(7);

	var paginationConfig = {
	    itemsPerPage: 10,
	    boundaryLinks: false,
	    directionLinks: true,
	    firstText: 'First',
	    previousText: 'Previous',
	    nextText: 'Next',
	    lastText: 'Last',
	    numDisplayEntries: 6, //连续分页主体部分分页条目数
	    numEdgeEntries: 2, //两侧首尾分页条目数
	    rotate: true
	};

	var controller = ['$scope', '$attrs', '$parse', '$timeout', function ($scope, $attrs, $parse, $timeout) {
	    var self = this,
	        ngModelCtrl = { $setViewValue: angular.noop },
	        // nullModelCtrl
	    setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

	    this.init = function (ngModelCtrl_, config) {
	        ngModelCtrl = ngModelCtrl_;
	        this.config = config;

	        ngModelCtrl.$render = function () {
	            self.render();
	        };

	        if ($scope.itemsPerPage) {
	            //$scope.$parent.$watch('itemsPerPage', function (value) {
	            //    $scope.itemsPerPage = parseInt(value, 10);
	            //    $scope.totalPages = self.calculateTotalPages();
	            //});
	        } else {
	                $scope.itemsPerPage = config.itemsPerPage;
	            }
	    };

	    this.calculateTotalPages = function () {
	        var totalPages = $scope.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / $scope.itemsPerPage);
	        return Math.max(totalPages || 0, 1);
	    };

	    this.render = function () {
	        $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
	    };

	    $scope.selectPage = function (page) {
	        if ($scope.page !== page && page > 0 && page <= $scope.totalPages) {
	            ngModelCtrl.$setViewValue(page);
	            ngModelCtrl.$render();

	            if (angular.isFunction($scope.pageChanged)) {
	                $scope.pageChanged();
	            }
	        }
	    };

	    $scope.setPageSize = function (size) {
	        $scope.isOpen = false;
	        if ($scope.itemsPerPage !== size && size > 0) {
	            $scope.itemsPerPage = size;
	        }
	    };

	    $scope.getText = function (key) {
	        return $scope[key + 'Text'] || self.config[key + 'Text'];
	    };

	    //page_size changed
	    $scope.$watch('itemsPerPage', function (newValue, oldValue) {
	        //if(newValue === oldValue) return
	        $scope.totalPages = self.calculateTotalPages();
	    });

	    //total_result changed
	    $scope.$watch('totalItems', function (newValue, oldValue) {
	        $scope.totalPages = self.calculateTotalPages();
	    });

	    var change_state = 0;

	    $scope.$watch('totalPages', function (value, oldValue) {
	        setNumPages($scope.$parent, value); // Readonly variable

	        if ($scope.page > value) {
	            $scope.selectPage(value);
	        } else if (angular.isFunction(ngModelCtrl.$render)) {
	            ngModelCtrl.$render();

	            if (change_state === 0) {
	                change_state = 1;
	            } else if (change_state === 1) {
	                change_state = 2;
	                return;
	            }

	            if (angular.isFunction($scope.pageChanged)) {
	                $scope.pageChanged();
	            }
	        }
	    });

	    $scope.getCurrentCount = function () {
	        return Math.min($scope.totalItems, $scope.page * $scope.itemsPerPage);
	    };
	}];

	exports.default = ['$parse', function ($parse) {
	    return {
	        restrict: 'EA',
	        scope: {
	            itemsPerPage: '=',
	            totalItems: '=',
	            pageChanged: '&?',
	            firstText: '@',
	            previousText: '@',
	            nextText: '@',
	            lastText: '@'
	        },
	        require: ['btPager', '?ngModel'],
	        controller: controller,
	        templateUrl: __webpack_require__(7),
	        replace: true,
	        link: function link(scope, element, attrs, ctrls) {
	            scope.isOpen = false;

	            var paginationCtrl = ctrls[0],
	                ngModelCtrl = ctrls[1];

	            if (!ngModelCtrl) {
	                return; // do nothing if no ng-model
	            }

	            // Setup configuration parameters
	            var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
	                rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
	            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
	            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;

	            var num_display_entries = angular.isDefined(attrs.numDisplayEntries) ? scope.$parent.$eval(attrs.numDisplayEntries) : paginationConfig.numDisplayEntries,
	                num_edge_entries = angular.isDefined(attrs.numEdgeEntries) ? scope.$parent.$eval(attrs.numEdgeEntries) : paginationConfig.numEdgeEntries;

	            var helper = new _PagerHelper2.default(num_display_entries, num_edge_entries);

	            paginationCtrl.init(ngModelCtrl, paginationConfig);

	            if (attrs.maxSize) {
	                scope.$parent.$watch($parse(attrs.maxSize), function (value) {
	                    maxSize = parseInt(value, 10);
	                    paginationCtrl.render();
	                });
	            }

	            var originalRender = paginationCtrl.render;
	            paginationCtrl.render = function () {
	                originalRender();
	                if (scope.page > 0 && scope.page <= scope.totalPages) {
	                    scope.pages = helper.getPages(scope.page, scope.totalPages);
	                }
	            };
	        }
	    };
	}];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/* injects from baggage-loader */

	function PagerHelper(num_display_entries, num_edge_entries) {
	    this.num_display_entries = num_display_entries || 6;
	    this.num_edge_entries = num_edge_entries || 2;
	};

	/**
	* Calculate start and end point of pagination links depending on
	* currentPage and num_display_entries.
	* @return {Array}
	*/
	PagerHelper.prototype.getInterval = function (currentPage, pageCount) {
	    var ne_half = Math.ceil(this.num_display_entries / 2);
	    var np = pageCount;
	    var upper_limit = np - this.num_display_entries;
	    var start = currentPage > ne_half ? Math.max(Math.min(currentPage - ne_half, upper_limit), 0) : 0;
	    var end = currentPage > ne_half ? Math.min(currentPage + ne_half, np) : Math.min(this.num_display_entries, np);
	    return [start, end];
	};

	PagerHelper.prototype.getPages = function (currentPage, totalPages) {
	    var ret = [];
	    var num_edge_entries = this.num_edge_entries;
	    var np = totalPages;
	    var interval = this.getInterval(currentPage - 1, totalPages);

	    // Generate starting points
	    if (interval[0] > 0 && num_edge_entries > 0) {
	        var end = Math.min(num_edge_entries, interval[0]);
	        for (var i = 0; i < end; i++) {
	            var page = makePage(i + 1, i + 1, i + 1 === currentPage);
	            ret.push(page);
	        }
	        if (num_edge_entries < interval[0]) {
	            var page = makePage(-1, '...', false);
	            ret.push(page);
	        }
	    }
	    // Generate interval links
	    for (var i = interval[0]; i < interval[1]; i++) {
	        var page = makePage(i + 1, i + 1, i + 1 === currentPage);
	        ret.push(page);
	    }
	    // Generate ending points
	    if (interval[1] < np && num_edge_entries > 0) {
	        if (np - num_edge_entries > interval[1]) {
	            var page = makePage(-1, '...', false);
	            ret.push(page);
	        }
	        var begin = Math.max(np - num_edge_entries, interval[1]);
	        for (var i = begin; i < np; i++) {
	            var page = makePage(i + 1, i + 1, i + 1 === currentPage);
	            ret.push(page);
	        }
	    }

	    return ret;
	};

	// Create page object used in template
	function makePage(number, text, isActive) {
	    return {
	        number: number,
	        text: text,
	        active: isActive,
	        disabled: text == '...'
	    };
	}

	exports.default = PagerHelper;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var path = 'src/components/btPager.html';
	var html = "\r\n<div class=\"fixed-table-pagination\" style=\"display: block;\">\r\n    <div class=\"pull-left pagination-detail\">\r\n        <span class=\"pagination-info\">显示第 {{(page - 1) * itemsPerPage + 1}} 到第 {{getCurrentCount()}} 条记录，总共 {{totalItems}} 条记录</span>\r\n        <span class=\"page-list\">\r\n            每页显示\r\n            <bt-dropdown text=\"itemsPerPage\" show=\"isOpen\">\r\n                <li ng-class=\"{ active: itemsPerPage == size }\" ng-repeat=\"size in [10,25,50,100] track by $index\">\r\n                    <a ng-click=\"setPageSize(size)\">{{::size}}</a>\r\n                </li>\r\n            </bt-dropdown> 条记录\r\n        </span>\r\n    </div>\r\n    <div class=\"pull-right pagination\" ng-show=\"totalItems > itemsPerPage\">\r\n        <ul class=\"pagination\">\r\n            <li class=\"page-pre\" ng-if=\"page === 1\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page - 1)\">‹</a>\r\n            </li>\r\n            <li class=\"page-number\" ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active, disabled: page.disabled}\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page.number)\">{{page.text}}</a>\r\n            </li>\r\n            <li class=\"page-nex\" ng-if=\"page === totalPages\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page + 1)\">›</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'E',
	        scope: {
	            text: '=text',
	            show: '=?'
	        },
	        transclude: true,
	        templateUrl: __webpack_require__(9),
	        link: function link(scope, element, attr, ctrl) {
	            var $el = (0, _NodeList2.default)(element[0]);
	            $el.onBlur(function (e) {
	                scope.show = false;
	                scope.$apply();
	            });
	            //// WAI-ARIA
	            //element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
	            //scope.$watch('show', function (show) {
	            //    element.attr('aria-expanded', !!show);
	            //});
	        }
	    };
	};

	var _NodeList = __webpack_require__(10);

	var _NodeList2 = _interopRequireDefault(_NodeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* injects from baggage-loader */
	__webpack_require__(9);

/***/ },
/* 9 */
/***/ function(module, exports) {

	var path = 'src/components/btDropdown.html';
	var html = "<div class=\"btn-group dropup dropdown\" ng-class=\"{ open: show }\">\r\n    <button type=\"button\" ng-click=\"show=!show\" class=\"btn btn-default dropdown-toggle\" aria-haspopup=\"true\" aria-expanded=\"true\">\r\n        <span>{{ text }}</span>\r\n        <span class=\"caret\"></span>\r\n    </button>\r\n    <ul class=\"dropdown-menu\" ng-show=\"show\" ng-transclude>\r\n    </ul>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* injects from baggage-loader */

	var ArrayProto = Array.prototype;
	var nodeError = new Error('Passed arguments must be of Node');
	var blurEvent = void 0;
	var blurList = [];
	var Events = [];

	var NodeList = function () {
	  function NodeList(args) {
	    _classCallCheck(this, NodeList);

	    var i = 0,
	        l,
	        nodes = args;
	    if (args[0] === window) {
	      nodes = [window];
	    } else if (typeof args[0] === 'string') {
	      nodes = (args[1] || document).querySelectorAll(args[0]);
	      if (args[1]) {
	        this.owner = args[1];
	      }
	    } else if (0 in args && !(args[0] instanceof Node) && args[0] && 'length' in args[0]) {
	      nodes = args[0];
	      if (args[1]) {
	        this.owner = args[1];
	      }
	    }
	    if (nodes) {
	      for (var _i in nodes) {
	        this[_i] = nodes[_i];
	      }
	      this.length = nodes.length;
	    } else {
	      this.length = 0;
	    }
	  }

	  _createClass(NodeList, [{
	    key: 'concat',
	    value: function concat() {
	      var nodes = ArrayProto.slice.call(this);
	      function flatten(arr) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var el = _step.value;

	            if (el instanceof Node) {
	              if (! ~nodes.indexOf(el)) nodes.push(el);
	            } else if (el) {
	              flatten(el);
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = arguments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var arg = _step2.value;

	          if (arg instanceof Node) {
	            if (! ~nodes.indexOf(arg)) nodes.push(arg);
	          } else if (arg instanceof window.NodeList || arg instanceof NodeList || arg instanceof HTMLCollection || arg instanceof Array) {
	            flatten(arg);
	          } else {
	            throw Error('Concat arguments must be of a Node, NodeList, HTMLCollection, or Array of (Node, NodeList, HTMLCollection, Array)');
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return new NodeList([nodes, this]);
	    }
	  }, {
	    key: 'each',
	    value: function each() {
	      ArrayProto.forEach.apply(this, arguments);
	      return this;
	    }
	  }, {
	    key: 'parent',
	    value: function parent() {
	      return this.map(function (el) {
	        return el.parentNode;
	      });
	    }
	  }, {
	    key: 'filter',
	    value: function filter() {
	      return new NodeList([ArrayProto.filter.apply(this, arguments), this]);
	    }
	  }, {
	    key: 'find',
	    value: function find(element) {
	      var nodes = [];
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = flatten(this)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var el = _step3.value;

	          var node = el.querySelectorAll(element);
	          if (node && node.length) nodes.push(node);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      return flatten(nodes, this.owner);
	    }
	  }, {
	    key: 'findChildren',
	    value: function findChildren(element) {
	      var _this = this;

	      return this.find(element).filter(function (el) {
	        return _this.includes(el.parentElement);
	      });
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach() {
	      ArrayProto.forEach.apply(this, arguments);
	      return this;
	    }
	  }, {
	    key: 'includes',
	    value: function includes(element, index) {
	      return ~this.indexOf(element, index);
	    }
	  }, {
	    key: 'map',
	    value: function map() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return flatten(ArrayProto.map.apply(this, args), this);
	    }
	  }, {
	    key: 'pop',
	    value: function pop(amount) {
	      if (typeof amount !== 'number') {
	        amount = 1;
	      }
	      var nodes = [];
	      var pop = ArrayProto.pop.bind(this);
	      while (amount--) {
	        nodes.push(pop());
	      }return new NodeList([nodes, this]);
	    }
	  }, {
	    key: 'push',
	    value: function push() {
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = arguments[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var arg = _step4.value;

	          if (!(arg instanceof Node)) throw nodeError;
	          if (! ~this.indexOf(arg)) ArrayProto.push.call(this, arg);
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }

	      return this;
	    }
	  }, {
	    key: 'delete',
	    value: function _delete() {
	      var list = new NodeList([[], this.owner]);
	      var splice = function splice(index) {
	        return ArrayProto.splice.apply();
	      };
	      var i = this.length - 1;
	      for (var el = this[i]; el; el = this[--i]) {
	        if (el.remove) {
	          el.remove();
	          ArrayProto.splice.call(this, i, 1);
	        } else if (el.parentNode) {
	          el.parentNode.removeChild(el);
	          ArrayProto.splice.call(this, i, 1);
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'shift',
	    value: function shift(amount) {
	      if (typeof amount !== 'number') {
	        amount = 1;
	      }
	      var nodes = [];
	      var shift = ArrayProto.shift.bind(this);
	      while (amount--) {
	        nodes.push(shift());
	      }return new NodeList([nodes, this]);
	    }
	  }, {
	    key: 'slice',
	    value: function slice() {
	      return new NodeList([ArrayProto.slice.apply(this, arguments), this]);
	    }
	  }, {
	    key: 'splice',
	    value: function splice() {
	      for (var i = 2, l = arguments.length; i < l; i++) {
	        if (!(arguments[i] instanceof Node)) throw nodeError;
	      }
	      return new NodeList([ArrayProto.splice.apply(this, arguments), this]);
	    }
	  }, {
	    key: 'unshift',
	    value: function unshift() {
	      var unshift = ArrayProto.unshift.bind(this);
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        for (var _iterator5 = arguments[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var arg = _step5.value;

	          if (!(arg instanceof Node)) throw nodeError;
	          if (! ~this.indexOf(arg)) unshift(arg);
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }

	      return this;
	    }
	  }, {
	    key: 'addClass',
	    value: function addClass(classes) {
	      return this.toggleClass(classes, true);
	    }
	  }, {
	    key: 'removeClass',
	    value: function removeClass(classes) {
	      return this.toggleClass(classes, false);
	    }
	  }, {
	    key: 'toggleClass',
	    value: function toggleClass(classes, value) {
	      var _this2 = this;

	      var method = value === undefined || value === null ? 'toggle' : value ? 'add' : 'remove';
	      if (typeof classes === 'string') {
	        classes = classes.trim().replace(/\s+/, ' ').split(' ');
	      }
	      classes.forEach(function (c) {
	        return _this2.each(function (el) {
	          return el.classList[method](c);
	        });
	      });
	      return this;
	    }
	  }, {
	    key: 'get',
	    value: function get(prop) {
	      var arr = [];
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;

	      try {
	        for (var _iterator6 = this[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var el = _step6.value;

	          if (el !== null) {
	            el = el[prop];
	          }
	          arr.push(el);
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
	      }

	      return flatten(arr, this);
	    }
	  }, {
	    key: 'set',
	    value: function set(prop, value) {
	      if (prop.constructor === Object) {
	        var _iteratorNormalCompletion7 = true;
	        var _didIteratorError7 = false;
	        var _iteratorError7 = undefined;

	        try {
	          for (var _iterator7 = this[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	            var el = _step7.value;

	            if (el) {
	              for (key in prop) {
	                if (key in el) {
	                  el[key] = prop[key];
	                }
	              }
	            }
	          }
	        } catch (err) {
	          _didIteratorError7 = true;
	          _iteratorError7 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	              _iterator7.return();
	            }
	          } finally {
	            if (_didIteratorError7) {
	              throw _iteratorError7;
	            }
	          }
	        }
	      } else {
	        var _iteratorNormalCompletion8 = true;
	        var _didIteratorError8 = false;
	        var _iteratorError8 = undefined;

	        try {
	          for (var _iterator8 = this[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	            var _el = _step8.value;

	            if (prop in _el) {
	              _el[prop] = value;
	            }
	          }
	        } catch (err) {
	          _didIteratorError8 = true;
	          _iteratorError8 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion8 && _iterator8.return) {
	              _iterator8.return();
	            }
	          } finally {
	            if (_didIteratorError8) {
	              throw _iteratorError8;
	            }
	          }
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'call',
	    value: function call() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      var method = ArrayProto.shift.call(args);
	      var arr = [];
	      var returnThis = true;
	      var _iteratorNormalCompletion9 = true;
	      var _didIteratorError9 = false;
	      var _iteratorError9 = undefined;

	      try {
	        for (var _iterator9 = this[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	          var el = _step9.value;

	          if (el && el[method] instanceof Function) {
	            el = el[method].apply(el, args);
	            arr.push(el);
	            if (returnThis && el !== undefined) {
	              returnThis = false;
	            }
	          } else {
	            arr.push(undefined);
	          }
	        }
	      } catch (err) {
	        _didIteratorError9 = true;
	        _iteratorError9 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion9 && _iterator9.return) {
	            _iterator9.return();
	          }
	        } finally {
	          if (_didIteratorError9) {
	            throw _iteratorError9;
	          }
	        }
	      }

	      return returnThis ? this : flatten(arr, this);
	    }
	  }, {
	    key: 'item',
	    value: function item(index) {
	      return new NodeList([[this[index]], this]);
	    }
	  }, {
	    key: 'on',


	    // event handlers
	    value: function on(events, selector, callback) {
	      if (typeof events === 'string') {
	        events = events.trim().replace(/\s+/, ' ').split(' ');
	      }
	      if (!this || !this.length) return this;
	      if (callback === undefined) {
	        callback = selector;
	        selector = null;
	      }
	      if (!callback) return this;
	      var fn = callback;
	      callback = selector ? function (e) {
	        var els = new NodeList([selector, this]);
	        if (!els.length) {
	          return;
	        }
	        els.some(function (el) {
	          var target = el.contains(e.target);
	          if (target) fn.call(el, e, el);
	          return target;
	        });
	      } : function (e) {
	        fn.apply(this, [e, this]);
	      };
	      var _iteratorNormalCompletion10 = true;
	      var _didIteratorError10 = false;
	      var _iteratorError10 = undefined;

	      try {
	        for (var _iterator10 = events[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	          var event = _step10.value;
	          var _iteratorNormalCompletion11 = true;
	          var _didIteratorError11 = false;
	          var _iteratorError11 = undefined;

	          try {
	            for (var _iterator11 = this[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	              var el = _step11.value;

	              el.addEventListener(event, callback, false);
	              Events.push({
	                el: el,
	                event: event,
	                callback: callback
	              });
	            }
	          } catch (err) {
	            _didIteratorError11 = true;
	            _iteratorError11 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                _iterator11.return();
	              }
	            } finally {
	              if (_didIteratorError11) {
	                throw _iteratorError11;
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError10 = true;
	        _iteratorError10 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion10 && _iterator10.return) {
	            _iterator10.return();
	          }
	        } finally {
	          if (_didIteratorError10) {
	            throw _iteratorError10;
	          }
	        }
	      }

	      return this;
	    }
	  }, {
	    key: 'off',
	    value: function off(events, callback) {
	      if (events instanceof Function) {
	        callback = events;
	        events = null;
	      }
	      if (typeof events === 'string' && callback instanceof Function) {
	        var _iteratorNormalCompletion12 = true;
	        var _didIteratorError12 = false;
	        var _iteratorError12 = undefined;

	        try {
	          for (var _iterator12 = this[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	            var el = _step12.value;

	            for (var e in Events) {
	              var _iteratorNormalCompletion13 = true;
	              var _didIteratorError13 = false;
	              var _iteratorError13 = undefined;

	              try {
	                for (var _iterator13 = events.split(' ')[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	                  var event = _step13.value;

	                  if (Events[e] && Events[e].el === el && Events[e].event === event && Events[e].callback === callback) {
	                    Events[e].el.removeEventListener(Events[e].event, Events[e].callback);
	                    delete Events[e];
	                  }
	                }
	              } catch (err) {
	                _didIteratorError13 = true;
	                _iteratorError13 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                    _iterator13.return();
	                  }
	                } finally {
	                  if (_didIteratorError13) {
	                    throw _iteratorError13;
	                  }
	                }
	              }
	            }
	          }
	        } catch (err) {
	          _didIteratorError12 = true;
	          _iteratorError12 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion12 && _iterator12.return) {
	              _iterator12.return();
	            }
	          } finally {
	            if (_didIteratorError12) {
	              throw _iteratorError12;
	            }
	          }
	        }
	      } else if (typeof events === 'string') {
	        var _iteratorNormalCompletion14 = true;
	        var _didIteratorError14 = false;
	        var _iteratorError14 = undefined;

	        try {
	          for (var _iterator14 = this[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	            var _el2 = _step14.value;

	            for (var _e in Events) {
	              var _iteratorNormalCompletion15 = true;
	              var _didIteratorError15 = false;
	              var _iteratorError15 = undefined;

	              try {
	                for (var _iterator15 = events.split(' ')[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	                  var _event = _step15.value;

	                  if (Events[_e] && Events[_e].el === _el2 && Events[_e].event === _event) {
	                    Events[_e].el.removeEventListener(Events[_e].event, Events[_e].callback);
	                    delete Events[_e];
	                  }
	                }
	              } catch (err) {
	                _didIteratorError15 = true;
	                _iteratorError15 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion15 && _iterator15.return) {
	                    _iterator15.return();
	                  }
	                } finally {
	                  if (_didIteratorError15) {
	                    throw _iteratorError15;
	                  }
	                }
	              }
	            }
	          }
	        } catch (err) {
	          _didIteratorError14 = true;
	          _iteratorError14 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion14 && _iterator14.return) {
	              _iterator14.return();
	            }
	          } finally {
	            if (_didIteratorError14) {
	              throw _iteratorError14;
	            }
	          }
	        }
	      } else if (callback instanceof Function) {
	        var _iteratorNormalCompletion16 = true;
	        var _didIteratorError16 = false;
	        var _iteratorError16 = undefined;

	        try {
	          for (var _iterator16 = this[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
	            var _el3 = _step16.value;

	            for (var _e2 in Events) {
	              if (Events[_e2] && Events[_e2].el === _el3 && Events[_e2].callback === callback) {
	                Events[_e2].el.removeEventListener(Events[_e2].event, Events[_e2].callback);
	                delete Events[_e2];
	              }
	            }
	          }
	        } catch (err) {
	          _didIteratorError16 = true;
	          _iteratorError16 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion16 && _iterator16.return) {
	              _iterator16.return();
	            }
	          } finally {
	            if (_didIteratorError16) {
	              throw _iteratorError16;
	            }
	          }
	        }
	      } else {
	        var _iteratorNormalCompletion17 = true;
	        var _didIteratorError17 = false;
	        var _iteratorError17 = undefined;

	        try {
	          for (var _iterator17 = this[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
	            var _el4 = _step17.value;

	            for (var _e3 in Events) {
	              if (Events[_e3] && Events[_e3].el === _el4) {
	                Events[_e3].el.removeEventListener(Events[_e3].event, Events[_e3].callback);
	                delete Events[_e3];
	              }
	            }
	          }
	        } catch (err) {
	          _didIteratorError17 = true;
	          _iteratorError17 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion17 && _iterator17.return) {
	              _iterator17.return();
	            }
	          } finally {
	            if (_didIteratorError17) {
	              throw _iteratorError17;
	            }
	          }
	        }
	      }
	      Events = Events.filter(function (el) {
	        return el !== undefined;
	      });
	      return this;
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur(callback) {
	      if (!this || !this.length) return this;
	      if (!callback) return this;
	      this.each(function (el) {
	        blurList.push({
	          el: el,
	          callback: callback
	        });
	      });
	      if (!blurEvent) {
	        blurEvent = function blurEvent(e) {
	          var _iteratorNormalCompletion18 = true;
	          var _didIteratorError18 = false;
	          var _iteratorError18 = undefined;

	          try {
	            for (var _iterator18 = blurList[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
	              var item = _step18.value;

	              var target = item.el.contains(e.target) || item.el === e.target;
	              if (!target) item.callback.call(item.el, e, item.el);
	            }
	          } catch (err) {
	            _didIteratorError18 = true;
	            _iteratorError18 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion18 && _iterator18.return) {
	                _iterator18.return();
	              }
	            } finally {
	              if (_didIteratorError18) {
	                throw _iteratorError18;
	              }
	            }
	          }
	        };
	        document.addEventListener('click', blurEvent, false);
	        document.addEventListener('touchstart', blurEvent, false);
	      }
	      return this;
	    }
	  }, {
	    key: 'offBlur',
	    value: function offBlur(callback) {
	      this.each(function (el) {
	        for (var e in blurList) {
	          if (blurList[e] && blurList[e].el === el && (!callback || blurList[e].callback === callback)) {
	            delete blurList[e];
	          }
	        }
	      });
	      blurList = blurList.filter(function (el) {
	        return el !== undefined;
	      });
	      return this;
	    }
	  }, {
	    key: 'asArray',
	    get: function get() {
	      return ArrayProto.slice.call(this);
	    }
	  }]);

	  return NodeList;
	}();

	var NL = NodeList.prototype;

	function flatten(arr, owner) {
	  var list = [];
	  var _iteratorNormalCompletion19 = true;
	  var _didIteratorError19 = false;
	  var _iteratorError19 = undefined;

	  try {
	    for (var _iterator19 = arr[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
	      var el = _step19.value;

	      if (el instanceof Node || el === null) {
	        if (! ~list.indexOf(el)) list.push(el);
	      } else if (el instanceof window.NodeList || el instanceof NodeList || el instanceof HTMLCollection || el instanceof Array) {
	        var _iteratorNormalCompletion20 = true;
	        var _didIteratorError20 = false;
	        var _iteratorError20 = undefined;

	        try {
	          for (var _iterator20 = el[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
	            var el2 = _step20.value;
	            list.push(el2);
	          }
	        } catch (err) {
	          _didIteratorError20 = true;
	          _iteratorError20 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion20 && _iterator20.return) {
	              _iterator20.return();
	            }
	          } finally {
	            if (_didIteratorError20) {
	              throw _iteratorError20;
	            }
	          }
	        }
	      } else {
	        arr.get = NL.get;
	        arr.set = NL.set;
	        arr.call = NL.call;
	        arr.owner = owner;
	        return arr;
	      }
	    }
	  } catch (err) {
	    _didIteratorError19 = true;
	    _iteratorError19 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion19 && _iterator19.return) {
	        _iterator19.return();
	      }
	    } finally {
	      if (_didIteratorError19) {
	        throw _iteratorError19;
	      }
	    }
	  }

	  return new NodeList([list, owner]);
	}

	Object.getOwnPropertyNames(ArrayProto).forEach(function (key) {
	  if (key !== 'join' && key !== 'copyWithin' && key !== 'fill' && NL[key] === undefined) {
	    NL[key] = ArrayProto[key];
	  }
	});
	if (window.Symbol && Symbol.iterator) {
	  NL[Symbol.iterator] = NL.values = ArrayProto[Symbol.iterator];
	}
	var div = document.createElement('div');
	function setterGetter(prop) {
	  var _this3 = this,
	      _arguments = arguments;

	  if (div[prop] instanceof Function) {
	    NL[prop] = function () {
	      var arr = [];
	      var returnThis = true;
	      var _iteratorNormalCompletion21 = true;
	      var _didIteratorError21 = false;
	      var _iteratorError21 = undefined;

	      try {
	        for (var _iterator21 = NL[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
	          var el = _step21.value;

	          if (el && el[prop] instanceof Function) {
	            el = el[prop].apply(el, _arguments);
	            arr.push(el);
	            if (returnThis && el !== undefined) {
	              returnThis = false;
	            }
	          } else {
	            arr.push(undefined);
	          }
	        }
	      } catch (err) {
	        _didIteratorError21 = true;
	        _iteratorError21 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion21 && _iterator21.return) {
	            _iterator21.return();
	          }
	        } finally {
	          if (_didIteratorError21) {
	            throw _iteratorError21;
	          }
	        }
	      }

	      return returnThis ? _this3 : flatten(arr, _this3);
	    };
	  } else {
	    Object.defineProperty(NL, prop, {
	      get: function get() {
	        var arr = [];
	        var _iteratorNormalCompletion22 = true;
	        var _didIteratorError22 = false;
	        var _iteratorError22 = undefined;

	        try {
	          for (var _iterator22 = this[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
	            var el = _step22.value;

	            if (el !== null) {
	              el = el[prop];
	            }
	            arr.push(el);
	          }
	        } catch (err) {
	          _didIteratorError22 = true;
	          _iteratorError22 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion22 && _iterator22.return) {
	              _iterator22.return();
	            }
	          } finally {
	            if (_didIteratorError22) {
	              throw _iteratorError22;
	            }
	          }
	        }

	        return flatten(arr, this);
	      },
	      set: function set(value) {
	        var _iteratorNormalCompletion23 = true;
	        var _didIteratorError23 = false;
	        var _iteratorError23 = undefined;

	        try {
	          for (var _iterator23 = this[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
	            var el = _step23.value;

	            if (el && prop in el) {
	              el[prop] = value;
	            }
	          }
	        } catch (err) {
	          _didIteratorError23 = true;
	          _iteratorError23 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion23 && _iterator23.return) {
	              _iterator23.return();
	            }
	          } finally {
	            if (_didIteratorError23) {
	              throw _iteratorError23;
	            }
	          }
	        }
	      }
	    });
	  }
	}
	for (var prop in div) {
	  setterGetter(prop);
	}function NodeListJS() {
	  return new NodeList(arguments);
	}
	window.NL = NodeListJS;

	exports.default = NodeListJS;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: {
	            show: '=?',
	            columns: '='
	        },
	        templateUrl: __webpack_require__(12),
	        link: function link(scope, element) {
	            scope.show = false;

	            var $el = (0, _NodeList2.default)(element[0]);
	            $el.onBlur(function (e) {
	                scope.show = false;
	                scope.$apply();
	            });

	            // if (angular.isArray(scope.columns)) {
	            //     angular.forEach(scope.columns, function (col) {
	            //         if (!col.hasOwnProperty('visible')) {
	            //             col.visible = true
	            //         }
	            //     })
	            // }
	        }
	    };
	};

	var _NodeList = __webpack_require__(10);

	var _NodeList2 = _interopRequireDefault(_NodeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* injects from baggage-loader */
	__webpack_require__(12);

/***/ },
/* 12 */
/***/ function(module, exports) {

	var path = 'src/components/btShowColumns.html';
	var html = "<div class=\"keep-open btn-group\" ng-class=\"{ open: show }\">\r\n    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" ng-click=\"show=!show\">\r\n        <i class=\"glyphicon glyphicon-th icon-th\">\r\n        </i>\r\n        <span class=\"caret\">\r\n        </span>\r\n    </button>\r\n    <ul class=\"dropdown-menu\" ng-show=\"show\" aria-labelledby=\"simple-dropdown\">\r\n        <li ng-repeat=\"col in columns\">\r\n            <label>\r\n                <input type=\"checkbox\" ng-model=\"col.visible\">\r\n                {{col.title}}\r\n            </label>\r\n        </li>\r\n    </ul>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        scope: {
	            caption: '@?',
	            fieldName: '@?',
	            sortable: '=?'
	        },
	        restrict: 'A',
	        templateUrl: __webpack_require__(14),
	        link: function link(scope, element, attr, ctrl) {

	            scope.is_sortable = !!scope.sortable;
	            scope.sort_class = '';

	            if (scope.is_sortable) {
	                element.bind('click', function () {
	                    if (scope.sortable.sort_name === scope.fieldName) {
	                        scope.sortable.is_desc = !scope.sortable.is_desc;
	                        scope.sort_class = scope.sortable.is_desc ? 'desc' : 'asc';
	                    } else {
	                        scope.sortable.is_desc = false;
	                        scope.sortable.sort_name = scope.fieldName;
	                    }
	                    scope.$apply();
	                });

	                scope.$watch('sortable.sort_name', function (newVal) {
	                    if (scope.fieldName !== newVal) {
	                        scope.sort_class = '';
	                    } else {
	                        scope.sort_class = scope.sortable.is_desc ? 'desc' : 'asc';
	                    }
	                });
	            }
	        }
	    };
	};

	/* injects from baggage-loader */
	__webpack_require__(14);

/***/ },
/* 14 */
/***/ function(module, exports) {

	var path = 'src/components/btColSort.html';
	var html = "<div class=\"th-inner {{sort_class}}\" ng-class=\"{ 'sortable both' : is_sortable }\">\r\n    {{caption}}\r\n</div>\r\n<div class=\"fht-cell\"></div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/* injects from baggage-loader */

	exports.default = ['$compile', function ($compile) {
	    return {
	        restrict: 'A',
	        scope: {
	            item: '=btRow',
	            column: '=',
	            rowIndex: '@?',
	            rowCallback: '&?callback'
	        },
	        link: function link(scope, element, attr, ctrl) {
	            var templateStr = '';

	            var formatter = scope.column.formatter;

	            if (angular.isFunction(formatter)) {
	                templateStr = formatter(scope.item, scope.rowIndex);
	            } else {
	                templateStr = formatter || '<span ng-bind="item.' + scope.column.field + '"></span>';
	            }
	            var div = angular.element(templateStr);
	            $compile(div)(scope);
	            var td = angular.element(element[0]);
	            td.append(div);

	            scope.callback = function () {
	                if (angular.isFunction(scope.rowCallback)) {
	                    scope.rowCallback({ args: arguments });
	                }
	            };
	        }
	    };
	}];

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        replace: true,
	        restrict: 'E',
	        scope: {
	            checkboxes: '=',
	            selectField: '@?',
	            checkChange: '&?'
	        },
	        template: '<input type="checkbox" ng-model="master" ng-change="masterChange()">',
	        controller: ['$scope', '$element', function ($scope, $element) {

	            var select_field = $scope.selectField || 'isSelected';

	            $scope.masterChange = function () {
	                if ($scope.master) {
	                    angular.forEach($scope.checkboxes, function (cb, index) {
	                        cb[select_field] = true;
	                    });
	                } else {
	                    angular.forEach($scope.checkboxes, function (cb, index) {
	                        cb[select_field] = false;
	                    });
	                }

	                if (angular.isFunction($scope.checkChange)) {
	                    $scope.checkChange();
	                }
	            };

	            $scope.$on('check_change', function () {
	                check_change();
	            });

	            function check_change() {
	                var allSet = true,
	                    allClear = true;
	                angular.forEach($scope.checkboxes, function (cb, index) {
	                    if (cb[select_field]) {
	                        allClear = false;
	                    } else {
	                        allSet = false;
	                    }
	                });

	                if (allSet) {
	                    $scope.master = true;
	                    $element.prop('indeterminate', false);
	                } else if (allClear) {
	                    $scope.master = false;
	                    $element.prop('indeterminate', false);
	                } else {
	                    $scope.master = false;
	                    $element.prop('indeterminate', true);
	                }
	            }

	            // $scope.$watch('checkboxes', function () {
	            //     click_change()
	            // }, true);
	        }]
	    };
	};

/***/ }
/******/ ]);