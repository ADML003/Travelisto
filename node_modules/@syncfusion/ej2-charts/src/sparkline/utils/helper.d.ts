import { Sparkline } from '../sparkline';
import { IThemes } from '../model/interface';
import { SparklineTheme } from '../model/enum';
import { SparklineBorderModel, SparklineFontModel } from '../model/base-model';
import { FontModel } from '../../stock-chart';
/**
 * Sparkline control helper file
 */
/**
 * sparkline internal use of `Size` type
 */
export declare class Size {
    /**
     * height of the size.
     */
    height: number;
    width: number;
    constructor(width: number, height: number);
}
/**
 * Gets the series color.
 *
 * @private
 * @param {SparklineTheme} theme - The theme for the sparkline.
 * @returns {string[]} - The series color from the theme.
 */
export declare function getSeriesColor(theme: SparklineTheme): string[];
/**
 * To find the default colors based on theme.
 *
 * @private
 * @param {SparklineTheme} theme - The theme for the sparkline.
 * @returns {IThemes} - The theme colors.
 */
export declare function getThemeColor(theme: SparklineTheme): IThemes;
/**
 * To find number from string.
 *
 * @private
 * @param {string} value - The string containing the number.
 * @param {number} containerSize - The container size for the number.
 * @returns {number} - The extracted number from the string.
 */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Method to calculate the width and height of the sparkline.
 *
 * @param {Sparkline} sparkline - The Sparkline instance.
 * @returns {void}
 */
export declare function calculateSize(sparkline: Sparkline): void;
/**
 * Method to create svg for sparkline.
 *
 * @param {Sparkline} sparkline - The Sparkline instance.
 * @returns {void}
 */
export declare function createSvg(sparkline: Sparkline): void;
/**
 * Internal use of type rect.
 *
 * @private
 */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
/**
 * Internal use of path options.
 *
 * @private
 */
export declare class PathOption {
    opacity: number;
    id: string;
    stroke: string;
    fill: string;
    ['stroke-dasharray']: string;
    ['stroke-width']: number;
    d: string;
    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string);
}
/**
 * Sparkline internal rendering options.
 *
 * @private
 */
export interface SparkValues {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
    percent?: number;
    degree?: number;
    location?: {
        x: number;
        y: number;
    };
    markerPosition?: number;
    xVal?: number;
    yVal?: number;
}
/**
 * Internal use of rectangle options.
 *
 * @private
 */
export declare class RectOption extends PathOption {
    rect: Rect;
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
    constructor(id: string, fill: string, border: SparklineBorderModel, opacity: number, rect: Rect, tl?: number, tr?: number, bl?: number, br?: number);
}
/**
 * Internal use of circle options.
 *
 * @private
 */
export declare class CircleOption extends PathOption {
    cy: number;
    cx: number;
    r: number;
    ['stroke-dasharray']: string;
    constructor(id: string, fill: string, border: SparklineBorderModel, opacity: number, cx: number, cy: number, r: number, dashArray: string);
}
/**
 * Internal use of append shape element.
 *
 * @private
 * @param {Element} shape - The shape element to be appended.
 * @param {Element} element - The parent element to which the shape will be appended.
 * @returns {Element} - The appended shape element.
 */
export declare function appendShape(shape: Element, element: Element): Element;
/**
 * Internal rendering of Circle.
 *
 * @private
 * @param {Sparkline} sparkline - The Sparkline instance.
 * @param {CircleOption} options - The options for rendering the circle.
 * @param {Element} element - The parent element to which the circle will be appended.
 * @returns {Element} - The rendered circle element.
 */
export declare function drawCircle(sparkline: Sparkline, options: CircleOption, element?: Element): Element;
/**
 * To get rounded rect path direction.
 *
 * @param {Rect} r - The rect dimensions.
 * @param {number} topLeft - The radius of the top-left corner.
 * @param {number} topRight - The radius of the top-right corner.
 * @param {number} bottomLeft - The radius of the bottom-left corner.
 * @param {number} bottomRight - The radius of the bottom-right corner.
 * @returns {string} - The SVG path string for the rounded rect path.
 */
export declare function calculateRoundedRectPath(r: Rect, topLeft: number, topRight: number, bottomLeft: number, bottomRight: number): string;
/**
 * Internal rendering of Rectangle.
 *
 * @private
 * @param {Sparkline} sparkline - The Sparkline instance.
 * @param {RectOption} options - The options for rendering the rectangle.
 * @param {Element} element - The parent element to which the rectangle will be appended.
 * @returns {Element} - The rendered rectangle element.
 */
export declare function drawRectangle(sparkline: Sparkline, options: RectOption, element?: Element): Element;
/**
 * Internal rendering of Path.
 *
 * @private
 * @param {Sparkline} sparkline - The Sparkline instance.
 * @param {PathOption} options - The options for rendering the path.
 * @param {Element} element - The parent element to which the path will be appended.
 * @returns {Element} - The rendered path.
 */
export declare function drawPath(sparkline: Sparkline, options: PathOption, element?: Element): Element;
/**
 * Function to measure the height and width of the text.
 *
 * @private
 * @param {string} text - The text to measure.
 * @param {SparklineFontModel} font - The font settings for the text.
 * @param {FontModel} themeStyle - The theme style applied to the text.
 * @returns {Size} - The size of the text.
 */
export declare function measureText(text: string, font: SparklineFontModel, themeStyle?: FontModel): Size;
/**
 * Internal use of text options
 *
 * @private
 */
export declare class TextOption {
    id: string;
    anchor: string;
    text: string;
    transform: string;
    x: number;
    y: number;
    baseLine: string;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string, baseLine?: string, transform?: string);
}
/**
 * Internal rendering of text.
 *
 * @private
 * @param {TextOption} options - The options for rendering the text.
 * @param {SparklineFontModel} font - The font settings for the text.
 * @param {string} color - The color of the text.
 * @param {HTMLElement | Element} parent - The parent element to which the text will be appended.
 * @param {FontModel} themeStyle - The theme style applied to the text.
 * @returns {Element} - The rendered text element.
 */
export declare function renderTextElement(options: TextOption, font: SparklineFontModel, color: string, parent: HTMLElement | Element, themeStyle?: FontModel): Element;
/**
 * To remove element by id.
 *
 * @param {string} id - The id of the element to remove.
 * @returns {void}
 */
export declare function removeElement(id: string): void;
/**
 * To find the element by id.
 *
 * @param {string} id - The id of the element to find.
 * @returns {Element} - The element with the specified id, if found.
 */
export declare function getIdElement(id: string): Element;
/**
 * To find point within the bounds.
 *
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @param {Rect} bounds - The bounding rectangle to check against.
 * @returns {boolean} - True if the point is within the bounds, false otherwise.
 */
export declare function withInBounds(x: number, y: number, bounds: Rect): boolean;
