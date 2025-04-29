import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { Maps } from '@syncfusion/ej2-maps';
export * from '@syncfusion/ej2-maps';

/**
 * Represents the directive to define the layer of the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective></LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
class LayerDirective extends ComplexBase {
}
LayerDirective.moduleName = 'layer';
class LayersDirective extends ComplexBase {
}
LayersDirective.propertyName = 'layers';
LayersDirective.moduleName = 'layers';

/**
 * Represents the directive to configure the selection of the shapes when the maps is initially rendered.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <initialShapeSelectionsDirective>
 * <initialShapeSelectionDirective></initialShapeSelectionDirective>
 * </initialShapeSelectionsDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
class InitialShapeSelectionDirective extends ComplexBase {
}
InitialShapeSelectionDirective.moduleName = 'initialShapeSelection';
class InitialShapeSelectionsDirective extends ComplexBase {
}
InitialShapeSelectionsDirective.propertyName = 'initialShapeSelection';
InitialShapeSelectionsDirective.moduleName = 'initialShapeSelections';

/**
 * Represents the directive to define the markers in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <MarkersDirective>
 * <MarkerDirective></MarkerDirective>
 * </MarkersDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
class MarkerDirective extends ComplexBase {
}
MarkerDirective.moduleName = 'marker';
MarkerDirective.complexTemplate = { 'tooltipSettings.template': 'tooltipSettings.template' };
class MarkersDirective extends ComplexBase {
}
MarkersDirective.propertyName = 'markerSettings';
MarkersDirective.moduleName = 'markers';

/**
 * Represents the directive to define the bubbles in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <BubblesDirective>
 * <BubbleDirective></BubbleDirective>
 * </BubblesDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
class BubbleDirective extends ComplexBase {
}
BubbleDirective.moduleName = 'bubble';
BubbleDirective.complexTemplate = { 'tooltipSettings.template': 'tooltipSettings.template' };
class BubblesDirective extends ComplexBase {
}
BubblesDirective.propertyName = 'bubbleSettings';
BubblesDirective.moduleName = 'bubbles';

/**
 * Represents the directive to define the bubble color mapping in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <BubblesDirective>
 * <ColorMappingsDirective>
 * <ColorMappingDirective></ColorMappingDirective>
 * </ColorMappingsDirective>
 * </BubblesDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
class ColorMappingDirective extends ComplexBase {
}
ColorMappingDirective.moduleName = 'colorMapping';
class ColorMappingsDirective extends ComplexBase {
}
ColorMappingsDirective.propertyName = 'colorMapping';
ColorMappingsDirective.moduleName = 'colorMappings';

/**
 * Represents the directive to define the navigation lines in the maps.
 * ```tsx
 * <MapsComponent>
 * <LayersDirective>
 * <LayerDirective>
 * <NavigationLinesDirective>
 * <NavigationLineDirective></NavigationLineDirective>
 * </NavigationLinesDirective>
 * </LayerDirective>
 * </LayersDirective>
 * </MapsComponent>
 * ```
 */
class NavigationLineDirective extends ComplexBase {
}
NavigationLineDirective.moduleName = 'navigationLine';
NavigationLineDirective.complexTemplate = { 'tooltipSettings.template': 'tooltipSettings.template' };
class NavigationLinesDirective extends ComplexBase {
}
NavigationLinesDirective.propertyName = 'navigationLineSettings';
NavigationLinesDirective.moduleName = 'navigationLines';

/**
 * Represents the directive to define the annotations in the maps.
 * ```tsx
 * <MapsComponent>
 * <AnnotationsDirective>
 * <AnnotationDirective></AnnotationDirective>
 * </AnnotationsDirective>
 * </MapsComponent>
 * ```
 */
class AnnotationDirective extends ComplexBase {
}
AnnotationDirective.moduleName = 'annotation';
class AnnotationsDirective extends ComplexBase {
}
AnnotationsDirective.propertyName = 'annotations';
AnnotationsDirective.moduleName = 'annotations';

/**
 * Represents the React Maps component.
 * It is ideal for rendering maps from GeoJSON data or other map providers like OpenStreetMap, Google Maps, Bing Maps, etc that has rich feature set that includes markers, labels, bubbles and much more.
 * ```tsx
 * <MapsComponent></MapsComponent>
 * ```
 */
class MapsComponent extends Maps {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.directivekeys = { 'layers': { 'layer': { 'initialShapeSelections': 'initialShapeSelection', 'markers': 'marker', 'bubbles': { 'bubble': { 'colorMappings': 'colorMapping' } }, 'navigationLines': 'navigationLine' } }, 'annotations': 'annotation' };
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = false;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(MapsComponent, [ComponentBase, Component]);

export { AnnotationDirective, AnnotationsDirective, BubbleDirective, BubblesDirective, ColorMappingDirective, ColorMappingsDirective, InitialShapeSelectionDirective, InitialShapeSelectionsDirective, LayerDirective, LayersDirective, MapsComponent, MarkerDirective, MarkersDirective, NavigationLineDirective, NavigationLinesDirective };
//# sourceMappingURL=ej2-react-maps.es2015.js.map
