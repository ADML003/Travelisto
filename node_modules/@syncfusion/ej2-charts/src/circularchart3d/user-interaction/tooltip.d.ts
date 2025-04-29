/**
 * Circular 3D chart tooltip.
 */
import { ChildProperty } from '@syncfusion/ej2-base';
import { BorderModel, FontModel, LocationModel } from '../../common/model/base-model';
import { CircularChart3D } from '../circularchart3d';
import { CircularChart3DPoints, CircularChart3DSeries } from '../renderer/series';
import { Tooltip as SVGTooltip } from '@syncfusion/ej2-svg-base';
/**
 * Represents data for a 3D point in a circular 3D series.
 *
 * @private
 */
export declare class CircularChart3DPointData {
    /** Gets or sets the 3D point in the circular series. */
    point: CircularChart3DPoints;
    /** Gets or sets the circular series to which the point belongs. */
    series: CircularChart3DSeries;
    /** Gets or sets the index of the point in the series. Default is 0. */
    index: number;
    /**
     * Initializes a new instance of the CircularChart3DPointData class.
     *
     * @param {CircularChart3DPoints} point - The 3D point in the circular series.
     * @param {CircularChart3DSeries} series - The circular series to which the point belongs.
     * @param {number} index - The index of the point in the series. Default is 0.
     */
    constructor(point: CircularChart3DPoints, series: CircularChart3DSeries, index?: number);
}
/**
 * Represents the tooltip settings for a circular 3D chart.
 *
 */
export declare class CircularChart3DTooltipSettings extends ChildProperty<CircularChart3DTooltipSettings> {
    /**
     * If set to true, enables the tooltip for the data points.
     *
     * @default false.
     */
    enable: boolean;
    /**
     * If set to true, enables the marker in the chart tooltip.
     *
     * @default true.
     */
    enableMarker: boolean;
    /**
     * The fill color of the tooltip, specified as a valid CSS color string in hex or rgba format.
     *
     * @default null
     */
    fill: string;
    /**
     * The header text for the tooltip. By default, it displays the series name.
     *
     * @default null
     */
    header: string;
    /**
     * The opacity of the tooltip, expressed as a numerical value.
     *
     * @default null
     */
    opacity: number;
    /**
     * Options for customizing the tooltip text appearance.
     */
    textStyle: FontModel;
    /**
     * The format for customizing the tooltip content.
     *
     * @default null.
     */
    format: string;
    /**
     * A custom template used to format the tooltip content. You can use ${x} and ${y} as placeholder text to display the corresponding data points.
     *
     * @default null.
     * @aspType string
     */
    template: string | Function;
    /**
     * If set to true, tooltip will animate while moving from one point to another.
     *
     * @default false.
     */
    enableAnimation: boolean;
    /**
     * Duration for the tooltip animation.
     *
     * @default 300
     */
    duration: number;
    /**
     * Duration of the fade-out animation for hiding the tooltip.
     *
     * @default 700
     */
    fadeOutDuration: number;
    /**
     * To wrap the tooltip long text based on available space.
     * This is only application for chart tooltip.
     *
     * @default false
     */
    enableTextWrap: boolean;
    /**
     * Options for customizing the tooltip borders.
     */
    border: BorderModel;
    /**
     * Specifies the location of the tooltip, relative to the chart.
     * If x is 20, tooltip moves by 20 pixels to the right of the chart
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let pie: CircularChart3D = new CircularChart3D({
     * ...
     * tooltip: {
     * enable: true,
     * location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * pie.appendTo('#Chart');
     * ```
     */
    location: LocationModel;
}
/**
 * The `CircularChart3DTooltip` module is used to render tooltips for a circular 3D chart.
 */
export declare class CircularChartTooltip3D extends ChildProperty<CircularChartTooltip3D> {
    /** @private */
    control: CircularChart3D;
    /** @private */
    template: string | Function;
    /** @private */
    element: HTMLElement;
    /** @private */
    formattedText: string[];
    /** @private */
    header: string;
    /** @private */
    currentPoints: CircularChart3DPointData[];
    /** @private */
    previousPoints: CircularChart3DPointData[];
    /** @private */
    tooltipInterval: number;
    /** @private */
    svgTooltip: SVGTooltip;
    /** @private */
    isRemove: boolean;
    /** @private */
    text: string[];
    /** @private */
    headerText: string;
    /** @private */
    tooltipRendered: boolean;
    /**
     * Handles the mouse leave event for the circular 3D chart.
     *
     * @returns {void}
     */
    mouseLeaveHandler(): void;
    /**
     * Handles the mouse up event for the circular 3D chart.
     *
     * @param {PointerEvent | TouchEvent} event - The mouse or touch event.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    mouseUpHandler(event: PointerEvent | TouchEvent, chart: CircularChart3D): void;
    /**
     * Handles the mouse move event for the circular 3D chart.
     *
     * @param {PointerEvent | TouchEvent} event - The mouse or touch event.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    mouseMoveHandler(event: PointerEvent | TouchEvent, chart: CircularChart3D): void;
    /**
     * Displays the tooltip for the circular 3D pie chart on pointer events or touch events.
     *
     * @param  {PointerEvent} event - The event triggering the tooltip display (pointer event or touch event).
     * @returns {void}
     */
    private tooltip;
    /**
     * Gets the HTML element with the specified ID from the document.
     *
     * @param {string} id - The ID of the HTML element to retrieve.
     * @returns {HTMLElement} - The HTML element with the specified ID, or null if not found.
     */
    private getElement;
    /**
     * Gets the tooltip element based on the visibility of the tooltip.
     *
     * @param {boolean} isTooltip - A flag indicating whether the tooltip is currently visible.
     * @returns {HTMLDivElement} - The tooltip element is returned, or null if the tooltip is not visible.
     */
    private getTooltipElement;
    /**
     * Creates and returns an HTMLDivElement for the tooltip.
     *
     * @returns {HTMLDivElement} - The created HTMLDivElement for the tooltip.
     */
    private createElement;
    /**
     * Renders the tooltip for a circular 3D series based on the provided point data.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DPointData} data - The CircularChart3D point data for which the tooltip will be rendered.
     * @returns {void}
     * @private
     */
    renderSeriesTooltip(chart: CircularChart3D, data: CircularChart3DPointData): void;
    /**
     * Removes the tooltip with a specified duration.
     *
     * @param {number} duration - The duration for the tooltip removal animation.
     * @returns {void}
     * @private
     */
    removeTooltip(duration: number): void;
    /**
     * Stops the animation by clearing the tooltip interval.
     *
     * @returns {void}
     */
    private stopAnimation;
    /**
     * Pushes CircularChart3D point data to the currentPoints array and updates the tooltip div if tooltip are enabled for the series.
     *
     * @param {CircularChart3DPointData} data - The CircularChart3D point data to be pushed.
     * @param {HTMLDivElement} tooltipDiv - The tooltip div element to be updated if tooltip are enabled.
     * @returns {boolean} - A flag indicating whether the data was successfully pushed.
     */
    private pushData;
    /**
     * Triggers the rendering of a tooltip for a CircularChart3D point data.
     *
     * @param {CircularChart3DPointData} point - The CircularChart3D point data for which the tooltip will be rendered.
     * @param {boolean} isFirst - A flag indicating whether it is the first rendering of the tooltip.
     * @param {string} textCollection - The collection of text to be included in the tooltip.
     * @param {string} headerText - The header text for the tooltip.
     * @returns {void}
     */
    private triggerTooltipRender;
    /**
     * Gets the CircularChart3D point data associated with a pointer or touch event on the chart.
     *
     * @param {PointerEvent | TouchEvent} event - The pointer or touch event.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {CircularChart3DPointData} - The CircularChart3D point data corresponding to the event.
     */
    private getPieData;
    /**
     * Gets the tooltip text for a circular 3D point data based on the specified tooltip settings.
     *
     * @param {CircularChart3DPointData} data - The circularChart3D point data for which the tooltip text will be generated.
     * @param {CircularChart3DTooltipSettingsModel} tooltip - The tooltip settings to determine the format of the text.
     * @returns {string} - The generated tooltip text.
     */
    private getTooltipText;
    /**
     * Finds the header for circular 3D point data.
     *
     * @param {CircularChart3DPointData} data - The circular 3D point data for which the header will be found.
     * @returns {string} - The found header string.
     */
    private findHeader;
    /**
     * Parses a template for a circular 3D chart.
     *
     * @param {CircularChart3DPoints} point - The circular 3D series point associated with the template.
     * @param {CircularChart3DSeries} series - The circular 3D series associated with the template.
     * @param {string} format - The format for parsing the template.
     * @returns {string} - The parsed template string.
     */
    private parseTemplate;
    /**
     * Creates a tooltip for a circularChart3D chart.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {boolean} isFirst - A flag indicating whether it is the first tooltip.
     * @param {CircularChart3DLocation} location - The location where the tooltip will be positioned.
     * @param {CircularChart3DLocation} clipLocation - The clipping location for the tooltip.
     * @param {CircularChart3DPoints} point - The circular 3D point associated with the tooltip.
     * @param {number} offset - The offset for the tooltip.
     * @param {Rect} bounds - The bounds of the tooltip.
     * @param {CircularChart3DPointData[]} extraPoints - An array of additional CircularChart3DPointData for the tooltip.
     * @param {CircularChart3DPoints | CircularChart3DPoints[]} templatePoint - The template point or points for the tooltip.
     * @param {string | Function} customTemplate - A custom template for the tooltip, specified as a string or a function.
     * @returns {void}
     */
    private createTooltip;
    /**
     * Highlights multiple points in a circular 3D chart series.
     * This method iterates through a collection of points (assuming they are represented by 'i') and applies the highlight effect to each point.
     *
     * @returns {void}
     */
    private highlightPoints;
    /**
     * Removes the highlight from a previously highlighted point in a circular 3D chart series.
     *
     * @returns {void}
     */
    private removeHighlight;
    /**
     * Highlights or un highlights a specific point in a circular 3D chart series.
     *
     * @param {CircularChart3DSeries} series - The circular 3D series to which the point belongs.
     * @param {number} pointIndex - The index of the point to be highlighted or un highlighted.
     * @param {boolean} highlight - A flag indicating whether to highlight (true) or un highlight (false) the point.
     * @returns {void}
     */
    private highlightPoint;
    /**
     * Fades out the tooltip associated with the provided CircularChart3DPointData.
     *
     * @returns {void}
     */
    private fadeOut;
    /**
     * Updates the previous point with additional CircularChart3DPointData.
     *
     * @param {CircularChart3DPointData} extraPoints - An array of additional CircularChart3DPointData to update the previous point.
     * @returns {void}
     */
    private updatePreviousPoint;
    /**
     * Finds and returns an array of colors from the current points.
     *
     * @returns {string[]} - An array of color strings.
     */
    private findPalette;
    /**
     * Gets the module name for the circular 3D tooltip.
     *
     * @returns {string} - The module name.
     */
    protected getModuleName(): string;
    /**
     * Destroys the circular 3D tooltip module.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
