﻿export default function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            columns: '='
        },
        templateUrl: require('./bt-show-columns.html'),
        link: function (scope) {
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