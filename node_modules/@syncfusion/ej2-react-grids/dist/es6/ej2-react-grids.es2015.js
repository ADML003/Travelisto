import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { Grid, Pager } from '@syncfusion/ej2-grids';
export * from '@syncfusion/ej2-grids';

/**
 * `ColumnDirective` represent a column of the react Grid.
 * It must be contained in a Grid component(`GridComponent`).
 * ```tsx
 * <GridComponent dataSource={data} allowPaging={true} allowSorting={true}>
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='100'></ColumnDirective>
 * <ColumnDirective field='name' headerText='Name' width='100'></ColumnDirective>
 * <ColumnsDirective>
 * </GridComponent>
 * ```
 */
class ColumnDirective extends ComplexBase {
}
ColumnDirective.moduleName = 'column';
ColumnDirective.complexTemplate = { 'filter.itemTemplate': 'filter.itemTemplate' };
class ColumnsDirective extends ComplexBase {
}
ColumnsDirective.propertyName = 'columns';
ColumnsDirective.moduleName = 'columns';

class StackedColumnDirective extends ComplexBase {
}
StackedColumnDirective.moduleName = 'stackedColumn';
StackedColumnDirective.complexTemplate = { 'filter.itemTemplate': 'filter.itemTemplate' };
class StackedColumnsDirective extends ComplexBase {
}
StackedColumnsDirective.propertyName = 'columns';
StackedColumnsDirective.moduleName = 'stackedColumns';

/**
 * `AggregateDirective` represent a aggregate row of the react Grid.
 * It must be contained in a Grid component(`GridComponent`).
 * ```tsx
 * <GridComponent dataSource={data} allowPaging={true} allowSorting={true}>
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='100'></ColumnDirective>
 * <ColumnDirective field='name' headerText='Name' width='100'></ColumnDirective>
 * </ColumnsDirective>
 * <AggregatesDirective>
 * <AggregateDirective>
 * <AggregateColumnsDirective>
 * <AggregateColumnDirective field='ID' type='Min'></AggregateColumnsDirective>
 * </<AggregateColumnsDirective>
* </AggregateDirective>
 * </AggregatesDirective>
 * </GridComponent>
 * ```
 */
class AggregateDirective extends ComplexBase {
}
AggregateDirective.moduleName = 'aggregate';
class AggregatesDirective extends ComplexBase {
}
AggregatesDirective.propertyName = 'aggregates';
AggregatesDirective.moduleName = 'aggregates';

/**
 * `AggregateColumnDirective represent a aggregate column of the react Grid.
 * ```tsx
 * <GridComponent dataSource={data} allowPaging={true} allowSorting={true}>
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='100'></ColumnDirective>
 * <ColumnDirective field='name' headerText='Name' width='100'></ColumnDirective>
 * </ColumnsDirective>
 * <AggregatesDirective>
 * <AggregateDirective>
 * <AggregateColumnsDirective>
 * <AggregateColumnDirective field='ID' type='Min'></AggregateColumnsDirective>
 * </AggregateColumnsDirective>
 * </AggregateDirective>
 * </AggregatesDirective>
 * </GridComponent>
 * ```
 */
class AggregateColumnDirective extends ComplexBase {
}
AggregateColumnDirective.moduleName = 'aggregateColumn';
class AggregateColumnsDirective extends ComplexBase {
}
AggregateColumnsDirective.propertyName = 'columns';
AggregateColumnsDirective.moduleName = 'aggregateColumns';

/**
 * `GridComponent` represents the react Grid.
 * ```tsx
 * <GridComponent dataSource={data} allowPaging={true} allowSorting={true}/>
 * ```
 */
class GridComponent extends Grid {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.directivekeys = { 'columns': { 'column': { 'stackedColumns': 'stackedColumn' } }, 'aggregates': { 'aggregate': { 'aggregateColumns': 'aggregateColumn' } } };
        this.statelessTemplateProps = null;
        this.templateProps = ["template", "headerTemplate", "commandsTemplate", "filter.itemTemplate", "editTemplate", "filterTemplate", "columnChooserSettings.headerTemplate", "columnChooserSettings.template", "columnChooserSettings.footerTemplate"];
        this.immediateRender = false;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(GridComponent, [ComponentBase, Component]);

/**
 * `PagerComponent` represents the react Pager.
 * ```tsx
 * <PagerComponent/>
 * ```
 */
class PagerComponent extends Pager {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = false;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(PagerComponent, [ComponentBase, Component]);

export { AggregateColumnDirective, AggregateColumnsDirective, AggregateDirective, AggregatesDirective, ColumnDirective, ColumnsDirective, GridComponent, PagerComponent, StackedColumnDirective, StackedColumnsDirective };
//# sourceMappingURL=ej2-react-grids.es2015.js.map
