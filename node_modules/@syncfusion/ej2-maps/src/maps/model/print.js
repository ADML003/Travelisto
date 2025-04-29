import { print as printFunction, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getElement } from '../utils/helper';
import { beforePrint } from '../model/constants';
/**
 * This module enables the print functionality in maps.
 *
 * @hidden
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for Maps.
     *
     * @param {Maps} control - Specifies the instance of the Maps
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function Print(control) {
    }
    /**
     * To print the Maps.
     *
     * @param {Maps} maps -Specifies the Maps instance.
     * @param {string[] | string | Element} elements - Specifies the element of the Maps
     * @returns {void}
     * @private
     */
    Print.prototype.print = function (maps, elements) {
        var printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        printWindow.moveTo(0, 0);
        printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(maps, elements), name: beforePrint
        };
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        maps.trigger('beforePrint', argsData, function (beforePrintArgs) {
            if (!argsData.cancel) {
                printFunction(argsData.htmlContent, printWindow);
            }
        });
    };
    /**
     * To get the html string of the Maps.
     *
     * @param {Maps} maps -Specifies the Maps instance.
     * @param {string[] | string | Element} elements - Specifies the html element
     * @returns {Element} - Returns the div element
     * @private
     */
    Print.prototype.getHTMLContent = function (maps, elements) {
        var div = createElement('div');
        var divElement = maps.element.cloneNode(true);
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        var backgroundElement = (!maps.isTileMap ? divElement.getElementsByTagName('svg')[0] : divElement.getElementsByTagName('svg')[1]);
        if (!isNullOrUndefined(backgroundElement)) {
            backgroundElement = backgroundElement.childNodes[0];
            if (!isNullOrUndefined(backgroundElement)) {
                var backgroundColor = backgroundElement.getAttribute('fill');
                if ((maps.theme === 'Tailwind' || maps.theme === 'Tailwind3' || maps.theme === 'Bootstrap5' || maps.theme === 'Fluent' || maps.theme === 'Material3' ||
                    maps.theme === 'Fluent2')
                    && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                    backgroundElement.setAttribute('fill', 'rgba(255,255,255, 1)');
                }
                else if ((maps.theme === 'TailwindDark' || maps.theme === 'Tailwind3Dark' || maps.theme === 'Bootstrap5Dark' || maps.theme === 'FluentDark' || maps.theme === 'Material3Dark' ||
                    maps.theme === 'Fluent2Dark' || maps.theme === 'Fluent2HighContrast')
                    && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                    backgroundElement.setAttribute('fill', 'rgba(0, 0, 0, 1)');
                }
            }
        }
        if (maps.isTileMap) {
            for (var i = 0; i < divElement.childElementCount; i++) {
                if (divElement.children[i].id === maps.element.id + '_tile_parent') {
                    divElement.children[i].style.removeProperty('height');
                    divElement.children[i].style.removeProperty('width');
                    divElement.children[i].style.removeProperty('top');
                    divElement.children[i].style.removeProperty('left');
                    divElement.children[i].style.removeProperty('right');
                    divElement.children[i].style.removeProperty('overflow');
                    var svgElement = document.getElementById(maps.element.id + '_Tile_SVG_Parent');
                    divElement.children[i].children[0].style.overflow = 'hidden';
                    divElement.children[i].children[0].style.position = 'absolute';
                    divElement.children[i].children[0].style.height = svgElement.style.height;
                    divElement.children[i].children[0].style.width = svgElement.style.width;
                    divElement.children[i].children[0].style.left = svgElement.style.left;
                    divElement.children[i].children[0].style.top = svgElement.style.top;
                    break;
                }
            }
        }
        if (elements) {
            if (elements instanceof Array) {
                Array.prototype.forEach.call(elements, function (value) {
                    div.appendChild(getElement(value).cloneNode(true));
                });
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            div.appendChild(divElement);
        }
        return div;
    };
    /**
     * Get module name.
     *
     * @returns {string} Returns the module name
     */
    Print.prototype.getModuleName = function () {
        return 'Print';
    };
    /**
     * To destroy the print.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Print.prototype.destroy = function () { };
    return Print;
}());
export { Print };
