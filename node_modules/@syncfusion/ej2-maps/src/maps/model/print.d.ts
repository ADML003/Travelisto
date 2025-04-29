import { Maps } from '../../index';
/**
 * This module enables the print functionality in maps.
 *
 * @hidden
 */
export declare class Print {
    /**
     * Constructor for Maps.
     *
     * @param {Maps} control - Specifies the instance of the Maps
     */
    constructor(control: Maps);
    /**
     * To print the Maps.
     *
     * @param {Maps} maps -Specifies the Maps instance.
     * @param {string[] | string | Element} elements - Specifies the element of the Maps
     * @returns {void}
     * @private
     */
    print(maps: Maps, elements?: string[] | string | Element): void;
    /**
     * To get the html string of the Maps.
     *
     * @param {Maps} maps -Specifies the Maps instance.
     * @param {string[] | string | Element} elements - Specifies the html element
     * @returns {Element} - Returns the div element
     * @private
     */
    private getHTMLContent;
    /**
     * Get module name.
     *
     * @returns {string} Returns the module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the print.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
