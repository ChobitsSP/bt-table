import PagerHelper from 'utils/PagerHelper'

let paginationConfig = {
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    numDisplayEntries: 6, //连续分页主体部分分页条目数
    numEdgeEntries: 2,   //两侧首尾分页条目数
    rotate: true
}

let controller = ['$scope', '$attrs', '$parse', '$timeout', function ($scope, $attrs, $parse, $timeout) {
    var self = this,
        ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
        setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

    this.init = function (ngModelCtrl_, config) {
        ngModelCtrl = ngModelCtrl_;
        this.config = config;

        ngModelCtrl.$render = function () {
            self.render();
        };

        if ($scope.itemsPerPage) {
            //$scope.$parent.$watch('itemsPerPage', function (value) {
            //    $scope.itemsPerPage = parseInt(value, 10);
            //    $scope.totalPages = self.calculateTotalPages();
            //});
        } else {
            $scope.itemsPerPage = config.itemsPerPage;
        }
    };

    this.calculateTotalPages = function () {
        var totalPages = $scope.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / $scope.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };

    this.render = function () {
        $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
    };

    $scope.selectPage = function (page) {
        if ($scope.page !== page && page > 0 && page <= $scope.totalPages) {
            ngModelCtrl.$setViewValue(page);
            ngModelCtrl.$render();

            if (angular.isFunction($scope.pageChanged)) {
                $scope.pageChanged();
            }
        }
    };

    $scope.setPageSize = function (size) {
        $scope.isOpen = false;
        if ($scope.itemsPerPage !== size && size > 0) {
            $scope.itemsPerPage = size;
        }
    };

    $scope.getText = function (key) {
        return $scope[key + 'Text'] || self.config[key + 'Text'];
    };

    //page_size changed
    $scope.$watch('itemsPerPage', function (newValue, oldValue) {
        //if(newValue === oldValue) return
        $scope.totalPages = self.calculateTotalPages()
    })

    //total_result changed
    $scope.$watch('totalItems', function (newValue, oldValue) {
        $scope.totalPages = self.calculateTotalPages()
    })

    var change_state = 0

    $scope.$watch('totalPages', function (value, oldValue) {
        setNumPages($scope.$parent, value); // Readonly variable

        if ($scope.page > value) {
            $scope.selectPage(value);
        } else if (angular.isFunction(ngModelCtrl.$render)) {
            ngModelCtrl.$render();

            if (change_state === 0) {
                change_state = 1
            }
            else if(change_state === 1) {
                change_state = 2
                return
            }

            if (angular.isFunction($scope.pageChanged)) {
                $scope.pageChanged()
            }
        }
    })

    $scope.getCurrentCount = function () {
        return Math.min($scope.totalItems, $scope.page * $scope.itemsPerPage);
    };
}]

module.exports = ['$parse', function ($parse) {
    return {
        restrict: 'EA',
        scope: {
            itemsPerPage: '=',
            totalItems: '=',
            pageChanged: '&?',
            firstText: '@',
            previousText: '@',
            nextText: '@',
            lastText: '@'
        },
        require: ['btPager', '?ngModel'],
        controller: controller,
        templateUrl: require('./btPager.html'),
        replace: true,
        link: function (scope, element, attrs, ctrls) {
            scope.isOpen = false;

            var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

            if (!ngModelCtrl) {
                return; // do nothing if no ng-model
            }
            
            // Setup configuration parameters
            var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
                rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;

            var num_display_entries = angular.isDefined(attrs.numDisplayEntries) ? scope.$parent.$eval(attrs.numDisplayEntries) : paginationConfig.numDisplayEntries,
                num_edge_entries = angular.isDefined(attrs.numEdgeEntries) ? scope.$parent.$eval(attrs.numEdgeEntries) : paginationConfig.numEdgeEntries;
            
            let helper = new PagerHelper(num_display_entries, num_edge_entries);
            
            paginationCtrl.init(ngModelCtrl, paginationConfig);

            if (attrs.maxSize) {
                scope.$parent.$watch($parse(attrs.maxSize), function (value) {
                    maxSize = parseInt(value, 10);
                    paginationCtrl.render();
                });
            }

            var originalRender = paginationCtrl.render;
            paginationCtrl.render = function () {
                originalRender();
                if (scope.page > 0 && scope.page <= scope.totalPages) {
                    scope.pages = helper.getPages(scope.page, scope.totalPages);
                }
            }
        }
    }
}];