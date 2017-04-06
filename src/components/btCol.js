export default function () {
    return {
        restrict: 'A',
        scope: {
            column: '=btCol',
            pager: '=?',
        },
        templateUrl: require('./btCol.html'),
        link: function (scope, element, attr, ctrl) {
            scope.sort_class = '';

            if (scope.column.sortable && scope.pager) {
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

                scope.$watch('pager.sort_name', function (newVal) {
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
}