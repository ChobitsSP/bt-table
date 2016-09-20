module.exports = function () {
    return {
        restrict: 'E',
        scope: {
            btnTxt: '=btnTxt',
            isOpen: '=?',
        },
        transclude: true,
        templateUrl: require('./btDropdown.html'),
        link: function (scope, element, attr, ctrl) {
            //// WAI-ARIA
            //element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
            //scope.$watch('isOpen', function (isOpen) {
            //    element.attr('aria-expanded', !!isOpen);
            //});
        }
    }
}