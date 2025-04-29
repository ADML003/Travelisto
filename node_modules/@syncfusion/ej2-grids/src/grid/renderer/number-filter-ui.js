import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { extend, isUndefined } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { DataManager, DataUtil, Query } from '@syncfusion/ej2-data';
import * as literals from '../base/string-literals';
import { getZIndexCalcualtion, toggleFilterUI } from '../base/util';
/**
 * `numberfilterui` render number column.
 *
 * @hidden
 */
MultiSelect.Inject(CheckBoxSelection);
var NumberFilterUI = /** @class */ (function () {
    function NumberFilterUI(parent, serviceLocator, filterSettings) {
        this.filterSettings = filterSettings;
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        if (this.parent) {
            this.parent.on(events.filterMenuClose, this.destroy, this);
            this.parent.on(events.destroy, this.destroy, this);
        }
    }
    NumberFilterUI.prototype.keyEventHandler = function (args) {
        if (args.keyCode === 13 || args.keyCode === 9) {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', false, true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.dispatchEvent(evt);
        }
    };
    NumberFilterUI.prototype.create = function (args) {
        this.numericInstance = this.parent.createElement('input', { className: 'e-flmenu-input', id: 'numberui-' + args.column.uid });
        this.multiSelectCheckBoxInstance = this.parent.createElement('input', { className: 'multiselect-input', id: 'multiselectnumberui-' + args.column.uid });
        args.target.appendChild(this.numericInstance);
        args.target.appendChild(this.multiSelectCheckBoxInstance);
        this.createNumericTextBox(args);
        this.createMultiSelectDropDown(args);
        toggleFilterUI(args.getOptrInstance.dropOptr.value, args.column.uid, args.column, args.column.type, args.dialogObj, args.getOptrInstance.dropOptr['previousValue']);
    };
    NumberFilterUI.prototype.write = function (args) {
        var operatorDropdown = this.parent.filterModule.filterModule.getOperatorDropdown();
        var numericObject = this.getNumericInstance(args.column.uid);
        var multiSelectObject = this.getMultiSelectInstance(args.column.uid);
        if (operatorDropdown.value === 'in' || operatorDropdown.value === 'notin') {
            multiSelectObject.value = Array.isArray(args.filteredValue) ? args.filteredValue : [];
        }
        else {
            numericObject.element.addEventListener('keydown', this.keyEventHandler);
            if (!Array.isArray(args.filteredValue)) {
                numericObject.value = args.filteredValue;
            }
        }
    };
    NumberFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        if (filterOptr === 'in' || filterOptr === 'notin') {
            var filterValue = this.getMultiSelectInstance(column.uid).value;
            filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', true);
        }
        else {
            var filterValue = this.getNumericInstance(column.uid).value;
            filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', true);
        }
    };
    NumberFilterUI.prototype.createNumericTextBox = function (args) {
        this.numericTxtObj = new NumericTextBox(extend({
            format: typeof (args.column.format) === 'string' || isUndefined(args.column.format) ? args.column.format :
                args.column.format.format,
            locale: this.parent.locale,
            cssClass: this.parent.cssClass ? 'e-popup-flmenu' + ' ' + this.parent.cssClass : 'e-popup-flmenu',
            placeholder: args.localizeText.getConstant('EnterValue'),
            enableRtl: this.parent.enableRtl
        }, args.column.filter.params));
        this.numericTxtObj.appendTo(this.numericInstance);
    };
    NumberFilterUI.prototype.createMultiSelectDropDown = function (args) {
        var isForeignColumn = args.column.isForeignColumn();
        var dataSource = isForeignColumn ? args.column.dataSource : this.parent.dataSource;
        var fields = isForeignColumn ? args.column.foreignKeyValue : args.column.field;
        this.multiSelectObj = new MultiSelect(extend({
            dataSource: dataSource instanceof DataManager ? dataSource : new DataManager(dataSource),
            fields: { text: fields, value: fields },
            mode: 'CheckBox',
            showDropDownIcon: true,
            popupHeight: '300px',
            showSelectAll: true,
            query: new Query().select(fields),
            cssClass: this.parent.cssClass ? 'e-multiselect-flmenu' + ' ' + this.parent.cssClass : 'e-multiselect-flmenu',
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl
        }, args.column.filter.params));
        this.dialogObj = args.dialogObj;
        this.dropdownOpen = this.openPopup.bind(this);
        this.dropdownComplete = this.actionComplete(fields);
        this.multiSelectObj.addEventListener(literals['open'], this.dropdownOpen);
        this.multiSelectObj.addEventListener(events.actionComplete, this.dropdownComplete);
        this.multiSelectObj.appendTo(this.multiSelectCheckBoxInstance);
    };
    NumberFilterUI.prototype.getNumericInstance = function (uid) {
        return document.querySelector("#numberui-" + uid).ej2_instances[0];
    };
    NumberFilterUI.prototype.getMultiSelectInstance = function (uid) {
        return document.querySelector("#multiselectnumberui-" + uid).ej2_instances[0];
    };
    NumberFilterUI.prototype.openPopup = function (args) {
        getZIndexCalcualtion(args, this.dialogObj);
    };
    NumberFilterUI.prototype.actionComplete = function (fields) {
        return function (e) {
            e.result = DataUtil.distinct(e.result, fields, true);
        };
    };
    NumberFilterUI.prototype.destroy = function () {
        this.parent.off(events.filterMenuClose, this.destroy);
        this.parent.off(events.destroy, this.destroy);
        if (this.numericTxtObj && !this.numericTxtObj.isDestroyed) {
            this.numericTxtObj.destroy();
        }
        if (this.multiSelectObj && !this.multiSelectObj.isDestroyed) {
            this.multiSelectObj.removeEventListener(literals['open'], this.dropdownOpen);
            this.multiSelectObj.removeEventListener(events.actionComplete, this.dropdownComplete);
            this.multiSelectObj.destroy();
        }
    };
    return NumberFilterUI;
}());
export { NumberFilterUI };
