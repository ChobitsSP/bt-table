require('src/bt-table.js')

let app = angular.module('bt-table')

app.directive('btCol', require('components/btCol'))
app.directive('btPager', require('components/btPager'))
app.directive('btDropdown', require('components/btDropdown'))
app.directive('btShowColumns', require('components/btShowColumns'))

app.directive('btColSort', require('components/btColSort'))