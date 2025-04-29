import { eventPromise, getZIndexCalcualtion, toggleFilterUI } from '../base/util';
import { Query, DataManager, DataUtil } from '@syncfusion/ej2-data';
import { CheckBoxSelection, DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import * as literals from '../base/string-literals';
/**
 * `boolfilterui` render boolean column.
 *
 * @hidden
 */
MultiSelect.Inject(CheckBoxSelection);
var BooleanFilterUI = /** @class */ (function () {
    function BooleanFilterUI(parent, serviceLocator, filterSettings) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.filterSettings = filterSettings;
        if (this.parent) {
            this.parent.on(events.filterMenuClose, this.destroy, this);
            this.parent.on(events.destroy, this.destroy, this);
        }
    }
    BooleanFilterUI.prototype.create = function (args) {
        this.elem = this.parent.createElement('input', { className: 'e-flmenu-input', id: 'bool-ui-' + args.column.uid });
        args.target.appendChild(this.elem);
        this.multiSelectElement = this.parent.createElement('input', { className: 'multiselect-input', id: 'multiselectbool-ui-' + args.column.uid });
        args.target.appendChild(this.multiSelectElement);
        this.createDropDownList(args);
        this.createMultiSelectDropDown(args);
        toggleFilterUI(args.getOptrInstance.dropOptr.value, args.column.uid, args.column, args.column.type, args.dialogObj, args.getOptrInstance.dropOptr['previousValue']);
    };
    BooleanFilterUI.prototype.write = function (args) {
        var operatorDropdown = this.parent.filterModule.filterModule.getOperatorDropdown();
        var dropdownObject = this.getBooleanInstance(args.column.uid);
        var multiSelectObject = this.getMultiSelectInstance(args.column.uid);
        if (operatorDropdown.value === 'in' || operatorDropdown.value === 'notin') {
            multiSelectObject.value = Array.isArray(args.filteredValue) ? args.filteredValue : [];
        }
        else {
            if (!isNullOrUndefined(args.filteredValue) && !Array.isArray(args.filteredValue)) {
                dropdownObject.value = args.filteredValue;
            }
        }
    };
    BooleanFilterUI.prototype.read = function (element, column, filterOptr, filterObj) {
        if (filterOptr === 'in' || filterOptr === 'notin') {
            var filterValue = this.getMultiSelectInstance(column.uid).value;
            filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', true);
        }
        else {
            var dropdownObject = this.getBooleanInstance(column.uid);
            var filterValue = (dropdownObject.value);
            filterObj.filterByColumn(column.field, filterOptr, filterValue, 'and', false);
        }
    };
    BooleanFilterUI.prototype.createDropDownList = function (args) {
        var _this = this;
        var isForeignColumn = args.column.isForeignColumn();
        var dataSource = isForeignColumn ? args.column.dataSource : this.parent.dataSource;
        var fields = isForeignColumn ? args.column.foreignKeyValue : args.column.field;
        this.dialogObj = args.dialogObj;
        this.dropInstance = new DropDownList(extend({
            dataSource: dataSource instanceof DataManager ?
                dataSource : new DataManager(dataSource),
            query: new Query().select(fields),
            fields: { text: fields, value: fields },
            placeholder: args.localizeText.getConstant('SelectValue'),
            cssClass: this.parent.cssClass ? 'e-popup-flmenu' + ' ' + this.parent.cssClass : 'e-popup-flmenu',
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl
        }, args.column.filter.params));
        this.dropdownOpen = this.openPopup.bind(this);
        this.dropdownComplete = this.actionComplete(fields);
        this.dropInstance.addEventListener(literals['open'], this.dropdownOpen);
        this.dropInstance.addEventListener(events.actionComplete, this.dropdownComplete);
        if (dataSource && 'result' in dataSource) {
            var query = this.parent.getQuery ? this.parent.getQuery().clone() : new Query();
            var defObj = eventPromise({ requestType: 'booleanfilterrequest' }, query);
            this.parent.trigger(events.dataStateChange, defObj.state);
            var def = defObj.deffered;
            def.promise.then(function (e) {
                _this.dropInstance.dataSource = new DataManager(e);
                _this.dropInstance.dataBind();
                var columns = _this.parent.filterSettings.columns;
                for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                    var column = columns_1[_i];
                    if (args.column.uid === column.uid) {
                        _this.dropInstance.value = column.value;
                    }
                }
            });
        }
        this.dropInstance.appendTo(this.elem);
    };
    BooleanFilterUI.prototype.createMultiSelectDropDown = function (args) {
        var isForeignColumn = args.column.isForeignColumn();
        var dataSource = isForeignColumn ? args.column.dataSource : this.parent.dataSource;
        var fields = isForeignColumn ? args.column.foreignKeyValue : args.column.field;
        this.multiSelectCheckBoxInstance = new MultiSelect(extend({
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
        this.multiSelectDropdownOpen = this.openPopup.bind(this);
        this.multiSelectDropdownComplete = this.actionComplete(fields);
        this.multiSelectCheckBoxInstance.addEventListener(literals['open'], this.multiSelectDropdownOpen);
        this.multiSelectCheckBoxInstance.addEventListener(events.actionComplete, this.multiSelectDropdownComplete);
        this.multiSelectCheckBoxInstance.appendTo(this.multiSelectElement);
    };
    BooleanFilterUI.prototype.getBooleanInstance = function (uid) {
        return document.querySelector("#bool-ui-" + uid).ej2_instances[0];
    };
    BooleanFilterUI.prototype.getMultiSelectInstance = function (uid) {
        return document.querySelector("#multiselectbool-ui-" + uid).ej2_instances[0];
    };
    BooleanFilterUI.prototype.openPopup = function (args) {
        getZIndexCalcualtion(args, this.dialogObj);
    };
    BooleanFilterUI.prototype.actionComplete = function (fields) {
        return function (e) {
            e.result = DataUtil.distinct(e.result, fields, true);
        };
    };
    BooleanFilterUI.prototype.destroy = function () {
        this.parent.off(events.filterMenuClose, this.destroy);
        this.parent.off(events.destroy, this.destroy);
        if (this.dropInstance && !this.dropInstance.isDestroyed) {
            this.dropInstance.removeEventListener(literals['open'], this.dropdownOpen);
            this.dropInstance.removeEventListener(events.actionComplete, this.dropdownComplete);
            this.dropInstance.destroy();
        }
        if (this.multiSelectCheckBoxInstance && !this.multiSelectCheckBoxInstance.isDestroyed) {
            this.multiSelectCheckBoxInstance.removeEventListener(literals['open'], this.multiSelectDropdownOpen);
            this.multiSelectCheckBoxInstance.removeEventListener(events.actionComplete, this.multiSelectDropdownComplete);
            this.multiSelectCheckBoxInstance.destroy();
        }
    };
    return BooleanFilterUI;
}());
export { BooleanFilterUI };
