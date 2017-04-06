export default function () {
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
}