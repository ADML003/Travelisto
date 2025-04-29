import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { L10n, Internationalization, EmitType, ModuleDeclaration } from '@syncfusion/ej2-base';
import { SparklineBorderModel, SparklineTooltipSettingsModel, ContainerAreaModel, AxisSettingsModel } from './model/base-model';
import { SparklineMarkerSettingsModel, SparklineDataLabelSettingsModel, RangeBandSettingsModel, PaddingModel } from './model/base-model';
import { SparklineType, SparklineValueType, SparklineRangePadding, SparklineTheme } from './model/enum';
import { Size } from './utils/helper';
import { ISparklineLoadedEventArgs, ISparklineLoadEventArgs, IDataLabelRenderingEventArgs, IPointRegionEventArgs } from './model/interface';
import { IMarkerRenderingEventArgs, ISparklinePointEventArgs, ISparklineMouseEventArgs } from './model/interface';
import { IAxisRenderingEventArgs, ISparklineResizeEventArgs, ITooltipRenderingEventArgs } from './model/interface';
import { ISeriesRenderingEventArgs, IThemes } from './model/interface';
import { SparklineRenderer } from './rendering/sparkline-renderer';
import { SparklineTooltip } from './rendering/sparkline-tooltip';
import { SparklineModel } from './sparkline-model';
import { DataManager, Query } from '@syncfusion/ej2-data';
/**
 * Represents the Sparkline control.
 * ```html
 * <div id="sparkline"/>
 * <script>
 *   var sparkline = new Sparkline();
 *   sparkline.appendTo("#sparkline");
 * </script>
 * ```
 */
export declare class Sparkline extends Component<HTMLElement> implements INotifyPropertyChanged {
    sparklineTooltipModule: SparklineTooltip;
    /**
     * To configure Sparkline width.
     */
    width: string;
    /**
     * To configure Sparkline height.
     */
    height: string;
    /**
     * To configure Sparkline points border color and width.
     */
    border: SparklineBorderModel;
    /**
     * To configure Sparkline series type.
     *
     * @default 'Line'
     */
    type: SparklineType;
    /**
     * To configure Sparkline series type.
     *
     * @default 'None'
     */
    rangePadding: SparklineRangePadding;
    /**
     * To configure sparkline data source.
     *
     * @isGenericType true
     * @default null
     */
    dataSource: Object[] | DataManager;
    /**
     * Specifies the query for filter the data.
     *
     * @default null
     */
    query: Query;
    /**
     * To configure sparkline series value type.
     *
     * @default 'Numeric'
     */
    valueType: SparklineValueType;
    /**
     * To configure sparkline series xName.
     *
     * @default null
     */
    xName: string;
    /**
     * To configure sparkline series yName.
     *
     * @default null
     */
    yName: string;
    /**
     * To configure sparkline series fill.
     *
     * @default '#00bdae'
     */
    fill: string;
    /**
     * To configure sparkline series highest y value point color.
     *
     * @default ''
     */
    highPointColor: string;
    /**
     * To configure sparkline series lowest y value point color.
     *
     * @default ''
     */
    lowPointColor: string;
    /**
     * To configure sparkline series first x value point color.
     *
     * @default ''
     */
    startPointColor: string;
    /**
     * To configure sparkline series last x value point color.
     *
     * @default ''
     */
    endPointColor: string;
    /**
     * To configure sparkline series negative y value point color.
     *
     * @default ''
     */
    negativePointColor: string;
    /**
     * To configure sparkline winloss series tie y value point color.
     *
     * @default ''
     */
    tiePointColor: string;
    /**
     * To configure sparkline series color palette. It applicable to column and pie type series.
     *
     * @default []
     */
    palette: string[];
    /**
     * To configure sparkline line series width.
     *
     * @default '1'
     */
    lineWidth: number;
    /**
     * To configure sparkline line series opacity.
     *
     * @default '1'
     */
    opacity: number;
    /**
     * To apply internationalization for sparkline.
     *
     * @default null
     */
    format: string;
    /**
     * To enable the separator.
     *
     * @default false
     */
    useGroupingSeparator: boolean;
    /**
     * To configure Sparkline tooltip settings.
     */
    tooltipSettings: SparklineTooltipSettingsModel;
    /**
     * To configure Sparkline container area customization.
     */
    containerArea: ContainerAreaModel;
    /**
     * To configure Sparkline axis line customization.
     */
    rangeBandSettings: RangeBandSettingsModel[];
    /**
     * To configure Sparkline container area customization.
     */
    axisSettings: AxisSettingsModel;
    /**
     * To configure Sparkline marker configuration.
     */
    markerSettings: SparklineMarkerSettingsModel;
    /**
     * To configure Sparkline dataLabel configuration.
     */
    dataLabelSettings: SparklineDataLabelSettingsModel;
    /**
     * To configure Sparkline container area customization.
     */
    padding: PaddingModel;
    /**
     * To configure sparkline theme.
     *
     * @default 'Material'
     */
    theme: SparklineTheme;
    /**
     * Triggers after sparkline rendered.
     *
     * @event loaded
     */
    loaded: EmitType<ISparklineLoadedEventArgs>;
    /**
     * Triggers before sparkline render.
     *
     * @event load
     */
    load: EmitType<ISparklineLoadEventArgs>;
    /**
     * Triggers before sparkline tooltip render.
     *
     * @event tooltipInitialize
     */
    tooltipInitialize: EmitType<ITooltipRenderingEventArgs>;
    /**
     * Triggers before sparkline series render.
     *
     * @event seriesRendering
     */
    seriesRendering: EmitType<ISeriesRenderingEventArgs>;
    /**
     * Triggers before sparkline axis render.
     *
     * @event axisRendering
     */
    axisRendering: EmitType<IAxisRenderingEventArgs>;
    /**
     * Triggers before sparkline points render.
     *
     * @event pointRendering
     */
    pointRendering: EmitType<ISparklinePointEventArgs>;
    /**
     * Triggers while mouse move on the sparkline point region.
     *
     * @event pointRegionMouseMove
     */
    pointRegionMouseMove: EmitType<IPointRegionEventArgs>;
    /**
     * Triggers while mouse click on the sparkline point region.
     *
     * @event pointRegionMouseClick
     */
    pointRegionMouseClick: EmitType<IPointRegionEventArgs>;
    /**
     * Triggers while mouse move on the sparkline container.
     *
     * @event sparklineMouseMove
     */
    sparklineMouseMove: EmitType<ISparklineMouseEventArgs>;
    /**
     * Triggers while mouse click on the sparkline container.
     *
     * @event sparklineMouseClick
     */
    sparklineMouseClick: EmitType<ISparklineMouseEventArgs>;
    /**
     * Triggers before the sparkline datalabel render.
     *
     * @event dataLabelRendering
     */
    dataLabelRendering: EmitType<IDataLabelRenderingEventArgs>;
    /**
     * Triggers before the sparkline marker render.
     *
     * @event markerRendering
     */
    markerRendering: EmitType<IMarkerRenderingEventArgs>;
    /**
     * Triggers on resizing the sparkline.
     *
     * @event resize
     */
    resize: EmitType<ISparklineResizeEventArgs>;
    /**
     * SVG renderer object.
     *
     * @private
     */
    renderer: SvgRenderer;
    /**
     * Sparkline renderer object.
     *
     * @private
     */
    sparklineRenderer: SparklineRenderer;
    /**
     * Sparkline SVG element's object.
     *
     * @private
     */
    svgObject: Element;
    /** @private */
    isDevice: boolean;
    /** @private */
    intervalDivs: number[];
    /** @private */
    isTouch: boolean;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    /**
     * resize event timer.
     *
     * @private
     */
    resizeTo: number;
    /**
     * Sparkline available height, width.
     *
     * @private
     */
    availableSize: Size;
    /**
     * Sparkline theme support.
     *
     *  @private
     */
    sparkTheme: IThemes;
    /**
     * localization object.
     *
     * @private
     */
    localeObject: L10n;
    /**
     * To process sparkline data internally.
     *
     * @private
     */
    sparklineData: Object[] | DataManager;
    /**
     * It contains default values of localization values
     */
    private defaultLocalConstants;
    /**
     * Internal use of internationalization instance.
     *
     * @private
     */
    intl: Internationalization;
    private previousTargetId;
    private currentPointIndex;
    /**
     * Constructor for creating the Sparkline widget.
     *
     * @param {SparklineModel} options - The options to configure the Sparkline widget.
     * @param {string | HTMLElement} element - The target element to render the Sparkline widget.
     */
    constructor(options?: SparklineModel, element?: string | HTMLElement);
    /**
     * Initializing pre-required values for sparkline.
     *
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * Sparkline Elements rendering starting.
     *
     * @returns {void}
     */
    protected render(): void;
    /**
     * @private
     * @returns {void}
     */
    processSparklineData(): void;
    /**
     * To render sparkline elements.
     *
     * @returns {void}
     */
    renderSparkline(): void;
    /**
     * Create secondary element for the tooltip.
     *
     * @returns {void}
     */
    private createDiv;
    /**
     * To set the left and top position for data label template for sparkline.
     *
     * @returns {void}
     */
    private setSecondaryElementPosition;
    /**
     * Render the sparkline border.
     *
     * @private
     * @returns {void}
     */
    private renderBorder;
    /**
     * To create svg element for sparkline.
     *
     * @returns {void}
     */
    private createSVG;
    /**
     * To Remove the Sparkline SVG object.
     *
     * @returns {void}
     */
    private removeSvg;
    /**
     * Method to set culture for sparkline.
     *
     * @returns {void}
     */
    private setCulture;
    /**
     * Keyboard navigation is used to set the tab theme color for the sparkline.
     *
     * @returns {void}
     */
    private setTheme;
    /**
     * To provide the array of modules needed for sparkline rendering.
     *
     * @returns {ModuleDeclaration[]} - The array of modules required for Sparkline rendering.
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Method to unbind events for sparkline chart.
     *
     * @returns {void}
     */
    private unWireEvents;
    /**
     * Method to bind events for the sparkline.
     *
     * @returns {void}
     */
    private wireEvents;
    /**
     * Sparkline resize event.
     *
     * @private
     * @returns {boolean} - false
     */
    sparklineResize(): boolean;
    /**
     * Handles the mouse move on sparkline.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    sparklineMove(e: PointerEvent): boolean;
    /**
     * Handles the mouse click on sparkline.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    sparklineClick(e: PointerEvent): boolean;
    /**
     * To check mouse event target is point region or not.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {{isPointRegion: boolean, pointIndex: number}} - Object containing whether the target is within a point region and the index of the point.
     */
    private isPointRegion;
    /**
     * Handles the mouse end.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    sparklineMouseEnd(e: PointerEvent): boolean;
    /**
     * Handles the mouse leave on sparkline.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {boolean} - false
     * @private
     */
    sparklineMouseLeave(e: PointerEvent): boolean;
    /**
     * Handles the keyboard onkeydown on sparkline.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {boolean} - false
     * @private
     */
    chartKeyDown(e: KeyboardEvent): boolean;
    /**
     * Handles the keyboard onkeydown on sparkline.
     *
     * @param {KeyboardEvent} e - The keyboard event.
     * @returns {boolean} - false
     * @private
     */
    chartKeyUp(e: KeyboardEvent): boolean;
    /**
     * Handles to set style for key event on the document.
     *
     * @param {target} target - element which currently focused.
     * @returns {void}
     * @private
     */
    private setNavigationStyle;
    /**
     * Handles to remove style for key event on the document.
     *
     * @returns {void}
     * @private
     */
    private removeNavigationStyle;
    private sparklineKeyboardNavigations;
    /**
     * Sets the tab index for the specified elements.
     *
     * @param {HTMLElement} previousElement - The previous element whose tab index needs to be removed.
     * @param {HTMLElement} currentElement - The current element to which the tab index needs to be set.
     * @returns {void}
     * @private
     */
    setTabIndex(previousElement: HTMLElement, currentElement: HTMLElement): void;
    /**
     * Gets the actual index based on the provided index and the total length.
     *
     * @param {number} index - The provided index.
     * @param {number} totalLength - The total length of the collection.
     * @returns {number} - The actual index, ensuring it is within the valid range.
     * @private
     */
    getActualIndex(index: number, totalLength: number): number;
    private focusChild;
    /**
     * Method to set mouse x, y from events.
     *
     * @param {PointerEvent} e - The pointer event.
     * @returns {void}
     */
    private setSparklineMouseXY;
    /**
     * To change rendering while property value modified.
     *
     * @private
     * @param {SparklineModel} newProp - new SparklineModel.
     * @returns {void}
     */
    onPropertyChanged(newProp: SparklineModel): void;
    /**
     * To render sparkline series and appending.
     *
     * @returns {void}
     */
    private refreshSparkline;
    /**
     * Get component name.
     *
     * @returns {string} - Returns the module name.
     */
    getModuleName(): string;
    /**
     * Destroy the component.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} -  The properties to be maintained in the persisted state.
     */
    getPersistData(): string;
}
