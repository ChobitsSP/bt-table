'use strict';

(function (angular) {

    var tableModule = angular.module('bt-table', [])

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

})(angular)