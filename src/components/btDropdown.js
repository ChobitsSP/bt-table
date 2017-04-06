import $ from '@utils/NodeList.js'
import template from './btDropdown.html'

export default function () {
    return {
        restrict: 'EA',
        scope: {
            text: '=text',
            show: '=?',
        },
        transclude: true,
        template: template,
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