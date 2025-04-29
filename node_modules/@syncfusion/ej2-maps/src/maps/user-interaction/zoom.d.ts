import { Maps, ITouches } from '../../index';
import { Point, Rect } from '../utils/helper';
import { LayerSettings } from '../index';
import { PanDirection } from '../utils/enum';
/**
 * Zoom module used to process the zoom for maps
 */
export declare class Zoom {
    private maps;
    /** @private */
    toolBarGroup: Element;
    private currentToolbarEle;
    /** @private */
    zoomingRect: Rect;
    /** @private */
    selectionColor: string;
    private fillColor;
    private zoomElements;
    private panElements;
    /** @private */
    isPanModeEnabled: boolean;
    /** @private */
    mouseEnter: boolean;
    /** @private */
    baseTranslatePoint: Point;
    private wheelEvent;
    private cancelEvent;
    /** @private */
    currentScale: number;
    /** @private */
    isTouch: boolean;
    /** @private */
    rectZoomingStart: boolean;
    /** @private */
    touchStartList: ITouches[] | TouchList;
    /** @private */
    touchMoveList: ITouches[] | TouchList;
    /** @private */
    previousTouchMoveList: ITouches[] | TouchList;
    /** @private */
    mouseDownPoints: Point;
    /** @private */
    mouseMovePoints: Point;
    /** @private */
    isDragZoom: boolean;
    /** @private */
    currentLayer: LayerSettings;
    private panColor;
    private clearTimeout;
    /** @private */
    zoomColor: string;
    /** @private */
    browserName: string;
    /** @private */
    isPointer: boolean;
    private handled;
    private fingers;
    /** @private */
    firstMove: boolean;
    /** @private */
    isPanningInProgress: boolean;
    private isPan;
    private isZoomFinal;
    private isZoomSelection;
    private interaction;
    private lastScale;
    private pinchFactor;
    private startTouches;
    private index;
    private templateCount;
    private pinchDistance;
    /** @private */
    startDistance: number;
    /** @private */
    touchCenter: Point;
    /** @private */
    pinchStartLatLong: object;
    /** @private */
    isCancellation: boolean;
    private pinchTileZoomScale;
    private tileZoomLevel;
    private pinchZoomScale;
    private isPinchZooming;
    /** @private */
    mouseDownLatLong: object;
    /** @private */
    mouseMoveLatLong: object;
    /** @private */
    isSingleClick: boolean;
    /** @private */
    layerCollectionEle: Element;
    constructor(maps: Maps);
    /**
     * To perform zooming for maps.
     *
     * @param {Point} position - Specifies the position.
     * @param {number} newZoomFactor - Specifies the zoom factor.
     * @param {string} type - Specifies the type.
     * @param {boolean} isMouseWheel - Indicates whether the zoom operation was triggered by the mouse wheel.
     * @returns {void}
     * @private
     */
    performZooming(position: Point, newZoomFactor: number, type: string, isMouseWheel?: boolean): void;
    private calculateInitalZoomTranslatePoint;
    private triggerZoomEvent;
    private getTileTranslatePosition;
    private getTileTranslate;
    /**
     * @returns {void}
     * @private
     */
    performRectZooming(): void;
    private setInteraction;
    private updateInteraction;
    private tilePinchingProcess;
    /**
     * @param {PointerEvent} e - Specifies the vent in the map
     * @returns {void}
     * @private
     */
    performPinchZooming(e: PointerEvent | TouchEvent): void;
    private copyStyles;
    private getTouchCenterPoint;
    private triggerZoomComplete;
    /**
     * @returns {void}
     * @private
     */
    drawZoomRectangle(): void;
    /**
     * To animate the zooming process.
     *
     * @param {Element} element - Specifies the element
     * @param {boolean} animate - Specifies the boolean value
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @param {number} scale - Specifies the scale value
     * @returns {void}
     */
    private animateTransform;
    /**
     * @param {Maps} maps - Specifies the Map control
     * @param {boolean} isMouseWheel - Indicates whether the zoom operation was triggered by the mouse wheel.
     * @param {boolean} animate - Specifies the animation is available or not
     * @param {boolean} isPanning - Specifies that it is panning or not
     * @returns {void}
     * @private
     */
    applyTransform(maps: Maps, isMouseWheel?: boolean, animate?: boolean, isPanning?: boolean): void;
    private markerTranslates;
    /**
     * To translate the layer template elements.
     *
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @param {number} scale - Specifies the scale value
     * @param {Maps} maps - Specifies the maps value
     * @returns {void}
     * @private
     */
    processTemplate(x: number, y: number, scale: number, maps: Maps): void;
    private dataLabelTranslate;
    /**
     *
     * @param {Element | HTMLElement} element - Specifies the marker element.
     * @param {number} factor - Specifies scale factor.
     * @param {number} x - Specifies the x location of the marker element.
     * @param {number} y - Specifies the y location of the marker element.
     * @param {number} scale - Specifies scale factor.
     * @param {number} type - Specifies the type of the marker processing.
     * @param {number} animate - Specifies whether the animation is enabled or not.
     * @returns {void}
     * @private
     */
    markerTranslate(element: Element | HTMLElement, factor: number, x: number, y: number, scale: number, type: string, animate?: boolean): void;
    private markerLineAnimation;
    /**
     * @param {PanDirection} direction - Specifies the direction of the panning.
     * @param {number} xDifference - Specifies the distance moved in the horizontal direction.
     * @param {number} yDifference - Specifies the distance moved in the vertical direction.
     * @param {PointerEvent | TouchEvent | KeyboardEvent} event - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    panning(direction: PanDirection, xDifference: number, yDifference: number, event?: PointerEvent | TouchEvent | KeyboardEvent): void;
    /**
     * @param {number} zoomFactor - Specifies the factor for zooming
     * @param {string} type - Specifies the type
     * @returns {void}
     * @private
     */
    toolBarZooming(zoomFactor: number, type: string): void;
    /**
     * @returns {void}
     * @private
     */
    createZoomingToolbars(): void;
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    performToolBarAction(e: PointerEvent): void;
    /**
     * @param {string} type - Specifies the type.
     * @returns {void}
     * @private
     */
    performZoomingByToolBar(type: string): void;
    private panningStyle;
    private applySelection;
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    showTooltip(e: PointerEvent): void;
    /**
     * @returns {void}
     * @private
     */
    removeTooltip(): void;
    /**
     * @returns {void}
     * @private
     */
    alignToolBar(): void;
    /**
     * @param {number} factor - Specifies the factor for toolbar
     * @param {string} id - Specifies the id
     * @returns {void}
     * @private
     */
    removeToolbarOpacity(factor: number, id: string): void;
    private setOpacity;
    private removeZoomOpacity;
    /**
     * @param {string} zoomClassStyle - Specifies the style for zoom class.
     * @param {string} zoomInClassStyle - Specifies the style for zoom in.
     * @param {string} zoomOutClassStyle - Specifies the style for zoom out.
     * @param {string} panClassStyle -  Specifies the style for pan.
     * @param {string} resetClassStyle - Specifies the style for reset.
     * @returns {void}
     * @private
     */
    removeToolbarClass(zoomClassStyle: string, zoomInClassStyle: string, zoomOutClassStyle: string, panClassStyle: string, resetClassStyle: string): void;
    private removePanColor;
    private removeZoomColor;
    /**
     * To bind events.
     *
     * @param {Element} element - Specifies the element.
     * @param {Function} process - Specifies the process.
     * @returns {void}
     * @private
     */
    wireEvents(element: Element, process: Function): void;
    /**
     * @param {WheelEvent} e - Specifies the wheel event in the map for zooming
     * @returns {void}
     * @private
     */
    mapMouseWheel(e: WheelEvent): void;
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    doubleClick(e: PointerEvent): void;
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    mouseDownHandler(e: PointerEvent | TouchEvent): void;
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    mouseMoveHandler(e: PointerEvent | TouchEvent): void;
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    mouseUpHandler(e: PointerEvent | TouchEvent): void;
    /**
     * @param {PointerEvent} e - Specifies the event in the map
     * @returns {void}
     * @private
     */
    mouseCancelHandler(e: PointerEvent): void;
    /**
     * To handle the click event for maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    click(e: PointerEvent): void;
    /**
     * Gets the Mouse Position.
     *
     * @param {number} pageX - Specifies the Page x in map
     * @param {number} pageY - Specifies the Page y in map
     * @returns {Point} - returns the mouse point position
     * @private
     */
    getMousePosition(pageX: number, pageY: number): Point;
    /**
     * @returns {void}
     * @private
     */
    addEventListener(): void;
    /**
     * @returns {void}
     * @private
     */
    removeEventListener(): void;
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the zoom.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
