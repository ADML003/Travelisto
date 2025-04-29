/**
 * Circular 3D chart legend.
 */
import { ChildProperty } from '@syncfusion/ej2-base';
import { CircularChart3DSeries } from '../renderer/series';
import { BorderModel, ContainerPaddingModel, FontModel, MarginModel } from '../../common/model/base-model';
import { CircularChart3D } from '../circularchart3d';
import { BaseLegend, LegendOptions } from '../../common/legend/legend';
import { LegendSettingsModel } from '../../common/legend/legend-model';
import { Rect, Size } from '@syncfusion/ej2-svg-base';
import { Alignment, LabelOverflow, LegendPosition, LegendTitlePosition, TextWrap } from '../../common/utils/enum';
import { ChartLocation } from '../../common/utils/helper';
import { LocationModel } from '../../common/model/base-model';
/**
 * Configures the legends in circular 3D charts.
 */
export declare class CircularChart3DLegendSettings extends ChildProperty<CircularChart3DLegendSettings> {
    /**
     * If set to true, the legend will be displayed for the chart.
     *
     * @default true
     */
    visible: boolean;
    /**
     * The height of the legend in pixels.
     *
     * @default null
     */
    height: string;
    /**
     * The width of the legend in pixels.
     *
     * @default null
     */
    width: string;
    /**
     * Specifies the location of the legend, relative to the chart.
     * If x is 20, legend moves by 20 pixels to the right of the chart. It requires the `position` to be `Custom`.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let pie: CircularChart3D = new CircularChart3D({
     * ...
     *   legendSettings: {
     *     visible: true,
     *     position: 'Custom',
     *     location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * pie.appendTo('#Chart');
     * ```
     */
    location: LocationModel;
    /**
     * Position of the legend in the chart. Available options include:
     * * Auto: Places the legend based on the area type.
     * * Top: Displays the legend at the top of the chart.
     * * Left: Displays the legend at the left of the chart.
     * * Bottom: Displays the legend at the bottom of the chart.
     * * Right: Displays the legend at the right of the chart.
     * * Custom: Displays the legend based on the given x and y values.
     *
     * @default 'Auto'
     */
    position: LegendPosition;
    /**
     * Option to customize the padding around the legend items.
     *
     * @default 8
     */
    padding: number;
    /**
     * Option to customize the padding between legend items.
     *
     * @default null
     */
    itemPadding: number;
    /**
     * Legend in chart can be aligned as follows:
     * * Near: Aligns the legend to the left of the chart.
     * * Center: Aligns the legend to the center of the chart.
     * * Far: Aligns the legend to the right of the chart.
     *
     * @default 'Center'
     */
    alignment: Alignment;
    /**
     * Options to customize the legend text.
     */
    textStyle: FontModel;
    /**
     * Shape height of the legend in pixels.
     *
     * @default 10
     */
    shapeHeight: number;
    /**
     * Shape width of the legend in pixels.
     *
     * @default 10
     */
    shapeWidth: number;
    /**
     * Options to customize the border of the legend.
     */
    border: BorderModel;
    /**
     *  Options to customize left, right, top and bottom margins of the chart.
     */
    margin: MarginModel;
    /**
     *  Options to customize left, right, top and bottom padding for legend container of the chart.
     */
    containerPadding: ContainerPaddingModel;
    /**
     * Padding between the legend shape and text.
     *
     * @default 8
     */
    shapePadding: number;
    /**
     * The background color of the legend that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default 'transparent'
     */
    background: string;
    /**
     * Opacity of the legend.
     *
     * @default 1
     */
    opacity: number;
    /**
     * If set to true, series visibility collapses based on the legend visibility.
     *
     * @default true
     */
    toggleVisibility: boolean;
    /**
     * If set to true, the series get highlighted, while hovering the legend.
     *
     * @default false
     */
    enableHighlight: boolean;
    /**
     * Description for legends.
     *
     * @default null
     */
    description: string;
    /**
     * TabIndex value for the legend.
     *
     * @default 3
     */
    tabIndex: number;
    /**
     * Title for legends.
     *
     * @default null
     */
    title: string;
    /**
     * Options to customize the legend title.
     */
    titleStyle: FontModel;
    /**
     * Legend title position.
     *
     * @default 'Top'
     */
    titlePosition: LegendTitlePosition;
    /**
     * Defines the text wrap behavior to employ when the individual legend text overflows.
     * * `Normal`: Specifies to break words only at allowed break points.
     * * `Wrap`: Specifies to break a word once it is too long to fit on a line by itself.
     * * `AnyWhere`: Specifies to break a word at any point if there are no otherwise-acceptable break points in the line.
     *
     * @default 'Normal'
     */
    textWrap: TextWrap;
    /**
     * Defines the text overflow behavior to employ when the individual legend text overflows
     * * `Clip`: Specifies the text is clipped and not accessible.
     * * `Ellipsis`: Specifies an ellipsis (“...”) to the clipped text.
     *
     * @default 'Ellipsis'
     */
    textOverflow: LabelOverflow;
    /**
     * Maximum width for the legend title.
     *
     * @default 100
     */
    maximumTitleWidth: number;
    /**
     * Minimum label width for the legend text.
     *
     * @default null
     */
    maximumLabelWidth: number;
    /**
     * If set to true, legend will be visible using pages.
     *
     * @default true
     */
    enablePages: boolean;
    /**
     * If `isInversed` set to true, then it inverses legend item content (image and text).
     *
     * @default false.
     */
    isInversed: boolean;
    /**
     * If `reverse` is set to true, it reverses the order of legend items.
     *
     * @default false
     */
    reverse: boolean;
}
/**
 * The `CircularChartLegend3D` module used to render the legend for a circular 3D chart.
 */
export declare class CircularChartLegend3D extends BaseLegend {
    /** @private */
    titleRect: Rect;
    private maxColumnWidth;
    /**
     * Constructor for CircularChart3D legend.
     *
     * @param {CircularChart3D} chart - The chart instance to which the legend belongs.
     */
    constructor(chart: CircularChart3D);
    /**
     * Binds events for the legend module.
     *
     * @returns {void}
     */
    private addEventListener;
    /**
     * Unbinds events for the legend module.
     *
     * @returns {void}
     */
    private removeEventListener;
    /**
     * Handles mouse movement for the legend module.
     *
     * @param {MouseEvent} e - The mouse event.
     * @returns {void}
     */
    private mouseMove;
    /**
     * Handles mouse end for the legend module.
     *
     * @param {MouseEvent} e - The mouse event.
     * @returns {void}
     */
    private mouseEnd;
    /**
     * Retrieves the legend options for the circular 3D chart.
     *
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DSeries[]} series - The array of circular 3D series in the chart.
     * @returns {void}
     * @private
     */
    getLegendOptions(chart: CircularChart3D, series: CircularChart3DSeries[]): void;
    /**
     * Calculates the legend bounds based on the available size, existing legend bounds, and legend settings.
     *
     * @param {Size} availableSize - The available size for the legend.
     * @param {Rect} legendBounds - The existing bounds of the legend.
     * @param {LegendSettingsModel} legend - The legend settings model.
     * @returns {void}
     * @private
     */
    getLegendBounds(availableSize: Size, legendBounds: Rect, legend: LegendSettingsModel): void;
    /**
     * Calculates the total width by summing up the values in the provided array of page widths.
     *
     * @param {number[]} pageWidth - An array containing individual page widths.
     * @returns {number} - The total width calculated as the sum of page widths.
     * @private
     */
    private getPageWidth;
    /**
     * Calculates the legend height based on the provided legend options, legend settings, bounds, row width,
     * legend height, and padding values.
     *
     * @param {LegendOptions} option - The legend options containing necessary information.
     * @param {LegendSettingsModel} legend - The legend settings model.
     * @param {Rect} bounds - The bounds of the legend.
     * @param {number} rowWidth - The width of the legend row.
     * @param {number} legendHeight - The height of the legend.
     * @param {number} padding - The padding value for additional space.
     * @returns {void}
     * @private
     */
    getLegendHeight(option: LegendOptions, legend: LegendSettingsModel, bounds: Rect, rowWidth: number, legendHeight: number, padding: number): void;
    /**
     * Converts HTML entities in the given legend text to their corresponding normal string values.
     *
     * @param {string} legendText - The legend text containing HTML entities.
     * @returns {string} - The string with HTML entities converted to their normal values.
     * @private
     */
    private convertHtmlEntities;
    /**
     * Retrieves the maximum column value for a given set of columns based on the specified width, padding, and row width.
     *
     * @param {number[]} columns - The array of column values to find the maximum from.
     * @param {number} width - The width parameter used in the calculation.
     * @param {number} padding - The padding value for additional space.
     * @param {number} rowWidth - The width of the legend row.
     * @returns {number} - The maximum column value calculated from the provided array.
     * @private
     */
    private getMaxColumn;
    /**
     * Calculates the available width from the legend's x position.
     *
     * @param {number} tx - The x position of the legend.
     * @param {number} width - The width of the legend.
     * @returns {number} - The available width of the legend.
     */
    private getAvailWidth;
    /**
     * Determines the legend rendering locations from legend items.
     *
     * @param {LegendOptions} legendOption - The current legend option.
     * @param {ChartLocation} start - The start location of the legend.
     * @param {number} textPadding - The text padding of the legend text.
     * @param {LegendOptions} prevLegend - The previous legend option.
     * @param {Rect} rect - The legend bounds.
     * @param {number} count - The legend index.
     * @param {number} firstLegend - The current legend location.
     * @returns {void}
     * @private
     */
    getRenderPoint(legendOption: LegendOptions, start: ChartLocation, textPadding: number, prevLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    /**
     * Checks whether the legend group is within the specified legend bounds, considering RTL (Right-to-Left) rendering.
     *
     * @param {number} previousBound - The previous legend bound value.
     * @param {number} textWidth - The width of the legend text.
     * @param {Rect} legendBounds - The bounds of the legend.
     * @param {number} shapeWidth - The width of the legend shape.
     * @returns {boolean} - Returns true if the legend group is within bounds; otherwise, returns false.
     * @private
     */
    private isWithinBounds;
    /**
     * Determines the smart legend placement based on specified label bounds, legend bounds, and margin settings.
     *
     * @param {Rect} labelBound - The bounds of the legend label.
     * @param {Rect} legendBound - The bounds of the legend.
     * @param {MarginModel} margin - The margin settings for additional space.
     * @returns {void}
     * @private
     */
    getSmartLegendLocation(labelBound: Rect, legendBound: Rect, margin: MarginModel): void;
    /**
     * Retrieves the title rectangle for the circular 3D chart.
     *
     * @param {CircularChart3D} circular - The circular 3D chart instance.
     * @returns {Rect | null} - The title rectangle or null if no title is present.
     * @private
     */
    private getTitleRect;
    /**
     * Retrieves the legend options based on the specified index from the given legend collections.
     *
     * @param {number} index - The index used to find the corresponding legend in the legend collections.
     * @param {LegendOptions[]} legendCollections - The array of legend options containing legend information.
     * @returns {LegendOptions | undefined} - The legend options corresponding to the specified index, or null if not found.
     * @private
     */
    private legendByIndex;
    /**
     * Handles the click event to show or hide the legend.
     *
     * @param {Event} event - The event object representing the click event.
     * @returns {void}
     * @private
     */
    click(event: Event): void;
    /**
     * Updates the visibility of a slice in the circular 3D chart based on the specified index and visibility status.
     *
     * @param {number} index - The index of the slice to be updated.
     * @param {boolean} isVisible - The visibility status to be set for the slice.
     * @returns {void}
     * @private
     */
    private sliceVisibility;
    /**
     * Performs animation on the specified slice elements based on the visibility of a slice.
     *
     * @param {Element} element - The slice element to be animated.
     * @param {boolean} isVisible - A boolean value indicating the visibility of the slice.
     * @returns {void}
     */
    private sliceAnimate;
    /**
     * Retrieves the module name for the circular 3D chart legend.
     *
     * @returns {string} - The module name.
     */
    protected getModuleName(): string;
    /**
     * Destroys the circular 3D chart legend.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
