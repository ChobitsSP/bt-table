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

	var _btCol = __webpack_require__(1);

	var _btCol2 = _interopRequireDefault(_btCol);

	var _btPager = __webpack_require__(3);

	var _btPager2 = _interopRequireDefault(_btPager);

	var _btDropdown = __webpack_require__(6);

	var _btDropdown2 = _interopRequireDefault(_btDropdown);

	var _btShowColumns = __webpack_require__(8);

	var _btShowColumns2 = _interopRequireDefault(_btShowColumns);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* injects from baggage-loader */

	__webpack_require__(10);

	var app = angular.module('bt-table');

	app.directive('btCol', _btCol2.default);
	app.directive('btPager', _btPager2.default);
	app.directive('btDropdown', _btDropdown2.default);
	app.directive('btShowColumns', _btShowColumns2.default);

/***/ },
/* 1 */
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
	        templateUrl: __webpack_require__(2),
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
	__webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports) {

	var path = 'src/components/bt-col.html';
	var html = "<div class=\"th-inner {{sort_class}}\" ng-click=\"change_sort()\" ng-class=\"{ 'sortable both' : column.sortable }\">\r\n    {{column.title}}\r\n</div>\r\n<div class=\"fht-cell\">\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _PagerHelper = __webpack_require__(4);

	var _PagerHelper2 = _interopRequireDefault(_PagerHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* injects from baggage-loader */
	__webpack_require__(5);

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

	module.exports = ['$parse', function ($parse) {
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
	        templateUrl: __webpack_require__(5),
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
/* 4 */
/***/ function(module, exports) {

	'use strict';

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

	module.exports = PagerHelper;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var path = 'src/components/bt-pager.html';
	var html = "\r\n<div class=\"fixed-table-pagination\" style=\"display: block;\">\r\n    <div class=\"pull-left pagination-detail\">\r\n        <span class=\"pagination-info\">显示第 {{(page - 1) * itemsPerPage + 1}} 到第 {{getCurrentCount()}} 条记录，总共 {{totalItems}} 条记录</span>\r\n        <span class=\"page-list\" ng-show=\"totalItems > itemsPerPage\">\r\n            每页显示\r\n            <bt-dropdown btn-txt=\"itemsPerPage\" is-open=\"isOpen\">\r\n                <li ng-class=\"{ active: itemsPerPage == size }\" ng-repeat=\"size in [10,25,50,100] track by $index\">\r\n                    <a ng-click=\"setPageSize(size)\">{{::size}}</a>\r\n                </li>\r\n            </bt-dropdown> 条记录\r\n        </span>\r\n    </div>\r\n    <div class=\"pull-right pagination\" ng-show=\"totalItems > itemsPerPage\">\r\n        <ul class=\"pagination\">\r\n            <li class=\"page-pre\" ng-if=\"page === 1\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page - 1)\">‹</a>\r\n            </li>\r\n            <li class=\"page-number\" ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active, disabled: page.disabled}\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page.number)\">{{page.text}}</a>\r\n            </li>\r\n            <li class=\"page-nex\" ng-if=\"page === totalPages\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page + 1)\">›</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'E',
	        scope: {
	            btnTxt: '=btnTxt',
	            isOpen: '=?'
	        },
	        transclude: true,
	        templateUrl: __webpack_require__(7),
	        link: function link(scope, element, attr, ctrl) {
	            //// WAI-ARIA
	            //element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
	            //scope.$watch('isOpen', function (isOpen) {
	            //    element.attr('aria-expanded', !!isOpen);
	            //});
	        }
	    };
	};

	/* injects from baggage-loader */
	__webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports) {

	var path = 'src/components/bt-dropdown.html';
	var html = "<span class=\"btn-group dropup dropdown\" ng-class=\"{ 'open': isOpen }\">\r\n    <button type=\"button\" ng-click=\"isOpen=!isOpen\" class=\"btn btn-default dropdown-toggle\" aria-haspopup=\"true\" aria-expanded=\"true\">\r\n        <span>{{ btnTxt }}</span>\r\n        <span class=\"caret\"></span>\r\n    </button>\r\n    <ul class=\"dropdown-menu\" ng-show=\"isOpen\" ng-transclude>\r\n    </ul>\r\n</span>";
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
	        replace: true,
	        scope: {
	            columns: '='
	        },
	        templateUrl: __webpack_require__(9),
	        link: function link(scope) {
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

	/* injects from baggage-loader */
	__webpack_require__(9);

/***/ },
/* 9 */
/***/ function(module, exports) {

	var path = 'src/components/bt-show-columns.html';
	var html = "<div class=\"keep-open btn-group\" uib-dropdown auto-close=\"outsideClick\">\r\n    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" uib-dropdown-toggle>\r\n        <i class=\"glyphicon glyphicon-th icon-th\">\r\n        </i>\r\n        <span class=\"caret\">\r\n        </span>\r\n    </button>\r\n    <ul class=\"dropdown-menu\" uib-dropdown-menu aria-labelledby=\"simple-dropdown\">\r\n        <li ng-repeat=\"col in columns\">\r\n            <label>\r\n                <input type=\"checkbox\" ng-model=\"col.visible\">\r\n                {{col.title}}\r\n            </label>\r\n        </li>\r\n    </ul>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* injects from baggage-loader */
	__webpack_require__(11);

	'use strict';

	(function (angular) {

	    var tableModule = angular.module('bt-table', []);

	    function table_controller($scope) {
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
	    }

	    tableModule.directive('btTable', function () {
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
	            templateUrl: __webpack_require__(11),
	            controller: ['$scope', table_controller],
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
	    });

	    //http://stackoverflow.com/questions/12648466/how-can-i-get-angular-js-checkboxes-with-select-unselect-all-functionality-and-i
	    //<checkbox-all select-field="$checked" checkboxes="items" class="select-all-cb">
	    tableModule.directive('checkboxAll', function () {
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
	    });

	    //<td ng-repeat="column in columns" bt-row="item" column="column"></td>
	    tableModule.directive('btRow', ['$compile', function ($compile) {
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
	    }]);

	    tableModule.directive('btColSort', function () {
	        return {
	            scope: {
	                caption: '@?',
	                fieldName: '@?',
	                sortable: '=?'
	            },
	            restrict: 'A',
	            template: '<div class="th-inner {{sort_class}}" ng-class="{ \'sortable both\' : is_sortable }">{{caption}}</div><div class="fht-cell"></div>',
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
	    });
	})(angular);

/***/ },
/* 11 */
/***/ function(module, exports) {

	var path = 'src/bt-table.html';
	var html = "<div class=\"bootstrap-table\">\r\n    <div class=\"fixed-table-toolbar\" ng-transclude>\r\n    </div>\r\n    <div class=\"fixed-table-container\">\r\n        <div class=\"fixed-table-body\">\r\n            <table class=\"table table-striped table-hover table-bordered dataTable no-footer\" ng-cloak>\r\n                <thead>\r\n                    <tr role=\"row\">\r\n                        <th class=\"bs-checkbox\" style=\"text-align: center; vertical-align: middle; width: 36px; \" ng-if=\"config.checkbox\">\r\n                            <div class=\"th-inner\">\r\n                                <checkbox-all select-field=\"$checked\" checkboxes=\"items\" check-change=\"all_check_change()\" class=\"checkbox\"></checkbox-all>\r\n                            </div>\r\n                        </th>\r\n                        <th ng-class=\"col.th_class\" ng-repeat=\"col in columns\" ng-show=\"col.visible\" bt-col=\"col\" pager=\"pager\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-show=\"!loading\" ng-cloak>\r\n                    <tr ng-repeat=\"item in items track by $index\" ng-class=\"{{item.$row_class}}\" ng-click=\"row_click(item, $index)\">\r\n                        <td class=\"bs-checkbox\" ng-if=\"config.checkbox\">\r\n                            <input type=\"checkbox\" ng-model=\"item.$checked\" ng-click=\"$event.stopPropagation();check_change(item)\" class=\"checkbox\" />\r\n                        </td>\r\n                        <td ng-class=\"col.td_class\" ng-repeat=\"col in columns\" ng-show=\"col.visible\" bt-row=\"item\" column=\"col\" callback=\"tdCallback(args, item, $parent.$index)\"></td>\r\n                    </tr>\r\n                    <tr class=\"no-records-found\" ng-show=\"items.length == 0\">\r\n                        <td colspan=\"999\" class=\"text-center\">没有记录</td>\r\n                    </tr>\r\n                </tbody>\r\n                <tbody ng-show=\"loading\">\r\n                    <tr>\r\n                        <td colspan=\"999\" class=\"text-center\">正在加载数据 ... </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div ng-if=\"pager\">\r\n            <bt-pager total-items=\"pager.total_result\" items-per-page=\"pager.page_size\" ng-model=\"pager.page_no\" page-changed=\"pageChanged()\">\r\n            </bt-pager>\r\n        </div>\r\n    </div>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ }
/******/ ]);