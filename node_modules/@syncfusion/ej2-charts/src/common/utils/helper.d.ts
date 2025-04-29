import { Effect } from '@syncfusion/ej2-base';
import { Index } from '../../common/model/base';
import { PathAttributes, RectAttributes, CircleAttributes, BaseAttibutes } from '@syncfusion/ej2-svg-base';
import { FontModel, BorderModel, MarginModel } from '../model/base-model';
import { Series, Points } from '../../chart/series/chart-series';
import { Axis } from '../../chart/axis/axis';
import { Chart } from '../../chart/chart';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { RangeNavigator } from '../../range-navigator/range-navigator';
import { AccumulationSeries, AccPoints } from '../../accumulation-chart/model/acc-base';
import { IShapes } from '../model/interface';
import { StockChart } from '../../stock-chart/stock-chart';
import { Rect, TextOption, Size, PathOption, SvgRenderer, CanvasRenderer } from '@syncfusion/ej2-svg-base';
import { BulletChart } from '../../bullet-chart/bullet-chart';
import { RangeColorSettingModel } from '../../chart/chart-model';
import { AccumulationDataLabelSettingsModel, IAccTextRenderEventArgs } from '../../accumulation-chart';
import { Alignment } from './enum';
import { Chart3D } from '../../chart3d';
import { Chart3DAxis } from '../../chart3d/axis/axis';
import { Chart3DPoint, Chart3DSeries } from '../../chart3d/series/chart-series';
import { CircularChart3D } from '../../circularchart3d';
import { VisibleRangeModel } from '../model/interface';
import { ScrollBar } from '../scrollbar/scrollbar';
/**
 * Function to sort the dataSource, by default it sort the data in ascending order.
 *
 * @param  {Object} data chart data
 * @param  {string} fields date fields
 * @param  {boolean} isDescending boolean values of descending
 * @returns {Object[]} It returns chart data which be sorted.
 */
export declare function sort(data: Object[], fields: string[], isDescending?: boolean): Object[];
/**
 * Checks if a label contains a line break.
 *
 * @param {string} label - The label to check.
 * @returns {boolean} - True if the label contains a line break, otherwise false.
 */
export declare function isBreakLabel(label: string): boolean;
/**
 * Retrieves the visible data points from a series.
 *
 * @param {Series | Chart3DSeries} series - The series to retrieve the visible data points.
 * @returns {Points[]} - An array containing the visible data points.
 */
export declare function getVisiblePoints(series: Series | Chart3DSeries): Points[];
/**
 * Calculates the offset for positioning a scrollbar on a chart axis.
 *
 * @param {ScrollBar} scrollbar - The scrollbar object to position.
 * @param {boolean} isHorizontalAxis - Indicates whether the axis is horizontal.
 * @returns {number} An object containing the calculated top and left offsets for the scrollbar.
 */
export declare function calculateScrollbarOffset(scrollbar: ScrollBar, isHorizontalAxis: boolean): number;
/**
 * Rotates the size of text based on the provided angle.
 *
 * @param {FontModel} font - The font style of the text.
 * @param {string} text - The text to be rotated.
 * @param {number} angle - The angle of rotation.
 * @param {Chart | Chart3D} chart - The chart instance.
 * @param {FontModel} themeFontStyle - The font style based on the theme.
 * @returns {Size} - The rotated size of the text.
 */
export declare function rotateTextSize(font: FontModel, text: string, angle: number, chart: Chart | Chart3D, themeFontStyle: FontModel): Size;
/**
 * Removes the specified element.
 *
 * @param {string | Element} id - The id or reference of the element to be removed.
 * @returns {void}
 */
export declare function removeElement(id: string | Element): void;
/**
 * Calculates the logarithm of a specified value with respect to a specified base.
 *
 * @param {number} value - The value for which to calculate the logarithm.
 * @param {number} base - The base of the logarithm.
 * @returns {number} - The logarithm of the value with respect to the specified base.
 */
export declare function logBase(value: number, base: number): number;
/**
 * Displays a tooltip at the specified coordinates with the given text.
 *
 * @param {string} text - The text content of the tooltip.
 * @param {number} x - The x-coordinate where the tooltip should be displayed.
 * @param {number} y - The y-coordinate where the tooltip should be displayed.
 * @param {number} areaWidth - The width of the area where the tooltip is displayed.
 * @param {string} id - The id of the tooltip element.
 * @param {Element} element - The element to which the tooltip is appended.
 * @param {boolean} isTouch - Indicates whether the tooltip is displayed on a touch device.
 * @param {boolean} isTitleOrLegendEnabled - Indicates whether the tooltip is enabled for title or legend.
 * @param {Rect} bound - The bounding rectangle in which the tooltip should be confined.
 * @returns {void}
 * @private
 */
export declare function showTooltip(text: string, x: number, y: number, areaWidth: number, id: string, element: Element, isTouch?: boolean, isTitleOrLegendEnabled?: boolean, bound?: Rect): void;
/**
 * Checks if a value is within the specified range.
 *
 * @param {number} value - The value to check.
 * @param {VisibleRangeModel} range - The range to check against.
 * @returns {boolean} - True if the value is inside the range, otherwise false.
 */
export declare function inside(value: number, range: VisibleRangeModel): boolean;
/**
 * Checks if a value is within the specified range.
 *
 * @param {number} value - The value to check.
 * @param {VisibleRangeModel} range - The range to check against.
 * @returns {boolean} - True if the value is inside the range, otherwise false.
 */
export declare function withIn(value: number, range: VisibleRangeModel): boolean;
/**
 * Adjusts the value based on the axis type.
 *
 * @param {number} value - The value to adjust.
 * @param {Axis} axis - The axis used for adjustment.
 * @returns {number} - The adjusted value.
 */
export declare function logWithIn(value: number, axis: Axis): number;
/**
 * Checks if a point is within the range of the previous and next points in a series.
 *
 * @param {Points} previousPoint - The previous point in the series.
 * @param {Points} currentPoint - The current point to check.
 * @param {Points} nextPoint - The next point in the series.
 * @param {Series} series - The series to which the points belong.
 * @returns {boolean} - A boolean indicating if the point is within the range.
 * @private
 */
export declare function withInRange(previousPoint: Points, currentPoint: Points, nextPoint: Points, series: Series): boolean;
/**
 * Calculates the sum of an array of numbers.
 *
 * @param {number[]} values - An array of numbers.
 * @returns {number} - The sum of the numbers in the array.
 */
export declare function sum(values: number[]): number;
/**
 * Calculates the sum of elements in a subarray.
 *
 * @param {Object[]} values - The array containing elements.
 * @param {number} first - The index of the first element in the subarray.
 * @param {number} last - The index of the last element in the subarray.
 * @param {number[]} index - The array of indices.
 * @param {Series} series - The series object.
 * @returns {number} - The sum of elements in the subarray.
 * @private
 */
export declare function subArraySum(values: Object[], first: number, last: number, index: number[], series: Series): number;
/**
 * Subtracts thickness from the given rectangle.
 *
 * @param {Rect} rect - The rectangle from which to subtract thickness.
 * @param {Thickness} thickness - The thickness to subtract.
 * @returns {Rect} - The resulting rectangle after subtracting thickness.
 */
export declare function subtractThickness(rect: Rect, thickness: Thickness): Rect;
/**
 * Subtracts a rectangle representing thickness from the given rectangle.
 *
 * @param {Rect} rect - The rectangle from which to subtract the thickness rectangle.
 * @param {Thickness} thickness - The rectangle representing the thickness to subtract.
 * @returns {Rect} - The resulting rectangle after subtracting the thickness rectangle.
 */
export declare function subtractRect(rect: Rect, thickness: Rect): Rect;
/**
 * Converts a degree value to a location on the chart based on the provided radius and center point.
 *
 * @param {number} degree - The degree value to convert.
 * @param {number} radius - The radius from the center point.
 * @param {ChartLocation} center - The center point of the chart.
 * @returns {ChartLocation} - The location on the chart corresponding to the degree value.
 */
export declare function degreeToLocation(degree: number, radius: number, center: ChartLocation): ChartLocation;
/**
 * Converts a degree value to radians.
 *
 * @param {number} degree - The degree value to convert.
 * @returns {number} - The equivalent value in radians.
 */
export declare function degreeToRadian(degree: number): number;
/**
 * Get the coordinates of a rotated rectangle.
 *
 * @param {ChartLocation[]} actualPoints - The coordinates of the original rectangle.
 * @param {number} centerX - The x-coordinate of the center of rotation.
 * @param {number} centerY - The y-coordinate of the center of rotation.
 * @param {number} angle - The angle of rotation in degrees.
 * @returns {ChartLocation[]} - The coordinates of the rotated rectangle.
 */
export declare function getRotatedRectangleCoordinates(actualPoints: ChartLocation[], centerX: number, centerY: number, angle: number): ChartLocation[];
/**
 * Helper function to determine whether there is an intersection between the two polygons described
 * by the lists of vertices. Uses the Separating Axis Theorem.
 *
 * @param {ChartLocation[]} a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon.
 * @param {ChartLocation[]} b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon.
 * @returns {boolean} if there is any intersection between the 2 polygons, false otherwise.
 */
export declare function isRotatedRectIntersect(a: ChartLocation[], b: ChartLocation[]): boolean;
/**
 * Calculates the angle between two points.
 *
 * @param {ChartLocation} center - The center point.
 * @param {ChartLocation} point - The point to calculate the angle from the center.
 * @returns {number} - The angle in degrees.
 */
export declare function getAngle(center: ChartLocation, point: ChartLocation): number;
/**
 * Returns a sub-array of values starting from the specified index.
 *
 * @param {number[]} values - The array of numbers.
 * @param {number} index - The index from which the sub-array starts.
 * @returns {number[]} - The sub-array of values.
 */
export declare function subArray(values: number[], index: number): number[];
/**
 * Converts a value to its corresponding coefficient based on the axis range.
 *
 * @param {number} value - The value to be converted.
 * @param {Axis} axis - The axis object containing range information.
 * @returns {number} - The coefficient value corresponding to the input value.
 */
export declare function valueToCoefficient(value: number, axis: Axis): number;
/**
 * Transforms a point to its visible position based on the axes range and inversion.
 *
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @param {Axis} xAxis - The x-axis object containing range information.
 * @param {Axis} yAxis - The y-axis object containing range information.
 * @param {boolean} [isInverted=false] - Specifies if the chart is inverted.
 * @param {Series} [series] - The series object for additional information (optional).
 * @returns {ChartLocation} - The transformed visible position of the point.
 */
export declare function TransformToVisible(x: number, y: number, xAxis: Axis, yAxis: Axis, isInverted?: boolean, series?: Series): ChartLocation;
/**
 * Finds the index from the given id.
 *
 * @param {string} id - The id to search for.
 * @param {boolean} [isPoint=false] - Specifies if the id represents a data point (optional).
 * @returns {Index} - The index found from the id.
 */
export declare function indexFinder(id: string, isPoint?: boolean): Index;
/**
 * Converts a coefficient value to a vector representing a point on the circumference of a circle.
 *
 * @param {number} coefficient - The coefficient value to convert.
 * @param {number} startAngle - The starting angle of the circle.
 * @returns {ChartLocation} - The vector representing the point on the circle.
 */
export declare function CoefficientToVector(coefficient: number, startAngle: number): ChartLocation;
/**
 * Converts a value to a polar coefficient value based on the axis.
 *
 * @param {number} value - The value to convert.
 * @param {Axis} axis - The axis object.
 * @returns {number} - The polar coefficient value.
 */
export declare function valueToPolarCoefficient(value: number, axis: Axis): number;
/** @private */
export declare class Mean {
    verticalStandardMean: number;
    horizontalStandardMean: number;
    verticalSquareRoot: number;
    horizontalSquareRoot: number;
    verticalMean: number;
    horizontalMean: number;
    constructor(verticalStandardMean: number, verticalSquareRoot: number, horizontalStandardMean: number, horizontalSquareRoot: number, verticalMean: number, horizontalMean: number);
}
/** @private */
export declare class PolarArc {
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    radius: number;
    currentXPosition: number;
    constructor(startAngle?: number, endAngle?: number, innerRadius?: number, radius?: number, currentXPosition?: number);
}
/**
 * Creates a tooltip element with the specified id, text, position, and font size.
 *
 * @param {string} id - The id of the tooltip element.
 * @param {string} text - The text content of the tooltip.
 * @param {number} top - The top position of the tooltip.
 * @param {number} left - The left position of the tooltip.
 * @param {string} fontSize - The font size of the tooltip text.
 * @returns {void}
 */
export declare function createTooltip(id: string, text: string, top: number, left: number, fontSize: string): void;
/**
 * Creates zooming labels for the specified axis and adds them to the parent element.
 *
 * @param {Chart} chart - The chart instance.
 * @param {Axis} axis - The axis for which to create zooming labels.
 * @param {Element} parent - The parent element to which the labels will be appended.
 * @param {number} index - The index of the label.
 * @param {boolean} isVertical - Indicates whether the axis is vertical.
 * @param {Rect} rect - The bounding rectangle of the label.
 * @returns {Element} - The created zooming label element.
 */
export declare function createZoomingLabels(chart: Chart, axis: Axis, parent: Element, index: number, isVertical: boolean, rect: Rect): Element;
/**
 * Finds the direction of the crosshair based on the provided parameters.
 *
 * @param {number} rX - The x-coordinate of the crosshair line.
 * @param {number} rY - The y-coordinate of the crosshair line.
 * @param {Rect} rect - The bounding rectangle of the crosshair.
 * @param {ChartLocation} arrowLocation - The location of the arrow in the crosshair.
 * @param {number} arrowPadding - The padding for the arrow.
 * @param {boolean} top - Indicates whether the crosshair is positioned at the top.
 * @param {boolean} bottom - Indicates whether the crosshair is positioned at the bottom.
 * @param {boolean} left - Indicates whether the crosshair is positioned at the left.
 * @param {number} tipX - The x-coordinate of the crosshair tip.
 * @param {number} tipY - The y-coordinate of the crosshair tip.
 * @returns {string} - The direction of the crosshair ('Top', 'Bottom', 'Left', 'Right', 'Center').
 */
export declare function findCrosshairDirection(rX: number, rY: number, rect: Rect, arrowLocation: ChartLocation, arrowPadding: number, top: boolean, bottom: boolean, left: boolean, tipX: number, tipY: number): string;
/**
 * Checks if the provided coordinates are within the bounds of the rectangle.
 *
 * @param {number} x - The x-coordinate to check.
 * @param {number} y - The y-coordinate to check.
 * @param {Rect} bounds - The bounding rectangle.
 * @param {number} width - The width of the area to include in the bounds check.
 * @param {number} height - The height of the area to include in the bounds check.
 * @returns {boolean} - Returns true if the coordinates are within the bounds; otherwise, false.
 */
export declare function withInBounds(x: number, y: number, bounds: Rect, width?: number, height?: number): boolean;
/**
 * Gets the x-coordinate value for a given point value on the axis.
 *
 * @param {number} value - The point value.
 * @param {number} size - The size of the axis.
 * @param {Axis} axis - The axis.
 * @returns {number} - Returns the x-coordinate value.
 */
export declare function getValueXByPoint(value: number, size: number, axis: Axis): number;
/**
 * Gets the y-coordinate value for a given point value on the axis.
 *
 * @param {number} value - The point value.
 * @param {number} size - The size of the axis.
 * @param {Axis} axis - The axis.
 * @returns {number} - Returns the y-coordinate value.
 */
export declare function getValueYByPoint(value: number, size: number, axis: Axis): number;
/**
 * Finds the clip rectangle for a series.
 *
 * @param {Series} series - The series for which to find the clip rectangle.
 * @param {boolean} isCanvas - Indicates whether the rendering is on a canvas.
 * @returns {void}
 */
export declare function findClipRect(series: Series, isCanvas?: boolean): void;
/**
 * Converts the first character of a string to lowercase.
 *
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
export declare function firstToLowerCase(str: string): string;
/**
 * Gets the transformation of the chart area based on the provided axes and inverted axis state.
 *
 * @param {Axis} xAxis - The X-axis of the chart.
 * @param {Axis} yAxis - The Y-axis of the chart.
 * @param {boolean} invertedAxis - Indicates whether the chart axis is inverted.
 * @returns {Rect} The transformed chart area.
 */
export declare function getTransform(xAxis: Axis, yAxis: Axis, invertedAxis: boolean): Rect;
/**
 * Calculates the minimum points delta between data points on the provided axis.
 *
 * @param {Axis | Chart3DAxis} axis - The axis for which to calculate the minimum points delta.
 * @param {Series[]} seriesCollection - The collection of series in the chart.
 * @returns {number} The minimum points delta.
 */
export declare function getMinPointsDelta(axis: Axis | Chart3DAxis, seriesCollection: Series[]): number;
/**
 * Retrieves the animation function based on the specified effect.
 *
 * @param {string} effect - The name of the animation effect.
 * @returns {Function} The animation function corresponding to the effect.
 */
export declare function getAnimationFunction(effect: string): Function;
/**
 * Linear animation function.
 *
 * @param {number} currentTime - The current time of the animation.
 * @param {number} startValue - The starting value of the animation.
 * @param {number} endValue - The ending value of the animation.
 * @param {number} duration - The duration of the animation.
 * @returns {number} The interpolated value at the current time.
 * @private
 */
export declare function linear(currentTime: number, startValue: number, endValue: number, duration: number): number;
/**
 * Animates the marker element.
 *
 * @param {Element} element - The marker element to animate.
 * @param {number} delay - The delay before starting the animation.
 * @param {number} duration - The duration of the animation.
 * @param {Series | AccumulationSeries} series - The series associated with the marker.
 * @param {number} pointIndex - The index of the point in the series.
 * @param {ChartLocation} point - The location of the point.
 * @param {boolean} isLabel - Specifies whether the marker is a data label.
 * @returns {void}
 */
export declare function markerAnimate(element: Element, delay: number, duration: number, series: Series | AccumulationSeries, pointIndex: number, point: ChartLocation, isLabel: boolean): void;
/**
 * Animates the rectangle element.
 *
 * @param {Element} element - The rectangle element to animate.
 * @param {number} delay - The delay before starting the animation.
 * @param {number} duration - The duration of the animation.
 * @param {Rect} currentRect - The current rectangle dimensions.
 * @param {Rect} previousRect - The previous rectangle dimensions.
 * @returns {void}
 */
export declare function animateRectElement(element: Element, delay: number, duration: number, currentRect: Rect, previousRect: Rect): void;
/**
 * Animation after legend click a path.
 *
 * @param {Element} element - element to be animated
 * @param {string} direction - current direction of the path
 * @param {boolean} redraw - chart redraw
 * @param {string} previousDirection - previous direction of the path
 * @param {number} animateDuration - animateDuration of the path
 * @returns {void}
 */
export declare function pathAnimation(element: Element, direction: string, redraw: boolean, previousDirection?: string, animateDuration?: number): void;
/**
 * Point based animation in chart series.
 *
 * @param {Element} element element to be animated.
 * @param {string} direction current direction of the path.
 * @param {boolean} redraw chart redraw.
 * @param {string} previousDirection previous direction of the path.
 * @param {number} animateDuration animateDuration of the path.
 * @param {string} removeDirection removeDirection of the path.
 * @returns {void}
 */
export declare function animateAddPoints(element: Element, direction: string, redraw: boolean, previousDirection?: string, animateDuration?: number, removeDirection?: string): void;
/**
 * To append the clip rect element.
 *
 * @param {boolean} redraw - chart redraw value.
 * @param {BaseAttibutes} options - element options.
 * @param {SvgRenderer} renderer - svg renderer values.
 * @param {string} clipPath - clipPath of the element.
 * @returns {Element} - Returns clip rect element.
 */
export declare function appendClipElement(redraw: boolean, options: BaseAttibutes, renderer: SvgRenderer, clipPath?: string): Element;
/**
 * Triggers the label render event.
 *
 * @param {Chart | RangeNavigator | Chart3D} chart - The chart or range navigator instance.
 * @param {number} tempInterval - The temporary interval value.
 * @param {string} text - The label text.
 * @param {FontModel} labelStyle - The style of the label.
 * @param {Axis | Chart3DAxis} axis - The axis associated with the label.
 * @returns {void}
 */
export declare function triggerLabelRender(chart: Chart | RangeNavigator | Chart3D, tempInterval: number, text: string, labelStyle: FontModel, axis: Axis | Chart3DAxis): void;
/**
 * The function used to find whether the range is set.
 *
 * @param {Axis | Chart3DAxis} axis - The axis to check.
 * @returns {boolean} - It returns true if the axis range is set otherwise false.
 * @private
 */
export declare function setRange(axis: Axis | Chart3DAxis): boolean;
/**
 * Checks if zooming is enabled for the axis.
 *
 * @param {Axis} axis - The axis to check for zooming.
 * @returns {boolean} - Returns true if zooming is enabled for the axis, otherwise false.
 */
export declare function isZoomSet(axis: Axis): boolean;
/**
 * Calculates the actual desired intervals count based on the available size and axis.
 *
 * @param {Size} availableSize - The available size for rendering.
 * @param {Axis | Chart3DAxis} axis - The axis for which to calculate the intervals count.
 * @returns {number} - The actual desired intervals count.
 */
export declare function getActualDesiredIntervalsCount(availableSize: Size, axis: Axis | Chart3DAxis): number;
/**
 * Animates the template element.
 *
 * @param {Element} element - The element to animate.
 * @param {number} delay - The delay before starting the animation.
 * @param {number} duration - The duration of the animation.
 * @param {Effect} name - The name of the animation effect.
 * @param {boolean} [isRemove] - Indicates whether to remove the element after animation completion.
 * @returns {void}
 */
export declare function templateAnimate(element: Element, delay: number, duration: number, name: Effect, isRemove?: boolean): void;
/**
 * Draws a symbol at the specified location.
 *
 * @param {ChartLocation} location - The location to draw the symbol.
 * @param {string} shape - The shape of the symbol.
 * @param {Size} size - The size of the symbol.
 * @param {string} url - The URL of the image symbol.
 * @param {PathOption} options - The options for drawing the symbol.
 * @param {string} label - The label for the symbol.
 * @param {SvgRenderer | CanvasRenderer} [renderer] - The renderer for drawing the symbol.
 * @param {Rect} [clipRect] - The clipping rectangle.
 * @param {boolean} [isChartControl] - Indicates whether it is a chart control.
 * @param {BulletChart} [control] - The bullet chart control.
 * @returns {Element} - The element representing the drawn symbol.
 */
export declare function drawSymbol(location: ChartLocation, shape: string, size: Size, url: string, options: PathOption, label: string, renderer?: SvgRenderer | CanvasRenderer, clipRect?: Rect, isChartControl?: boolean, control?: BulletChart): Element;
/**
 * Calculates the shapes based on the specified parameters.
 *
 * @param {ChartLocation} location - The location for the shapes.
 * @param {Size} size - The size of the shapes.
 * @param {string} shape - The shape of the symbols.
 * @param {PathOption} options - The options for drawing the shapes.
 * @param {string} url - The URL of the image symbols.
 * @param {boolean} [isChart] - Indicates whether it is a chart.
 * @param {BulletChart} [control] - The bullet chart control.
 * @returns {IShapes} - The calculated shapes.
 */
export declare function calculateShapes(location: ChartLocation, size: Size, shape: string, options: PathOption, url: string, isChart?: boolean, control?: BulletChart): IShapes;
/**
 * Gets the location of the rectangle based on the specified start and end locations and the outer rectangle.
 *
 * @param {ChartLocation} startLocation - The start location.
 * @param {ChartLocation} endLocation - The end location.
 * @param {Rect} outerRect - The outer rectangle.
 * @returns {Rect} - The location of the rectangle.
 */
export declare function getRectLocation(startLocation: ChartLocation, endLocation: ChartLocation, outerRect: Rect): Rect;
/**
 * Returns the value constrained within the specified minimum and maximum limits.
 *
 * @param {number} value - The input value.
 * @param {number} min - The minimum limit.
 * @param {number} max - The maximum limit.
 * @returns {number} - The constrained value.
 */
export declare function minMax(value: number, min: number, max: number): number;
/**
 * Retrieves the DOM element with the specified ID.
 *
 * @param {string} id - The ID of the element to retrieve.
 * @returns {Element} - The DOM element.
 */
export declare function getElement(id: string): Element;
/**
 * Gets the template function from the provided template string or function.
 *
 * @param {string | Function} template - The template string or function.
 * @returns {Function} - The template function.
 */
export declare function getTemplateFunction(template: string | Function): Function;
/**
 * Renders the accumulation chart data labels using template.
 *
 * @param {HTMLElement} childElement - The child element.
 * @param {AccumulationChart} chart - The accumulation chart instance.
 * @param {boolean} isTemplate - Defines whether the template is applied or not.
 * @param {AccPoints[]} points - The accumulation chart points.
 * @param {IAccTextRenderEventArgs} argsData - The accumulation chart text render event arguments.
 * @param {AccPoints} [point] - The accumulation chart point.
 * @param {Element} [datalabelGroup] - The data label group element.
 * @param {string} [id] - The id of the element.
 * @param {AccumulationDataLabelSettingsModel} [dataLabel] - The accumulation chart data label settings.
 * @param {boolean} [redraw] - Defines whether to redraw the chart or not.
 * @returns {void}
 */
export declare function accReactTemplate(childElement: HTMLElement, chart: AccumulationChart, isTemplate: boolean, points: AccPoints[], argsData: IAccTextRenderEventArgs, point?: AccPoints, datalabelGroup?: Element, id?: string, dataLabel?: AccumulationDataLabelSettingsModel, redraw?: boolean): void;
/**
 * Renders the chart data labels using template.
 *
 * @param {HTMLElement} childElement - The child element.
 * @param {Chart} chart - The chart instance.
 * @param {Points} point - The chart point.
 * @param {Series} series - The chart series.
 * @param {number} labelIndex - The index of the label.
 * @param {boolean} [redraw] - Defines whether to redraw the chart or not.
 * @returns {void}
 */
export declare function chartReactTemplate(childElement: HTMLElement, chart: Chart, point: Points, series: Series, labelIndex: number, redraw?: boolean): void;
/**
 * Creates a template.
 *
 * @param {HTMLElement} childElement - The child element of the template.
 * @param {number} pointIndex - The index of the point.
 * @param {string | Function} content - The content of the template.
 * @param {Chart | AccumulationChart | RangeNavigator} chart - The chart instance.
 * @param {Points | AccPoints} point - The chart or accumulation point.
 * @param {Series | AccumulationSeries} series - The chart or accumulation series.
 * @param {string} dataLabelId - The id of the data label.
 * @param {number} labelIndex - The index of the label.
 * @param {IAccTextRenderEventArgs} argsData - The event arguments for text rendering.
 * @param {boolean} isTemplate - Indicates whether it is a template.
 * @param {AccPoints[]} points - The accumulation points.
 * @param {Element} datalabelGroup - The group element of the data label.
 * @param {string} id - The id of the element.
 * @param {AccumulationDataLabelSettingsModel} dataLabel - The data label settings.
 * @param {boolean} redraw - Indicates whether to redraw.
 * @returns {HTMLElement} - The created template element.
 * @private
 */
export declare function createTemplate(childElement: HTMLElement, pointIndex: number, content: string | Function, chart: Chart | AccumulationChart | RangeNavigator, point?: Points | AccPoints, series?: Series | AccumulationSeries, dataLabelId?: string, labelIndex?: number, argsData?: IAccTextRenderEventArgs, isTemplate?: boolean, points?: AccPoints[], datalabelGroup?: Element, id?: string, dataLabel?: AccumulationDataLabelSettingsModel, redraw?: boolean): HTMLElement;
/**
 * Gets the font style.
 *
 * @param {FontModel} font - The font settings.
 * @param {FontModel} themeFontStyle - The theme font settings.
 * @returns {string} - The font style.
 * @private
 */
export declare function getFontStyle(font: FontModel, themeFontStyle: FontModel): string;
/**
 * Measures the bounding rectangle of an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to measure.
 * @param {boolean} redraw - Indicates whether to redraw.
 * @param {boolean} isReactCallback - Indicates whether it's a React callback.
 * @returns {ClientRect} - The bounding rectangle of the element.
 * @private
 */
export declare function measureElementRect(element: HTMLElement, redraw?: boolean, isReactCallback?: boolean): ClientRect;
/**
 * Finds an element in a NodeList based on its id.
 *
 * @param {NodeList} elements - The NodeList to search.
 * @param {string} id - The id of the element to find.
 * @returns {Element} - The found element.
 * @private
 */
export declare function findlElement(elements: NodeList, id: string): Element;
/**
 * Gets the point on the chart based on the provided coordinates and axes.
 *
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @param {Axis} xAxis - The x-axis of the chart.
 * @param {Axis} yAxis - The y-axis of the chart.
 * @param {boolean} isInverted - Indicates whether the chart is inverted.
 * @returns {ChartLocation} - The calculated point.
 * @private
 */
export declare function getPoint(x: number, y: number, xAxis: Axis, yAxis: Axis, isInverted?: boolean): ChartLocation;
/**
 * Appends an element to a parent element.
 *
 * @param {Element} child - The child element to be appended.
 * @param {Element} parent - The parent element to which the child element will be appended.
 * @param {boolean} [redraw=false] - A boolean value indicating whether to redraw. Default is false.
 * @param {boolean} [animate=false] - A boolean value indicating whether to animate the appending operation. Default is false.
 * @param {string} [x='x'] - The x-coordinate for the position of the child element. Default is 'x'.
 * @param {string} [y='y'] - The y-coordinate for the position of the child element. Default is 'y'.
 * @param {number} duration - duration of the animation
 * @returns {void}
 */
export declare function appendElement(child: Element, parent: Element, redraw?: boolean, animate?: boolean, x?: string, y?: string, duration?: number): void;
/**
 * Method to append child element.
 *
 * @param {boolean} isCanvas - canvas mode value
 * @param {Element | HTMLElement} parent - parent element
 * @param {Element | HTMLElement} childElement - childElement element
 * @param {boolean} redraw - chart redraw value
 * @param {boolean} isAnimate - animation value
 * @param {string} x - x position
 * @param {string} y - y position
 * @param {ChartLocation} start - start location value
 * @param {string} direction - direction of the element
 * @param {boolean} forceAnimate - forceAnimate
 * @param {boolean} isRect - isRect
 * @param {Rect} previousRect - previousRect
 * @param {number} animateDuration - duration of the animation
 * @param {boolean} scatterElement - The scatter element.
 * @param {number} angle - The angle of the element.
 * @param {ChartLocation} currentTransform - The current transform of the element.
 * @param {string} previousTranslate - The previous translate of the element.
 * @returns {void}
 * @private
 */
export declare function appendChildElement(isCanvas: boolean, parent: Element | HTMLElement, childElement: Element | HTMLElement, redraw?: boolean, isAnimate?: boolean, x?: string, y?: string, start?: ChartLocation, direction?: string, forceAnimate?: boolean, isRect?: boolean, previousRect?: Rect, animateDuration?: number, scatterElement?: boolean, angle?: number, currentTransform?: ChartLocation, previousTranslate?: string): void;
/**
 * Calculates the location of the dragged rectangle.
 *
 * @param {number} x1 - The x-coordinate of the starting point.
 * @param {number} y1 - The y-coordinate of the starting point.
 * @param {number} x2 - The x-coordinate of the ending point.
 * @param {number} y2 - The y-coordinate of the ending point.
 * @param {Rect} outerRect - The outer rectangle containing the dragged rectangle.
 * @returns {Rect} - The location of the dragged rectangle.
 * @private
 */
export declare function getDraggedRectLocation(x1: number, y1: number, x2: number, y2: number, outerRect: Rect): Rect;
/**
 * Checks if a value is within bounds defined by minimum and maximum values.
 *
 * @param {number} start - The start value.
 * @param {number} size - The size of the value.
 * @param {number} min - The minimum value of the bound.
 * @param {number} max - The maximum value of the bound.
 * @returns {number} - The adjusted value within the bounds.
 * @private
 */
export declare function checkBounds(start: number, size: number, min: number, max: number): number;
/**
 * Retrieves label text for a data point.
 *
 * @param {Points} currentPoint - The current data point.
 * @param {Series} series - The series to which the data point belongs.
 * @param {Chart} chart - The chart instance.
 * @returns {string[]} - The label text.
 * @private
 */
export declare function getLabelText(currentPoint: Points, series: Series, chart: Chart): string[];
/**
 * Stops the specified timer.
 *
 * @param {number} timer - The timer to stop.
 * @returns {void}
 */
export declare function stopTimer(timer: number): void;
/**
 * Checks if the specified rect collides with any of the rect in the collection within the given clip rect.
 *
 * @param {Rect} rect - The rect to check for collision.
 * @param {Rect[]} collections - The collection of rect to check against.
 * @param {Rect} clipRect - The clip rect.
 * @returns {boolean} - Returns true if collision occurs; otherwise, false.
 */
export declare function isCollide(rect: Rect, collections: Rect[], clipRect: Rect): boolean;
/**
 * Checks if the specified rect overlap each other.
 *
 * @param {Rect} currentRect - The first rect.
 * @param {Rect} rect - The second rect.
 * @returns {boolean} - Returns true if the rect overlap; otherwise, false.
 */
export declare function isOverlap(currentRect: Rect, rect: Rect): boolean;
/**
 * Checks if the specified rect is completely contained within another rect.
 *
 * @param {Rect} currentRect - The rect to check if it's contained.
 * @param {Rect} rect - The containing rect.
 * @returns {boolean} - Returns true if the specified rect is completely contained within the containing rect; otherwise, false.
 */
export declare function containsRect(currentRect: Rect, rect: Rect): boolean;
/**
 * Calculates the rect based on the specified location, text size, and margin.
 *
 * @param {ChartLocation} location - The location of the rect.
 * @param {Size} textSize - The size of the text.
 * @param {MarginModel} margin - The margin to be applied around the text.
 * @returns {Rect} - Returns the calculated rect.
 */
export declare function calculateRect(location: ChartLocation, textSize: Size, margin: MarginModel): Rect;
/**
 * Converts the color value to hexadecimal code.
 *
 * @param {ColorValue} value - The color value to convert.
 * @returns {string} - Returns the hexadecimal representation of the color.
 */
export declare function convertToHexCode(value: ColorValue): string;
/**
 * Converts a component value to its hexadecimal representation.
 *
 * @param {number} value - The component value to convert.
 * @returns {string} - Returns the hexadecimal representation of the component.
 */
export declare function componentToHex(value: number): string;
/**
 * Converts a hexadecimal color code to its RedGreenBlue representation.
 *
 * @param {string} hex - The hexadecimal color code to convert.
 * @returns {ColorValue} - Returns the RedGreenBlue representation of the hexadecimal color code.
 */
export declare function convertHexToColor(hex: string): ColorValue;
/**
 * Converts a color name to its corresponding hexadecimal color code.
 *
 * @param {string} color - The color name to convert.
 * @returns {string} - Returns the hexadecimal color code.
 */
export declare function colorNameToHex(color: string): string;
/**
 * Checks if the provided color string is in a valid format.
 *
 * @param {string} color - The color string to check.
 * @returns {boolean} - Returns true if the color string is in a valid format, otherwise returns false.
 */
export declare function checkColorFormat(color: string): boolean;
/**
 * Gets the color with adjusted saturation.
 *
 * @param {string} color - The input color string.
 * @param {number} factor - The factor by which to adjust the saturation.
 * @returns {string} - The modified color string.
 */
export declare function getSaturationColor(color: string, factor: number): string;
/**
 * Applies a lightness adjustment to the given color.
 *
 * @param {string} color - The input color string.
 * @param {number} value - The value by which to adjust the lightness.
 * @returns {string} - The modified color string.
 */
export declare function applyZLight(color: string, value: number): string;
/**
 * Calculates the median value of an array of numbers.
 *
 * @param {number[]} values - The array of numbers.
 * @returns {number} - The median value.
 */
export declare function getMedian(values: number[]): number;
/**
 * Calculates the legend shapes based on the provided parameters.
 *
 * @param {ChartLocation} location - The location to position the legend shape.
 * @param {Size} size - The size of the legend shape.
 * @param {string} shape - The shape of the legend.
 * @param {PathOption} options - The options for drawing the legend shape.
 * @returns {IShapes} - The calculated legend shape.
 */
export declare function calculateLegendShapes(location: ChartLocation, size: Size, shape: string, options: PathOption): IShapes;
/**
 * Trims the text to fit within the specified maximum width.
 *
 * @param {number} maxWidth - The maximum width for the text.
 * @param {string} text - The text to be trimmed.
 * @param {FontModel} font - The font settings for the text.
 * @param {boolean} isRtlEnabled - Indicates whether right-to-left text rendering is enabled.
 * @param {FontModel} [themeFontStyle] - The font style to be used for theme-specific settings.
 * @returns {string} - The trimmed text.
 */
export declare function textTrim(maxWidth: number, text: string, font: FontModel, isRtlEnabled: boolean, themeFontStyle?: FontModel): string;
/**
 * Trims the text and performs line breaks based on the maximum width and font settings.
 *
 * @param {number} maxWidth - The maximum width allowed for the text.
 * @param {string} text - The text to be trimmed.
 * @param {FontModel} font - The font settings for the text.
 * @param {FontModel} [themeFontStyle] - Optional. The font style based on the theme.
 * @returns {string[]} - An array of trimmed text lines with line breaks.
 */
export declare function lineBreakLabelTrim(maxWidth: number, text: string, font: FontModel, themeFontStyle?: FontModel): string[];
/**
 * Converts a string value to a number, considering the container size for percentage values.
 *
 * @param {string} value - The string value to convert to a number.
 * @param {number} containerSize - The size of the container, used for percentage values.
 * @returns {number} - The converted numeric value.
 */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Redraws the SVG or canvas element based on the provided options.
 *
 * @param {boolean} redraw - Specifies whether to redraw the element.
 * @param {string} id - The id of the element to redraw.
 * @param {PathAttributes | RectAttributes | CircleAttributes} [options] - The attributes of the element to redraw.
 * @param {SvgRenderer | CanvasRenderer} [renderer] - The renderer to use for redrawing.
 * @returns {Element} - The redrawn element.
 */
export declare function redrawElement(redraw: boolean, id: string, options?: PathAttributes | RectAttributes | CircleAttributes, renderer?: SvgRenderer | CanvasRenderer): Element;
/**
 * Animates the redrawn element from its start to end location over a specified duration.
 *
 * @param {Element | HTMLElement} element - The element to animate.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @param {ChartLocation} start - The start location of the element.
 * @param {ChartLocation} end - The end location of the element.
 * @param {string} [x='x'] - The attribute representing the horizontal position of the element.
 * @param {string} [y='y'] - The attribute representing the vertical position of the element.
 * @param {number} [angle=0] - The angle of rotation for the element.
 * @param {ChartLocation} [newTransform=new ChartLocation(0, 0)] - The new transform location of the element.
 * @param {ChartLocation} [previousTransform=new ChartLocation(0, 0)] - The previous transform location of the element.
 * @param {boolean} [pointAnimation] - Specifies the animation based on points.
 * @returns {void}
 */
export declare function animateRedrawElement(element: Element | HTMLElement, duration: number, start: ChartLocation, end: ChartLocation, x?: string, y?: string, angle?: number, newTransform?: ChartLocation, previousTransform?: ChartLocation, pointAnimation?: boolean): void;
/**
 * Animates the text content of an HTML element from a start value to an end value over a specified duration.
 *
 * @param {HTMLElement} element - The HTML element whose text content will be animated.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @param {number} start - The starting value of the animation.
 * @param {number} end - The ending value of the animation.
 * @param {string} customLabelFormat - A custom format string that includes a placeholder for the value.
 * @returns {void}
 */
export declare function animateTextElement(element: HTMLElement, duration: number, start: number, end: number, customLabelFormat: string): void;
/**
 * Renders a text element using the specified renderer and options.
 *
 * @param {SvgRenderer | CanvasRenderer} renderer - The renderer used for rendering.
 * @param {TextOption} option - The options for the text element.
 * @param {FontModel} font - The font settings for the text.
 * @param {string} color - The color of the text.
 * @param {HTMLElement | Element} parent - The parent element to which the text element is appended.
 * @param {boolean} [isMinus=false] - Indicates whether the text represents a negative value.
 * @param {boolean} [redraw] - Indicates whether to redraw the element.
 * @param {boolean} [isAnimate] - Indicates whether to animate the element.
 * @param {boolean} [forceAnimate=false] - Indicates whether to force animation.
 * @param {number} [animateDuration] - The duration of the animation in milliseconds.
 * @param {Rect} [seriesClipRect] - The clipping rectangle for the series.
 * @param {Size} [labelSize] - The size of the label.
 * @param {boolean} [isRotatedLabelIntersect] - Indicates whether rotated labels intersect.
 * @param {boolean} [isCanvas] - Indicates whether the rendering is done on a canvas.
 * @param {boolean} [isDataLabelWrap] - Indicates whether data labels are wrapped.
 * @param {FontModel} [themeFontStyle] - The font settings based on the theme.
 * @param {ChartLocation} [transform] - The location to transform the text element.
 * @param {string} [previousTransform] - The previous transform of the text element.
 * @returns {Element} - The rendered text element.
 */
export declare function textElement(renderer: SvgRenderer | CanvasRenderer, option: TextOption, font: FontModel, color: string, parent: HTMLElement | Element, isMinus?: boolean, redraw?: boolean, isAnimate?: boolean, forceAnimate?: boolean, animateDuration?: number, seriesClipRect?: Rect, labelSize?: Size, isRotatedLabelIntersect?: boolean, isCanvas?: boolean, isDataLabelWrap?: boolean, themeFontStyle?: FontModel, transform?: ChartLocation, previousTransform?: string): Element;
/**
 * Calculates the size of the chart.
 *
 * @param {Chart | AccumulationChart | RangeNavigator | StockChart | Chart3D | CircularChart3D} chart - The chart for which to calculate the size.
 * @returns {void}
 */
export declare function calculateSize(chart: Chart | AccumulationChart | RangeNavigator | StockChart | Chart3D | CircularChart3D): void;
/**
 * Creates an SVG element for the specified chart or chart element.
 *
 * @param {Chart | AccumulationChart | RangeNavigator | Chart3D | CircularChart3D} chart - The chart or chart element for which to create the SVG element.
 * @returns {void}
 */
export declare function createSvg(chart: Chart | AccumulationChart | RangeNavigator | Chart3D | CircularChart3D): void;
/**
 * Gets the title text with specified style and width, and supports right-to-left rendering.
 *
 * @param {string} title - The title text.
 * @param {FontModel} style - The font style for the title.
 * @param {number} width - The width available for rendering the title.
 * @param {boolean} isRtlEnabled - Specifies whether right-to-left rendering is enabled.
 * @param {FontModel} [themeFontStyle] - The font style used for theme rendering.
 * @returns {string[]} An array of strings containing the title text with line breaks if needed.
 */
export declare function getTitle(title: string, style: FontModel, width: number, isRtlEnabled: boolean, themeFontStyle?: FontModel): string[];
/**
 * Calculates the x-coordinate position for rendering the title text within the specified rect.
 *
 * @param {Rect} rect - The rect within which the title text is to be rendered.
 * @param {FontModel} titleStyle - The font style used for rendering the title text.
 * @returns {number} The x-coordinate position for rendering the title text.
 */
export declare function titlePositionX(rect: Rect, titleStyle: FontModel): number;
/**
 * Wraps the input text into multiple lines based on the specified maximum width and font style.
 *
 * @param {string} currentLabel - The text to be wrapped.
 * @param {number} maximumWidth - The maximum width allowed for each line of text.
 * @param {FontModel} font - The font style used for rendering the text.
 * @param {boolean} isRtlEnabled - Specifies whether right-to-left text direction is enabled.
 * @param {boolean} [wrapAnyWhere=false] - Indicates whether the text can be wrapped at any position.
 * @param {boolean} [clip=false] - Specifies whether text exceeding the maximum width should be clipped.
 * @param {FontModel} [themeFontStyle] - The font style used as the base for the text wrapping operation.
 * @param {number} [maximumLabelHeight] - The total height available for the wrapped text.
 * @returns {string[]} An array of strings representing the wrapped lines of text.
 */
export declare function textWrap(currentLabel: string, maximumWidth: number, font: FontModel, isRtlEnabled: boolean, wrapAnyWhere?: boolean, clip?: boolean, themeFontStyle?: FontModel, maximumLabelHeight?: number): string[];
/**
 * Wraps the input text into multiple lines, allowing wrapping at any position.
 *
 * @param {string} currentLabel - The text to be wrapped.
 * @param {number} maximumWidth - The maximum width allowed for each line of text.
 * @param {FontModel} font - The font style used for rendering the text.
 * @param {FontModel} [themeFontStyle] - The font style used as the base for the text wrapping operation.
 * @returns {string[]} An array of strings representing the wrapped lines of text.
 * @private
 */
export declare function textWrapAnyWhere(currentLabel: string, maximumWidth: number, font: FontModel, themeFontStyle?: FontModel): string[];
/**
 * Gets the Unicode text from the input string based on the provided regular expression.
 *
 * @param {string} text - The input string.
 * @param {RegExp} regexp - The regular expression pattern to match Unicode characters.
 * @returns {string} The Unicode text extracted from the input string.
 */
export declare function getUnicodeText(text: string, regexp: RegExp): string;
/**
 * Resets the Blazor templates of the given control (Chart or AccumulationChart).
 *
 * @param {Chart | AccumulationChart} control - The control to reset Blazor templates for.
 * @returns {void}
 */
export declare function blazorTemplatesReset(control: Chart | AccumulationChart): void;
/** @private */
export declare class CustomizeOption {
    id: string;
    constructor(id?: string);
}
/** @private */
export declare class StackValues {
    startValues?: number[];
    endValues?: number[];
    constructor(startValue?: number[], endValue?: number[]);
}
/** @private */
export declare class RectOption extends PathOption {
    x: number;
    y: number;
    height: number;
    width: number;
    rx: number;
    ry: number;
    transform: string;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect, rx?: number, ry?: number, transform?: string, dashArray?: string);
}
/** @private */
export declare class ImageOption {
    height: number;
    width: number;
    href: string;
    x: number;
    y: number;
    id: string;
    visibility: string;
    preserveAspectRatio: string;
    constructor(height: number, width: number, href: string, x: number, y: number, id: string, visibility: string, preserveAspectRatio: string);
}
/** @private */
export declare class CircleOption extends PathOption {
    cy: number;
    cx: number;
    r: number;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, cx: number, cy: number, r: number);
}
/** @private */
export declare class PolygonOption {
    id: string;
    points: string;
    fill: string;
    constructor(id: string, points: string, fill: string);
}
/** @private */
export declare class ChartLocation {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
/** @private */
export declare class LabelLocation {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
/** @private */
export declare class Thickness {
    left: number;
    right: number;
    top: number;
    bottom: number;
    constructor(left: number, right: number, top: number, bottom: number);
}
/** @private */
export declare class ColorValue {
    r: number;
    g: number;
    b: number;
    constructor(r?: number, g?: number, b?: number);
}
/** @private */
export declare class PointData {
    point: Points;
    series: Series;
    lierIndex: number;
    constructor(point: Points, series: Series, index?: number);
}
/** @private */
export declare class AccPointData {
    point: AccPoints;
    series: AccumulationSeries;
    index: number;
    constructor(point: AccPoints, series: AccumulationSeries, index?: number);
}
/** @private */
export declare class Point3D {
    point: Chart3DPoint;
    series: Chart3DSeries;
    /**
     * Initializes a new instance of the Chart3DData class.
     *
     * @param {Chart3DPoint} point - The 3D point object.
     * @param {Chart3DSeries} series - The 3D series object.
     * @private
     */
    constructor(point: Chart3DPoint, series: Chart3DSeries);
}
/** @private */
export declare class ControlPoints {
    controlPoint1: ChartLocation;
    controlPoint2: ChartLocation;
    constructor(controlPoint1: ChartLocation, controlPoint2: ChartLocation);
}
/** @private */
export interface IHistogramValues {
    sDValue?: number;
    mean?: number;
    binWidth?: number;
    yValues?: number[];
}
/**
 * Gets the color from the range color setting model based on the specified value.
 *
 * @param {RangeColorSettingModel} colorMap - The range color setting model.
 * @param {number} value - The value for which to get the color.
 * @returns {string} - The color corresponding to the specified value.
 */
export declare function getColorByValue(colorMap: RangeColorSettingModel, value: number): string;
/**
 * Gets the gradient color from the range color setting model based on the specified value.
 *
 * @param {number} value - The value for which to get the gradient color.
 * @param {RangeColorSettingModel} colorMap - The range color setting model.
 * @returns {ColorValue} - The gradient color corresponding to the specified value.
 */
export declare function getGradientColor(value: number, colorMap: RangeColorSettingModel): ColorValue;
/**
 * Calculates the color based on the percentage change between two values.
 *
 * @param {number} percent - The percentage change.
 * @param {string} previous - The color for the previous value.
 * @param {string} next - The color for the next value.
 * @returns {ColorValue} - The calculated color value.
 */
export declare function getPercentageColor(percent: number, previous: string, next: string): ColorValue;
/**
 * Calculates the percentage change between two values.
 *
 * @param {number} percent - The percentage to calculate.
 * @param {number} previous - The previous value.
 * @param {number} next - The next value.
 * @returns {number} - The calculated percentage change.
 */
export declare function getPercentage(percent: number, previous: number, next: number): number;
/**
 * Gets the text anchor based on the specified alignment and Right-to-Left setting.
 *
 * @param {Alignment} alignment - The alignment of the text.
 * @param {boolean} enableRtl - Specifies whether Right-to-Left is enabled.
 * @returns {string} - The text anchor value.
 */
export declare function getTextAnchor(alignment: Alignment, enableRtl: boolean): string;
