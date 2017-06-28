import btTable from '@components/btTable';
import btCol from '@components/btCol';
import btPager from '@components/btPager';
import btDropdown from '@components/btDropdown';
import btShowColumns from '@components/btShowColumns';
import btColSort from '@components/btColSort';

import btRow from '@directives/btRow';
import checkboxAll from '@directives/checkboxAll';

import './dev/ajax'

import Vue from 'vue'
import App from './App'

if(window.angular) {
    let app = angular.module('bt-table', [])

    app.directive('btTable', btTable)
    app.directive('btCol', btCol)
    app.directive('btPager', btPager)
    app.directive('btDropdown', btDropdown)
    app.directive('btShowColumns', btShowColumns)
    app.directive('btColSort', btColSort)

    app.directive('btRow', btRow)
    app.directive('checkboxAll', checkboxAll)
}
else {
    window.BtTable = {
        btTable: btTable,
        btCol: btCol,
        btPager: btPager,
        btDropdown: btDropdown,
        btShowColumns: btShowColumns,
        btColSort: btColSort,
        btRow: btRow,
        checkboxAll: checkboxAll
    }
}