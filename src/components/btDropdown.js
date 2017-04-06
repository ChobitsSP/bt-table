import $ from '@utils/NodeList.js'

export default function () {
    return {
        restrict: 'E',
        scope: {
            text: '=text',
            show: '=?',
        },
        transclude: true,
        templateUrl: require('./btDropdown.html'),
        link: function (scope, element, attr, ctrl) {
            const $el = $(element[0])
            $el.onBlur((e) => { 
                scope.show = false 
                scope.$apply()
            })
            //// WAI-ARIA
            //element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
            //scope.$watch('show', function (show) {
            //    element.attr('aria-expanded', !!show);
            //});
        }
    }
}