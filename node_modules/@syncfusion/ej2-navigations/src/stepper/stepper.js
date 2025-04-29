var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../stepper-base/stepper-base-model.d.ts'/>
import { attributes, NotifyPropertyChanges, L10n, append, isNullOrUndefined, getUniqueID, Complex, KeyboardEvents, ChildProperty, Property, EventHandler, Event, addClass, remove, removeClass, initializeCSPTemplate, select, compile } from '@syncfusion/ej2-base';
import { StepperBase, StepStatus } from '../stepper-base/stepper-base';
import { Tooltip } from '@syncfusion/ej2-popups';
var ITEMCONTAINER = 'e-step-container';
var ITEMLIST = 'e-stepper-steps';
var ICONCSS = 'e-indicator';
var TEXTCSS = 'e-step-text-container';
var STEPLABEL = 'e-step-label-container';
var OPTIONAL = 'e-step-label-optional';
var SELECTED = 'e-step-selected';
var INPROGRESS = 'e-step-inprogress';
var NOTSTARTED = 'e-step-notstarted';
var FOCUS = 'e-step-focus';
var COMPLETED = 'e-step-completed';
var DISABLED = 'e-step-disabled';
var READONLY = 'e-stepper-readonly';
var PROGRESSVALUE = '--progress-value';
var RTL = 'e-rtl';
var TEMPLATE = 'e-step-template';
var LABELAFTER = 'e-label-after';
var LABELBEFORE = 'e-label-before';
var VERTICALSTEP = 'e-vertical';
var HORIZSTEP = 'e-horizontal';
var STEPICON = 'e-step-item';
var STEPTEXT = 'e-step-text';
var TEXT = 'e-text';
var STEPSLABEL = 'e-step-label';
var LABEL = 'e-label';
var STEPINDICATOR = 'e-step-type-indicator';
var LABELINDICATOR = 'e-step-type-label';
var INDICATORICON = 'e-step-indicator';
var STEPPERTOOLTIP = 'e-stepper-tooltip';
var STEPPERIPROGRESSTIP = 'e-step-inprogress-tip';
var LINEARSTEP = 'e-linear';
var PREVSTEP = 'e-previous';
var NEXTSTEP = 'e-next';
/**
 * Defines the step progress animation of the Stepper.
 */
var StepperAnimationSettings = /** @class */ (function (_super) {
    __extends(StepperAnimationSettings, _super);
    function StepperAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], StepperAnimationSettings.prototype, "enable", void 0);
    __decorate([
        Property(2000)
    ], StepperAnimationSettings.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], StepperAnimationSettings.prototype, "delay", void 0);
    return StepperAnimationSettings;
}(ChildProperty));
export { StepperAnimationSettings };
/**
 * Defines the label position in the Stepper.
 */
export var StepLabelPosition;
(function (StepLabelPosition) {
    /**
     * Displays the label on top position regardless of the Stepper's orientation.
     */
    StepLabelPosition["Top"] = "Top";
    /**
     * Displays the label on bottom position regardless of the Stepper's orientation.
     */
    StepLabelPosition["Bottom"] = "Bottom";
    /**
     * Displays the label on left side regardless of the Stepper's orientation.
     */
    StepLabelPosition["Start"] = "Start";
    /**
     * Displays the label on right side regardless of the Stepper's orientation.
     */
    StepLabelPosition["End"] = "End";
})(StepLabelPosition || (StepLabelPosition = {}));
/**
 * Defines whether steps are display with only indicator, only labels or combination of both.
 */
export var StepType;
(function (StepType) {
    /**
     * Steps are shown indicator with label defined.
     */
    StepType["Default"] = "Default";
    /**
     * Steps are shown with only label.
     */
    StepType["Label"] = "Label";
    /**
     * Steps are shown with only indicator.
     */
    StepType["Indicator"] = "Indicator";
})(StepType || (StepType = {}));
/**
 * The Stepper component visualizes several steps and indicates the current progress by highlighting already completed steps.
 *
 * ```html
 * <nav id="stepper"></nav>
 * ```
 * ```typescript
 * <script>
 *   let stepperObj: Stepper = new Stepper({steps : [{}, {}, {}, {}, {}]});
 *   stepperObj.appendTo('#stepper');
 * </script>
 * ```
 */
var Stepper = /** @class */ (function (_super) {
    __extends(Stepper, _super);
    /**
     * * Constructor for creating the Stepper component.
     *
     * @param {StepperModel} options - Specifies the Stepper model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function Stepper(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.stepperItemElements = [];
        return _this;
    }
    Stepper.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        var localeText = { optional: 'Optional' };
        this.l10n = new L10n('stepper', localeText, this.locale);
        this.keyConfigs = {
            downarrow: 'downarrow',
            leftarrow: 'leftarrow',
            rightarrow: 'rightarrow',
            uparrow: 'uparrow',
            space: 'space',
            enter: 'enter',
            home: 'home',
            end: 'end',
            tab: 'tab',
            shiftTab: 'shift+tab',
            escape: 'escape'
        };
        this.tooltipOpen = false;
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    Stepper.prototype.getModuleName = function () {
        return 'stepper';
    };
    Stepper.prototype.render = function () {
        this.initialize();
        this.navigationHandler(this.activeStep, null, false);
        this.updateStepperStatus(true);
    };
    Stepper.prototype.initialize = function () {
        this.element.setAttribute('aria-label', this.element.id);
        this.updatePosition();
        this.stepperItemList = this.createElement('ol', { className: ITEMLIST });
        this.updateOrientaion(this.element);
        this.updateStepType();
        this.element.appendChild(this.stepperItemList);
        if (this.cssClass) {
            addClass([this.element], this.cssClass.trim().split(' '));
        }
        if (this.readOnly) {
            this.element.classList.add(READONLY);
        }
        if (this.enableRtl) {
            this.element.classList.add(RTL);
        }
        this.wireEvents();
        this.updateTemplateFunction();
        this.renderItems();
        if (this.steps.length > 0) {
            this.initiateProgressBar();
            this.checkValidStep();
            this.updateAnimation();
            this.updateTooltip();
            this.wireKeyboardEvent();
        }
    };
    Stepper.prototype.initiateProgressBar = function () {
        var _this = this;
        if (this.steps.length > 1) {
            if (this.isAngular && this.template) {
                setTimeout(function () { _this.renderProgressBar(_this.element); });
            }
            else {
                this.renderProgressBar(this.element);
            }
        }
    };
    Stepper.prototype.updatePosition = function () {
        this.progressBarPosition = this.beforeLabelWidth = this.textEleWidth = 0;
    };
    Stepper.prototype.renderDefault = function (index) {
        var step = this.steps[parseInt(index.toString(), 10)];
        return !step.iconCss && !step.text && !step.label;
    };
    Stepper.prototype.updateAnimation = function () {
        var progressEle = this.element.querySelector('.e-progressbar-value');
        if (this.animation.enable) {
            if (this.animation.duration >= 0) {
                if (progressEle) {
                    progressEle.style.setProperty('--duration', ((this.animation.duration) + 'ms'));
                }
            }
            if (this.animation.delay >= 0) {
                if (progressEle) {
                    progressEle.style.setProperty('--delay', ((this.animation.delay) + 'ms'));
                }
            }
        }
        else {
            if (progressEle) {
                progressEle.style.setProperty('--delay', (0 + 'ms'));
                progressEle.style.setProperty('--duration', (0 + 'ms'));
            }
        }
    };
    Stepper.prototype.updateStepType = function () {
        if (!isNullOrUndefined(this.stepType)) {
            var stepTypeLower = this.stepType.toLowerCase();
            var validStepTypes = ['indicator', 'label', 'default'];
            if (validStepTypes.indexOf(stepTypeLower) !== -1) {
                if (stepTypeLower !== 'default') {
                    this.element.classList.add('e-step-type-' + stepTypeLower);
                }
                if ((stepTypeLower === 'indicator' || stepTypeLower === 'label') && this.labelContainer) {
                    this.clearLabelPosition();
                }
            }
        }
    };
    Stepper.prototype.wireEvents = function () {
        EventHandler.add(window, 'resize', this.updateResize, this);
        EventHandler.add(window, 'click', this.updateStepFocus, this);
    };
    Stepper.prototype.unWireEvents = function () {
        EventHandler.remove(window, 'resize', this.updateResize);
        EventHandler.remove(window, 'click', this.updateStepFocus);
    };
    Stepper.prototype.updateResize = function () {
        if (this.stepperItemList && this.progressbar && this.element.classList.contains(HORIZSTEP)) {
            this.setProgressPosition(this.element, true);
        }
        this.navigateToStep(this.activeStep, null, null, false, false);
    };
    Stepper.prototype.updateStepFocus = function () {
        if (this.isKeyNavFocus) {
            this.isKeyNavFocus = false;
            var isFocus = this.element.querySelector('.' + FOCUS);
            if (isFocus) {
                isFocus.classList.remove(FOCUS);
                this.element.classList.remove('e-steps-focus');
            }
        }
    };
    Stepper.prototype.updateStepperStatus = function (isInitial) {
        for (var index = 0; index < this.steps.length; index++) {
            var item = this.steps[parseInt(index.toString(), 10)];
            var status_1 = item.status.toLowerCase();
            if (isInitial && this.activeStep === 0 && index === 0) {
                var prevOnChange = this.isProtectedOnChange;
                this.isProtectedOnChange = true;
                item.status = StepStatus.InProgress;
                this.isProtectedOnChange = prevOnChange;
            }
            if (item && status_1 !== 'notstarted' && index === this.activeStep) {
                for (var i = 0; i < this.steps.length; i++) {
                    var itemElement = this.stepperItemElements[parseInt(i.toString(), 10)];
                    itemElement.classList.remove(SELECTED, INPROGRESS, COMPLETED, NOTSTARTED);
                    var prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    if (status_1 === 'completed') {
                        this.updateStatusClass(i, index, itemElement);
                    }
                    else {
                        this.updateStatusClass(i, index, itemElement, true);
                    }
                    this.isProtectedOnChange = prevOnChange;
                }
            }
            else if (item && status_1 !== 'notstarted' && index !== this.activeStep) {
                this.navigationHandler(this.activeStep, null, true);
            }
        }
    };
    Stepper.prototype.updateStatusClass = function (currentStep, index, ele, isInprogress) {
        var stepItem = this.steps[parseInt(currentStep.toString(), 10)];
        if (currentStep < index) {
            ele.classList.add(COMPLETED);
            stepItem.status = StepStatus.Completed;
        }
        else if (currentStep === index) {
            ele.classList.add(isInprogress ? INPROGRESS : COMPLETED, SELECTED);
        }
        else {
            ele.classList.add(NOTSTARTED);
        }
    };
    Stepper.prototype.renderItems = function () {
        var _this = this;
        var _a;
        var isHorizontal = this.element.classList.contains(HORIZSTEP);
        var isVertical = this.element.classList.contains(VERTICALSTEP);
        var labelPositionLower = !isNullOrUndefined(this.labelPosition) ? this.labelPosition.toLowerCase() : '';
        for (var index = 0; index < this.steps.length; index++) {
            this.stepperItemContainer = this.createElement('li', { className: ITEMCONTAINER });
            var stepSpan = this.createElement('span', { className: 'e-step' });
            var item = this.steps[parseInt(index.toString(), 10)];
            var isItemLabel = item.label ? true : false;
            var isItemText = item.text ? true : false;
            var isIndicator = this.element.classList.contains(STEPINDICATOR);
            this.stepperItemContainer.classList[(index === 0) ? 'add' : 'remove'](SELECTED, INPROGRESS);
            this.stepperItemContainer.classList[(index !== 0) ? 'add' : 'remove'](NOTSTARTED);
            if (isHorizontal) {
                this.stepperItemContainer.style.setProperty('--max-width', 100 / this.steps.length + '%');
            }
            if (this.renderDefault(index) && (isNullOrUndefined(this.template) || this.template === '')) {
                var isIndicator_1 = !this.element.classList.contains('e-step-type-default') && this.stepType.toLowerCase() === 'indicator';
                if (isIndicator_1) {
                    stepSpan.classList.add('e-icons', INDICATORICON);
                }
                if (!isIndicator_1 && item.isValid == null) {
                    stepSpan.classList.add('e-step-content');
                    stepSpan.innerHTML = (index + 1).toString();
                }
                this.stepperItemContainer.appendChild(stepSpan);
            }
            else if (isNullOrUndefined(this.template) || this.template === '') {
                var isRender = true;
                if ((item.iconCss || (!item.iconCss && isItemText && isItemLabel)) && (((!isItemText && !isItemLabel) ||
                    !this.element.classList.contains(LABELINDICATOR)))) {
                    if (item.iconCss) {
                        var itemIcon = item.iconCss.trim().split(' ');
                        (_a = stepSpan.classList).add.apply(_a, [ICONCSS].concat(itemIcon));
                        this.stepperItemContainer.classList.add(STEPICON);
                    }
                    else if (!item.iconCss && isItemText && isItemLabel) {
                        stepSpan.classList.add(ICONCSS);
                        stepSpan.innerHTML = item.text;
                        this.stepperItemContainer.classList.add(STEPICON);
                    }
                    this.stepperItemContainer.appendChild(stepSpan);
                    if (((isHorizontal && (labelPositionLower === 'start' || labelPositionLower === 'end') && isItemLabel) ||
                        (isVertical && (labelPositionLower === 'top' || labelPositionLower === 'bottom') && isItemLabel)) && !isIndicator) {
                        this.element.classList.add('e-label-' + labelPositionLower);
                        this.createTextLabelElement(item.label);
                        isRender = false;
                    }
                }
                if (isItemText && (!item.iconCss || !isIndicator) && isRender &&
                    !(item.iconCss && isItemLabel)) {
                    if ((!item.iconCss && isIndicator) ||
                        ((!item.iconCss || this.element.classList.contains(LABELINDICATOR)) && !isItemLabel)) {
                        if (!item.iconCss && !isItemLabel) {
                            this.element.classList.add('e-step-type-indicator');
                        }
                        this.checkValidState(item, stepSpan);
                        isItemLabel = false;
                    }
                    else {
                        if (!isItemLabel) {
                            this.createTextLabelElement(item.text);
                        }
                        if (isItemLabel && this.element.classList.contains(LABELINDICATOR)) {
                            var textSpan = this.createElement('span', { className: TEXT });
                            textSpan.innerText = item.label;
                        }
                        isItemText = isItemLabel ? false : true;
                    }
                }
                if (isItemLabel && isItemLabel && (!item.iconCss || !isIndicator) && isRender) {
                    if (!item.iconCss && !isItemText && isIndicator) {
                        this.checkValidState(item, stepSpan, true);
                    }
                    else if ((!((this.element.classList.contains(LABELINDICATOR)) && isItemText)) ||
                        (this.element.classList.contains(LABELINDICATOR) && isItemLabel)) {
                        this.createTextLabelElement(item.label, true);
                        this.updateLabelPosition();
                        if ((!item.iconCss && !isItemText && !this.stepperItemContainer.classList.contains(STEPICON)) ||
                            this.element.classList.contains(LABELINDICATOR)) {
                            this.stepperItemContainer.classList.add('e-step-label-only');
                            if (item.isValid !== null) {
                                var iconSpan = this.createElement('span', { className: 'e-step-validation-icon e-icons' });
                                this.labelContainer.appendChild(iconSpan);
                            }
                        }
                    }
                }
            }
            if (item.optional) {
                var optionalSpan = this.createElement('span', { className: OPTIONAL });
                this.l10n.setLocale(this.locale);
                var optionalContent = this.l10n.getConstant('optional');
                optionalSpan.innerText = optionalContent;
                if (isItemLabel && (this.labelContainer && ((this.element.classList.contains(LABELAFTER) && !this.stepperItemContainer.classList.contains('e-step-label-only'))
                    || (isHorizontal && this.element.classList.contains(LABELBEFORE) && !this.stepperItemContainer.classList.contains('e-step-label-only'))))
                    || (isVertical && this.element.classList.contains(LABELBEFORE))) {
                    this.labelContainer.appendChild(optionalSpan);
                }
                else {
                    this.stepperItemContainer.appendChild(optionalSpan);
                }
                if (item.isValid !== null) {
                    this.stepperItemContainer.classList.add(item.isValid ? 'e-step-valid' : 'e-step-error');
                }
            }
            if (item.cssClass) {
                addClass([this.stepperItemContainer], item.cssClass.trim().split(' '));
            }
            if (item.disabled) {
                this.stepperItemContainer.classList[item.disabled ? 'add' : 'remove'](DISABLED);
                attributes(this.stepperItemContainer, { 'tabindex': '-1', 'aria-disabled': 'true' });
            }
            if (item.isValid !== null) {
                if (item.isValid) {
                    this.stepperItemContainer.classList.add('e-step-valid');
                }
                else {
                    this.stepperItemContainer.classList.add('e-step-error');
                }
            }
            this.renderItemContent(index, false);
            if (this.stepperItemContainer.classList.contains(INPROGRESS)) {
                attributes(this.stepperItemContainer, { 'tabindex': '0', 'aria-current': 'true' });
            }
            else {
                attributes(this.stepperItemContainer, { 'tabindex': '-1' });
            }
            this.wireItemsEvents(this.stepperItemContainer, index);
            this.stepperItemElements.push(this.stepperItemContainer);
            var eventArgs = { element: this.stepperItemContainer, index: index };
            this.trigger('beforeStepRender', eventArgs, function (args) {
                _this.stepperItemList.appendChild(args.element);
            });
            if (isVertical) {
                if (this.isAngular && this.template) {
                    setTimeout(function () { _this.calculateProgressBarPosition(); });
                }
                else {
                    this.calculateProgressBarPosition();
                }
            }
        }
        if (isVertical) {
            if (this.element.classList.contains(LABELBEFORE)) {
                var listItems = this.stepperItemList.querySelectorAll('.' + LABEL);
                for (var i = 0; i < listItems.length; i++) {
                    var labelEle = listItems[parseInt((i).toString(), 10)];
                    labelEle.style.setProperty('--label-width', (this.beforeLabelWidth) + 5 + 'px');
                }
            }
        }
    };
    Stepper.prototype.createTextLabelElement = function (content, isLabelEle) {
        if (isLabelEle === void 0) { isLabelEle = false; }
        var spanEle = this.createElement('span', { className: isLabelEle ? LABEL : TEXTCSS + " " + TEXT });
        spanEle.innerText = content;
        if (isLabelEle) {
            this.labelContainer = this.createElement('span', { className: STEPLABEL });
            this.labelContainer.appendChild(spanEle);
        }
        else {
            this.stepperItemContainer.appendChild(spanEle);
        }
        this.stepperItemContainer.classList.add(isLabelEle ? STEPSLABEL : STEPTEXT);
    };
    Stepper.prototype.calculateProgressBarPosition = function () {
        var isBeforeLabel = (this.element.classList.contains(LABELBEFORE)) ? true : false;
        var iconOnly = (this.stepperItemContainer.classList.contains(STEPICON) &&
            !this.stepperItemContainer.classList.contains(STEPTEXT) &&
            !this.stepperItemContainer.classList.contains(STEPSLABEL));
        var textEle = (this.stepperItemContainer.querySelector('.' + TEXTCSS));
        if (textEle) {
            this.textEleWidth = this.textEleWidth < textEle.offsetWidth ? textEle.offsetWidth : this.textEleWidth;
        }
        if (isBeforeLabel) {
            var labelWidth = this.stepperItemContainer.querySelector('.' + LABEL).offsetWidth + 15;
            this.beforeLabelWidth = Math.max(this.beforeLabelWidth, labelWidth);
            var iconEle = this.element.querySelector('ol').lastChild.querySelector('.' + ICONCSS);
            var textEle_1 = this.stepperItemContainer.querySelector('.' + TEXTCSS);
            if (iconEle || textEle_1) {
                var itemWidth = this.beforeLabelWidth + ((this.stepperItemContainer.querySelector('.' + ICONCSS)
                    || textEle_1).offsetWidth / 2);
                this.progressBarPosition = Math.max(this.progressBarPosition, itemWidth);
            }
            else {
                this.progressBarPosition = Math.max(this.progressBarPosition, (this.beforeLabelWidth / 2));
            }
        }
        else {
            var lastChild = this.element.querySelector('ol').lastChild;
            var lastChildWidth = iconOnly ? this.stepperItemContainer.offsetWidth :
                lastChild.firstChild.offsetWidth;
            this.progressBarPosition = Math.max(this.progressBarPosition, lastChildWidth);
        }
    };
    Stepper.prototype.checkValidState = function (item, stepSpan, isLabel) {
        if (item.isValid == null) {
            stepSpan.classList.add('e-step-content');
            if (isLabel) {
                stepSpan.innerHTML = item.label;
            }
            else {
                stepSpan.innerHTML = item.label ? item.label : item.text;
            }
            this.stepperItemContainer.appendChild(stepSpan);
        }
        else {
            stepSpan.classList.add(ICONCSS);
            this.stepperItemContainer.appendChild(stepSpan);
            this.stepperItemContainer.classList.add(STEPICON);
        }
    };
    Stepper.prototype.updateCurrentLabel = function () {
        var labelPos = this.labelPosition.toLowerCase();
        var currentLabelPos = this.element.classList.contains(HORIZSTEP)
            ? (labelPos === 'top' ? 'before' : labelPos === 'bottom' ? 'after' : labelPos)
            : (labelPos === 'start' ? 'before' : labelPos === 'end' ? 'after' : labelPos);
        return currentLabelPos;
    };
    Stepper.prototype.updateLabelPosition = function () {
        this.clearLabelPosition();
        this.labelContainer.classList.add('e-label-' + this.updateCurrentLabel());
        if (this.labelPosition.toLowerCase() === 'start' && this.orientation.toLowerCase() === 'vertical') {
            if (this.stepperItemContainer.firstChild) {
                this.stepperItemContainer.firstChild.before(this.labelContainer);
            }
            else {
                this.stepperItemContainer.appendChild(this.labelContainer);
            }
        }
        else {
            this.stepperItemContainer.appendChild(this.labelContainer);
        }
        this.element.classList.add('e-label-' + this.updateCurrentLabel());
    };
    Stepper.prototype.clearLabelPosition = function () {
        var removeCss = this.labelContainer.classList.value.match(/(e-label-[after|before]+)/g);
        if (removeCss) {
            removeClass([this.labelContainer], removeCss);
            removeClass([this.element], removeCss);
        }
    };
    Stepper.prototype.checkValidStep = function () {
        var isStepIndicator = this.element.classList.contains(STEPINDICATOR);
        var _loop_1 = function (index) {
            var item = this_1.steps[parseInt(index.toString(), 10)];
            var itemElement = this_1.stepperItemElements[parseInt(index.toString(), 10)];
            if (item.isValid !== null) {
                var indicatorEle = void 0;
                var iconEle_1;
                if (isStepIndicator && !item.iconCss) {
                    indicatorEle = itemElement.querySelector('.' + ICONCSS);
                }
                else {
                    iconEle_1 = itemElement.querySelector('.' + ICONCSS);
                }
                if (!indicatorEle && isStepIndicator && this_1.renderDefault(index)) {
                    indicatorEle = itemElement.querySelector('.' + INDICATORICON);
                }
                var textLabelIcon = itemElement.querySelector('.e-step-validation-icon');
                var itemIcon = item.iconCss.trim().split(' ');
                var validStep = itemElement.classList.contains('e-step-valid');
                var validIconClass = validStep ? 'e-check' : 'e-circle-info';
                if (indicatorEle) {
                    indicatorEle.classList.remove(INDICATORICON);
                    if (indicatorEle.innerHTML !== '') {
                        indicatorEle.innerHTML = '';
                    }
                    indicatorEle.classList.add('e-icons', validIconClass, ICONCSS);
                }
                if (this_1.renderDefault(index) && !isStepIndicator) {
                    var stepSpan = itemElement.querySelector('.e-step');
                    stepSpan.classList.add('e-icons', validIconClass, ICONCSS);
                }
                if (iconEle_1) {
                    if (iconEle_1.innerHTML !== '') {
                        iconEle_1.innerHTML = '';
                    }
                    else if (itemIcon.length > 0) {
                        itemIcon.forEach(function (icon) { iconEle_1.classList.remove(icon); });
                    }
                    iconEle_1.classList.add('e-icons', validIconClass);
                }
                if (textLabelIcon) {
                    textLabelIcon.classList.add(validStep ? 'e-circle-check' : 'e-circle-info');
                    if (this_1.element.classList.contains(VERTICALSTEP)) {
                        var labelEle = itemElement.querySelector('.' + LABEL);
                        var textEle = itemElement.querySelector('.' + TEXT);
                        var itemWidth = textEle ? textEle.offsetWidth + textEle.getBoundingClientRect().left :
                            labelEle.offsetWidth + labelEle.getBoundingClientRect().left;
                        var validationIcon = itemElement.querySelector('.e-step-validation-icon');
                        validationIcon.style.setProperty('--icon-position', (itemWidth + 20) + 'px');
                    }
                }
            }
        };
        var this_1 = this;
        for (var index = 0; index < this.steps.length; index++) {
            _loop_1(index);
        }
    };
    Stepper.prototype.updateTooltip = function () {
        if (this.showTooltip) {
            this.tooltipObj = new Tooltip({
                target: '.e-step-container', windowCollision: true,
                opensOn: 'Custom', cssClass: this.cssClass ? (STEPPERTOOLTIP + ' ' + this.cssClass) : STEPPERTOOLTIP,
                position: 'TopCenter'
            });
            this.tooltipObj.appendTo(this.stepperItemList);
        }
        else {
            if (!isNullOrUndefined(this.tooltipObj)) {
                this.tooltipObj.destroy();
                this.tooltipObj = null;
            }
        }
    };
    Stepper.prototype.wireItemsEvents = function (itemElement, index) {
        EventHandler.add(itemElement, 'click', this.linearModeHandler.bind(this, itemElement, index), this);
        EventHandler.add(itemElement, 'mouseover', this.openStepperTooltip.bind(this, index), this);
        EventHandler.add(itemElement, 'mouseleave', this.closeStepperTooltip, this);
    };
    Stepper.prototype.unWireItemsEvents = function () {
        for (var index = 0; index < this.steps.length; index++) {
            var itemElement = this.stepperItemElements[parseInt(index.toString(), 10)];
            EventHandler.remove(itemElement, 'click', this.linearModeHandler.bind(this, itemElement, index));
            EventHandler.remove(itemElement, 'mouseover', this.openStepperTooltip.bind(this, index));
            EventHandler.remove(itemElement, 'mouseleave', this.closeStepperTooltip);
        }
    };
    Stepper.prototype.linearModeHandler = function (itemElement, index, e) {
        if (this.linear) {
            var linearModeValue = index - this.activeStep;
            if (Math.abs(linearModeValue) === 1) {
                this.stepClickHandler(index, e, itemElement);
            }
        }
        else {
            this.stepClickHandler(index, e, itemElement);
        }
    };
    Stepper.prototype.openStepperTooltip = function (index) {
        var currentStep = this.steps[parseInt(index.toString(), 10)];
        if (this.showTooltip && (currentStep.label || currentStep.text)) {
            if (!this.tooltipOpen) {
                this.updateTooltipContent(index);
                this.tooltipObj.open(this.stepperItemElements[parseInt((index).toString(), 10)]);
                if (this.stepType.toLocaleLowerCase() !== 'label' && ((this.stepType.toLocaleLowerCase() === 'indicator') ||
                    (currentStep.label !== '' && currentStep.iconCss !== '') || (currentStep.label === null && currentStep.iconCss === '' && currentStep.text !== ''))) {
                    var tooltipPopupClass = currentStep.status.toLowerCase() === 'inprogress' ?
                        STEPPERTOOLTIP + " " + STEPPERIPROGRESSTIP + " " + (this.cssClass ? this.cssClass : '') : STEPPERTOOLTIP + " " + (this.cssClass ? this.cssClass : '');
                    this.tooltipObj.setProperties({ cssClass: tooltipPopupClass.trim() });
                }
                this.tooltipOpen = true;
            }
        }
    };
    Stepper.prototype.closeStepperTooltip = function () {
        if (this.tooltipOpen) {
            this.tooltipObj.close();
            this.tooltipOpen = false;
        }
    };
    Stepper.prototype.updateTooltipContent = function (index) {
        if (this.showTooltip) {
            if (this.isReact) {
                this.clearTemplate(['stepperTooltipTemplate']);
            }
            var content = void 0;
            var currentStep = this.steps[parseInt(index.toString(), 10)];
            if (this.tooltipTemplate) {
                content = this.createElement('span', { className: 'e-stepper-tooltip-content' });
                var templateFunction = this.getTemplateFunction(this.tooltipTemplate);
                append(templateFunction({ value: currentStep }, this, 'stepperTooltipTemplate', (this.element.id + 'tooltipTemplate'), this.isStringTemplate), content);
                this.tooltipObj.setProperties({ content: content }, true);
            }
            else {
                var content_1 = currentStep.label ? currentStep.label : currentStep.text;
                this.tooltipObj.setProperties({ content: initializeCSPTemplate(function () { return content_1; }) }, true);
            }
            this.renderReactTemplates();
        }
    };
    Stepper.prototype.stepClickHandler = function (index, e, itemElement) {
        var clickEventArgs = {
            element: itemElement, event: e, previousStep: this.activeStep,
            activeStep: index
        };
        this.trigger('stepClick', clickEventArgs);
        this.navigateToStep(index, e, itemElement, true);
    };
    Stepper.prototype.updateTemplateFunction = function () {
        this.templateFunction = this.template ? this.getTemplateFunction(this.template) : null;
    };
    Stepper.prototype.renderItemContent = function (index, isrerender) {
        var listItems = this.stepperItemList.querySelectorAll('li');
        if (isrerender) {
            this.removeItemContent(listItems[parseInt((index).toString(), 10)]);
        }
        if (this.template) {
            if (isrerender) {
                listItems[parseInt((index).toString(), 10)].classList.add(TEMPLATE);
            }
            else {
                this.stepperItemContainer.classList.add(TEMPLATE);
            }
            var item = this.steps[parseInt(index.toString(), 10)];
            append(this.templateFunction({ step: item, currentStep: index }, this, 'stepperTemplate', (this.element.id + '_stepperTemplate'), this.isStringTemplate), isrerender ? listItems[parseInt((index).toString(), 10)] : this.stepperItemContainer);
        }
        this.renderReactTemplates();
    };
    Stepper.prototype.removeItemContent = function (ele) {
        ele.classList.remove(TEMPLATE);
        var firstChild = ele.firstElementChild;
        for (var i = 0; i < ele.childElementCount; i++) {
            firstChild.remove();
        }
    };
    Stepper.prototype.updateContent = function () {
        if (this.isReact) {
            this.clearTemplate(['stepperTemplate']);
        }
        for (var i = 0; i < this.steps.length; i++) {
            this.renderItemContent(i, true);
        }
    };
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    Stepper.prototype.getTemplateFunction = function (template) {
        if (typeof template === 'string') {
            var content = '';
            try {
                var tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                }
                else {
                    content = template;
                }
            }
            catch (e) {
                content = template;
            }
            return compile(content);
        }
        else {
            /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
            return compile(template);
        }
    };
    Stepper.prototype.navigateToStep = function (index, e, itemElement, isInteracted, isUpdated) {
        var _this = this;
        var eventArgs = {
            element: itemElement, event: e, isInteracted: isInteracted,
            previousStep: this.activeStep, activeStep: index, cancel: false
        };
        if (isUpdated !== false) {
            var previousStep_1 = this.activeStep;
            this.trigger('stepChanging', eventArgs, function (args) {
                if (args.cancel) {
                    return;
                }
                _this.navigationHandler(index);
                var eventArgs = {
                    element: itemElement, event: e, isInteracted: isInteracted,
                    previousStep: previousStep_1, activeStep: _this.activeStep
                };
                _this.trigger('stepChanged', eventArgs);
            });
        }
        else {
            this.navigationHandler(index);
        }
    };
    Stepper.prototype.navigationHandler = function (index, stepStatus, isUpdated) {
        index = Math.min(index, this.steps.length - 1);
        var Itemslength = this.stepperItemElements.length;
        if (index >= 0 && index < Itemslength - 1) {
            index = this.stepperItemElements[parseInt(index.toString(), 10)].classList.contains(DISABLED) ? this.activeStep : index;
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.activeStep = parseInt(index.toString(), 10);
        this.isProtectedOnChange = prevOnChange;
        for (var i = 0; i < this.steps.length; i++) {
            var itemElement = this.stepperItemElements[parseInt(i.toString(), 10)];
            var item = this.steps[parseInt(i.toString(), 10)];
            itemElement.classList.remove(SELECTED, INPROGRESS, COMPLETED, NOTSTARTED);
            if (i === this.activeStep) {
                itemElement.classList.add(SELECTED);
            }
            if (this.activeStep >= 0 && this.progressbar) {
                if (this.element.classList.contains(HORIZSTEP)) {
                    this.calculateProgressbarPos();
                }
                else {
                    this.progressbar.style.setProperty(PROGRESSVALUE, ((100 / (this.steps.length - 1)) * index) + '%');
                }
            }
            else if (this.activeStep < 0 && this.progressbar) {
                this.progressbar.style.setProperty(PROGRESSVALUE, 0 + '%');
            }
            if (i === this.activeStep) {
                itemElement.classList.add(INPROGRESS);
            }
            else if (this.activeStep > 0 && i < this.activeStep) {
                itemElement.classList.add(COMPLETED);
            }
            else {
                itemElement.classList.add(NOTSTARTED);
            }
            if (itemElement.classList.contains(INPROGRESS)) {
                attributes(itemElement, { 'tabindex': '0', 'aria-current': 'true' });
            }
            else {
                attributes(itemElement, { 'tabindex': '-1', 'aria-current': 'false' });
            }
            var prevOnChange_1 = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            if (isUpdated !== false) {
                if (i < this.activeStep || (this.steps.length - 1 === this.activeStep && item.status.toLowerCase() === 'completed')) {
                    item.status = StepStatus.Completed;
                }
                else if (i === this.activeStep) {
                    item.status = StepStatus.InProgress;
                }
                else if (i > this.activeStep) {
                    item.status = StepStatus.NotStarted;
                }
                if (stepStatus && this.activeStep === i) {
                    item.status = stepStatus;
                }
                if (item.status.toLowerCase() === 'completed') {
                    itemElement.classList.remove(SELECTED, INPROGRESS, NOTSTARTED);
                    itemElement.classList.add(COMPLETED);
                }
                if (item.status.toLowerCase() === 'notstarted') {
                    itemElement.classList.remove(SELECTED, INPROGRESS, COMPLETED);
                    itemElement.classList.add(NOTSTARTED);
                }
            }
            this.isProtectedOnChange = prevOnChange_1;
            this.updateIndicatorStatus(i, itemElement);
        }
        this.updateStepInteractions();
    };
    Stepper.prototype.calculateProgressbarPos = function () {
        var _this = this;
        if ((this.element.classList.contains(LABELBEFORE) || this.element.classList.contains(LABELAFTER)) &&
            !this.element.classList.contains(STEPINDICATOR) &&
            this.stepperItemElements[parseInt(this.activeStep.toString(), 10)].classList.contains(STEPICON)) {
            var progressPos = this.element.querySelector('.e-stepper-progressbar');
            var selectedEle = this.stepperItemElements[parseInt(this.activeStep.toString(), 10)]
                .firstChild;
            var value = this.activeStep === 0 ? 0 : (selectedEle.offsetLeft - progressPos.offsetLeft +
                (selectedEle.offsetWidth / 2)) / progressPos.offsetWidth * 100;
            if (this.element.classList.contains(RTL)) {
                value = (progressPos.getBoundingClientRect().right - selectedEle.getBoundingClientRect().right +
                    (selectedEle.offsetWidth / 2)) / progressPos.offsetWidth * 100;
                this.progressbar.style.setProperty(PROGRESSVALUE, (value) + '%');
            }
            else {
                this.progressbar.style.setProperty(PROGRESSVALUE, (value) + '%');
            }
        }
        else {
            var totalLiWidth_1 = 0;
            var activeLiWidth_1 = 0;
            this.stepperItemElements.forEach(function (element, index) {
                var itemWidth = element.offsetWidth;
                totalLiWidth_1 += itemWidth;
                if (index <= _this.activeStep) {
                    activeLiWidth_1 += (index === _this.activeStep && index !== 0) ? (itemWidth / 2) : itemWidth;
                }
            });
            var spaceWidth = (this.stepperItemList.offsetWidth - totalLiWidth_1) /
                (this.stepperItemElements.length - 1);
            var progressValue = ((activeLiWidth_1 + (spaceWidth * this.activeStep)) /
                this.stepperItemList.offsetWidth) * 100;
            this.progressbar.style.setProperty(PROGRESSVALUE, (progressValue) + '%');
        }
    };
    Stepper.prototype.updateIndicatorStatus = function (index, itemElement) {
        if (this.renderDefault(index) && this.element.classList.contains(STEPINDICATOR) && !itemElement.classList.contains('e-step-valid')
            && !itemElement.classList.contains('e-step-error')) {
            if (itemElement.classList.contains(COMPLETED)) {
                itemElement.firstChild.classList.remove('e-icons', 'e-step-indicator');
                itemElement.firstChild.classList.add(ICONCSS, 'e-icons', 'e-check');
            }
            else if (itemElement.classList.contains(INPROGRESS) || itemElement.classList.contains(NOTSTARTED)) {
                itemElement.firstChild.classList.remove(ICONCSS, 'e-icons', 'e-check');
                itemElement.firstChild.classList.add('e-icons', 'e-step-indicator');
            }
        }
    };
    Stepper.prototype.updateStepInteractions = function () {
        var _this = this;
        this.element.classList.toggle(LINEARSTEP, this.linear);
        this.stepperItemElements.forEach(function (step, index) {
            step.classList.toggle(PREVSTEP, (index === _this.activeStep - 1));
            step.classList.toggle(NEXTSTEP, (index === _this.activeStep + 1));
        });
    };
    Stepper.prototype.removeItemElements = function () {
        for (var i = 0; i < this.stepperItemElements.length; i++) {
            remove(this.stepperItemElements[parseInt(i.toString(), 10)]);
        }
        this.stepperItemElements = [];
    };
    /**
     * Move to next step from current step in Stepper.
     *
     * @returns {void}
     */
    Stepper.prototype.nextStep = function () {
        if (this.activeStep !== this.steps.length - 1) {
            this.navigateToStep(this.activeStep + 1, null, null, false);
        }
    };
    /**
     * Move to previous step from current step in Stepper.
     *
     * @returns {void}
     */
    Stepper.prototype.previousStep = function () {
        if (this.activeStep > 0) {
            this.navigateToStep(this.activeStep - 1, null, null, false);
        }
    };
    /**
     * Reset the state of the Stepper and move to the first step.
     *
     * @returns {void}
     */
    Stepper.prototype.reset = function () {
        if (this.activeStep === 0) {
            this.updateStepInteractions();
        }
        else {
            var isDisabled = this.stepperItemElements[0].classList.contains(DISABLED) ? true : false;
            this.navigateToStep(isDisabled ? -1 : 0, null, null, false);
        }
    };
    /**
     * Refreshes the position of the progress bar programmatically when the dimensions of the parent container are changed.
     *
     * @returns {void}
     */
    Stepper.prototype.refreshProgressbar = function () {
        if (this.stepperItemList && this.progressbar) {
            this.setProgressPosition(this.element);
        }
        this.navigateToStep(this.activeStep, null, null, false, false);
    };
    Stepper.prototype.updateElementClassArray = function () {
        var classArray = [RTL, READONLY, 'e-steps-focus', LABELAFTER, LABELBEFORE, 'e-label-top',
            'e-label-bottom', 'e-label-start', 'e-label-end', STEPINDICATOR, LABELINDICATOR, VERTICALSTEP, HORIZSTEP, LINEARSTEP];
        removeClass([this.element], classArray);
    };
    /**
     * Destroy the stepper control.
     *
     * @returns {void}
     */
    Stepper.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.unWireItemsEvents();
        // unwires the events and detach the li elements
        this.removeItemElements();
        this.clearTemplate();
        if (this.stepperItemList) {
            remove(this.stepperItemList);
        }
        this.stepperItemList = null;
        if (this.progressStep) {
            remove(this.progressStep);
        }
        this.progressStep = null;
        this.progressbar = null;
        this.progressBarPosition = null;
        this.stepperItemContainer = null;
        this.textContainer = null;
        this.labelContainer = null;
        this.updateElementClassArray();
        this.element.removeAttribute('aria-label');
        if (this.showTooltip) {
            this.tooltipObj.destroy();
            this.tooltipObj = null;
        }
        if (this.keyboardModuleStepper) {
            this.keyboardModuleStepper.destroy();
        }
        this.keyboardModuleStepper = null;
    };
    Stepper.prototype.wireKeyboardEvent = function () {
        this.keyboardModuleStepper = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    Stepper.prototype.keyActionHandler = function (e) {
        if (this.readOnly) {
            return;
        }
        switch (e.action) {
            case 'uparrow':
            case 'downarrow':
            case 'leftarrow':
            case 'rightarrow':
            case 'tab':
            case 'shiftTab':
                this.handleNavigation(this.enableRtl && this.element.classList.contains(HORIZSTEP) ? (e.action === 'leftarrow' || e.action === 'tab' || e.action === 'uparrow') : (e.action === 'rightarrow' || e.action === 'tab' || e.action === 'downarrow'), e);
                break;
            case 'space':
            case 'enter':
            case 'escape':
                this.handleNavigation(null, e);
                break;
            case 'home':
            case 'end':
                this.handleNavigation(null, e, this.enableRtl);
                break;
        }
    };
    Stepper.prototype.handleNavigation = function (isNextStep, e, isRTL) {
        this.isKeyNavFocus = true;
        this.element.classList.add('e-steps-focus');
        var focusedEle = this.element.querySelector('.' + FOCUS);
        if (!focusedEle) {
            focusedEle = this.element.querySelector('.' + SELECTED);
        }
        var stepItems = Array.prototype.slice.call(this.stepperItemList.children);
        var index = stepItems.indexOf(focusedEle);
        if (e.action === 'tab' || e.action === 'shiftTab' || e.action === 'downarrow' || e.action === 'uparrow' || e.action === 'space' || e.action === 'home' || e.action === 'end') {
            if ((e.action === 'tab' && index === stepItems.length - 1) || (e.action === 'shiftTab' && index === 0)) {
                if (focusedEle.classList.contains(FOCUS)) {
                    this.updateStepFocus();
                    return;
                }
            }
            else {
                e.preventDefault();
            }
        }
        if (e.action === 'escape') {
            stepItems[parseInt(index.toString(), 10)].classList.remove(FOCUS);
            this.element.classList.remove('e-steps-focus');
        }
        if (!(e.action === 'space' || e.action === 'enter')) {
            var prevIndex = index;
            index = isNextStep ? index + 1 : index - 1;
            while ((index >= 0 && index < stepItems.length) && stepItems[parseInt(index.toString(), 10)].classList.contains(DISABLED)) {
                index = isNextStep ? index + 1 : index - 1;
            }
            index = (index < 0) ? 0 : (index > stepItems.length - 1) ? stepItems.length - 1 : index;
            if (stepItems[parseInt(prevIndex.toString(), 10)].classList.contains(FOCUS)) {
                stepItems[parseInt(prevIndex.toString(), 10)].classList.remove(FOCUS);
            }
            if ((e.action === 'home' || e.action === 'end')) {
                if (e.action === 'home') {
                    index = isRTL ? stepItems.length - 1 : 0;
                }
                else {
                    index = isRTL ? 0 : stepItems.length - 1;
                }
            }
            if (index >= 0 && index < stepItems.length) {
                stepItems[parseInt(index.toString(), 10)].classList.add(FOCUS);
            }
        }
        else if ((e.action === 'space' || e.action === 'enter')) {
            var isupdateFocus = false;
            if (this.linear) {
                var linearModeValue = this.activeStep - index;
                if (Math.abs(linearModeValue) === 1) {
                    this.navigateToStep(index, null, null, true);
                    isupdateFocus = true;
                }
            }
            else {
                this.navigateToStep(index, null, null, true);
                isupdateFocus = true;
            }
            if (isupdateFocus) {
                this.updateStepFocus();
                this.stepperItemElements[index].focus();
            }
        }
    };
    Stepper.prototype.renderStepperItems = function (isUpdate, isStepType) {
        this.updateElementClassArray();
        this.removeItemElements();
        this.element.querySelector('.e-stepper-progressbar').remove();
        if (isUpdate) {
            this.updatePosition();
        }
        if (isStepType) {
            this.updateStepType();
        }
        if (this.readOnly && !this.element.classList.contains(READONLY)) {
            this.element.classList.add(READONLY);
        }
        if (this.enableRtl && !this.element.classList.contains(RTL)) {
            this.element.classList.add(RTL);
        }
        this.updateOrientaion(this.element);
        this.renderItems();
        this.renderProgressBar(this.element);
        this.checkValidStep();
        this.updateAnimation();
        this.navigateToStep(this.activeStep, null, this.stepperItemElements[this.activeStep], true);
    };
    Stepper.prototype.updateDynamicSteps = function (steps, prevSteps) {
        if (!(steps instanceof Array && prevSteps instanceof Array)) {
            var stepCounts = Object.keys(steps);
            for (var i = 0; i < stepCounts.length; i++) {
                var index = parseInt(Object.keys(steps)[i], 10);
                var changedPropsCount = Object.keys(steps[index]).length;
                for (var j = 0; j < changedPropsCount; j++) {
                    var property = Object.keys(steps[index])[j];
                    if (property === 'status') {
                        if (this.activeStep === index) {
                            this.navigationHandler(index, steps[index].status);
                        }
                        else {
                            this.steps[index].status = prevSteps[index].status;
                        }
                    }
                    else {
                        this.removeItemElements();
                        this.renderItems();
                        this.updateStepperStatus();
                    }
                    if (property === 'label' && (this.steps[index].iconCss || this.steps[index].text) &&
                        this.stepType.toLowerCase() === 'default') {
                        this.refreshProgressbar();
                    }
                    this.updateStepInteractions();
                    this.checkValidStep();
                }
            }
        }
        else {
            this.renderStepperItems(true, true);
        }
    };
    Stepper.prototype.updateDynamicActiveStep = function (activeStep, preActiveStep) {
        this.activeStep = (activeStep > this.steps.length - 1 || activeStep < -1) ? preActiveStep : this.activeStep;
        if (this.activeStep >= 0 && this.stepperItemElements[parseInt(this.activeStep.toString(), 10)].classList.contains(DISABLED)) {
            this.activeStep = preActiveStep;
        }
        if (this.linear) {
            var linearModeValue = preActiveStep - this.activeStep;
            if (Math.abs(linearModeValue) === 1) {
                this.navigateToStep(this.activeStep, null, null, true);
            }
        }
        else {
            this.navigateToStep(this.activeStep, null, this.stepperItemElements[this.activeStep], true);
        }
    };
    Stepper.prototype.updateDynamicCssClass = function (cssClass, prevCssClass) {
        if (prevCssClass) {
            removeClass([this.element], prevCssClass.trim().split(' '));
        }
        if (cssClass) {
            addClass([this.element], cssClass.trim().split(' '));
        }
        if (this.tooltipObj) {
            this.tooltipObj.setProperties({ cssClass: this.cssClass ? (STEPPERTOOLTIP + ' ' + this.cssClass) : STEPPERTOOLTIP });
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {StepperModel} newProp - Specifies new properties
     * @param  {StepperModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Stepper.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'steps': {
                    this.updateDynamicSteps(newProp.steps, oldProp.steps);
                    break;
                }
                case 'orientation':
                    this.updateOrientaion(this.element);
                    this.renderStepperItems(true);
                    break;
                case 'activeStep':
                    this.updateDynamicActiveStep(newProp.activeStep, oldProp.activeStep);
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove'](RTL);
                    break;
                case 'readOnly':
                    this.element.classList[this.readOnly ? 'add' : 'remove'](READONLY);
                    break;
                case 'cssClass':
                    this.updateDynamicCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'labelPosition':
                    this.renderStepperItems(true);
                    break;
                case 'showTooltip':
                    this.updateTooltip();
                    break;
                case 'stepType':
                    this.renderStepperItems(true, true);
                    break;
                case 'template':
                    this.updateTemplateFunction();
                    this.updateContent();
                    break;
                case 'animation':
                    this.updateAnimation();
                    break;
                case 'linear':
                    this.updateStepInteractions();
                    break;
            }
        }
    };
    __decorate([
        Property(0)
    ], Stepper.prototype, "activeStep", void 0);
    __decorate([
        Complex({}, StepperAnimationSettings)
    ], Stepper.prototype, "animation", void 0);
    __decorate([
        Property(false)
    ], Stepper.prototype, "linear", void 0);
    __decorate([
        Property(false)
    ], Stepper.prototype, "showTooltip", void 0);
    __decorate([
        Property('')
    ], Stepper.prototype, "template", void 0);
    __decorate([
        Property('')
    ], Stepper.prototype, "tooltipTemplate", void 0);
    __decorate([
        Property(StepLabelPosition.Bottom)
    ], Stepper.prototype, "labelPosition", void 0);
    __decorate([
        Property(StepType.Default)
    ], Stepper.prototype, "stepType", void 0);
    __decorate([
        Event()
    ], Stepper.prototype, "stepChanged", void 0);
    __decorate([
        Event()
    ], Stepper.prototype, "stepChanging", void 0);
    __decorate([
        Event()
    ], Stepper.prototype, "stepClick", void 0);
    __decorate([
        Event()
    ], Stepper.prototype, "beforeStepRender", void 0);
    Stepper = __decorate([
        NotifyPropertyChanges
    ], Stepper);
    return Stepper;
}(StepperBase));
export { Stepper };
