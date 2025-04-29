var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { measureText } from '@syncfusion/ej2-svg-base';
import { appendChildElement, colorNameToHex } from '../../common/utils/helper';
/**
 * Represents a 3D rendering configuration for the EJ 3D rendering engine.
 *
 */
var CircularChart3DRender = /** @class */ (function () {
    function CircularChart3DRender() {
        this.transform = null; // Chart3DBasicTransform
    }
    return CircularChart3DRender;
}());
export { CircularChart3DRender };
var circular3DRender = new CircularChart3DRender();
/**
 * Represents a circular 3D vector in space.
 */
var CircularChart3DVectorModule = /** @class */ (function () {
    /**
     * Constructs a new Vector3D instance.
     *
     * @constructor
     * @param {number | { x: number, y: number }} pointX - Either an object with x and y properties or the x-coordinate.
     * @param {number} [vy] - The y-coordinate (if the first parameter is a number).
     * @param {number} [vz] - The z-coordinate (if the first parameter is a number).
     */
    function CircularChart3DVectorModule(pointX, vy, vz) {
        /** The x-coordinate of the vector. */
        this.x = 0;
        /** The y-coordinate of the vector. */
        this.y = 0;
        /** The z-coordinate of the vector. */
        this.z = 0;
        /** A small value used for epsilon comparisons to handle floating-point inaccuracies.*/
        this.epsilon = 0.00001;
        this.x = pointX;
        this.y = vy || 0;
        this.z = vz || 0;
    }
    /**
     * Checks if a vector is valid (not NaN for any component).
     *
     * @param {CircularChart3DVector} point - The vector to check.
     * @returns {boolean} - True if the vector is valid, false otherwise.
     */
    CircularChart3DVectorModule.prototype.isValid = function (point) {
        return !isNaN(point.x) && !isNaN(point.y) && !isNaN(point.z);
    };
    /**
     * Creates a new Vector3D instance from provided coordinates.
     *
     * @param {number | { x: number, y: number }} vx - Either an object with x and y properties or the x-coordinate.
     * @param {number} vy - The y-coordinate.
     * @param {number} vz - The z-coordinate.
     * @returns {CircularChart3DVector} - The new Vector3D instance.
     */
    CircularChart3DVectorModule.prototype.vector3D = function (vx, vy, vz) {
        this.x = vx;
        this.y = vy;
        this.z = vz;
        return { x: this.x, y: this.y, z: this.z };
    };
    /**
     * Subtracts one vector from another and returns the result.
     *
     * @param {CircularChart3DVector} v1 - The first vector.
     * @param {CircularChart3DVector} v2 - The second vector to subtract from the first.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    CircularChart3DVectorModule.prototype.vector3DMinus = function (v1, v2) {
        return this.vector3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    };
    /**
     * Adds two vectors and returns the result.
     *
     * @param {CircularChart3DVector} v1 - The first vector.
     * @param {CircularChart3DVector} v2 - The second vector to add to the first.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    CircularChart3DVectorModule.prototype.vector3DPlus = function (v1, v2) {
        return this.vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    };
    /**
     * Multiplies two vectors using the cross product and returns the result.
     *
     * @param {CircularChart3DVector} v1 - The first vector.
     * @param {CircularChart3DVector} v2 - The second vector.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    CircularChart3DVectorModule.prototype.vector3DMultiply = function (v1, v2) {
        var x = v1.y * v2.z - v2.y * v1.z;
        var y = v1.z * v2.x - v2.z * v1.x;
        var z = v1.x * v2.y - v2.x * v1.y;
        return this.vector3D(x, y, z);
    };
    /**
     * Calculates the dot product of two vectors.
     *
     * @param {CircularChart3DVector} v1 - The first vector.
     * @param {CircularChart3DVector} v2 - The second vector.
     * @returns {number} - The dot product.
     */
    CircularChart3DVectorModule.prototype.vector3DAdd = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    };
    /**
     * Multiplies a vector by a scalar value.
     *
     * @param {CircularChart3DVector} v1 - The vector to multiply.
     * @param {number} value - The scalar value.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    CircularChart3DVectorModule.prototype.vector3DStarMultiply = function (v1, value) {
        var x = v1.x * value;
        var y = v1.y * value;
        var z = v1.z * value;
        return this.vector3D(x, y, z);
    };
    /**
     * Calculates the length of a vector.
     *
     * @param {CircularChart3DVector} vector - The vector to calculate the length of.
     * @returns {number} - The length of the vector.
     */
    CircularChart3DVectorModule.prototype.getLength = function (vector) {
        var sqt = this.vector3DAdd(vector, vector);
        return Math.sqrt(sqt);
    };
    /**
     * Calculates the normal vector of a triangle defined by three vectors.
     *
     * @param {CircularChart3DVector} v1 - The first vertex of the triangle.
     * @param {CircularChart3DVector} v2 - The second vertex of the triangle.
     * @param {CircularChart3DVector} v3 - The third vertex of the triangle.
     * @returns {CircularChart3DVector} - The normal vector of the triangle.
     */
    CircularChart3DVectorModule.prototype.getNormal = function (v1, v2, v3) {
        var vector4 = this.vector3DMinus(v1, v2);
        var vector5 = this.vector3DMinus(v3, v2);
        var n = this.vector3DMultiply(vector4, vector5);
        var length = this.getLength(n);
        if (length < this.epsilon) {
            return this.vector3D(0, 0, 0);
        }
        return this.vector3D(n.x / length, n.y / length, n.z / length);
    };
    return CircularChart3DVectorModule;
}());
export { CircularChart3DVectorModule };
/**
 * Represents a 3x3 or 4x4 matrix in 3D space and provides various matrix operations.
 *
 */
var CircularChart3DMatrix = /** @class */ (function () {
    function CircularChart3DMatrix() {
        /** The size of the matrix, which is set to 4 by default. */
        this.matrixSize = 4;
    }
    /**
     * Generates a 3D matrix of the specified size.
     *
     * @param {number} size - The size of the 3D matrix.
     * @returns {number[][]} - The generated 3D matrix.
     * @private
     */
    CircularChart3DMatrix.prototype.matrix3D = function (size) {
        var matrixData = [];
        for (var i = 0; i < size; i++) {
            matrixData[i] = this.createArray(size);
        }
        return matrixData;
    };
    /**
     * Checks if a matrix is an affine matrix.
     *
     * @param {number[][]} matrixData - The matrix to check.
     * @returns {boolean} - True if the matrix is an affine matrix, false otherwise.
     */
    CircularChart3DMatrix.prototype.isAffine = function (matrixData) {
        return matrixData[0][3] === 0 && matrixData[1][3] === 0 && matrixData[2][3] === 0 && matrixData[3][3] === 1;
    };
    /**
     * Creates a new array with zeros.
     *
     * @param {number} initialSize - The size of the array.
     * @returns {number[]} - The created array.
     */
    CircularChart3DMatrix.prototype.createArray = function (initialSize) {
        var matrixData = [];
        for (var index = 0; index < initialSize; ++index) {
            matrixData[index] = 0;
        }
        return matrixData;
    };
    /**
     * Gets the identity matrix.
     *
     * @returns {number[][]} - The identity matrix.
     */
    CircularChart3DMatrix.prototype.getIdentity = function () {
        var matrixData = this.matrix3D(this.matrixSize);
        for (var i = 0; i < this.matrixSize; i++) {
            matrixData[i][i] = 1.0;
        }
        return matrixData;
    };
    /**
     * Gets the interval of a matrix.
     *
     * @param {number[][]} matrix - The matrix to get the interval for.
     * @returns {number[][]} - The interval matrix.
     */
    CircularChart3DMatrix.prototype.getInterval = function (matrix) {
        var matrixData = this.getIdentity();
        for (var i = 0; i < this.matrixSize; i++) {
            for (var j = 0; j < this.matrixSize; j++) {
                matrixData[i][j] = this.getMinor(matrix, i, j);
            }
        }
        matrixData = this.transposed(matrixData);
        matrixData = this.getMatrixMultiple(1 / this.getDeterminant(matrix), matrixData);
        return matrixData;
    };
    /**
     * Multiplies all elements of a matrix by a factor.
     *
     * @param {number} factor - The factor to multiply with.
     * @param {number[][]} matrix - The matrix to multiply.
     * @returns {number[][]} - The resulting matrix.
     */
    CircularChart3DMatrix.prototype.getMatrixMultiple = function (factor, matrix) {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = matrix[i][j] * factor;
            }
        }
        return matrix;
    };
    /**
     * Multiplies a matrix by a vector.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {CircularChart3DVector} point - The vector to multiply with.
     * @returns {CircularChart3DVector} - The resulting vector.
     */
    CircularChart3DMatrix.prototype.getMatrixVectorMultiple = function (matrix, point) {
        var x = matrix[0][0] * point.x +
            matrix[1][0] * point.y +
            matrix[2][0] * point.z +
            matrix[3][0];
        var y = matrix[0][1] * point.x +
            matrix[1][1] * point.y +
            matrix[2][1] * point.z +
            matrix[3][1];
        var z = matrix[0][2] * point.x +
            matrix[1][2] * point.y +
            matrix[2][2] * point.z +
            matrix[3][2];
        if (!this.isAffine(matrix)) {
            var c = 1 / (matrix[0][3] * point.x + matrix[1][3] * point.y + matrix[2][3] * point.z + matrix[3][3]);
            x *= c;
            y *= c;
            z *= c;
        }
        return { x: x, y: y, z: z };
    };
    /**
     * Multiplies two matrices.
     *
     * @param {number[][]} matrix1 - The first matrix.
     * @param {number[][]} matrix2 - The second matrix.
     * @returns {number[][]} - The resulting matrix.
     */
    CircularChart3DMatrix.prototype.getMatrixMultiplication = function (matrix1, matrix2) {
        var result = this.getIdentity();
        for (var i = 0; i < this.matrixSize; i++) {
            for (var j = 0; j < this.matrixSize; j++) {
                var value = 0;
                for (var k = 0; k < this.matrixSize; k++) {
                    value += matrix1[k][j] * matrix2[i][k];
                }
                result[i][j] = value;
            }
        }
        return result;
    };
    /**
     * Gets the minor of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {number} columnIndex - The column index.
     * @param {number} rowIndex - The row index.
     * @returns {number} - The minor of the matrix.
     * @private
     */
    CircularChart3DMatrix.prototype.getMinor = function (matrix, columnIndex, rowIndex) {
        return ((columnIndex + rowIndex) % 2 === 0 ? 1 : -1) * this.getDeterminant(this.getMatrix(matrix, columnIndex, rowIndex));
    };
    /**
     * Gets a submatrix of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @param {number} columnIndex - The column index.
     * @param {number} rowIndex - The row index.
     * @returns {number[][]} - The submatrix.
     */
    CircularChart3DMatrix.prototype.getMatrix = function (matrix, columnIndex, rowIndex) {
        var count = matrix.length - 1;
        var subMatrix = this.createArray(count);
        for (var i = 0; i < count; i++) {
            var matrixColumn = i >= columnIndex ? i + 1 : i;
            subMatrix[i] = this.createArray(count);
            for (var j = 0; j < count; j++) {
                var matrixRow = j >= rowIndex ? j + 1 : j;
                subMatrix[i][j] = matrix[matrixColumn][matrixRow];
            }
        }
        return subMatrix;
    };
    /**
     * Gets the determinant of a matrix.
     *
     * @param {number[][]} matrix - The matrix.
     * @returns {number} - The determinant of the matrix.
     */
    CircularChart3DMatrix.prototype.getDeterminant = function (matrix) {
        var count = matrix.length;
        var determinant = 0;
        if (count < 2) {
            determinant = matrix[0][0];
        }
        else {
            var k = 1;
            for (var i = 0; i < count; i++) {
                var submatrix = this.getMatrix(matrix, i, 0);
                determinant += k * matrix[i][0] * this.getDeterminant(submatrix);
                k = k > 0 ? -1 : 1;
            }
        }
        return determinant;
    };
    /**
     * Transforms a matrix by translation.
     *
     * @param {number} x - The x-coordinate of the translation.
     * @param {number} y - The y-coordinate of the translation.
     * @param {number} z - The z-coordinate of the translation.
     * @returns {number[][]} - The transformed matrix.
     */
    CircularChart3DMatrix.prototype.transform = function (x, y, z) {
        var transformedMatrix = this.getIdentity();
        transformedMatrix[3][0] = x;
        transformedMatrix[3][1] = y;
        transformedMatrix[3][2] = z;
        return transformedMatrix;
    };
    /**
     * Creates a matrix for rotation around the y-axis.
     *
     * @param {number} angle - The angle of rotation.
     * @returns {number[][]} - The rotation matrix.
     * @private
     */
    CircularChart3DMatrix.prototype.turn = function (angle) {
        var rotatedMatrix = this.getIdentity();
        rotatedMatrix[0][0] = Math.cos(angle);
        rotatedMatrix[2][0] = -Math.sin(angle);
        rotatedMatrix[0][2] = Math.sin(angle);
        rotatedMatrix[2][2] = Math.cos(angle);
        return rotatedMatrix;
    };
    /**
     * Creates a matrix for rotation around the x-axis.
     *
     * @param {number} angle - The angle of rotation.
     * @returns {number[][]} - The rotation matrix.
     */
    CircularChart3DMatrix.prototype.tilt = function (angle) {
        var rotatedMatrix = this.getIdentity();
        rotatedMatrix[1][1] = Math.cos(angle);
        rotatedMatrix[2][1] = Math.sin(angle);
        rotatedMatrix[1][2] = -Math.sin(angle);
        rotatedMatrix[2][2] = Math.cos(angle);
        return rotatedMatrix;
    };
    /**
     * Transposes a matrix.
     *
     * @param {number[][]} matrix3D - The matrix to transpose.
     * @returns {number[][]} - The transposed matrix.
     */
    CircularChart3DMatrix.prototype.transposed = function (matrix3D) {
        var transposedMatrix = this.getIdentity();
        for (var i = 0; i < this.matrixSize; i++) {
            for (var j = 0; j < this.matrixSize; j++) {
                transposedMatrix[i][j] = matrix3D[j][i];
            }
        }
        return transposedMatrix;
    };
    return CircularChart3DMatrix;
}());
export { CircularChart3DMatrix };
/**
 * Represents a 3D chart transformation utility that provides methods for transforming
 * and projecting 3D coordinates onto a 2D screen.
 *
 */
var CircularChart3DTransform = /** @class */ (function () {
    /**
     * Initializes a new instance of the `ChartTransform` class.
     */
    function CircularChart3DTransform() {
        /** Represents the angle conversion factor from degrees to radians. */
        this.toRadial = Math.PI / 180;
        this.vector = new CircularChart3DVectorModule(0, 0, 0);
        this.matrixObj = new CircularChart3DMatrix();
    }
    /**
     * Creates a 3D transformation based on the specified size.
     *
     * @param {Size} size - The size of the viewing area.
     * @returns {CircularChart3DBasicTransform} - The 3D transformation.
     */
    CircularChart3DTransform.prototype.transform3D = function (size) {
        return {
            viewingArea: size,
            rotation: 0,
            tilt: 0,
            depth: 0,
            perspectiveAngle: 0,
            needUpdate: true,
            centeredMatrix: this.matrixObj.getIdentity(),
            perspective: this.matrixObj.getIdentity(),
            resultMatrix: this.matrixObj.getIdentity(),
            viewMatrix: this.matrixObj.getIdentity()
        };
    };
    /**
     * Applies the specified 3D transformation to the current state.
     *
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation to apply.
     * @returns {void} - The 3D transformation.
     */
    CircularChart3DTransform.prototype.transform = function (transform) {
        this.setCenter(this.vector.vector3D(transform.viewingArea.width / 2, transform.viewingArea.height / 2, transform.depth / 2), transform);
        this.setViewMatrix(this.matrixObj.transform(0, 0, transform.depth), transform);
        this.setViewMatrix(this.matrixObj.getMatrixMultiplication(transform.viewMatrix, this.matrixObj.turn(-this.toRadial * transform.rotation)), transform);
        this.setViewMatrix(this.matrixObj.getMatrixMultiplication(transform.viewMatrix, this.matrixObj.tilt(-this.toRadial * transform.tilt)), transform);
        this.updatePerspective(transform.perspectiveAngle, transform);
        transform.needUpdate = true;
    };
    /**
     * Updates the perspective matrix based on the specified angle.
     *
     * @param {number} angle - The perspective angle.
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    CircularChart3DTransform.prototype.updatePerspective = function (angle, transform) {
        var width = (((transform.viewingArea.width + transform.viewingArea.height) *
            Math.tan(this.degreeToRadianConverter((180 - Math.abs(angle % 181)) / 2.0))) + (transform.depth * 2) / 2);
        transform.perspective[0][0] = width;
        transform.perspective[1][1] = width;
        transform.perspective[2][3] = 1;
        transform.perspective[3][3] = width;
    };
    /**
     * Converts degrees to radians.
     *
     * @param {number} angle - The angle in degrees.
     * @returns {number} - The angle in radians.
     * @private
     */
    CircularChart3DTransform.prototype.degreeToRadianConverter = function (angle) {
        return angle * Math.PI / 180;
    };
    /**
     * Transforms a 3D vector to screen coordinates based on the current state.
     *
     * @param {CircularChart3DVector} vector3D - The 3D vector to transform.
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @param {CircularChart3DMatrix} chartObj - Optional custom matrix object for transformation.
     * @returns {CircularChart3DLocation} - The screen coordinates.
     */
    CircularChart3DTransform.prototype.toScreen = function (vector3D, transform, chartObj) {
        if (!chartObj) {
            transform.chartObj = this.matrixObj;
            vector3D = this.matrixObj.getMatrixVectorMultiple(this.result(transform), vector3D);
        }
        else {
            this.matrixObj = chartObj;
            vector3D = chartObj.getMatrixVectorMultiple(this.result(transform, chartObj), vector3D);
        }
        return { x: vector3D.x, y: vector3D.y };
    };
    /**
     * Sets the view matrix in the transformation state.
     *
     * @param {number[][]} matrix - The new view matrix.
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    CircularChart3DTransform.prototype.setViewMatrix = function (matrix, transform) {
        if (transform.viewMatrix === matrix) {
            return;
        }
        transform.viewMatrix = matrix;
        transform.needUpdate = true;
    };
    /**
     * Calculates the final result matrix based on the current state.
     *
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @param {CircularChart3DMatrix} matrixobj - Optional custom matrix object for transformation.
     * @returns {number[][]} - The final result matrix.
     */
    CircularChart3DTransform.prototype.result = function (transform, matrixobj) {
        var chartObj = transform.chartObj ? transform.chartObj : this.matrixObj;
        if (!chartObj) {
            chartObj = matrixobj;
        }
        if (!transform.needUpdate) {
            return transform.resultMatrix;
        }
        var matrixObj = this.matrixObj;
        transform.resultMatrix = chartObj.getMatrixMultiplication(matrixObj.getInterval(transform.centeredMatrix), transform.perspective);
        transform.resultMatrix = chartObj.getMatrixMultiplication(transform.resultMatrix, transform.viewMatrix);
        transform.resultMatrix = chartObj.getMatrixMultiplication(transform.resultMatrix, transform.centeredMatrix);
        transform.needUpdate = false;
        return transform.resultMatrix;
    };
    /**
     * Sets the center in the transformation state.
     *
     * @param {CircularChart3DVector} center - The new center vector.
     * @param {CircularChart3DBasicTransform} transform - The 3D transformation.
     * @returns {void}
     */
    CircularChart3DTransform.prototype.setCenter = function (center, transform) {
        transform.centeredMatrix = this.matrixObj.transform(-center.x, -center.y, -center.z);
        transform.needUpdate = true;
    };
    return CircularChart3DTransform;
}());
export { CircularChart3DTransform };
/**
 * Represents a 3D graphics rendering utility for drawing and managing 3D elements in a chart.
 *
 */
var CircularChart3DGraphics = /** @class */ (function () {
    function CircularChart3DGraphics() {
        /** The vector class. */
        this.vector = new CircularChart3DVectorModule(0, 0, 0);
    }
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
    CircularChart3DGraphics.prototype.prepareView = function (perspectiveAngle, depth, rotation, tilt, size, chart) {
        if (arguments.length === 0) {
            bspTreeObj.build(null, chart);
        }
        else {
            if (circular3DRender.transform == null) {
                circular3DRender.transform = chart.transform3D.transform3D(size);
            }
            else {
                circular3DRender.transform.viewingArea = size;
            }
            if (!circular3DRender.tree) {
                circular3DRender.tree = [];
            }
            circular3DRender.transform.rotation = rotation;
            circular3DRender.transform.tilt = tilt;
            circular3DRender.transform.depth = depth;
            circular3DRender.transform.perspectiveAngle = perspectiveAngle;
            chart.transform3D.transform(circular3DRender.transform);
            circular3DRender.tree[chart.groupElement.id] = bspTreeObj.build(null, chart);
        }
    };
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
    CircularChart3DGraphics.prototype.view = function (panel, chart, rotation, tilt, size, perspectiveAngle, depth) {
        var MaxValue = 32767;
        if (arguments.length === 2) {
            if (panel == null) {
                return;
            }
            var eyeVector = this.vector.vector3D(0, 0, MaxValue);
            this.drawNode3D(circular3DRender.tree[chart.groupElement.id], eyeVector, panel, chart);
        }
        else {
            if (panel == null) {
                return;
            }
            if (circular3DRender.transform == null) {
                circular3DRender.transform = chart.transform3D.transform3D(size);
            }
            else {
                circular3DRender.transform.viewingArea = size;
            }
            circular3DRender.transform.rotation = rotation;
            circular3DRender.transform.tilt = tilt;
            circular3DRender.transform.depth = depth;
            circular3DRender.transform.perspectiveAngle = perspectiveAngle;
            chart.transform3D.transform(circular3DRender.transform);
            var eye = this.vector.vector3D(0, 0, MaxValue);
            this.drawNode3D(circular3DRender.tree[chart.groupElement.id], eye, panel, chart);
        }
    };
    /**
     * Draws a 3D element based on the specified Binary Space Partitioning Node.
     *
     * @param {CircularChart3DBspNode} bspElement - The Binary Space Partitioning Node representing the 3D element.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    CircularChart3DGraphics.prototype.draw3DElement = function (bspElement, chart) {
        if (bspElement.plane.element) {
            if (bspElement.plane.element.tag === 'text' || bspElement.plane.element.tag === 'dataLabel') {
                polygonObj.drawText(bspElement.plane, chart);
            }
            else if (bspElement.plane.element.tag === 'polyline') {
                polygonObj.drawPolyLine(bspElement.plane, chart);
            }
            else if (bspElement.plane.element.tag === 'template') {
                polygonObj.drawTemplate(bspElement.plane, chart);
            }
        }
        else {
            polygonObj.draw(bspElement.plane, chart);
        }
    };
    /**
     * Draws the 3D nodes starting from the root based on the eye vector.
     *
     * @param {CircularChart3DBspNode} bspElement - The root Binary Space Partitioning Node.
     * @param {CircularChart3DVector} eyeVector - The eye vector.
     * @param {Element} panel - The panel element to render the view on.
     * @param {CircularChart3D} chart - The instance of the circular 3D chart.
     * @returns {void}
     */
    CircularChart3DGraphics.prototype.drawNode3D = function (bspElement, eyeVector, panel, chart) {
        if (bspElement === null || circular3DRender.transform == null) {
            return;
        }
        var isVector = true;
        while (isVector) {
            var r = vector.vector3DAdd(polygonObj.getNormal(chart.transform3D.result(circular3DRender.transform), bspElement.plane.vectorPoints), eyeVector);
            if (r > bspElement.plane.d) {
                if (bspElement.front != null) {
                    this.drawNode3D(bspElement.front, eyeVector, panel, chart);
                }
                this.draw3DElement(bspElement, chart);
                if (bspElement.back != null) {
                    bspElement = bspElement.back;
                    continue;
                }
            }
            else {
                if (bspElement.back != null) {
                    this.drawNode3D(bspElement.back, eyeVector, panel, chart);
                }
                this.draw3DElement(bspElement, chart);
                if (bspElement.front != null) {
                    bspElement = bspElement.front;
                    continue;
                }
            }
            break;
        }
        return null;
    };
    return CircularChart3DGraphics;
}());
export { CircularChart3DGraphics };
/**
 * Represents a binary tree builder for 3D polygons in a circular 3D chart.
 *
 */
var CircularChart3DBinaryTreeBuilder = /** @class */ (function () {
    function CircularChart3DBinaryTreeBuilder(chart) {
        /** A small value used for epsilon comparisons to handle floating-point inaccuracies.*/
        this.epsilon = 0.0005;
        this.chart = chart;
    }
    /**
     * Gets the next index considering the array length and the current index.
     *
     * @param {number} index - The current index.
     * @param {number} count - The length of the array.
     * @returns {number} - The next index.
     */
    CircularChart3DBinaryTreeBuilder.prototype.getNext = function (index, count) {
        if (index >= count) {
            return index - count;
        }
        if (index < 0) {
            return index + count;
        }
        return index;
    };
    /**
     * Creates a PolyAttributes object based on the vector, index, and result.
     *
     * @param {CircularChart3DVector} point - The vector representing the point.
     * @param {number} index - The index of the point.
     * @param {string} result - The result classification.
     * @returns {CircularChart3DPolyAttributes} - The created PolyAttributes object.
     */
    CircularChart3DBinaryTreeBuilder.prototype.vector3DIndexClassification = function (point, index, result) {
        return {
            index: index,
            result: result,
            vector: point,
            isCuttingBackPoint: false,
            cuttingBackPairIndex: null,
            alreadyCutBack: false,
            isCuttingFrontPoint: false,
            cuttingFrontPairIndex: null,
            alreadyCutFront: false
        };
    };
    /**
     * Classifies a point relative to a polygon.
     *
     * @param {CircularChart3DVector} point - The point to classify.
     * @param {CircularChart3DPolygon} polygon - The polygon for classification.
     * @returns {string} - The classification result ('OnPlane', 'OnBack', 'OnFront').
     */
    CircularChart3DBinaryTreeBuilder.prototype.classifyPoint = function (point, polygon) {
        var result = 'OnPlane';
        var signedDistance = -polygon.d - vector.vector3DAdd(point, polygon.normal);
        if (signedDistance > this.epsilon) {
            result = 'OnBack';
        }
        else if (signedDistance < -this.epsilon) {
            result = 'OnFront';
        }
        return result;
    };
    /**
     * Classifies a polygon relative to another polygon.
     *
     * @param {CircularChart3DPolygon} refPolygon - The reference polygon.
     * @param {CircularChart3DPolygon} classPolygon - The polygon to classify.
     * @returns {string} - The classification result ('OnPlane', 'ToRight', 'ToLeft', 'Unknown').
     */
    CircularChart3DBinaryTreeBuilder.prototype.classifyPolygon = function (refPolygon, classPolygon) {
        var result = 'Unknown';
        var points = classPolygon.points;
        if (points == null) {
            return result;
        }
        var onBack = 0;
        var onFront = 0;
        var onPlane = 0;
        var normal = refPolygon.normal;
        var polygonValue = refPolygon.d;
        for (var i = 0, len = points.length; i < len; i++) {
            var value = -polygonValue - vector.vector3DAdd(points[i], normal);
            if (value > this.epsilon) {
                onBack++;
            }
            else if (value < -this.epsilon) {
                onFront++;
            }
            else {
                onPlane++;
            }
            if (onBack > 0 && onFront > 0) {
                break;
            }
        }
        if (onPlane === points.length) {
            result = 'OnPlane';
        }
        else if (onFront + onPlane === points.length) {
            result = 'ToRight';
        }
        else if (onBack + onPlane === points.length) {
            result = 'ToLeft';
        }
        else {
            result = 'Unknown';
        }
        return result;
    };
    /**
     * Splits a polygon into two parts based on another polygon.
     *
     * @param {CircularChart3DPolygon} splitPolygon - The polygon to split.
     * @param {CircularChart3DPolygon} refPolygon - The reference polygon for splitting.
     * @returns {CircularChart3DPolyCollections} - The resulting back and front parts.
     */
    CircularChart3DBinaryTreeBuilder.prototype.splitPolygon = function (splitPolygon, refPolygon) {
        var backPoint = [];
        var frontPoint = [];
        if (splitPolygon.points != null) {
            var polyPoints = [];
            var backPartPoints = [];
            var frontPartPoints = [];
            var outputs = void 0;
            var inputs = void 0;
            var count = splitPolygon.points.length;
            for (var i = 0; i < count; i++) {
                var pointB = splitPolygon.points[i];
                var pointC = splitPolygon.points[this.getNext(i + 1, count)];
                var sideB = this.classifyPoint(pointB, refPolygon);
                var sideC = this.classifyPoint(pointC, refPolygon);
                var attributeB = this.vector3DIndexClassification(pointB, polyPoints.length, sideB);
                polyPoints.push(attributeB);
                if (sideB !== sideC && sideB !== 'OnPlane' && sideC !== 'OnPlane') {
                    var vectorValue = vector.vector3DMinus(pointB, pointC);
                    var direction = vector.vector3DMinus(vector.vector3DStarMultiply(refPolygon.normal, -refPolygon.d), pointC);
                    var signedDistance = vector.vector3DAdd(direction, refPolygon.normal);
                    var intersectionParameter = signedDistance / vector.vector3DAdd(refPolygon.normal, vectorValue);
                    var intersectionPoint = vector.vector3DPlus(pointC, vector.vector3DStarMultiply(vectorValue, intersectionParameter));
                    var attributeIntersection = this.vector3DIndexClassification(intersectionPoint, polyPoints.length, 'OnPlane');
                    polyPoints.push(attributeIntersection);
                    backPartPoints.push(attributeIntersection);
                    frontPartPoints.push(attributeIntersection);
                }
            }
            if (frontPartPoints.length !== 0 || backPartPoints.length !== 0) {
                for (var i = 0; i < backPartPoints.length - 1; i += 2) {
                    var backAttribute1 = backPartPoints[i];
                    var backAttribute2 = backPartPoints[i + 1];
                    backAttribute1.cuttingBackPoint = true;
                    backAttribute2.cuttingBackPoint = true;
                    backAttribute1.alterCuttingBackPairIndex = backAttribute2.index;
                    backAttribute2.alterCuttingBackPairIndex = backAttribute1.index;
                }
                for (var i = 0; i < frontPartPoints.length - 1; i += 2) {
                    var frontAttribute1 = frontPartPoints[i];
                    var frontAttribute2 = frontPartPoints[i + 1];
                    frontAttribute1.cuttingFrontPoint = true;
                    frontAttribute2.cuttingFrontPoint = true;
                    frontAttribute1.alterCuttingFrontPairIndex = frontAttribute2.index;
                    frontAttribute2.alterCuttingFrontPairIndex = frontAttribute1.index;
                }
                for (var i = 0; i < backPartPoints.length - 1; i++) {
                    var backAttribute1 = backPartPoints[i];
                    if (backAttribute1.alreadyCutBack) {
                        continue;
                    }
                    outputs = this.cutOutBackPolygon(polyPoints, backAttribute1);
                    if (outputs.length > 2) {
                        var polygon1 = polygonObj.polygon3D(outputs, splitPolygon);
                        backPoint.push(__assign({}, polygon1));
                    }
                }
                for (var i = 0; i < frontPartPoints.length - 1; i++) {
                    var backAttribute2 = frontPartPoints[i];
                    if (backAttribute2.alreadyCutFront) {
                        continue;
                    }
                    inputs = this.cutOutFrontPolygon(polyPoints, backAttribute2);
                    if (inputs.length > 2) {
                        var polygon2 = polygonObj.polygon3D(inputs, splitPolygon);
                        frontPoint.push(__assign({}, polygon2));
                    }
                }
            }
        }
        else {
            backPoint.push(splitPolygon);
            frontPoint.push(splitPolygon);
        }
        return { backPolygon: backPoint, frontPolygon: frontPoint };
    };
    /**
     * Cuts out the front part of a polygon based on the PolyAttributes.
     *
     * @param {CircularChart3DPolyAttributes[]} polyPoints - The polyAttributes array of the polygon.
     * @param {CircularChart3DPolyAttributes} initialVertex - The polyAttributes representing the cutting point.
     * @returns {CircularChart3DVector[]} - The resulting points of the front part.
     */
    CircularChart3DBinaryTreeBuilder.prototype.cutOutFrontPolygon = function (polyPoints, initialVertex) {
        var points = [];
        var currentVertex = initialVertex;
        var isVector = true;
        while (isVector) {
            currentVertex.alreadyCutFront = true;
            points.push(currentVertex.vector);
            var currentVertexPair = polyPoints[currentVertex.alterCuttingFrontPairIndex];
            if (currentVertex.cuttingFrontPoint) {
                if (!currentVertexPair.alreadyCutFront) {
                    currentVertex = currentVertexPair;
                }
                else {
                    var previousVertexOnBack = polyPoints[this.getNext(currentVertex.index - 1, polyPoints.length)];
                    var nextVertexOnBack = polyPoints[this.getNext(currentVertex.index + 1, polyPoints.length)];
                    if (previousVertexOnBack.result === 'OnFront' && !previousVertexOnBack.alreadyCutFront) {
                        currentVertex = previousVertexOnBack;
                    }
                    else if (nextVertexOnBack.result === 'OnFront' && !nextVertexOnBack.alreadyCutFront) {
                        currentVertex = nextVertexOnBack;
                    }
                    else {
                        return points;
                    }
                }
            }
            else {
                var previousVertexOnBack = polyPoints[this.getNext(currentVertex.index - 1, polyPoints.length)];
                var nextVertexOnBack = polyPoints[this.getNext(currentVertex.index + 1, polyPoints.length)];
                if (previousVertexOnBack.result !== 'OnBack' && !previousVertexOnBack.alreadyCutFront) {
                    currentVertex = previousVertexOnBack;
                }
                else if (nextVertexOnBack.result !== 'OnBack' && !nextVertexOnBack.alreadyCutFront) {
                    currentVertex = nextVertexOnBack;
                }
                else {
                    return points;
                }
            }
        }
        return null;
    };
    /**
     * Cuts out the back part of a polygon based on the PolyAttributes.
     *
     * @param {CircularChart3DPolyAttributes[]} polyPoints - The PolyAttributes array of the polygon.
     * @param {CircularChart3DPolyAttributes} initialVertex - The PolyAttributes representing the cutting point.
     * @returns {CircularChart3DVector[]} - The resulting points of the back part.
     */
    CircularChart3DBinaryTreeBuilder.prototype.cutOutBackPolygon = function (polyPoints, initialVertex) {
        var points = [];
        var currentVertex = initialVertex;
        var isVector = true;
        while (isVector) {
            currentVertex.alreadyCutBack = true;
            points.push(currentVertex.vector);
            var currentVertexPair = polyPoints[currentVertex.alterCuttingBackPairIndex];
            if (currentVertex.cuttingBackPoint) {
                if (!currentVertexPair.alreadyCutBack) {
                    currentVertex = currentVertexPair;
                }
                else {
                    var previousVertexOnBack = polyPoints[this.getNext(currentVertex.index - 1, polyPoints.length)];
                    var nextVertexOnBack = polyPoints[this.getNext(currentVertex.index + 1, polyPoints.length)];
                    if (previousVertexOnBack.result === 'OnBack' && !previousVertexOnBack.alreadyCutBack) {
                        currentVertex = previousVertexOnBack;
                    }
                    else if (nextVertexOnBack.result === 'OnBack' && !nextVertexOnBack.alreadyCutBack) {
                        currentVertex = nextVertexOnBack;
                    }
                    else {
                        return points;
                    }
                }
            }
            else {
                var previousVertexOnBack = polyPoints[this.getNext(currentVertex.index - 1, polyPoints.length)];
                var nextVertexOnBack = polyPoints[this.getNext(currentVertex.index + 1, polyPoints.length)];
                if (previousVertexOnBack.result !== 'OnFront' && !previousVertexOnBack.alreadyCutBack) {
                    currentVertex = previousVertexOnBack;
                }
                else if (nextVertexOnBack.result !== 'OnFront' && !nextVertexOnBack.alreadyCutBack) {
                    currentVertex = nextVertexOnBack;
                }
                else {
                    return points;
                }
            }
        }
        return null;
    };
    /**
     * Builds a binary space partitioning from a list of polygons.
     *
     * @param {CircularChart3DPolygon[]} [points] - The list of polygons to build the tree from.
     * @param {CircularChart3D} [chart] - The circular 3D chart.
     * @returns {CircularChart3DBspNode} - The root node of the Binary Space Partitioning tree.
     */
    CircularChart3DBinaryTreeBuilder.prototype.build = function (points, chart) {
        if (!points) {
            return this.build(chart.circular3DPolygon);
        }
        else {
            var inputPolygons = points;
            if (inputPolygons.length < 1) {
                return null;
            }
            var bspNode = { back: null, front: null, plane: null };
            var plane = inputPolygons[0];
            bspNode.plane = plane;
            var polygonsToLeft = [];
            var polygonsToRight = [];
            for (var i = 1, len = inputPolygons.length; i < len; i++) {
                var currentPolygon = inputPolygons[i];
                if (currentPolygon === plane) {
                    continue;
                }
                var classificationResult = this.classifyPolygon(plane, currentPolygon);
                switch (classificationResult) {
                    case 'OnPlane':
                    case 'ToRight':
                        polygonsToRight.push(currentPolygon);
                        break;
                    case 'ToLeft':
                        polygonsToLeft.push(currentPolygon);
                        break;
                    case 'Unknown':
                        if (currentPolygon.element) {
                            polygonsToLeft.push(currentPolygon);
                        }
                        else {
                            var result = this.splitPolygon(currentPolygon, plane);
                            for (var k = 0; k < result.backPolygon.length; k++) {
                                result.backPolygon[k].name = result.backPolygon[k].name + '-back';
                                polygonsToLeft.push(result.backPolygon[k]);
                            }
                            for (var j = 0; j < result.frontPolygon.length; j++) {
                                result.frontPolygon[j].name = result.frontPolygon[j].name + '-front';
                                polygonsToRight.push(result.frontPolygon[j]);
                            }
                        }
                        break;
                }
            }
            if (polygonsToLeft.length > 0) {
                bspNode.back = this.build(polygonsToLeft);
            }
            if (polygonsToRight.length > 0) {
                bspNode.front = this.build(polygonsToRight);
            }
            return bspNode;
        }
    };
    return CircularChart3DBinaryTreeBuilder;
}());
export { CircularChart3DBinaryTreeBuilder };
/**
 * The CircularChart3DSvgRenderer class provides methods for rendering SVG graphics in a 3D context.
 */
var CircularChart3DSvgRenderer = /** @class */ (function () {
    function CircularChart3DSvgRenderer() {
    }
    /**
     * Gets a CircularChart3DStringBuilder instance for constructing strings.
     *
     * @returns {CircularChart3DStringBuilder} - The StringBuilder instance.
     */
    CircularChart3DSvgRenderer.prototype.getStringBuilder = function () {
        var data = [];
        var counter = 0;
        return {
            append: function (text) {
                data[counter++] = text;
                return this;
            },
            toString: function (text) {
                return data.join(text || '');
            }
        };
    };
    /**
     * Parses a hex color code and returns its Red green Blue values.
     *
     * @param {string} hexColorCode - The hex color code.
     * @returns {CircularChart3DColorFormat | null} - The parsed color format (Red green Blue) or null if parsing fails.
     */
    CircularChart3DSvgRenderer.prototype.hexToValue = function (hexColorCode) {
        var result;
        var values;
        if (hexColorCode.indexOf('rgba(') === 0) {
            values = hexColorCode.slice(5, -1).split(',');
            return values ? {
                red: parseInt(values[0], 10),
                green: parseInt(values[1], 10),
                blue: parseInt(values[2], 10),
                alpha: parseFloat(values[3])
            } : null;
        }
        else if (hexColorCode.indexOf('rgb(') === 0) {
            values = hexColorCode.slice(4, -1).split(',');
            return values ? {
                red: parseInt(values[0], 10),
                green: parseInt(values[1], 10),
                blue: parseInt(values[2], 10)
            } : null;
        }
        else {
            result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColorCode);
            return result
                ? {
                    red: parseInt(result[1], 16),
                    green: parseInt(result[2], 16),
                    blue: parseInt(result[3], 16)
                }
                : null;
        }
    };
    /**
     * Draws text on an SVG element.
     *
     * @param {SVGCanvasAttributes} options - The options for drawing the text.
     * @param {string | string[]} label - The text label.
     * @param {FontModel} font - The font settings for the text.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     * @returns {Element} - The created SVG text element.
     */
    CircularChart3DSvgRenderer.prototype.drawText = function (options, label, font, chart) {
        var text = document.getElementById(options.id) || chart.groupElement.querySelector('#' + options.id);
        if (text === null) {
            text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        }
        text.textContent = label;
        text = chart.renderer.setElementAttributes(options, text);
        return text;
    };
    /**
     * Converts a CircularChart3DColorFormat object to its corresponding color string.
     *
     * @param {CircularChart3DColorFormat} color - The color in CircularChart3DColorFormat.
     * @returns {string} - The color string representation.
     */
    CircularChart3DSvgRenderer.prototype.hexColor = function (color) {
        var redValue = color.red;
        var greenValue = color.green;
        var blueValue = color.blue;
        if (color.alpha) {
            var returnColor = "rgba(" + redValue.toString() + "," + greenValue.toString() + "," + blueValue.toString() + "," + color.alpha + ")";
            return returnColor;
        }
        else {
            var hex_1 = [redValue.toString(16), greenValue.toString(16), blueValue.toString(16)];
            hex_1.forEach(function (val, nr) {
                if (val.length === 1) {
                    hex_1[nr] = '0' + val;
                }
            });
            return '#' + hex_1.join('').toUpperCase();
        }
    };
    /**
     * Checks if a given color string is in a valid format (hex or rgba).
     *
     * @param {string} color - The color string to check.
     * @returns {boolean} - True if the color string is valid, otherwise false.
     */
    CircularChart3DSvgRenderer.prototype.checkColorFormat = function (color) {
        if (color.indexOf('rgba(') === 0 || color.indexOf('rgb(') === 0) {
            var rgbaValues = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(',');
            if (rgbaValues.length === 3 || rgbaValues.length === 4) {
                return rgbaValues.every(function (val) {
                    var num = parseFloat(val);
                    return !isNaN(num) && num >= 0 && num <= 255;
                });
            }
        }
        else if (color.indexOf('#') === 0) {
            var hex = color.substring(1);
            return (hex.length === 3 || hex.length === 6) && /^[0-9A-Fa-f]{3,6}$/.test(hex);
        }
        return false;
    };
    return CircularChart3DSvgRenderer;
}());
export { CircularChart3DSvgRenderer };
/**
 * Represents a 3D polygon in a circular 3D chart.
 *
 */
var CircularChart3DPolygonModule = /** @class */ (function () {
    function CircularChart3DPolygonModule() {
        this.epsilon = 0.00001;
        this.normal = { x: 0, y: 0, z: 0 };
        this.vector = new CircularChart3DVectorModule(0, 0, 0);
        this.vectorPoints = [];
        this.matrixObj = new CircularChart3DMatrix();
    }
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
    CircularChart3DPolygonModule.prototype.polygon3D = function (points, tag, index, stroke, strokeThickness, opacity, fill, name, parent, text) {
        if (arguments.length === 2) {
            //points = points;
            this.calculateNormal(points[0], points[1], points[2]);
            this.vectorPoints = points;
            this.calculateNormal(this.vectorPoints);
            var polygon = tag;
            polygon.normal = this.normal;
            polygon.points = points;
            polygon.vectorPoints = this.vectorPoints;
            polygon.isSplit = true;
            polygon.d = this.d;
            return polygon;
        }
        else {
            this.calculateNormal(points[0], points[1], points[2]);
            this.vectorPoints = points;
            this.calculateNormal(this.vectorPoints);
            var element = { tag: 'path', parent: parent };
            var polygon = {
                normal: this.normal,
                points: points,
                vectorPoints: this.vectorPoints,
                index: index,
                tag: tag,
                name: name ? name : null,
                strokeThickness: strokeThickness,
                opacity: opacity,
                fill: fill,
                d: this.d,
                text: text ? text : '',
                polygonElement: element
            };
            if (arguments.length !== 1) {
                polygon.polygonElement = element;
            }
            return polygon;
        }
    };
    /**
     * Calculates the normal vector for a 3D polygon based on the provided points.
     *
     * @param {...CircularChart3DVector} args - Variable number of vector3D arguments representing points of the polygon.
     * @returns {void}
     */
    CircularChart3DPolygonModule.prototype.calculateNormal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= 3) {
            // Relative information of the points
            var vector1 = args[0];
            var vector2 = args[1];
            var vector3 = args[2];
            var vector4 = this.vector.vector3DMinus(vector1, vector2);
            var vector5 = this.vector.vector3DMinus(vector3, vector2);
            var normal = this.vector.vector3DMultiply(vector4, vector5);
            var length_1 = this.vector.getLength(normal); // Get length of the vector
            if (length_1 < this.epsilon) {
                length_1 = 1;
            }
            this.normal = this.vector.vector3D(normal.x / length_1, normal.y / length_1, normal.z / length_1); // Calculate normalization of the vector
            this.d = -(this.normal.x * vector1.x + this.normal.y * vector1.y + this.normal.z * vector1.z); // Normalized values * 1st coordinates Coordinates - Depth of the plan
            if (args[3]) {
                args[3].normal = this.normal;
                args[3].d = this.d;
            }
        }
        else {
            var points = args[0];
            this.calculateNormal(points[0], points[1], points[2], args[1]);
            for (var i = 3; (i < points.length) && (this.test()); i++) {
                this.calculateNormal(points[i], points[0], points[i / 2]);
            }
        }
    };
    /**
     * Tests whether the calculated normal vector is valid.
     *
     * @returns {boolean} - Returns true if the normal vector is valid, false otherwise.
     */
    CircularChart3DPolygonModule.prototype.test = function () {
        return !this.vector.isValid(this.normal);
    };
    /**
     * Gets the normal vector based on the transformed points using the specified transformation matrix.
     *
     * @param {number[][]} transform - The transformation matrix.
     * @param {CircularChart3DVector[]} [vectorPoints] - The vector points.
     * @returns {CircularChart3DVector} - Returns the normal vector.
     * @private
     */
    CircularChart3DPolygonModule.prototype.getNormal = function (transform, vectorPoints) {
        var normal;
        if (vectorPoints != null) {
            normal = this.vector.getNormal(this.matrixObj.getMatrixVectorMultiple(transform, vectorPoints[0]), matrixObj.getMatrixVectorMultiple(transform, vectorPoints[1]), this.matrixObj.getMatrixVectorMultiple(transform, vectorPoints[2]));
            for (var i = 3; (i < vectorPoints.length) && !this.vector.isValid(normal) && vectorPoints[i / 2]; i++) {
                var v1 = matrixObj.getMatrixVectorMultiple(transform, vectorPoints[i]);
                var v2 = matrixObj.getMatrixVectorMultiple(transform, vectorPoints[0]);
                var v3 = matrixObj.getMatrixVectorMultiple(transform, vectorPoints[i / 2]);
                normal = this.vector.getNormal(v1, v2, v3);
            }
        }
        return normal;
    };
    /**
     * Creates a text element in the context of a circular 3D chart.
     *
     * @param {CircularChart3DVector} position - The position of the text.
     * @param {CircularChart3DLabelElement} element - The text element to be created.
     * @param {number} xLength - The x value for the text element.
     * @param {number} yLength - The y value for the text element.
     * @returns {CircularChart3DPolygon} - Returns the polygon representing the created text element.
     */
    CircularChart3DPolygonModule.prototype.createTextElement = function (position, element, xLength, yLength) {
        var vectorCollection = [];
        var x = position.x;
        var y = position.y;
        var desiredWidth = element.width;
        var desiredHeight = element.height;
        vectorCollection[0] = this.vector.vector3D(x, y, position.z);
        vectorCollection[1] = this.vector.vector3D(x + desiredWidth, y + desiredHeight + yLength, position.z);
        vectorCollection[2] = this.vector.vector3D(x + desiredWidth + xLength, y + desiredHeight + yLength, position.z);
        return this.text3D(element, vectorCollection);
    };
    /**
     * Creates a 3D polyline by connecting a series of points in 3D space.
     *
     * @param {Array<{ x: number; y: number; z?: number }>} points - An array of points in 3D space, specified by their x, y, and optional z coordinates.
     * @param {CircularChart3DLabelElement} element - The circular 3D label element associated with the polyline.
     * @returns {CircularChart3DPolygon} - The resulting 3D polyline with the specified circular 3D label element and vertices.
     */
    CircularChart3DPolygonModule.prototype.createPolyline = function (points, element) {
        if (points.length === 2) {
            var prePoint = points[1];
            points.push({ x: prePoint.x, y: prePoint.y, z: prePoint.z });
        }
        return this.polyLine3D(element, points);
    };
    /**
     * Creates a 3D polygon by connecting a series of points in 3D space.
     *
     * @param {CircularChart3DLabelElement} element - The circular 3D label element associated with the polygon.
     * @param {Array<{ x: number; y: number; z?: number }>} points - An array of points in 3D space, specified by their x, y, and optional z coordinates.
     * @returns {CircularChart3DPolygon} - The resulting 3D polygon with the specified circular 3D label element and vertices.
     */
    CircularChart3DPolygonModule.prototype.polyLine3D = function (element, points) {
        var plane = this.polygon3D(points);
        plane.element = element;
        return plane;
    };
    /**
     * Creates a 3D text polygon based on the given label element and points.
     *
     * @param {CircularChart3DLabelElement} element - The label element associated with the text.
     * @param {CircularChart3DVector[]} points - The array of 3D vector points defining the position of the text in 3D space.
     * @returns {CircularChart3DPolygon} - Returns the created 3D text polygon.
     */
    CircularChart3DPolygonModule.prototype.text3D = function (element, points) {
        var plane = this.polygon3D(points);
        plane.element = element;
        return plane;
    };
    /**
     * Draws a polyline on the circular 3D chart panel.
     *
     * @param {CircularChart3DPolygon} panel - The polygon panel on which to draw the polyline.
     * @param {CircularChart3D} chart - The circular 3D chart instance.
     */
    CircularChart3DPolygonModule.prototype.drawPolyLine = function (panel, chart) {
        var transform = circular3DRender.transform;
        var pathDirection = chart.svg3DRenderer.getStringBuilder();
        var startPoint = chart.transform3D.toScreen(panel.vectorPoints[0], transform);
        pathDirection.append("M " + startPoint.x + " " + startPoint.y + " ");
        var lineSegment1 = chart.transform3D.toScreen(panel.vectorPoints[1], transform);
        pathDirection.append("L " + lineSegment1.x + " " + lineSegment1.y + " ");
        pathDirection.append("M " + lineSegment1.x + " " + lineSegment1.y + " ");
        var lineSegment2 = chart.transform3D.toScreen(panel.vectorPoints[2], transform);
        pathDirection.append("L " + lineSegment2.x + " " + lineSegment2.y + " ");
        var direction = pathDirection.toString();
        var optionsLine = {
            id: panel.element.id,
            'stroke-dasharray': panel.element.dashArray,
            'stroke-width': panel.element.width,
            stroke: panel.element.stroke,
            d: direction
        };
        var element = chart.renderer.drawPath(optionsLine);
        appendChildElement(false, chart.groupElement, element, chart.redraw, true, 'x', 'y', null, direction);
    };
    /**
     * Draws a data label symbol for a specific data point in a circular 3D series.
     *
     * @param {CircularChart3DPolygon} panel - The 3D polygon representing the panel on which the text will be drawn.
     * @param {CircularChart3D} chart - The 3D chart to which the panel belongs.
     * @returns {void}
     */
    CircularChart3DPolygonModule.prototype.drawText = function (panel, chart) {
        var element = panel.element;
        var transform = circular3DRender.transform;
        if (transform == null) {
            return;
        }
        var actual3DPosition = chart.transform3D.toScreen(panel.vectorPoints[0], transform);
        var x = actual3DPosition.x;
        var y = actual3DPosition.y;
        if (element.tag === 'text') {
            var options = {
                'id': element.id,
                'x': x,
                'y': y,
                'fill': element.font.color || element.fill,
                'font-size': element.font.size,
                'font-family': element.font.fontFamily || chart.themeStyle.datalabelFont.fontFamily,
                'font-style': element.font.fontStyle,
                'font-weight': element.font.fontWeight,
                'opacity': element.font.opacity,
                'text-anchor': element.textAnchor,
                'cursor': 'default',
                'transform': element.angle ? 'rotate(' + element.angle + ',' + (x) + ',' + y + ')' : ''
            };
            var textElement = chart.svg3DRenderer.drawText(options, element.label.text, panel.element.font, chart);
            if (element.id.indexOf('text') > -1) {
                textElement.setAttribute('aria-hidden', 'true');
            }
            chart.groupElement.append(textElement);
            if (chart.previousID && chart.isTouch) {
                var previousElement = document.getElementById(chart.previousID);
                var currentElement = document.getElementById(options.id);
                if (previousElement && currentElement) {
                    currentElement.parentNode.insertBefore(currentElement, previousElement.nextSibling);
                }
            }
            chart.previousID = options.id;
        }
        else {
            var series = element.series;
            var pointText = element.point.argsData.text;
            var textOffset = measureText(pointText, element.point.argsData.font, chart.themeStyle.datalabelFont);
            var padding = 10;
            var width = textOffset.width + padding + padding;
            var height = textOffset.height + padding + padding;
            var location_1 = { x: actual3DPosition.x, y: actual3DPosition.y };
            var xXalue = location_1.x - (padding) / 2 + (padding) / 2;
            var yValue = location_1.y - (padding) / 2 - (height / padding) + (padding) / 2;
            var seriesIndex = series.index;
            this.dataLabelSymbol(seriesIndex, series, element, xXalue, yValue, width, height, chart);
        }
    };
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
    CircularChart3DPolygonModule.prototype.dataLabelSymbol = function (seriesIndex, series, dataElement, x, y, width, height, chart) {
        var path = 'M' + ' ' + (x + (-width / 2)) + ' ' +
            (y + (-height / 2)) + ' ' + 'L' + ' ' + (x + (width / 2)) +
            ' ' + (y + (-height / 2)) + ' ' + 'L' + ' ' + (x + (width / 2)) +
            ' ' + (y + (height / 2)) + ' ' + 'L' + ' ' + (x + (-width / 2)) +
            ' ' + (y + (height / 2)) + ' ' + 'L' + ' ' + (x + (-width / 2)) +
            ' ' + (y + (-height / 2)) + ' z';
        var transform = '';
        if (series.dataLabel.enableRotation) {
            var degree = void 0;
            var angle = degree = series.dataLabel.angle;
            if (angle === 0) {
                var toDegrees = function (angle) { return angle * (180 / Math.PI); };
                var midAngle = toDegrees(dataElement.point.symbolLocation.angle);
                if (series.dataLabel.position === 'Outside') {
                    degree = 0;
                }
                else if (midAngle >= 90 && midAngle <= 260) {
                    degree = midAngle + 180;
                }
                else {
                    degree = midAngle;
                }
            }
            else {
                degree = (angle > 360) ? angle - 360 : (angle < -360) ? angle + 360 : angle;
            }
            transform = 'rotate(' + degree + ',' + (x) + ',' + (y) + ')';
        }
        var rectOptions = {
            id: chart.element.id + '-svg' + '-data-label-series-' + seriesIndex + '-shape-' + dataElement.pointIndex,
            fill: dataElement.point.argsData.color,
            'stroke-width': dataElement.point.argsData.border.width,
            stroke: dataElement.point.argsData.border.color,
            'stroke-dasharray': dataElement.point.argsData.border.dashArray,
            opacity: 1,
            visibility: '',
            transform: transform,
            d: path
        };
        var element = chart.renderer.drawPath(rectOptions);
        chart.groupElement.append(element);
        if (chart.previousID && chart.isTouch) {
            var previousElement = document.getElementById(chart.previousID);
            var currentElement = document.getElementById(rectOptions.id);
            if (previousElement && currentElement) {
                currentElement.parentNode.insertBefore(currentElement, previousElement.nextSibling);
            }
        }
        chart.previousID = rectOptions.id;
    };
    /**
     * Draws a circular 3D polygon on the specified chart.
     *
     * @param {CircularChart3DPolygon} panel - The polygon to be drawn.
     * @param {CircularChart3D} chart - The circular 3D chart on which the polygon is to be drawn.
     * @returns {void}
     */
    CircularChart3DPolygonModule.prototype.draw = function (panel, chart) {
        if (panel.vectorPoints == null || panel.vectorPoints.length <= 0) {
            return;
        }
        var transform = circular3DRender.transform;
        var pathDirection = chart.svg3DRenderer.getStringBuilder();
        var color = panel.fill;
        var format = chart.svg3DRenderer.checkColorFormat(color);
        if (!format) {
            color = colorNameToHex(color);
        }
        var figure = { StartPoint: null };
        if (transform != null) {
            figure.StartPoint = chart.transform3D.toScreen(panel.vectorPoints[0], transform);
            pathDirection.append('M' + ' ' + (figure.StartPoint.x) + ' ' + (figure.StartPoint.y) + ' ');
            for (var i = 0; i < panel.vectorPoints.length; i++) {
                var lineSegment = chart.transform3D.toScreen(panel.vectorPoints[i], transform);
                pathDirection.append('L' + ' ' + (lineSegment.x) + ' ' + (lineSegment.y) + ' ');
            }
        }
        var direction = pathDirection.toString();
        var name = 'Light';
        var lightCoefficientZ = (2 * (Math.abs(this.vector.vector3DAdd(panel.normal, this.vector.vector3D(0, 0, 1))) - 1));
        var lightCoefficientY = (2 * (Math.abs(this.vector.vector3DAdd(panel.normal, this.vector.vector3D(0, 1, 0))) - 1));
        var lightCoefficientX = (2 * (Math.abs(this.vector.vector3DAdd(panel.normal, this.vector.vector3D(1, 0, 0))) - 1));
        if (panel.name && !(panel.name.indexOf('-wall-brush') > -1)) {
            if (lightCoefficientZ === lightCoefficientX) {
                name = 'ZLight';
                color = this.applyZLight(color, chart);
            }
            else if (((lightCoefficientY === lightCoefficientZ) || (lightCoefficientZ !== 0 && lightCoefficientY < lightCoefficientZ))) {
                name = 'XLight';
                color = this.applyXLight(color, chart);
            }
            else if (lightCoefficientZ < 0) {
                name = 'ZLight';
                color = this.applyZLight(color, chart);
            }
            else {
                name = 'Light';
            }
        }
        var options = {
            'id': chart.element.id + '-svg-' + panel.name,
            'name': name,
            'fill': color,
            'stroke': '',
            'stroke-width': panel.strokeThickness,
            'opacity': panel.opacity,
            'd': direction
        };
        var element = chart.renderer.drawPath(options);
        if (panel.text) {
            element.setAttribute('aria-label', panel.text);
            element.setAttribute('role', 'img');
        }
        appendChildElement(false, panel.polygonElement.parent, element, chart.redraw, true, 'x', 'y', null, direction);
        if (chart.previousID && chart.isTouch) {
            var previousElement = document.getElementById(chart.previousID);
            var currentElement = document.getElementById(options.id);
            if (previousElement && currentElement) {
                currentElement.parentNode.insertBefore(currentElement, previousElement.nextSibling);
            }
        }
        chart.previousID = options.id;
    };
    /**
     * Draws text on the specified circular 3D chart panel.
     *
     * @param {CircularChart3DPolygon} panel - The circular 3D polygon representing the panel on which the text will be drawn.
     * @param {CircularChart3D} chart - The circular 3D chart to which the panel belongs.
     * @returns {void}
     */
    CircularChart3DPolygonModule.prototype.drawTemplate = function (panel, chart) {
        var element = panel.element;
        var transform = circular3DRender.transform;
        if (transform == null) {
            return;
        }
        var label = element.label;
        var actual3DPosition = chart.transform3D.toScreen(panel.vectorPoints[0], transform);
        chart.circularChartDataLabel3DModule.createDataLabelTemplate(label.series.dataLabelElement, label.series, label.series.dataLabel, label.series.points[label.pointIndex], label.series.points[label.pointIndex].argsData, label.pointIndex, false, actual3DPosition, chart);
    };
    /**
     * Applies a lightening effect to the given color by reducing its red, green, and blue components.
     *
     * @param {string} color - The input color in hexadecimal format.
     * @param {CircularChart3D} chart - The circular 3D chart associated with the color.
     * @returns {string} - The lightened color in hexadecimal format.
     */
    CircularChart3DPolygonModule.prototype.applyXLight = function (color, chart) {
        var RGB = chart.svg3DRenderer.hexToValue(color);
        RGB.red = parseInt((RGB.red * 0.7).toString(), 10);
        RGB.green = parseInt((RGB.green * 0.7).toString(), 10);
        RGB.blue = parseInt((RGB.blue * 0.7).toString(), 10);
        return chart.svg3DRenderer.hexColor(RGB);
    };
    /**
     * Applies a lightening effect to the given color by reducing its red, green, and blue components with a focus on the Z-axis.
     *
     * @param {string} color - The input color in hexadecimal format.
     * @param {CircularChart3D} chart - The circular 3D chart associated with the color.
     * @returns {string} - The lightened color in hexadecimal format.
     */
    CircularChart3DPolygonModule.prototype.applyZLight = function (color, chart) {
        var RGB = chart.svg3DRenderer.hexToValue(color);
        RGB.red = parseInt((RGB.red * 0.9).toString(), 10);
        RGB.green = parseInt((RGB.green * 0.9).toString(), 10);
        RGB.blue = parseInt((RGB.blue * 0.9).toString(), 10);
        return chart.svg3DRenderer.hexColor(RGB);
    };
    return CircularChart3DPolygonModule;
}());
export { CircularChart3DPolygonModule };
var vector = new CircularChart3DVectorModule(0, 0, 0);
var matrixObj = new CircularChart3DMatrix();
var bspTreeObj = new CircularChart3DBinaryTreeBuilder();
var polygonObj = new CircularChart3DPolygonModule();
