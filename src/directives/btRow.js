export default ['$compile', function ($compile) {
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
}]