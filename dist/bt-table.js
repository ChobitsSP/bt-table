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

	
	/* injects from baggage-loader */

	__webpack_require__(1)
	__webpack_require__(3)
	__webpack_require__(5)
	__webpack_require__(7)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	/* injects from baggage-loader */
	__webpack_require__(2);

	'use strict';

	(function (angular) {

	    var tableModule = angular.module('bt-table', ['ui.bootstrap'])

	    tableModule.directive('btTable', function () {
	        return {
	            restrict: 'E',
	            replace: true,
	            transclude: {
	                'toolbarLeft': '?toolbarLeft',
	                'toolbarRight': '?toolbarRight',
	            },
	            scope: {
	                columns: '=',
	                items: '=rows',
	                pager: '=',
	                config: '=?',
	                loading: '=?',
	                refresh: '&?',
	                rowClick: '&?',
	                radioItem: '=?',
	                radioClass: '@?',
	                pageChanged: '&?',
	                cellCallback: '&?',
	            },
	            templateUrl: __webpack_require__(2),
	            controller: ['$scope', function ($scope) {
	                
	                $scope.$watch('[pager.sort_name,pager.is_desc]', function (newVal, oldVal) {
	                    if (newVal == oldVal) return
	                    if (angular.isFunction($scope.refresh)) {
	                        $scope.refresh()
	                    }
	                })

	                $scope.row_click = function (item, index) {
	                    if (angular.isFunction($scope.rowClick)) {
	                        $scope.rowClick({ row: item, index: index })
	                    }
	                }

	                $scope.rowClass = function (item) {
	                    return $scope.radioItem === item ? $scope.radioClass : ''
	                }

	                $scope.tdCallback = function (args, item, index) {
	                    if (angular.isFunction($scope.cellCallback)) {
	                        $scope.cellCallback({ args: args, row: item, index: index })
	                    }
	                }
	            }],
	            link: function (scope, element, attr, ctrl) {


	            }
	        }
	    })

	    //http://stackoverflow.com/questions/12648466/how-can-i-get-angular-js-checkboxes-with-select-unselect-all-functionality-and-i
	    //<checkbox-all select-field="$checked" checkboxes="items" class="select-all-cb">
	    tableModule.directive('checkboxAll', function () {
	        return {
	            replace: true,
	            restrict: 'E',
	            scope: {
	                checkboxes: '=',
	                selectField: '@?',
	                checkChange: '&?',
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
	                        $scope.checkChange()
	                    }
	                }

	                $scope.$watch('checkboxes', function () {
	                    var allSet = true, allClear = true;
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
	                    }
	                    else if (allClear) {
	                        $scope.master = false;
	                        $element.prop('indeterminate', false);
	                    }
	                    else {
	                        $scope.master = false;
	                        $element.prop('indeterminate', true);
	                    }
	                }, true);
	            }]
	        }
	    })

	    //<td ng-repeat="column in columns" bt-row="item" column="column"></td>
	    tableModule.directive('btRow', ['$compile', function ($compile) {
	        return {
	            restrict: 'A',
	            scope: {
	                item: '=btRow',
	                column: '=',
	                rowIndex: '@?',
	                rowCallback: '&?callback',
	            },
	            link: function (scope, element, attr, ctrl) {
	                var templateStr = '';

	                var formatter = scope.column.formatter;

	                if (angular.isFunction(formatter)) {
	                    templateStr = formatter(scope.item, scope.rowIndex);
	                }
	                else {
	                    templateStr = formatter || '<span ng-bind="item.' + scope.column.field + '"></span>';
	                }
	                var div = angular.element(templateStr)
	                $compile(div)(scope)
	                var td = angular.element(element[0])
	                td.append(div)

	                scope.callback = function () {
	                    if (angular.isFunction(scope.rowCallback)) {
	                        scope.rowCallback({ args: arguments })
	                    }
	                }
	            }
	        }
	    }])

	    tableModule.directive('btColSort', function () {
	        return {
	            scope: {
	                caption: '@?',
	                fieldName: '@?',
	                sortable: '=?',
	            },
	            restrict: 'A',
	            template: '<div class="th-inner {{sort_class}}" ng-class="{ \'sortable both\' : is_sortable }">{{caption}}</div><div class="fht-cell"></div>',
	            link: function (scope, element, attr, ctrl) {

	                scope.is_sortable = !!scope.sortable;
	                scope.sort_class = '';

	                if (scope.is_sortable) {
	                    element.bind('click', function () {
	                        if (scope.sortable.sort_name === scope.fieldName) {
	                            scope.sortable.is_desc = !scope.sortable.is_desc;
	                            scope.sort_class = scope.sortable.is_desc ? 'desc' : 'asc';
	                        }
	                        else {
	                            scope.sortable.is_desc = false;
	                            scope.sortable.sort_name = scope.fieldName;
	                        }
	                        scope.$apply();
	                    })

	                    scope.$watch('sortable.sort_name', function (newVal) {
	                        if (scope.fieldName !== newVal) {
	                            scope.sort_class = '';
	                        }
	                        else {
	                            scope.sort_class = scope.sortable.is_desc ? 'desc' : 'asc';
	                        }
	                    })
	                }
	            }
	        }
	    })

	})(angular)

/***/ },
/* 2 */
/***/ function(module, exports) {

	var path = 'src/bt-table.html';
	var html = "<div class=\"bootstrap-table\">\r\n    <div class=\"fixed-table-toolbar\">\r\n        <div class=\"bars pull-left\" ng-transclude=\"toolbarLeft\">\r\n        </div>\r\n        <div class=\"columns columns-right btn-group pull-right\" ng-transclude=\"toolbarRight\">\r\n        </div>\r\n    </div>\r\n    <div class=\"fixed-table-container\" style=\"padding-bottom: 0px;\">\r\n        <div class=\"fixed-table-body\">\r\n            <table class=\"table table-striped table-hover table-bordered dataTable no-footer\" ng-cloak>\r\n                <thead>\r\n                    <tr role=\"row\">\r\n                        <th class=\"bs-checkbox\" ng-if=\"config.checkbox\">\r\n                            <div class=\"th-inner\">\r\n                                <checkbox-all select-field=\"$checked\" checkboxes=\"items\" class=\"checkbox\"></checkbox-all>\r\n                            </div>\r\n                        </th>\r\n                        <th ng-repeat=\"col in columns\" ng-show=\"col.visible\" bt-col=\"col\" pager=\"pager\"></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody ng-show=\"!loading\" ng-cloak>\r\n                    <tr ng-repeat=\"item in items track by $index\" ng-class=\"rowClass(item, $index)\" ng-click=\"row_click(item, $index)\">\r\n                        <td class=\"bs-checkbox\" ng-if=\"config.checkbox\">\r\n                            <input type=\"checkbox\" ng-model=\"item.$checked\" ng-click=\"$event.stopPropagation();\" class=\"checkbox\" />\r\n                        </td>\r\n                        <td ng-repeat=\"col in columns\" ng-show=\"col.visible\" bt-row=\"item\" column=\"col\" callback=\"tdCallback(args, item, $parent.$index)\"></td>\r\n                    </tr>\r\n                    <tr class=\"no-records-found\" ng-show=\"items.length == 0\">\r\n                        <td colspan=\"999\" class=\"text-center\">没有找到匹配的记录</td>\r\n                    </tr>\r\n                </tbody>\r\n                <tbody ng-show=\"loading\">\r\n                    <tr>\r\n                        <td colspan=\"999\" class=\"text-center\">正在加载数据 ... </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n    <bt-pager total-items=\"pager.total_result\"\r\n              items-per-page=\"pager.page_size\"\r\n              ng-model=\"pager.page_no\"\r\n              page-changed=\"pageChanged()\">\r\n    </bt-pager>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	/* injects from baggage-loader */
	__webpack_require__(4);

	(function (angular) {

	    var tableModule = angular.module('bt-table')

	    //<bt-show-columns columns="columns"></bt-show-columns>
	    tableModule.directive('btShowColumns', function () {
	        return {
	            restrict: 'E',
	            replace: true,
	            scope: {
	                columns: '='
	            },
	            templateUrl: __webpack_require__(4),
	            link: function (scope) {
	                if (angular.isArray(scope.columns)) {
	                    angular.forEach(scope.columns, function (col) {
	                        if (!col.hasOwnProperty('visible')) {
	                            col.visible = true
	                        }
	                    })
	                }
	            }
	        }
	    })

	})(angular)

/***/ },
/* 4 */
/***/ function(module, exports) {

	var path = 'src/bt-show-columns.html';
	var html = "<div class=\"keep-open btn-group\" uib-dropdown auto-close=\"outsideClick\">\r\n    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" uib-dropdown-toggle>\r\n        <i class=\"glyphicon glyphicon-th icon-th\">\r\n        </i>\r\n        <span class=\"caret\">\r\n        </span>\r\n    </button>\r\n    <ul class=\"dropdown-menu\" uib-dropdown-menu aria-labelledby=\"simple-dropdown\">\r\n        <li ng-repeat=\"col in columns\">\r\n            <label>\r\n                <input type=\"checkbox\" ng-model=\"col.visible\">\r\n                {{col.title}}\r\n            </label>\r\n        </li>\r\n    </ul>\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	/* injects from baggage-loader */
	__webpack_require__(6);

	(function (angular) {

	    var tableModule = angular.module('bt-table')

	    tableModule
	    .controller('btPagerController', ['$scope', '$attrs', '$parse', '$timeout', function ($scope, $attrs, $parse, $timeout) {
	        var self = this,
	            ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
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
	            if ($scope.itemsPerPage !== size && size > 0) {
	                $scope.itemsPerPage = size;
	            }
	        };

	        $scope.getText = function (key) {
	            return $scope[key + 'Text'] || self.config[key + 'Text'];
	        };
	        $scope.noPrevious = function () {
	            return $scope.page === 1;
	        };
	        $scope.noNext = function () {
	            return $scope.page === $scope.totalPages;
	        };

	        $scope.$watch('itemsPerPage', function () {
	            $scope.totalPages = self.calculateTotalPages();
	        });

	        $scope.$watch('totalItems', function () {
	            $scope.totalPages = self.calculateTotalPages();
	        });

	        $scope.$watch('totalPages', function (value) {
	            setNumPages($scope.$parent, value); // Readonly variable

	            if ($scope.page > value) {
	                $scope.selectPage(value);
	            } else if (angular.isFunction(ngModelCtrl.$render)) {
	                ngModelCtrl.$render();

	                if (angular.isFunction($scope.pageChanged)) {
	                    $scope.pageChanged();
	                }
	            }
	        });

	        $scope.getCurrentCount = function () {
	            return Math.min($scope.totalItems, $scope.page * $scope.itemsPerPage);
	        };
	    }])
	    .constant('btPagerConfig', {
	        itemsPerPage: 10,
	        boundaryLinks: false,
	        directionLinks: true,
	        firstText: 'First',
	        previousText: 'Previous',
	        nextText: 'Next',
	        lastText: 'Last',
	        numDisplayEntries: 6, //连续分页主体部分分页条目数
	        numEdgeEntries: 2,   //两侧首尾分页条目数
	        rotate: true
	    })
	    .directive('btPager', ['$parse', 'btPagerConfig', function ($parse, paginationConfig) {
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
	            controller: 'btPagerController',
	            templateUrl: __webpack_require__(6),
	            replace: true,
	            link: function (scope, element, attrs, ctrls) {
	                var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

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

	                paginationCtrl.init(ngModelCtrl, paginationConfig);

	                if (attrs.maxSize) {
	                    scope.$parent.$watch($parse(attrs.maxSize), function (value) {
	                        maxSize = parseInt(value, 10);
	                        paginationCtrl.render();
	                    });
	                }

	                // Create page object used in template
	                function makePage(number, text, isActive) {
	                    return {
	                        number: number,
	                        text: text,
	                        active: isActive,
	                        disabled: text == '...',
	                    };
	                }

	                function getPages2(currentPage, totalPages) {
	                    var ret = [];
	                    var num_edge_entries = 2;
	                    var np = totalPages;
	                    var interval = getInterval(currentPage - 1, totalPages);

	                    // Generate starting points
	                    if (interval[0] > 0 && num_edge_entries > 0) {
	                        var end = Math.min(num_edge_entries, interval[0]);
	                        for (var i = 0; i < end; i++) {
	                            var page = makePage(i + 1, i + 1, (i + 1) === currentPage);
	                            ret.push(page);
	                        }
	                        if (num_edge_entries < interval[0]) {
	                            var page = makePage(-1, '...', false);
	                            ret.push(page);
	                        }
	                    }
	                    // Generate interval links
	                    for (var i = interval[0]; i < interval[1]; i++) {
	                        var page = makePage(i + 1, i + 1, (i + 1) === currentPage);
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
	                            var page = makePage(i + 1, i + 1, (i + 1) === currentPage);
	                            ret.push(page);
	                        }
	                    }

	                    return ret;
	                }

	                function getPages(currentPage, totalPages) {
	                    var pages = [];

	                    // Default page limits
	                    var startPage = 1, endPage = totalPages;
	                    var isMaxSized = (angular.isDefined(maxSize) && maxSize < totalPages);

	                    // recompute if maxSize
	                    if (isMaxSized) {
	                        if (rotate) {
	                            // Current page is displayed in the middle of the visible ones
	                            startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
	                            endPage = startPage + maxSize - 1;

	                            // Adjust if limit is exceeded
	                            if (endPage > totalPages) {
	                                endPage = totalPages;
	                                startPage = endPage - maxSize + 1;
	                            }
	                        } else {
	                            // Visible pages are paginated with maxSize
	                            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

	                            // Adjust last page if limit is exceeded
	                            endPage = Math.min(startPage + maxSize - 1, totalPages);
	                        }
	                    }

	                    // Add page number links
	                    for (var number = startPage; number <= endPage; number++) {
	                        var page = makePage(number, number, number === currentPage);
	                        pages.push(page);
	                    }

	                    // Add links to move between page sets
	                    if (isMaxSized && !rotate) {
	                        if (startPage > 1) {
	                            var previousPageSet = makePage(startPage - 1, '...', false);
	                            pages.unshift(previousPageSet);
	                        }

	                        if (endPage < totalPages) {
	                            var nextPageSet = makePage(endPage + 1, '...', false);
	                            pages.push(nextPageSet);
	                        }
	                    }

	                    return pages;
	                }

	                /**
	                * Calculate start and end point of pagination links depending on
	                * currentPage and num_display_entries.
	                * @return {Array}
	                */
	                function getInterval(currentPage, pageCount) {
	                    //var num_display_entries = 6;
	                    //var num_edge_entries = 2;

	                    var ne_half = Math.ceil(num_display_entries / 2);
	                    var np = pageCount;
	                    var upper_limit = np - num_display_entries;
	                    var start = currentPage > ne_half ? Math.max(Math.min(currentPage - ne_half, upper_limit), 0) : 0;
	                    var end = currentPage > ne_half ? Math.min(currentPage + ne_half, np) : Math.min(num_display_entries, np);
	                    return [start, end];
	                }

	                var originalRender = paginationCtrl.render;
	                paginationCtrl.render = function () {
	                    originalRender();
	                    if (scope.page > 0 && scope.page <= scope.totalPages) {
	                        scope.pages = getPages2(scope.page, scope.totalPages);
	                    }
	                }
	            }
	        }
	    }])

	})(angular)

/***/ },
/* 6 */
/***/ function(module, exports) {

	var path = 'src/bt-pager.html';
	var html = "\r\n<div class=\"fixed-table-pagination\" style=\"display: block;\">\r\n    <div class=\"pull-left pagination-detail\">\r\n        <span class=\"pagination-info\">显示第 {{(page - 1) * itemsPerPage + 1}} 到第 {{getCurrentCount()}} 条记录，总共 {{totalItems}} 条记录</span>\r\n        <span class=\"page-list\">\r\n            每页显示\r\n            <span uib-dropdown class=\"btn-group dropup\">\r\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" uib-dropdown-toggle>\r\n                    <span class=\"page-size\">{{itemsPerPage}}</span>\r\n                    <span class=\"caret\"></span>\r\n                </button>\r\n                <ul class=\"dropdown-menu\" uib-dropdown-menu>\r\n                    <li ng-class=\"{ active: itemsPerPage == size }\" ng-repeat=\"size in [10,25,50,100] track by $index\">\r\n                        <a ng-click=\"setPageSize(size)\">{{::size}}</a>\r\n                    </li>\r\n                </ul>\r\n            </span> 条记录\r\n        </span>\r\n    </div>\r\n    <div class=\"pull-right pagination\" ng-show=\"totalItems > itemsPerPage\">\r\n        <ul class=\"pagination\">\r\n            <li class=\"page-pre\" ng-if=\"!noPrevious()\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page - 1)\">上一页</a>\r\n            </li>\r\n            <li class=\"page-number\" ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active, disabled: page.disabled}\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page.number)\">{{page.text}}</a>\r\n            </li>\r\n            <li class=\"page-nex\" ng-if=\"!noNext()\">\r\n                <a style=\"cursor:pointer;\" ng-click=\"selectPage(page + 1)\">下一页</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	/* injects from baggage-loader */
	__webpack_require__(8);

	'use strict';

	(function (angular) {

	    var tableModule = angular.module('bt-table')

	    tableModule.directive('btCol', function () {
	        return {
	            restrict: 'A',
	            scope: {
	                column: '=btCol',
	                pager: '=?',
	            },
	            templateUrl: __webpack_require__(8),
	            link: function (scope, element, attr, ctrl) {
	                scope.sort_class = '';

	                if (scope.column.sortable) {
	                    scope.change_sort = function () {
	                        if (scope.column.sortable === false) return

	                        if (scope.pager.sort_name === scope.column.field) {
	                            scope.pager.is_desc = !scope.pager.is_desc
	                            scope.sort_class = scope.pager.is_desc ? 'desc' : 'asc'
	                        }
	                        else {
	                            scope.pager.is_desc = false
	                            scope.pager.sort_name = scope.column.field
	                        }
	                    }

	                    scope.$watch('sortable.sort_name', function (newVal) {
	                        if (scope.column.field !== newVal) {
	                            scope.sort_class = '';
	                        }
	                        else {
	                            scope.sort_class = scope.pager.is_desc ? 'desc' : 'asc';
	                        }
	                    })
	                }
	            }
	        }
	    })

	})(angular)

/***/ },
/* 8 */
/***/ function(module, exports) {

	var path = 'src/bt-col.html';
	var html = "<div class=\"th-inner {{sort_class}}\" ng-click=\"change_sort()\" ng-class=\"{ 'sortable both' : column.sortable }\">\r\n    {{column.title}}\r\n</div>\r\n<div class=\"fht-cell\">\r\n</div>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ }
/******/ ]);