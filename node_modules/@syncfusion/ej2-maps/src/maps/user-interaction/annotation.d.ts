import { Maps, Annotation } from '../index';
/**
 * Represents the annotation elements for map.
 */
export declare class Annotations {
    private map;
    constructor(map: Maps);
    renderAnnotationElements(): void;
    /**
     * To create annotation elements.
     *
     * @param {HTMLElement} parentElement - Specifies the parent element in the map.
     * @param {Annotation} annotation -  Specifies the options for customizing the annotation element in maps.
     * @param {number} annotationIndex - Specifies the index of the annotation.
     * @returns {void}
     * @private
     */
    createAnnotationTemplate(parentElement: HTMLElement, annotation: Annotation, annotationIndex: number): void;
    protected getModuleName(): string;
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
