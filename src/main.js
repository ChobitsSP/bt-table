import btCol from 'components/bt-col'
import btPager from 'components/bt-pager'
import btDropdown from 'components/bt-dropdown'
import btShowColumns from 'components/bt-show-columns'

require('src/bt-table.js')

let app = angular.module('bt-table')

app.directive('btCol', btCol)
app.directive('btPager', btPager)
app.directive('btDropdown', btDropdown)
app.directive('btShowColumns', btShowColumns)