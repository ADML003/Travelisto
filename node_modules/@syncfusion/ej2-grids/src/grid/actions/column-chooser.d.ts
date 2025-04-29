import { ServiceLocator } from '../services/service-locator';
import { IGrid, IAction } from '../base/interface';
import { ShowHide } from './show-hide';
import { ResponsiveDialogRenderer } from '../renderer/responsive-dialog-renderer';
/**
 * The `ColumnChooser` module is used to show or hide columns dynamically.
 */
export declare class ColumnChooser implements IAction {
    private l10n;
    private dlgObj;
    private searchValue;
    private flag;
    private timer;
    getShowHideService: ShowHide;
    private filterColumns;
    private showColumn;
    private hideColumn;
    private changedColumns;
    private unchangedColumns;
    private mainDiv;
    private infiniteDiv;
    private infiniteLoadedElement;
    private innerDiv;
    private ulElement;
    private isDlgOpen;
    private isColumnChooserOpen;
    private initialOpenDlg;
    private stateChangeColumns;
    private changedStateColumns;
    private dlgDiv;
    private isInitialOpen;
    private isCustomizeOpenCC;
    private cBoxTrue;
    private cBoxFalse;
    private searchBoxObj;
    private searchOperator;
    private targetdlg;
    private itemsCount;
    private infiniteSkipCount;
    private infiniteColumns;
    private infiniteInitialLoad;
    private prevInfiniteScrollDirection;
    private infiniteScrollAppendDiff;
    private prevShowedCols;
    private hideDialogFunction;
    private infiniteRenderMode;
    /** @hidden */
    parent: IGrid;
    /** @hidden */
    responsiveDialogRenderer: ResponsiveDialogRenderer;
    /** @hidden */
    serviceLocator: ServiceLocator;
    /**
     * Constructor for the Grid ColumnChooser module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     * @hidden
     */
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    private destroy;
    private setFullScreenDialog;
    private rtlUpdate;
    /**
     * @returns {void}
     * @hidden
     */
    addEventListener(): void;
    /**
     * @returns {void}
     * @hidden
     */
    removeEventListener(): void;
    private render;
    private clickHandler;
    private hideDialog;
    /**
     * To render columnChooser when showColumnChooser enabled.
     *
     * @param {number} x - specifies the position x
     * @param {number} y - specifies the position y
     * @param {Element} target - specifies the target
     * @returns {void}
     * @hidden
     */
    renderColumnChooser(x?: number, y?: number, target?: Element): void;
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     *
     * @param  {number} X - Defines the X axis.
     * @param  {number} Y - Defines the Y axis.
     * @return {void}
     */
    openColumnChooser(X?: number, Y?: number): void;
    private enableAfterRenderEle;
    private keyUpHandler;
    private setFocus;
    private customDialogOpen;
    private customDialogClose;
    private getColumns;
    private renderDlgContent;
    /**
     * To render the header template for the column chooser.
     * @returns {HTMLElement | string} This method return HTMLElement or string.
     * @hidden
     */
    renderHeader(): HTMLElement | string;
    /**
     * To render the footer template for the column chooser.
     * @returns {HTMLElement | string} This method return HTMLElement or string.
     */
    private renderFooter;
    private renderChooserList;
    private confirmDlgBtnClick;
    /**
     * Toggles the visibility of specified columns in the grid.
     * @param {Object} columns - An object specifying the columns to show or hide.
     * @param {string[]} columns.visibleColumns - An array of column identifiers specifying the columns to show.
     * @param {string[]} columns.hiddenColumns - An array of column identifiers specifying the columns to hide.
     * @param {string} columnKey - Defines the column key as a UID, field name, or header text.
     * @returns {void}
     * The 'columns' object contains the properties 'visibleColumns' and 'hiddenColumns' as arrays of column identifiers.
     */
    changeColumnVisibility(columns: {
        visibleColumns: string[];
        hiddenColumns: string[];
    }, columnKey?: string): void;
    private onResetColumns;
    private renderResponsiveColumnChooserDiv;
    resetColumnState(): void;
    private changedColumnState;
    private columnStateChange;
    private clearActions;
    private clearBtnClick;
    private checkstatecolumn;
    private columnChooserSearch;
    private updateIfiniteSelectAll;
    private wireEvents;
    private unWireEvents;
    private checkBoxClickHandler;
    private updateIntermediateBtn;
    private updateSelectAll;
    private refreshCheckboxButton;
    private refreshCheckboxList;
    private infiniteScrollMouseKeyDownHandler;
    private infiniteScrollMouseKeyUpHandler;
    private infiniteScrollHandler;
    private refreshCheckboxState;
    private checkState;
    private createCheckBox;
    private renderCheckbox;
    private columnChooserManualSearch;
    private startTimer;
    private stopTimer;
    private addcancelIcon;
    private removeCancelIcon;
    private mOpenDlg;
    private getModuleName;
    private hideOpenedDialog;
    private beforeOpenColumnChooserEvent;
    private renderResponsiveChangeAction;
    /**
     * To show the responsive custom sort dialog
     *
     * @param {boolean} enable - specifes dialog open
     * @returns {void}
     * @hidden
     */
    showCustomColumnChooser(enable: boolean): void;
}
