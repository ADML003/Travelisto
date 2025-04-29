import { Maps } from '../maps';
import { Tile } from '../index';
/**
 * Bing map src doc
 */
export declare class BingMap {
    /**
     * map instance
     */
    private maps;
    subDomains: string[];
    imageUrl: string;
    maxZoom: string;
    constructor(maps: Maps);
    getBingMap(tile: Tile, key: string, type: string, language: string, imageUrl: string, subDomains: string[]): string;
    /**
     * @returns {void}
     * @private
     */
    destroy(): void;
}
