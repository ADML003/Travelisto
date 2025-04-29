import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { triggerDownload, getElementByID } from '../utils/helper';
/**
 * This module enables the export to Image functionality in maps.
 *
 * @hidden
 */
var ImageExport = /** @class */ (function () {
    /**
     * Constructor for Maps
     *
     * @param {Maps} control - Specifies the instance of the map
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function ImageExport(control) {
    }
    /**
     * To export the file as image/svg format
     *
     * @param {Maps} maps - Specifies the Maps instance.
     * @param {ExportType} type - Specifies the type of the image file for exporting.
     * @param {string} fileName - Specifies the file name of the image file for exporting.
     * @param {boolean} allowDownload - Specifies whether to download image as a file or not.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     * @private
     */
    ImageExport.prototype.export = function (maps, type, fileName, allowDownload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        var promise = new Promise(function (resolve, reject) {
            var imageCanvasElement = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': maps.availableSize.width.toString(),
                    'height': maps.availableSize.height.toString()
                }
            });
            var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            var svgParent = document.getElementById(maps.element.id + '_Tile_SVG_Parent');
            var svgDataElement;
            var tileSvg;
            var svgObject = getElementByID(maps.element.id + '_svg').cloneNode(true);
            var backgroundElement = svgObject.childNodes[0];
            var backgroundColor = backgroundElement.getAttribute('fill');
            if ((maps.theme === 'Tailwind' || maps.theme === 'Tailwind3' || maps.theme === 'Bootstrap5' || maps.theme === 'Fluent' || maps.theme === 'Material3' || maps.theme === 'Fluent2')
                && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                svgObject.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            else if ((maps.theme === 'TailwindDark' || maps.theme === 'Tailwind3Dark' || maps.theme === 'Bootstrap5Dark' || maps.theme === 'FluentDark' || maps.theme === 'Material3Dark' ||
                maps.theme === 'Fluent2Dark' || maps.theme === 'Fluent2HighContrast')
                && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                svgObject.childNodes[0].setAttribute('fill', 'rgba(0, 0, 0, 1)');
            }
            if (!maps.isTileMap) {
                svgDataElement = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                    svgObject.outerHTML + '</svg>';
            }
            else {
                tileSvg = getElementByID(maps.element.id + '_Tile_SVG').cloneNode(true);
                svgDataElement = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                    svgObject.outerHTML + tileSvg.outerHTML + '</svg>';
            }
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgDataElement] :
                [(new XMLSerializer()).serializeToString(svgObject)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (allowDownload) {
                    triggerDownload(fileName, type, url, isDownload);
                }
                else {
                    resolve(null);
                }
            }
            else {
                var image_1 = new Image();
                var ctxt_1 = imageCanvasElement.getContext('2d');
                if (!maps.isTileMap) {
                    image_1.onload = (function () {
                        ctxt_1.drawImage(image_1, 0, 0);
                        window.URL.revokeObjectURL(url);
                        if (allowDownload) {
                            triggerDownload(fileName, type, imageCanvasElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                        }
                        else {
                            if (type === 'PNG') {
                                resolve(imageCanvasElement.toDataURL('image/png'));
                            }
                            else if (type === 'JPEG') {
                                resolve(imageCanvasElement.toDataURL('image/jpeg'));
                            }
                        }
                    });
                    image_1.src = url;
                }
                else {
                    maps.isExportInitialTileMap = true;
                    var svgParentElement = document.getElementById(maps.element.id + '_MapAreaBorder');
                    var top_1 = parseFloat(svgParentElement.getAttribute('y'));
                    var left_1 = parseFloat(svgParentElement.getAttribute('x'));
                    var imgxHttp = new XMLHttpRequest();
                    var imgTileLength_1 = maps.mapLayerPanel.tiles.length;
                    var _loop_1 = function (i) {
                        var tile = document.getElementById(maps.element.id + '_tile_' + (i - 1));
                        var exportTileImg = new Image();
                        exportTileImg.crossOrigin = 'Anonymous';
                        var background = maps.background ? maps.background : ((maps.theme === 'Tailwind' || maps.theme === 'Tailwind3' || maps.theme === 'Bootstrap5' || maps.theme === 'Fluent' || maps.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) ? '#ffffff' :
                            (maps.theme === 'TailwindDark' || maps.theme === 'Tailwind3Dark' || maps.theme === 'Bootstrap5Dark' || maps.theme === 'FluentDark' || maps.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent') ? '#000000' : '#ffffff';
                        ctxt_1.fillStyle = background;
                        ctxt_1.fillRect(0, 0, maps.availableSize.width, maps.availableSize.height);
                        ctxt_1.font = maps.titleSettings.textStyle.size + ' Arial';
                        var titleElement = document.getElementById(maps.element.id + '_Map_title');
                        if (!isNullOrUndefined(titleElement)) {
                            ctxt_1.fillStyle = titleElement.getAttribute('fill');
                            ctxt_1.fillText(maps.titleSettings.text, parseFloat(titleElement.getAttribute('x')), parseFloat(titleElement.getAttribute('y')));
                        }
                        exportTileImg.onload = (function () {
                            if (i === 0 || i === imgTileLength_1 + 1) {
                                if (i === 0) {
                                    ctxt_1.setTransform(1, 0, 0, 1, 0, 0);
                                    ctxt_1.rect(0, top_1, parseFloat(svgParent.style.width), parseFloat(svgParent.style.height));
                                    ctxt_1.clip();
                                }
                                else {
                                    ctxt_1.setTransform(1, 0, 0, 1, left_1, top_1);
                                }
                            }
                            else {
                                ctxt_1.setTransform(1, 0, 0, 1, parseFloat(tile.style.left) + left_1, parseFloat(tile.style.top) +
                                    top_1);
                            }
                            ctxt_1.drawImage(exportTileImg, 0, 0);
                            if (i === imgTileLength_1 + 1) {
                                localStorage.setItem('local-canvasImage', imageCanvasElement.toDataURL('image/png'));
                                var localBase64 = localStorage.getItem('local-canvasImage');
                                if (allowDownload) {
                                    triggerDownload(fileName, type, localBase64, isDownload);
                                    localStorage.removeItem('local-canvasImage');
                                    maps.isExportInitialTileMap = false;
                                }
                                else {
                                    maps.isExportInitialTileMap = false;
                                    if (type === 'PNG') {
                                        resolve(localBase64);
                                    }
                                    else if (type === 'JPEG') {
                                        resolve(imageCanvasElement.toDataURL('image/jpeg'));
                                    }
                                }
                            }
                        });
                        if (i === 0 || i === imgTileLength_1 + 1) {
                            if (i === 0) {
                                exportTileImg.src = url;
                            }
                            else {
                                setTimeout(function () {
                                    exportTileImg.src = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(tileSvg)], { type: 'image/svg+xml' }));
                                }, 300);
                            }
                        }
                        else {
                            imgxHttp.open('GET', tile.children[0].getAttribute('src'), true);
                            imgxHttp.send();
                            exportTileImg.src = tile.children[0].getAttribute('src');
                        }
                    };
                    for (var i = 0; i <= imgTileLength_1 + 1; i++) {
                        _loop_1(i);
                    }
                }
            }
        });
        return promise;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    ImageExport.prototype.getModuleName = function () {
        return 'ImageExport';
    };
    /**
     * To destroy the ImageExport.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ImageExport.prototype.destroy = function () { };
    return ImageExport;
}());
export { ImageExport };
