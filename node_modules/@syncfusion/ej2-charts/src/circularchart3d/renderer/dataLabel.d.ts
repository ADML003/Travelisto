/**
 * Circular 3D chart data label.
 */
import { ChildProperty } from '@syncfusion/ej2-base';
import { CircularChart3DLabelPosition } from '../model/enum';
import { BorderModel } from '../../common/model/base-model';
import { CircularChart3DPoints, CircularChart3DSeries } from './series';
import { CircularChart3D } from '../circularchart3d';
import { CircularChart3DTextRenderEventArgs } from '../model/pie-interface';
import { CircularChart3DConnectorModel, CircularChart3DDataLabelFontModel, CircularChart3DDataLabelSettingsModel } from './dataLabel-model';
import { CircularChart3DLocation } from '../model/circular3d-base';
/**
 * Configures the fonts in the circular 3D data label.
 */
export declare class CircularChart3DDataLabelFont extends ChildProperty<CircularChart3DDataLabelFont> {
    /**
     * Specifies the font style for the text.
     *
     * @default 'Normal'
     */
    fontStyle: string;
    /**
     * Specifies the font size for the text.
     *
     * @default '16px'
     */
    size: string;
    /**
     * Specifies the font weight for the text.
     *
     * @default 'Normal'
     */
    fontWeight: string;
    /**
     * Specifies the color for the text.
     *
     * @default ''
     */
    color: string;
    /**
     * Specifies the font family for the text.
     */
    fontFamily: string;
    /**
     * Specifies the opacity for the text.
     *
     * @default 1
     */
    opacity: number;
}
/**
 * Defines the appearance of the connector line for the circular 3D chart.
 */
export declare class CircularChart3DConnector extends ChildProperty<CircularChart3DConnector> {
    /**
     * Specifies the color of the connector line.
     *
     * @default null
     */
    color: string;
    /**
     * Specifies the width of the connector line in pixels.
     *
     * @default 1
     */
    width: number;
    /**
     * Specifies the length of the connector line in pixels.
     *
     * @default null
     */
    length: string;
    /**
     * Specifies the dash array pattern for the connector line.
     *
     * @default ''
     */
    dashArray: string;
}
/**
 * Configures the data label settings for circular 3D chart.
 */
export declare class CircularChart3DDataLabelSettings extends ChildProperty<CircularChart3DDataLabelSettings> {
    /**
     * If set true, data label for series gets render.
     *
     * @default false
     */
    visible: boolean;
    /**
     * The DataSource field which contains the data label value.
     *
     * @default null
     */
    name: string;
    /**
     * The background color of the data label, which accepts value in hex, rgba as a valid CSS color string.
     *
     * @default 'transparent'
     */
    fill: string;
    /**
     * Specifies the position of data label. They are.
     * * Outside - Places label outside the point.
     * * Inside - Places label inside the point.
     *
     * @default 'Inside'
     */
    position: CircularChart3DLabelPosition;
    /**
     * Specifies angle for data label.
     *
     * @default 0
     */
    angle: number;
    /**
     * Specifies whether rotation is enabled for data labels.
     *
     * @default false
     */
    enableRotation: boolean;
    /**
     * Options for customizing the border lines.
     */
    border: BorderModel;
    /**
     * Options for customizing the data label text.
     */
    font: CircularChart3DDataLabelFontModel;
    /**
     * Options for customize the connector line in series.
     */
    connectorStyle: CircularChart3DConnectorModel;
    /**
     * Custom template to format the data label content. Use ${point.x} and ${point.y} as a placeholder
     * text to display the corresponding data point.
     *
     * @default null
     * @aspType string
     */
    template: string | Function;
    /**
     * Used to format the data label that accepts any global string format like 'C', 'n1', 'P' etc.
     * It also accepts placeholder like '{value}°C' in which value represent the data label, e.g, 20°C.
     *
     * @default ''
     */
    format: string;
}
/**
 * The 'CircularChartDataLabel3D' module used to render dataLabel in circular 3D charts.
 */
export declare class CircularChartDataLabel3D extends ChildProperty<CircularChartDataLabel3D> {
    /**
     * Renders data labels for a circular 3D series on the given chart.
     *
     * @param {CircularChart3DSeries} series - The circular 3D series for which data labels are to be rendered.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     * @private
     */
    renderDataLabel(series: CircularChart3DSeries, chart: CircularChart3D): void;
    /**
     * Creates a data label template for a specific data point in a 3D series.
     *
     * @param {HTMLElement} parentElement - The parent HTML element to which the data label template is attached.
     * @param {CircularChart3DSeries} series - The 3D series to which the data point belongs.
     * @param {CircularChart3DDataLabelSettingsModel} dataLabel - The style settings for data labels.
     * @param {CircularChart3DPoints} point - The data point for which the data label template is created.
     * @param {CircularChart3DTextRenderEventArgs} data - The text render event arguments.
     * @param {number} labelIndex - The index of the data label.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {CircularChart3DLocation} location - The location values for the data label.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     * @private
     */
    createDataLabelTemplate(parentElement: HTMLElement, series: CircularChart3DSeries, dataLabel: CircularChart3DDataLabelSettingsModel, point: CircularChart3DPoints, data: CircularChart3DTextRenderEventArgs, labelIndex: number, redraw: boolean, location: CircularChart3DLocation, chart: CircularChart3D): void;
    /**
     * Calculates the size of a data label template for a specific data point in a 3D series.
     *
     * @param {HTMLElement} parentElement - The parent HTML element containing the data label template.
     * @param {HTMLElement} childElement - The child HTML element representing the data label template.
     * @param {CircularChart3DPoints} point - The data point for which the data label template size is calculated.
     * @param {CircularChart3DSeries} series - The circular 3D series to which the data point belongs.
     * @param {CircularChart3DDataLabelSettingsModel} dataLabel - The style for data labels.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {CircularChart3DLocation} location - The location values for the data label.
     * @param {boolean} isReactCallback - Indicates whether the callback is associated with React.
     * @returns {void}
     */
    private calculateTemplateLabelSize;
    /**
     * Creates a template element for rendering data labels associated with a specific data point in a 3D series.
     *
     * @param {HTMLElement} childElement - The child HTML element to contain the template content.
     * @param {string | Function} content - The content or function for the data label template.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @param {CircularChart3DPoints} point - The data point for which the template is created (optional).
     * @param {CircularChart3DSeries} series - The 3D series to which the data point belongs (optional).
     * @param {string} dataLabelId - The ID for the data label element (optional).
     * @returns {HTMLElement} - The created template element.
     */
    private createTemplate;
    /**
     * Draws a 3D data label for a circular 3D series.
     * This method is responsible for drawing a 3D data label for a circular 3D series.
     *
     * @param {CircularChart3DSeries} series - The CircularChart3DSeries to which the data label belongs.
     * @param {number} pointIndex - The index of the data label point in the series.
     * @param  {CircularChart3DPoints} point - The CircularChart3DPoints representing the 3D point of the data label.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    private draw3DDataLabel;
    /**
     * To find saturated color for datalabel.
     *
     * @param {CircularChart3DPoints} point - The point to get the color saturation.
     * @param {string} color - The color to be saturated.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {string} - The saturated color computed for the data label.
     */
    private getSaturatedColor;
    /**
     * To find background color for the datalabel.
     *
     * @param {CircularChart3DPoints} point - The point to get the color saturation.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {string} - The background color computed for the data label.
     */
    private getLabelBackground;
    /**
     * Gets the data label text based on a specified format, chart configuration, and input label text.
     *
     * @param {string} labelFormat - The format string for the data label.
     * @param {CircularChart3D} chart - The Circular 3D chart instance.
     * @param {string} labelText - The original label text to be formatted.
     * @returns {string} - The formatted data label text.
     */
    private getDatalabelText;
    /**
     * Updates the connector line for a 3D point in a circular 3D series.
     *
     * @param {CircularChart3DPoints} point - The CircularChart3DPoints representing the 3D point.
     * @param {number} pointIndex - The index of the point in the series.
     * @param {CircularChart3DSeries} series - The instance of the circular 3D series.
     * @param {number} connectorHeight - The height of the connector line.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    private updateConnectorLine;
    /**
     * Draws a line segment based on the provided points in 3D space for the circular 3D series.
     *
     * @param {CircularChart3DLocation[]} drawpoints - An array of CircularChart3DLocation representing the points in 3D space.
     * @param {number} pointIndex - The index of the point in the series.
     * @param {CircularChart3DSeries} series - The instance of the circular 3D series to which the point belongs.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {void}
     */
    private drawLineSegment;
    /**
     * Gets the module name for the circular 3D data label.
     *
     * @returns {string} - The module name, which is 'CircularChartDataLabel3D'.
     */
    protected getModuleName(): string;
    /**
     * Destroys the circular 3D chart data label.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
