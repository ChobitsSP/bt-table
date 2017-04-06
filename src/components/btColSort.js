import template from './btColSort.html'

export default function () {
    return {
        scope: {
            caption: '@?',
            fieldName: '@?',
            sortable: '=?',
        },
        restrict: 'EA',
        template: template,
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
}