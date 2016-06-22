'use strict';

(function (angular) {

    var tableModule = angular.module('bt-table', ['ui.bootstrap'])

    function table_controller($scope) {
        $scope.config = angular.extend({}, $scope.config)

        $scope.$watch('[pager.sort_name,pager.is_desc]', function (newVal, oldVal) {
            if (newVal == oldVal) return
            if (angular.isFunction($scope.refresh)) {
                $scope.refresh()
            }
        })

        $scope.row_click = function (item, index) {
            if ($scope.config.checkbox) {
                item.$checked = !item.$checked
                $scope.$broadcast('check_change', item)
            }
            if (angular.isFunction($scope.rowClick)) {
                $scope.rowClick({ row: item, index: index })
            }
        }

        $scope.all_check_change = function () {
            if (angular.isFunction($scope.allCheckChange)) {
                $scope.allCheckChange()
            }
        }

        $scope.check_change = function (item) {
            $scope.$broadcast('check_change')
            if (angular.isFunction($scope.checkChange)) {
                $scope.checkChange({ row: item })
            }
        }

        $scope.rowClass = function (item) {
            return item.$row_class || ''
        }

        $scope.tdCallback = function (args, item, index) {
            if (angular.isFunction($scope.cellCallback)) {
                $scope.cellCallback({ args: args, row: item, index: index })
            }
        }

        // $scope.$on('resetView', function (event, data) {
        //     if ($scope.height == data.height) return
        //     $scope.height = data.height
        //     $scope.$apply()
        // })

        $scope.getStyle = function () {
            if ($scope.config.height) {
                return {
                    height: $scope.config.height
                }
            }
            return {}
        }
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
                checkChange:'&?',
                allCheckChange: '&?',
            },
            templateUrl: require('./bt-table.html'),
            controller: ['$scope', table_controller],
            link: function (scope, element, attr, ctrl) {
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

                $scope.$on('check_change', function () {
                    check_change()
                })

                function check_change() {
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
                }

                // $scope.$watch('checkboxes', function () {
                //     click_change()
                // }, true);
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