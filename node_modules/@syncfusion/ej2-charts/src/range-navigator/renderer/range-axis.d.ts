import { RangeNavigator } from '../range-navigator';
import { DateTime } from '../../chart/axis/date-time-axis';
import { RangeIntervalType } from '../../common/utils/enum';
import { VisibleLabels } from '../../chart/axis/axis';
/**
 * class for axis
 */
export declare class RangeNavigatorAxis extends DateTime {
    constructor(range: RangeNavigator);
    actualIntervalType: RangeIntervalType;
    rangeNavigator: RangeNavigator;
    firstLevelLabels: VisibleLabels[];
    secondLevelLabels: VisibleLabels[];
    lowerValues: number[];
    gridLines: Element;
    /**
     * To render grid lines of axis.
     *
     * @returns {void}
     */
    renderGridLines(): void;
    /**
     * To render of axis labels.
     *
     * @returns {void}
     */
    renderAxisLabels(): void;
    /**
     * To find the secondary level label type.
     *
     * @param {RangeIntervalType} type - The type of range interval.
     * @returns {RangeIntervalType} - The secondary level label type.
     */
    private getSecondaryLabelType;
    /**
     * To find labels for date time category axis.
     *
     * @param {Axis} axis - Range axis.
     * @returns {void}
     */
    private findSecondaryAxisLabels;
    /**
     * To find labels for date time axis.
     *
     * @param {Axis} axis - Range axis.
     * @param {number} interval - Interval for the date time axis.
     * @returns {void}
     */
    private findAxisLabels;
    /**
     * To find date time formats for Quarter and week interval type.
     *
     * @param {string} text - The text.
     * @param {Axis} axis - The axis.
     * @param {number} index - The index.
     * @returns {string} - The modified text.
     */
    private dateFormats;
    /**
     * To find the y co-ordinate for axis labels.
     *
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @param {boolean} isSecondary - If sets to true, indicates that the axis is a secondary axis.
     * @returns {number} - The y-coordinate for the labels.
     */
    private findLabelY;
    /**
     * It places the axis labels and returns border for secondary axis labels.
     *
     * @param {Axis} axis - Axis for the lables placed.
     * @param {number} pointY - The y co-ordinate for axis labels.
     * @param {string} id - The id for the axis elements.
     * @param {RangeNavigator} control - The range navigator control.
     * @param {Element} labelElement - The parent element in which the axis labels are appended.
     * @returns {string} - The border for the secondary axis labels.
     */
    private placeAxisLabels;
    /**
     * To check label is intersected with successive label or not.
     *
     * @param {Axis} axis - The axis for which the labels are placed.
     * @param {number} currentX - The x-coordinate for the current label.
     * @param {number} currentWidth - The width of the current label.
     * @param {number} prevX - The x-coordinate for the previous label.
     * @param {number} prevWidth - The width of the previous label.
     * @returns {boolean} - True if the labels intersect; otherwise, false.
     */
    private isIntersect;
    /**
     * To find suitable label format for Quarter and week Interval types.
     *
     * @param {Axis} axis - RangeNavigator axis.
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @returns {void}
     */
    private findSuitableFormat;
    /**
     * Alignment position for secondary level labels in date time axis.
     *
     * @param {Axis} axis - The axis.
     * @param {number} index - The index of the label.
     * @returns {number} - The alignment position for the secondary axis labels.
     */
    private findAlignment;
}
