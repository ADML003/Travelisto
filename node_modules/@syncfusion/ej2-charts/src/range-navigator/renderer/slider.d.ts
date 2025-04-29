import { RangeNavigator } from '../index';
import { DataPoint } from '../utils/helper';
import { Rect, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { VisibleRangeModel } from '../../common/model/interface';
/**
 * Class for slider
 */
export declare class RangeSlider {
    private leftUnSelectedElement;
    private rightUnSelectedElement;
    private selectedElement;
    private leftSlider;
    private rightSlider;
    /** @private */
    control: RangeNavigator;
    /** @private */
    isDrag: boolean;
    private elementId;
    currentSlider: string;
    startX: number;
    endX: number;
    private sliderWidth;
    currentStart: number;
    currentEnd: number;
    selectedPeriod: string;
    private previousMoveX;
    private thumpPadding;
    private thumbColor;
    points: DataPoint[];
    leftRect: Rect;
    rightRect: Rect;
    midRect: Rect;
    private labelIndex;
    private thumbVisible;
    private thumpY;
    sliderY: number;
    /** @private */
    isIOS: boolean;
    constructor(range: RangeNavigator);
    /**
     * Render Slider elements for range navigator.
     *
     * @param {RangeNavigator} range - RangeNavigator instance.
     * @returns {void}
     */
    render(range: RangeNavigator): void;
    /**
     * Thumb creation performed.
     *
     * @param {SvgRenderer} render - SvgRenderer
     * @param {Rect} bounds - bounds
     * @param {Element} parent - parent element
     * @param {string} id - id
     * @param {Element} sliderGroup - sliderGroup
     * @returns {void}
     */
    createThump(render: SvgRenderer, bounds: Rect, parent: Element, id: string, sliderGroup?: Element): void;
    /**
     * Sets the slider value for the range navigator.
     *
     * @param {number} start - The start value of the slider.
     * @param {number} end - The end value of the slider.
     * @param {boolean} trigger - Indicates whether to trigger events.
     * @param {boolean} showTooltip - Indicates whether to show tooltips.
     * @param {boolean} resize - Indicates whether to resize.
     * @returns {void}
     */
    setSlider(start: number, end: number, trigger: boolean, showTooltip: boolean, resize?: boolean): void;
    /**
     * Trigger changed event.
     *
     * @param {VisibleRangeModel} range - Axis visible range.
     * @returns {void}
     */
    triggerEvent(range: VisibleRangeModel): void;
    /**
     * @hidden
     * @returns {void}
     */
    private addEventListener;
    /**
     * @hidden
     * @returns {void}
     */
    private removeEventListener;
    /**
     * Mouse move handler perfomed here.
     *
     * @hidden
     * @param {PointerEvent | TouchEvent} e - Mouse event argument.
     * @returns {void}
     */
    mouseMoveHandler(e: PointerEvent | TouchEvent): void;
    /**
     * To get the range value.
     *
     * @param {number} x - The xValue.
     * @returns {number} - The range value.
     */
    private getRangeValue;
    /**
     * Moused down handler for slider perform here.
     *
     * @param {PointerEvent} e - Mouse event argument.
     * @returns {void}
     */
    private mouseDownHandler;
    /**
     * To get the current slider element.
     *
     * @param {string} id - The id of the slider element.
     * @returns {string} - The slider element.
     */
    private getCurrentSlider;
    /**
     * Mouse up handler performed here.
     *
     * @returns {void}
     */
    private mouseUpHandler;
    /**
     * Allow Snapping perfomed here.
     *
     * @param {RangeNavigator} control - RangeNavigator instance.
     * @param {number} start - start
     * @param {number} end - end
     * @param {boolean} trigger - trigger
     * @param {boolean} tooltip - tooltip
     * @private
     * @returns {void}
     */
    setAllowSnapping(control: RangeNavigator, start: number, end: number, trigger: boolean, tooltip: boolean): void;
    /**
     * Animation Calculation for slider navigation.
     *
     * @param {number} start - The start value for the animation.
     * @param {number} end - The end value for the animation.
     * @param {RangeNavigator} control - The RangeNavigator control.
     * @returns {void}
     */
    performAnimation(start: number, end: number, control: RangeNavigator): void;
    /**
     * Mouse Cancel Handler.
     *
     * @returns {void}
     */
    private mouseCancelHandler;
    /**
     * Destroy Method Calling here.
     *
     * @returns {void}
     */
    destroy(): void;
}
