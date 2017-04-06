import $ from '@utils/NodeList.js'
import template from './btShowColumns.html'

export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            show: '=?',
            columns: '='
        },
        template: template,
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