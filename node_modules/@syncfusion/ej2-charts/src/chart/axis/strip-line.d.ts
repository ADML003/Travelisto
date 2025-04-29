import { Chart } from '../chart';
import { Axis } from '../axis/axis';
import { ZIndex } from '../utils/enum';
/**
 * The `StripLine` module is used to render strip lines in charts.
 */
export declare class StripLine {
    /**
     * Finding x, y, width and height of the strip line
     *
     * @param {Axis} axis axis
     * @param {StripLineSettingsModel} stripline stripline
     * @param {Rect} seriesClipRect seriesClipRect
     * @param {number} startValue startValue
     * @param {Axis} segmentAxis segmentAxis
     * @param {Chart} chart chart instance
     * @returns {Rect} rect
     */
    private measureStripLine;
    /**
     * Retrieves the 'from' and 'to' values from start, end, size, starting from the axis.
     *
     * @param {number} start - The start value.
     * @param {number} end - The end value.
     * @param {number} size - The size value.
     * @param {boolean} startFromAxis - Indicates whether to start from the axis.
     * @param {Axis} axis - The axis.
     * @param {StripLineSettingsModel} stripline - The strip line settings.
     * @returns {{ from: number, to: number }} - The 'from' and 'to' values.
     * @private
     */
    private getFromTovalue;
    /**
     * Finding end value of the strip line
     *
     * @param {number} to to
     * @param {number} from from
     * @param {number} size size
     * @param {Axis} axis axis
     * @param {number} end end
     * @param {StripLineSettingsModel} stripline stripline
     * @returns {number} number
     */
    private getToValue;
    /**
     * To check the strip line values within range
     *
     * @param {number} value value
     * @param {Axis} axis axis
     * @returns {number} - To returns a strip line value.
     */
    private findValue;
    /**
     * Date parse
     *
     * @param {Date} value date
     * @param {Chart} chart chart instance
     * @returns {Date} parsed date
     */
    private dateParse;
    /**
     * To render strip lines based start and end.
     *
     * @param {Chart} chart chart
     * @param {ZIndex} position position
     * @param {Axis[]} axes axes
     * @returns {void}
     * @private
     */
    renderStripLine(chart: Chart, position: ZIndex, axes: Axis[]): void;
    /**
     * To convert the C# date to js date
     *
     * @param {string | number | Object} value date value
     * @returns {boolean} returns true if datetime value type is string(for asp platform)
     */
    private isCoreDate;
    /**
     * To get the total milli seconds
     *
     * @param {Date | number | Object} value date value
     * @param {Chart} chart chart instance
     * @returns {number} returns milliseconds
     */
    private dateToMilliSeconds;
    /**
     * To draw the single line strip line
     *
     * @param {StripLineSettingsModel} stripline stripline
     * @param {Rect} rect rect
     * @param {string} id id
     * @param {Element} parent parent
     * @param {Chart} chart chart
     * @param {Axis} axis axis
     * @returns {void}
     */
    private renderPath;
    /**
     * To draw the rectangle
     *
     * @param {StripLineSettingsModel} stripline stripline
     * @param {Rect} rect rect
     * @param {string} id id
     * @param {Element} parent parent
     * @param {Chart} chart chart
     * @returns {void}
     */
    private renderRectangle;
    /**
     * To draw the Image
     *
     * @param {StripLineSettingsModel} stripline stripline
     * @param {Rect} rect rect
     * @param {string} id id
     * @param {Element} parent parent
     * @param {Chart} chart chart
     * @returns {void}
     */
    private drawImage;
    /**
     * To create the text on strip line
     *
     * @param {StripLineSettingsModel} stripline stripline
     * @param {Rect} rect rect
     * @param {string} id id
     * @param {Element} parent parent
     * @param {Chart} chart chart
     * @param {Axis} axis axis
     * @returns {void}
     */
    private renderText;
    private invertAlignment;
    /**
     * To find the next value of the recurrence strip line
     *
     * @param {Axis} axis axis
     * @param {StripLineSettingsModel} stripline stripline
     * @param {number} startValue startValue
     * @returns {number} next start value of the recurrence strip line
     */
    private getStartValue;
    /**
     * Finds the segment axis for a segmented strip line.
     *
     * @param {Axis[]} axes - The collection of axes.
     * @param {Axis} axis - The axis.
     * @param {StripLineSettingsModel} stripline - The strip line settings.
     * @returns {Axis} - The segment axis.
     * @private
     */
    private getSegmentAxis;
    /**
     * To render strip line on chart
     *
     * @param {Axis} axis axis
     * @param {StripLineSettingsModel} stripline stripline
     * @param {Rect} seriesClipRect seriesClipRect
     * @param {string} id id
     * @param {Element} striplineGroup striplineGroup
     * @param {Chart} chart chart
     * @param {number} startValue startValue
     * @param {Axis} segmentAxis segmentAxis
     * @param {number} count count
     * @returns {void}
     */
    private renderStripLineElement;
    /**
     * Finds the factor of the text based on its anchor position.
     *
     * @param {Anchor} anchor - The text anchor position.
     * @returns {number} - The factor.
     * @private
     */
    private factor;
    /**
     * Finds the start value of the text based on its alignment.
     *
     * @param {number} xy - The coordinate value.
     * @param {number} size - The size of the text.
     * @param {Anchor} textAlignment - The text alignment.
     * @returns {number} - The start value.
     * @private
     */
    private getTextStart;
    /**
     * To get the module name for `StripLine`.
     *
     * @private
     * @returns {string} - Returns the module name.
     */
    getModuleName(): string;
    /**
     * To destroy the `StripLine` module.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
}
