let app = angular.module('app', ['bt-table'])

app.controller('ctrl', function ($scope, $http, $filter, $window, $timeout) {

    $scope.config = {
        checkbox: true,
    }

    $scope.columns = [
        {
            title: "radio",
            th_class: 'bs-radio',
            td_class: 'bs-radio',
            formatter: '<input type="radio" name="radio_item" ng-click="$event.stopPropagation();callback(\'radio\')" ng-model="item.$radio" ng-value="true">',
            sortable: false
        },
        {
            title: 'class',
            field: '$row_class',
            formatter: '<span>{{ item.$row_class | json }}</span>',
            sortable: false,
        },
        {
            title: 'id',
            field: 'id',
            sortable: true,
        },
        {
            title: 'name',
            field: 'name',
            sortable: true,
        },
        {
            title: 'nickname',
            field: 'nickname',
            sortable: true,
        },
        {
            title: 'email',
            field: 'email',
            sortable: true,
        },
        {
            title: 'birthdate',
            field: 'birthdate',
            sortable: true,
        },
        {
            title: 'gender',
            field: 'gender',
            sortable: true,
        },
        {
            title: 'created_at',
            field: 'created_at',
            formatter: '<span>{{ item.created_at | date : "yyyy-MM-dd HH:mm:ss" }}</span>',
            sortable: true,
        },
        {
            title: 'updated_at',
            field: 'updated_at',
            formatter: '<span>{{ item.updated_at | date : "yyyy-MM-dd HH:mm:ss" }}</span>',
            sortable: true,
        },
        {
            title: 'edit',
            formatter: '<div><a class="btn btn-xs btn-success" ng-click=callback("edit")>edit</a></div>',
        }
    ]

    $scope.items = []

    $scope.radioItem = null

    $scope.pager = {
        page_no: 1,
        page_size: 10,
        sort_name: 'id',
        is_desc: true,
        total_result: 0,
    }

    $scope.row_click = function (item, index) {
        $scope.radio_click(item)
    }

    $scope.pageChanged = function () {
        if ($scope.loading) return

        $scope.loading = true

        let post_data = {
            sort: $scope.pager.sort_name,
            page: $scope.pager.page_no,
            per_page: $scope.pager.page_size,
            is_desc: $scope.pager.is_desc,
        }

        ajax(post_data).then(rsp => {
            $scope.pager.total_result = rsp.total

            rsp.data.forEach(t => {
                if (t.id % 2 === 0) {
                    t.$row_class = { 'red': true }
                }
            })

            $scope.items = rsp.data
            $scope.loading = false
            $scope.$apply();
        })

        //$http.get('http://vuetable.ratiw.net/api/users', { params: post_data }).success(function (rsp) {
        //    $scope.pager.total_result = rsp.total
        //    $scope.items = rsp.data
        //    $scope.loading = false
        //})
    }

    $scope.edit = function (args, item, index) {
        if (args[0] === 'radio') {
            $scope.radio_click(item)
        }
        else if (args[0] === 'edit') {
            alert('edit')
        }
    }

    $scope.text_filter = function (searchText) {
        $scope.rows = $filter('filter')($scope.items, searchText)
    }

    $scope.radio_click = function (item) {
        $scope.items.forEach(t => t.$radio = false)
        item.$radio = true
    }
})