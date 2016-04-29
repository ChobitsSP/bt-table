(function (angular) {

    var tableModule = angular.module('bt-table', ['ui.bootstrap']);

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
            template: "<div class=\"fixed-table-pagination\"style=\"display: block;\"><div class=\"pull-left pagination-detail\"><span class=\"pagination-info\">显示第{{(page-1)*itemsPerPage+1}}到第{{getCurrentCount()}}条记录，总共{{totalItems}}条记录</span><span class=\"page-list\">每页显示<span uib-dropdown class=\"btn-group dropup\"><button type=\"button\"class=\"btn btn-default dropdown-toggle\"uib-dropdown-toggle><span class=\"page-size\">{{itemsPerPage}}</span><span class=\"caret\"></span></button><ul class=\"dropdown-menu\"uib-dropdown-menu><li ng-class=\"{ active: itemsPerPage == size }\"ng-repeat=\"size in [10,25,50,100] track by $index\"><a ng-click=\"setPageSize(size)\">{{::size}}</a></li></ul></span>条记录</span></div><div class=\"pull-right pagination\"ng-show=\"totalItems > itemsPerPage\"><ul class=\"pagination\"><li class=\"page-pre\"ng-if=\"!noPrevious()\"><a style=\"cursor:pointer;\"ng-click=\"selectPage(page - 1)\">上一页</a></li><li class=\"page-number\"ng-repeat=\"page in pages track by $index\"ng-class=\"{active: page.active, disabled: page.disabled}\"><a style=\"cursor:pointer;\"ng-click=\"selectPage(page.number)\">{{page.text}}</a></li><li class=\"page-nex\"ng-if=\"!noNext()\"><a style=\"cursor:pointer;\"ng-click=\"selectPage(page + 1)\">下一页</a></li></ul></div></div>",
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
                };
            }
        };
    }]);

    //http://stackoverflow.com/questions/12648466/how-can-i-get-angular-js-checkboxes-with-select-unselect-all-functionality-and-i
    //<checkbox-all select-field="$checked" checkboxes="items" class="select-all-cb">
    tableModule.directive('checkboxAll', function () {
        return {
            replace: true,
            restrict: 'E',
            scope: { checkboxes: '=', selectField: '@?' },
            template: '<input type="checkbox" ng-model="master" ng-change="masterChange()">',
            controller: function ($scope, $element) {

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
                };
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
            }
        };
    });

    tableModule.directive('showColumns', function () {
        return {
            replace: true,
            restrict: 'E',
            scope: { columns: '=' },
            template: "<div class=\"keep-open btn-group\"uib-dropdown auto-close=\"outsideClick\"><button type=\"button\"class=\"btn btn-default dropdown-toggle\"uib-dropdown-toggle><i class=\"glyphicon glyphicon-th icon-th\"></i><span class=\"caret\"></span></button><ul class=\"dropdown-menu\"uib-dropdown-menu aria-labelledby=\"simple-dropdown\"><li><label><checkbox-all select-field=\"visible\"checkboxes=\"columns\"></checkbox-all>全选</label></li><li ng-repeat=\"col in columns\"><label><input type=\"checkbox\"ng-model=\"col.visible\">{{::col.title}}</label></li></ul></div>",
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

    //<bt-show-columns columns="columns"></bt-show-columns>
    tableModule.directive('btShowColumns', function () {
        return {
            replace: true,
            restrict: 'E',
            scope: { columns: '=' },
            template: "<div class=\"keep-open btn-group\"uib-dropdown auto-close=\"outsideClick\"><button type=\"button\"class=\"btn btn-default dropdown-toggle\"uib-dropdown-toggle><i class=\"glyphicon glyphicon-th icon-th\"></i><span class=\"caret\"></span></button><ul class=\"dropdown-menu\"uib-dropdown-menu aria-labelledby=\"simple-dropdown\"><li ng-repeat=\"col in columns\"><label><input type=\"checkbox\"ng-model=\"col.visible\">{{::col.title}}</label></li></ul></div>",
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

    //<td ng-repeat="column in columns" bt-row="item" column="column"></td>
    tableModule.directive('btRow', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                item: '=btRow',
                column: '=',
                rowIndex: '@?',
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
                var div = angular.element(templateStr);
                $compile(div)(scope);
                var td = angular.element(element[0]);
                td.append(div);

                scope.$watch('column.visible', function (newVal) {
                    if (newVal === true) {
                        angular.element(element[0]).css('display', '');
                    }
                    else if (newVal === false) {
                        angular.element(element[0]).css('display', 'none');
                    }
                })
            },
        };
    })

    //<th ng-repeat="col in columns" bt-col="col" sortable="pager" sort-name="pager.sort_name" is-desc="pager.is_desc"></th>
    tableModule.directive('btCol', function () {
        return {
            restrict: 'A',
            scope: {
                column: '=btCol',
                sortable: '=?',
            },
            template: '<div class="th-inner {{sort_class}}" ng-class="{ \'sortable both\' : is_sortable }">{{column.title}}</div><div class="fht-cell"></div>',
            link: function (scope, element, attr, ctrl) {
                scope.is_sortable = !!scope.sortable;
                scope.sort_class = '';

                if (scope.is_sortable) {
                    element.bind('click', function () {
                        if (scope.sortable.sort_name === scope.column.field) {
                            scope.sortable.is_desc = !scope.sortable.is_desc;
                            scope.sort_class = scope.sortable.is_desc ? 'desc' : 'asc';
                        }
                        else {
                            scope.sortable.is_desc = false;
                            scope.sortable.sort_name = scope.column.field;
                        }
                        scope.$apply();
                    })

                    scope.$watch('sortable.sort_name', function (newVal) {
                        if (scope.column.field !== newVal) {
                            scope.sort_class = '';
                        }
                        else {
                            scope.sort_class = scope.sortable.is_desc ? 'desc' : 'asc';
                        }
                    })
                }

                scope.$watch('column.visible', function (newVal) {
                    if (newVal === true) {
                        angular.element(element[0]).css('display', '');
                    }
                    else if (newVal === false) {
                        angular.element(element[0]).css('display', 'none');
                    }
                })
            }
        }
    })

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

})(angular);
