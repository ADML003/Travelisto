import { SVGCanvasAttributes, Size } from '@syncfusion/ej2-svg-base';
import { CircularChart3DBasicTransform, CircularChart3DColorFormat, CircularChart3DLabelElement, CircularChart3DLocation, CircularChart3DPolyAttributes, CircularChart3DPolygon, CircularChart3DStringBuilder, CircularChart3DVector } from '../model/circular3d-base';
import { CircularChart3D } from '../circularchart3d';
import { FontModel } from '../../common/model/base-model';
/**
 * Represents a 3D rendering configuration for the EJ 3D rendering engine.
 *
 */
export declare class CircularChart3DRender {
    transform: CircularChart3DBasicTransform;
    tree: CircularChart3DBspNode[];
}
/**
 * Represents a node in a Binary Space Partitioning (BSP) tree.
 *
 * @interface
 */
interface CircularChart3DBspNode {
    /** The front subtree of the BSP tree. */
    front: CircularChart3DBspNode;
    /** The back subtree of the BSP tree. */
    back: CircularChart3DBspNode;
    /** The splitting plane associated with the node. */
    plane: CircularChart3DPolygon;
}
/**
 * Represents a circular 3D vector in space.
 */
export declare class CircularChart3DVectorModule {
    /** The x-coordinate of the vector. */
    x: number;
    /** The y-coordinate of the vector. */
    y: number;
    /** The z-coordinate of the vector. */
    z: number;
    /** A small value used for epsilon comparisons to handle floating-point inaccuracies.*/
    private epsilon;
    /**
     * Checks if a vector is valid (not NaN for any component).
     *
     * @param {CircularChart3DVector} point - The vector to check.
     * @returns {boolean} - True if the vector is valid, false otherwise.
     */
    isValid(point: CircularChart3DVector): boolean;
    /**
     * Constructs a new Vector3D instance.
     *
     * @constructor
     * @param {number | { x: number, y: number }} pointX - Either an object with x and y properties or the x-coordinate.
     * @param {number} [vy] - The y-coordinate (if the first parameter is a number).
     * @param {number} [vz] - The z-coordinate (if the first parameter is a number).
     */
    constructor(pointX: {
        x: number;
        y: number;
    } | number, vy?: number, vz?: number);
    /**
     * Creates a new Vector3D instance from provided coordinates.
     *
     * @param {number | { x: number, y: number }} vx - Either an object with x and y properties or the x-coordinate.
     * @param {number} vy - The y-coordinate.
     * @param {number} vz - The z-coordinate.
     * @returns {CircularChart3DVector} - The new Vector3D instance.
     */
    vector3D(vx: {
        x: number;
        y: number;
    } | number, vy: number, vz: number): CircularChart3DVector;
    /**
     * Subtracts one vector from another and returns the result.
     *
     * @param {CircularChart3DVector} v1 - The first vector.
     * @param {CircularChart3DVector} v2 - The second vector to subtract from the first.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    vector3DMinus(v1: CircularChart3DVector, v2: CircularChart3DVector): CircularChart3DVector;
    /**
     * Adds two vectors and returns the result.
     *
     * @param {CircularChart3DVector} v1 - The first vector.
     * @param {CircularChart3DVector} v2 - The second vector to add to the first.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    vector3DPlus(v1: CircularChart3DVector, v2: CircularChart3DVector): CircularChart3DVector;
    /**
     * Multiplies two vectors using the cross product and returns the result.
     *
     * @param {CircularChart3DVector} v1 - The first vector.
     * @param {CircularChart3DVector} v2 - The second vector.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    vector3DMultiply(v1: CircularChart3DVector, v2: CircularChart3DVector): CircularChart3DVector;
    /**
     * Calculates the dot product of two vectors.
     *
     * @param {CircularChart3DVector} v1 - The first vector.
     * @param {CircularChart3DVector} v2 - The second vector.
     * @returns {number} - The dot product.
     */
    vector3DAdd(v1: CircularChart3DVector, v2: CircularChart3DVector): number;
    /**
     * Multiplies a vector by a scalar value.
     *
     * @param {CircularChart3DVector} v1 - The vector to multiply.
     * @param {number} value - The scalar value.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    vector3DStarMultiply(v1: CircularChart3DVector, value: number): CircularChart3DVector;
    /**
     * Calculates the length of a vector.
     *
     * @param {CircularChart3DVector} vector - The vector to calculate the length of.
     * @returns {number} - The length of the vector.
     */
    getLength(vector: CircularChart3DVector): number;
    /**
     * Calculates the normal vector of a triangle defined by three vectors.
     *
     * @param {CircularChart3DVector} v1 - The first vertex of the triangle.
     * @param {CircularChart3DVector} v2 - The second vertex of the triangle.
     * @param {CircularChart3DVector} v3 - The third vertex of the triangle.
     * @returns {CircularChart3DVector} - The normal vector of the triangle.
     */
    getNormal(v1: CircularChart3DVector, v2: CircularChart3DVector, v3: CircularChart3DVector): CircularChart3DVector;
}
/**
 * Represents a 3x3 or 4x4 matrix in 3D space and provides various matrix operations.
 *
 */
export declare class CircularChart3DMatrix {
    /** The size of the matrix, which is set to 4 by default. */
    private matrixSize;
    /**
     * Generates a 3D matrix of the specified size.
     *
     * @param {number} size - The size of the 3D matrix.
     * @returns {number[][]} - The generated 3D matrix.
     * @private
     */
    matrix3D(size: number): number[][];
    /**
     * Checks if a matrix is an affine matrix.
     *
     * @param {number[][]} matrixData - The matrix to check.
     * @returns {boolean} - True if the matrix is an affine matrix, false otherwise.
     */
    isAffine(matrixData: number[][]): boolean;
    /**
     * Creates a new array with zeros.
     *
     * @param {number} initialSize - The size of the array.
     * @returns {number[]} - The created array.
     */
    createArray(initialSize: number): number[];
    /**
     * Gets the identity matrix.
     *
     * @returns {number[][]} - The identity matrix.
     */
    getIdentity(): number[][];
    /**
     * Gets the interval of a matrix.
     *
     * @param {number[][]} matrix - The matrix to get the interval for.
     * @returns {number[][]} - The interval matrix.
     */
    getInterval(matrix: number[][]): number[][];
    /**
     * Multiplies all elements of a matrix by a factor.
     *
     * @param {number} factor - The factor to multiply with.
     * @param {number[][]} matrix - The matrix to multiply.
     * @returns {number[][]} - The resulting matrix.
     */
    getMatrixMultiple(factor: number, matrix: number[][]): number[][];
    /**
     * Multiplies a matrix by a vector.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {CircularChart3DVector} point - The vector to multiply with.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    getMatrixVectorMultiple(matrix: number[][], point: CircularChart3DVector): CircularChart3DVector;
    /**
     * Multiplies two matrices.
     *
     * @param {number[][]} matrix1 - The first matrix.
     * @param {number[][]} matrix2 - The second matrix.
     * @returns {number[][]} - The resulting matrix.
     */
    getMatrixMultiplication(matrix1: number[][], matrix2: number[][]): number[][];
    /**
     * Gets the minor of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {number} columnIndex - The column index.
     * @param {number} rowIndex - The row index.
     * @returns {number} - The minor of the matrix.
     * @private
     */
    getMinor(matrix: number[][], columnIndex: number, rowIndex: number): number;
    /**
     * Gets a submatrix of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {number} columnIndex - The column index.
     * @param {number} rowIndex - The row index.
     * @returns {number[][]} - The submatrix.
     */
    getMatrix(matrix: number[][], columnIndex: number, rowIndex: number): number[][];
    /**
     * Gets the determinant of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @returns {number} - The determinant of the matrix.
     */
    getDeterminant(matrix: number[][]): number;
    /**
     * Transforms a matrix by translation.
     *
     * @param {number} x - The x-coordinate of the translation.
     * @param {number} y - The y-coordinate of the translation.
     * @param {number} z - The z-coordinate of the translation.
     * @returns {number[][]} - The transformed matrix.
     */
    transform(x: number, y: number, z: number): number[][];
    /**
     * Creates a matrix for rotation around the y-axis.
     *
     * @param {number} angle - The angle of rotation.
     * @returns {number[][]} - The rotation matrix.
     * @private
     */
    turn(angle: number): number[][];
    /**
     * Creates a matrix for rotation around the x-axis.
     *
     * @param {number} angle - The angle of rotation.
     * @returns {number[][]} - The rotation matrix.
     */
    tilt(angle: number): number[][];
    /**
     * Transposes a matrix.
     *
     * @param {number[][]} matrix3D - The matrix to transpose.
     * @returns {number[][]} - The transposed matrix.
     */
    transposed(matrix3D: number[][]): number[][];
}
/**
 * Represents a 3D chart transformation utility that provides methods for transforming
 * and projecting 3D coordinates onto a 2D screen.
 *
 */
export declare class CircularChart3DTransform {
    /** Represents the angle conversion factor from degrees to radians. */
    private toRadial;
    /** Represents a 3D vector for performing vector operations. */
    private vector;
    /** Represents a 3D matrix for performing matrix operations. */
    private matrixObj;
    /**
     * Initializes a new instance of the `ChartTransform` class.
     */
    constructor();
    /**
     * Creates a 3D transformation based on the specified size.
     *
     * @param {Size} size - The size of the viewing area.
     * @returns {CircularChart3DBasicTransform} - The 3D transformation.
     */
    transform3D(size: Size): CircularChart3DBasicTransform;
    /**
     * Applies the specified 3D transformation to the current state.
     *
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation to apply.
     * @returns {void} - The 3D transformation.
     */
    transform(transform: CircularChart3DBasicTransform): void;
    /**
     * Updates the perspective matrix based on the specified angle.
     *
     * @param {number} angle - The perspective angle.
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    private updatePerspective;
    /**
     * Converts degrees to radians.
     *
     * @param {number} angle - The angle in degrees.
     * @returns {number} - The angle in radians.
     * @private
     */
    private degreeToRadianConverter;
    /**
     * Transforms a 3D vector to screen coordinates based on the current state.
     *
     * @param {CircularChart3DVector} vector3D - The 3D vector to transform.
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @param {CircularChart3DMatrix} chartObj - Optional custom matrix object for transformation.
     * @returns {CircularChart3DLocation} - The screen coordinates.
     */
    toScreen(vector3D: CircularChart3DVector, transform: CircularChart3DBasicTransform, chartObj?: CircularChart3DMatrix): CircularChart3DLocation;
    /**
     * Sets the view matrix in the transformation state.
     *
     * @param {number[][]} matrix - The new view matrix.
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    private setViewMatrix;
    /**
     * Calculates the final result matrix based on the current state.
     *
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @param {CircularChart3DMatrix} matrixobj - Optional custom matrix object for transformation.
     * @returns {number[][]} - The final result matrix.
     */
    result(transform: CircularChart3DBasicTransform, matrixobj?: CircularChart3DMatrix): number[][];
    /**
     * Sets the center in the transformation state.
     *
     * @param {CircularChart3DVector} center - The new center vector.
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    private setCenter;
}
/**
 * Represents a 3D graphics rendering utility for drawing and managing 3D elements in a chart.
 *
 */
export declare class CircularChart3DGraphics {
    /** The vector class. */
    private vector;
    /**
     * Prepares the view for rendering based on specified parameters.
     *
     * @param {number} perspectiveAngle - The perspective angle.
     * @param {number} depth - The depth of the view.
     * @param {number} rotation - The rotation angle.
     * @param {number} tilt - The tilt angle.
     * @param {Size} size - The size of the viewing area.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    prepareView(perspectiveAngle: number, depth: number, rotation: number, tilt: number, size: Size, chart: CircularChart3D): void;
    /**
     * Renders the 3D view on the specified panel element.
     *
     * @param {Element} panel - The panel element to render the view on.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @param {number} rotation - The rotation angle.
     * @param {number} tilt - The tilt angle.
     * @param {Size} size - The size of the viewing area.
     * @param {number} perspectiveAngle - The perspective angle.
     * @param {number} depth - The depth of the view.
     * @returns {void}
     */
    view(panel?: Element, chart?: CircularChart3D, rotation?: number, tilt?: number, size?: Size, perspectiveAngle?: number, depth?: number): void;
    /**
     * Draws a 3D element based on the specified Binary Space Partitioning Node.
     *
     * @param {CircularChart3DBspNode} bspElement - The Binary Space Partitioning Node representing the 3D element.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    draw3DElement(bspElement: CircularChart3DBspNode, chart: CircularChart3D): void;
    /**
     * Draws the 3D nodes starting from the root based on the eye vector.
     *
     * @param {CircularChart3DBspNode} bspElement - The root Binary Space Partitioning Node.
     * @param {CircularChart3DVector} eyeVector - The eye vector.
     * @param {Element} panel - The panel element to render the view on.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    drawNode3D(bspElement: CircularChart3DBspNode, eyeVector: CircularChart3DVector, panel: Element, chart: CircularChart3D): void;
}
/**
 * Represents a binary tree builder for 3D polygons in a circular 3D chart.
 *
 */
export declare class CircularChart3DBinaryTreeBuilder {
    /** A small value used for epsilon comparisons to handle floating-point inaccuracies.*/
    private epsilon;
    /** The circular 3D chart. */
    private chart;
    constructor(chart?: CircularChart3D);
    /**
     * Gets the next index considering the array length and the current index.
     *
     * @param {number} index - The current index.
     * @param {number} count - The length of the array.
     * @returns {number} - The next index.
     */
    getNext(index: number, count: number): number;
    /**
     * Creates a PolyAttributes object based on the vector, index, and result.
     *
     * @param {CircularChart3DVector} point - The vector representing the point.
     * @param {number} index - The index of the point.
     * @param {string} result - The result classification.
     * @returns {CircularChart3DPolyAttributes} - The created PolyAttributes object.
     */
    vector3DIndexClassification(point: CircularChart3DVector, index: number, result: string): CircularChart3DPolyAttributes;
    /**
     * Classifies a point relative to a polygon.
     *
     * @param {CircularChart3DVector} point - The point to classify.
     * @param {CircularChart3DPolygon} polygon - The polygon for classification.
     * @returns {string} - The classification result ('OnPlane', 'OnBack', 'OnFront').
     */
    classifyPoint(point: CircularChart3DVector, polygon: CircularChart3DPolygon): string;
    /**
     * Classifies a polygon relative to another polygon.
     *
     * @param {CircularChart3DPolygon} refPolygon - The reference polygon.
     * @param {CircularChart3DPolygon} classPolygon - The polygon to classify.
     * @returns {string} - The classification result ('OnPlane', 'ToRight', 'ToLeft', 'Unknown').
     */
    classifyPolygon(refPolygon: CircularChart3DPolygon, classPolygon: CircularChart3DPolygon): string;
    /**
     * Splits a polygon into two parts based on another polygon.
     *
     * @param {CircularChart3DPolygon} splitPolygon - The polygon to split.
     * @param {CircularChart3DPolygon} refPolygon - The reference polygon for splitting.
     * @returns {CircularChart3DPolyCollections} - The resulting back and front parts.
     */
    private splitPolygon;
    /**
     * Cuts out the front part of a polygon based on the PolyAttributes.
     *
     * @param {CircularChart3DPolyAttributes[]} polyPoints - The polyAttributes array of the polygon.
     * @param {CircularChart3DPolyAttributes} initialVertex - The polyAttributes representing the cutting point.
     * @returns {CircularChart3DVector[]} - The resulting points of the front part.
     */
    private cutOutFrontPolygon;
    /**
     * Cuts out the back part of a polygon based on the PolyAttributes.
     *
     * @param {CircularChart3DPolyAttributes[]} polyPoints - The PolyAttributes array of the polygon.
     * @param {CircularChart3DPolyAttributes} initialVertex - The PolyAttributes representing the cutting point.
     * @returns {CircularChart3DVector[]} - The resulting points of the back part.
     */
    private cutOutBackPolygon;
    /**
     * Builds a binary space partitioning from a list of polygons.
     *
     * @param {CircularChart3DPolygon[]} [points] - The list of polygons to build the tree from.
     * @param {CircularChart3D} [chart] - The circular 3D chart.
     * @returns {CircularChart3DBspNode} - The root node of the Binary Space Partitioning tree.
     */
    build(points?: CircularChart3DPolygon[], chart?: CircularChart3D): CircularChart3DBspNode;
}
/**
 * The CircularChart3DSvgRenderer class provides methods for rendering SVG graphics in a 3D context.
 */
export declare class CircularChart3DSvgRenderer {
    /**
     * Gets a CircularChart3DStringBuilder instance for constructing strings.
     *
     * @returns {CircularChart3DStringBuilder} - The StringBuilder instance.
     */
    getStringBuilder(): CircularChart3DStringBuilder;
    /**
     * Parses a hex color code and returns its Red green Blue values.
     *
     * @param {string} hexColorCode - The hex color code.
     * @returns {CircularChart3DColorFormat | null} - The parsed color format (Red green Blue) or null if parsing fails.
     */
    hexToValue(hexColorCode: string): CircularChart3DColorFormat | null;
    /**
     * Draws text on an SVG element.
     *
     * @param {SVGCanvasAttributes} options - The options for drawing the text.
     * @param {string | string[]} label - The text label.
     * @param {FontModel} font - The font settings for the text.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {Element} - The created SVG text element.
     */
    drawText(options: SVGCanvasAttributes, label: string | string[], font: FontModel, chart: CircularChart3D): Element;
    /**
     * Converts a CircularChart3DColorFormat object to its corresponding color string.
     *
     * @param {CircularChart3DColorFormat} color - The color in CircularChart3DColorFormat.
     * @returns {string} - The color string representation.
     */
    hexColor(color: CircularChart3DColorFormat): string;
    /**
     * Checks if a given color string is in a valid format (hex or rgba).
     *
     * @param {string} color - The color string to check.
     * @returns {boolean} - True if the color string is valid, otherwise false.
     */
    checkColorFormat(color: string): boolean;
}
/**
 * Represents a 3D polygon in a circular 3D chart.
 *
 */
export declare class CircularChart3DPolygonModule {
    private epsilon;
    private normal;
    private vector;
    private vectorPoints;
    private d;
    private matrixObj;
    /**
     * Creates a 3D polygon.
     *
     * @param {CircularChart3DVector[]} [points] - An array of 3D vectors representing points on the polygon.
     * @param {CircularChart3DPolygon} [tag] - Additional information or metadata for the polygon.
     * @param {number} [index] - An index associated with the polygon.
     * @param {string} [stroke] - The stroke color of the polygon.
     * @param {number} [strokeThickness] - The thickness of the polygon's stroke.
     * @param {number} [opacity] - The opacity of the polygon.
     * @param {string} [fill] - The fill color of the polygon.
     * @param {string} [name] - The name or identifier of the polygon.
     * @param {Element} [parent] - The parent element to which the polygon belongs.
     * @param {string} [text] - Additional text associated with the polygon.
     * @returns {CircularChart3DPolygon} - Returns the created polygon.
     */
    polygon3D(points?: CircularChart3DVector[], tag?: CircularChart3DPolygon, index?: number, stroke?: string, strokeThickness?: number, opacity?: number, fill?: string, name?: string, parent?: Element, text?: string): CircularChart3DPolygon;
    /**
     * Calculates the normal vector for a 3D polygon based on the provided points.
     *
     * @param {...CircularChart3DVector} args - Variable number of vector3D arguments representing points of the polygon.
     * @returns {void}
     */
    calculateNormal(...args: any[]): void;
    /**
     * Tests whether the calculated normal vector is valid.
     *
     * @returns {boolean} - Returns true if the normal vector is valid, false otherwise.
     */
    test(): boolean;
    /**
     * Gets the normal vector based on the transformed points using the specified transformation matrix.
     *
     * @param {number[][]} transform - The transformation matrix.
     * @param {CircularChart3DVector[]} [vectorPoints] - The vector points.
     * @returns {CircularChart3DVector} - Returns the normal vector.
     * @private
     */
    getNormal(transform: number[][], vectorPoints?: CircularChart3DVector[]): CircularChart3DVector;
    /**
     * Creates a text element in the context of a circular 3D chart.
     *
     * @param {CircularChart3DVector} position - The position of the text.
     * @param {CircularChart3DLabelElement} element - The text element to be created.
     * @param {number} xLength - The x value for the text element.
     * @param {number} yLength - The y value for the text element.
     * @returns {CircularChart3DPolygon} - Returns the polygon representing the created text element.
     */
    createTextElement(position: CircularChart3DVector, element: CircularChart3DLabelElement, xLength: number, yLength: number): CircularChart3DPolygon;
    /**
     * Creates a 3D polyline by connecting a series of points in 3D space.
     *
     * @param {Array<{ x: number; y: number; z?: number }>} points - An array of points in 3D space, specified by their x, y, and optional z coordinates.
     * @param {CircularChart3DLabelElement} element - The circular 3D label element associated with the polyline.
     * @returns {CircularChart3DPolygon} - The resulting 3D polyline with the specified circular 3D label element and vertices.
     */
    createPolyline(points: {
        x: number;
        y: number;
        z?: number;
    }[], element: CircularChart3DLabelElement): CircularChart3DPolygon;
    /**
     * Creates a 3D polygon by connecting a series of points in 3D space.
     *
     * @param {CircularChart3DLabelElement} element - The circular 3D label element associated with the polygon.
     * @param {Array<{ x: number; y: number; z?: number }>} points - An array of points in 3D space, specified by their x, y, and optional z coordinates.
     * @returns {CircularChart3DPolygon} - The resulting 3D polygon with the specified circular 3D label element and vertices.
     */
    private polyLine3D;
    /**
     * Creates a 3D text polygon based on the given label element and points.
     *
     * @param {CircularChart3DLabelElement} element - The label element associated with the text.
     * @param {CircularChart3DVector[]} points - The array of 3D vector points defining the position of the text in 3D space.
     * @returns {CircularChart3DPolygon} - Returns the created 3D text polygon.
     */
    text3D(element: CircularChart3DLabelElement, points: CircularChart3DVector[]): CircularChart3DPolygon;
    /**
     * Draws a polyline on the circular 3D chart panel.
     *
     * @param {CircularChart3DPolygon} panel - The polygon panel on which to draw the polyline.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     */
    drawPolyLine(panel: CircularChart3DPolygon, chart: CircularChart3D): void;
    /**
     * Draws a data label symbol for a specific data point in a circular 3D series.
     *
     * @param {CircularChart3DPolygon} panel - The 3D polygon representing the panel on which the text will be drawn.
     * @param {CircularChart3D} chart - The 3D chart to which the panel belongs.
     * @returns {void}
     */
    drawText(panel: CircularChart3DPolygon, chart: CircularChart3D): void;
    /**
     * Draws a data label symbol for a specific data point in a circular 3D series.
     *
     * @param {number} seriesIndex - The index of the series to which the data point belongs.
     * @param {CircularChart3DSeries} series - The circular 3D series containing the data point.
     * @param {CircularChart3DLabelElement} dataElement - The index of the data point within the series.
     * @param {number} x - The x-coordinate of the center of the symbol.
     * @param {number} y - The y-coordinate of the center of the symbol.
     * @param {number} width - The width of the symbol.
     * @param {number} height - The height of the symbol.
     * @param {CircularChart3D} chart - The circular 3D chart containing the series.
     * @returns {void}
     */
    private dataLabelSymbol;
    /**
     * Draws a circular 3D polygon on the specified chart.
     *
     * @param {CircularChart3DPolygon} panel - The polygon to be drawn.
     * @param {CircularChart3D} chart - The circular 3D chart on which the polygon is to be drawn.
     * @returns {void}
     */
    draw(panel: CircularChart3DPolygon, chart: CircularChart3D): void;
    /**
     * Draws text on the specified circular 3D chart panel.
     *
     * @param {CircularChart3DPolygon} panel - The circular 3D polygon representing the panel on which the text will be drawn.
     * @param {CircularChart3D} chart - The circular 3D chart to which the panel belongs.
     * @returns {void}
     */
    drawTemplate(panel: CircularChart3DPolygon, chart: CircularChart3D): void;
    /**
     * Applies a lightening effect to the given color by reducing its red, green, and blue components.
     *
     * @param {string} color - The input color in hexadecimal format.
     * @param {CircularChart3D} chart - The circular 3D chart associated with the color.
     * @returns {string} - The lightened color in hexadecimal format.
     */
    applyXLight(color: string, chart: CircularChart3D): string;
    /**
     * Applies a lightening effect to the given color by reducing its red, green, and blue components with a focus on the Z-axis.
     *
     * @param {string} color - The input color in hexadecimal format.
     * @param {CircularChart3D} chart - The circular 3D chart associated with the color.
     * @returns {string} - The lightened color in hexadecimal format.
     */
    applyZLight(color: string, chart: CircularChart3D): string;
}
export {};
