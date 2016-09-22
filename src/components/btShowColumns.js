import $ from 'utils/NodeList.js'

module.exports = function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=?',
            columns: '='
        },
        templateUrl: require('./btShowColumns.html'),
        link: function (scope, element) {
            scope.show = false

            const $el = $(element[0])
            $el.onBlur((e) => {
                scope.show = false
                scope.$apply()
            })

            // if (angular.isArray(scope.columns)) {
            //     angular.forEach(scope.columns, function (col) {
            //         if (!col.hasOwnProperty('visible')) {
            //             col.visible = true
            //         }
            //     })
            // }
        }
    }
}