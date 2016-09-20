import btCol from 'components/bt-col'
import btDropdown from 'components/bt-dropdown'
import btShowColumns from 'components/bt-show-columns'

require('src/bt-table.js')

let app = angular.module('bt-table')

app.directive('btCol', btCol)
app.directive('btDropdown', btDropdown)
app.directive('btShowColumns', btShowColumns)

app.directive('btPager', require('components/btPager'))
app.directive('btColSort', require('components/btColSort'))