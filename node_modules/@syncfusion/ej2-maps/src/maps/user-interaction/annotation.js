import { annotationRendering } from '../index';
import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getTemplateFunction, getElementOffset, getElementByID } from '../utils/helper';
/**
 * Represents the annotation elements for map.
 */
var Annotations = /** @class */ (function () {
    function Annotations(map) {
        this.map = map;
    }
    Annotations.prototype.renderAnnotationElements = function () {
        var _this = this;
        var secondaryID = this.map.element.id + '_Secondary_Element';
        var annotationGroup = createElement('div', { id: this.map.element.id + '_Annotations_Group' });
        annotationGroup.style.position = 'absolute';
        annotationGroup.style.top = '0px';
        annotationGroup.style.left = '0px';
        this.map.annotations.map(function (annotation, index) {
            if (annotation.content !== null) {
                _this.createAnnotationTemplate(annotationGroup, annotation, index);
            }
        });
        if (annotationGroup.childElementCount > 0 && !(isNullOrUndefined(getElementByID(secondaryID)))) {
            getElementByID(secondaryID).appendChild(annotationGroup);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.map.renderReactTemplates();
    };
    /**
     * To create annotation elements.
     *
     * @param {HTMLElement} parentElement - Specifies the parent element in the map.
     * @param {Annotation} annotation -  Specifies the options for customizing the annotation element in maps.
     * @param {number} annotationIndex - Specifies the index of the annotation.
     * @returns {void}
     * @private
     */
    Annotations.prototype.createAnnotationTemplate = function (parentElement, annotation, annotationIndex) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var left;
        var top;
        var templateFn;
        var map = this.map;
        var templateElement;
        var availSize = map.availableSize;
        var childElement = createElement('div', {
            id: map.element.id + '_Annotation_' + annotationIndex
        });
        childElement.style.cssText = 'position: absolute; z-index:' + annotation.zIndex + ';';
        var argsData = {
            cancel: false, name: annotationRendering, content: annotation.content,
            annotation: annotation
        };
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.map.trigger(annotationRendering, argsData, function (annotationArgs) {
            if (argsData.cancel) {
                return;
            }
            templateFn = getTemplateFunction(argsData.content, _this.map);
            if (templateFn && templateFn(_this.map, _this.map, argsData.content, _this.map.element.id + '_ContentTemplate_' + annotationIndex).length) {
                templateElement = Array.prototype.slice.call(templateFn(_this.map, _this.map, argsData.content, _this.map.element.id + '_ContentTemplate_' + annotationIndex));
                var length_1 = templateElement.length;
                for (var i = 0; i < length_1; i++) {
                    childElement.appendChild(templateElement[i]);
                }
            }
            else {
                childElement.appendChild(createElement('div', {
                    innerHTML: argsData.content
                }));
            }
        });
        var offset = getElementOffset(childElement.cloneNode(true), map.element);
        var elementRect = map.element.getBoundingClientRect();
        var bounds = map.svgObject.getBoundingClientRect();
        left = Math.abs(bounds.left - elementRect.left);
        top = Math.abs(bounds.top - elementRect.top);
        var annotationX = !isNullOrUndefined(annotation.x) ? annotation.x : '0%';
        var annotationY = !isNullOrUndefined(annotation.y) ? annotation.y : '0%';
        var annotationXValue = (annotationX.indexOf('%') > -1) ? (availSize.width / 100) * parseFloat(annotationX) :
            parseFloat(annotationX);
        var annotationYValue = (annotationY.indexOf('%') > -1) ? (availSize.height / 100) * parseFloat(annotationY) :
            parseFloat(annotationY);
        left = (annotation.horizontalAlignment === 'None') ? (left + annotationXValue) : left;
        top = (annotation.verticalAlignment === 'None') ? (top + annotationYValue) : top;
        switch (annotation.verticalAlignment) {
            case 'Near':
                top = (top + annotationYValue);
                break;
            case 'Center':
                top = (top + annotationYValue) + ((bounds.height / 2) - (offset.height / 2));
                break;
            case 'Far':
                top = (top + bounds.height + annotationYValue) - offset.height;
                break;
        }
        switch (annotation.horizontalAlignment) {
            case 'Near':
                left = (left + annotationXValue);
                break;
            case 'Center':
                left = (left + annotationXValue) + ((bounds.width / 2) - (offset.width / 2));
                break;
            case 'Far':
                left = (left + bounds.width + annotationXValue) - offset.width;
                break;
        }
        childElement.style.left = left + 'px';
        childElement.style.top = top + 'px';
        parentElement.appendChild(childElement);
    };
    /*
   * Get module name.
   */
    Annotations.prototype.getModuleName = function () {
        return 'Annotations';
    };
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    Annotations.prototype.destroy = function () {
        this.map = null;
    };
    return Annotations;
}());
export { Annotations };
