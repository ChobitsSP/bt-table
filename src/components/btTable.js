import template from './btTable.html'

let controller = ['$scope', function ($scope) {

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
}]

export default function () {
    return {
        restrict: 'EA',
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
            allCheckChange: '&?',
        },
        template: template,
        controller: controller,
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
}