import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StepModel } from '@syncfusion/ej2-navigations';
/**
 * `StepDirective` represents a step of the React Stepper.
 * It must be contained in a Stepper component(`StepperComponent`).
 * ```tsx
 * <StepperComponent>
 *  <StepsDirective>
 *   <StepDirective iconCss= { 'e-icons e-folder' } text= { 'Step 1' } />
 *   <StepDirective iconCss= { 'e-icons e-folder' } text= { 'Step 2' } />
 *  </StepsDirective>
 * </StepperComponent>
 * ```
 */
export declare class StepDirective extends ComplexBase<StepModel & {
    children?: React.ReactNode;
}, StepModel> {
    static moduleName: string;
}
export declare class StepsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
