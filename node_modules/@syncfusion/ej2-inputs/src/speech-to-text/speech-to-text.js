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
import { NotifyPropertyChanges, Component, getUniqueID, Property, isNullOrUndefined as isNOU, Event, EventHandler, ChildProperty, Complex, removeClass, addClass, L10n } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Tooltip } from '@syncfusion/ej2-popups';
/**
 * Configuration settings for the toggle button used in the SpeechToText component.
 */
var ButtonSettings = /** @class */ (function (_super) {
    __extends(ButtonSettings, _super);
    function ButtonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], ButtonSettings.prototype, "content", void 0);
    __decorate([
        Property('')
    ], ButtonSettings.prototype, "stopContent", void 0);
    __decorate([
        Property('')
    ], ButtonSettings.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], ButtonSettings.prototype, "stopIconCss", void 0);
    __decorate([
        Property('Left')
    ], ButtonSettings.prototype, "iconPosition", void 0);
    __decorate([
        Property(false)
    ], ButtonSettings.prototype, "isPrimary", void 0);
    return ButtonSettings;
}(ChildProperty));
export { ButtonSettings };
/**
 * Configuration settings for tooltips in the SpeechToText component.
 * This allows customization of the tooltip content and its positioning.
 */
var TooltipSettings = /** @class */ (function (_super) {
    __extends(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Start listening')
    ], TooltipSettings.prototype, "content", void 0);
    __decorate([
        Property('Stop listening')
    ], TooltipSettings.prototype, "stopContent", void 0);
    __decorate([
        Property('TopCenter')
    ], TooltipSettings.prototype, "position", void 0);
    return TooltipSettings;
}(ChildProperty));
export { TooltipSettings };
/**
 * Enum representing the operational states of the SpeechToText component.
 */
export var SpeechToTextState;
(function (SpeechToTextState) {
    /**
     * Specifies the state where the SpeechToText component is inactive and not processing spoken input.
     */
    SpeechToTextState["Inactive"] = "Inactive";
    /**
     * Specifies the state where the SpeechToText component is actively listening to spoken input.
     */
    SpeechToTextState["Listening"] = "Listening";
    /**
     * Specifies the state where the SpeechToText component has stopped processing spoken input.
     */
    SpeechToTextState["Stopped"] = "Stopped";
})(SpeechToTextState || (SpeechToTextState = {}));
//#endregion
var SpeechToText = /** @class */ (function (_super) {
    __extends(SpeechToText, _super);
    //#endregion
    //#region Inherited methods
    /**
     * Constructor for creating the component
     *
     * @param {SpeechToTextModel} options - Specifies the SpeechToTextModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function SpeechToText(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.fullTranscript = '';
        _this.isClicked = false;
        _this.isUserInteracted = false;
        _this.hasStarted = false;
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    SpeechToText.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    SpeechToText.prototype.getDirective = function () {
        return 'EJS-SPEECHTOTEXT';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    SpeechToText.prototype.getModuleName = function () {
        return 'speech-to-text';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    SpeechToText.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    SpeechToText.prototype.render = function () {
        this.renderSpeechToText();
        this.initializeSpeechRecognition();
        if (!isNOU(this.listeningState)) {
            this.handleStateChange();
        }
        this.wireEvents();
    };
    //#endregion
    //#region Private Methods
    SpeechToText.prototype.initializeLocale = function () {
        this.l10n = new L10n(this.getModuleName(), {
            abortedError: 'Speech recognition was aborted.',
            audioCaptureError: 'No microphone detected. Ensure your microphone is connected.',
            defaultError: 'An unknown error occurred.',
            networkError: 'Network error occurred. Check your internet connection.',
            noSpeechError: 'No speech detected. Please speak into the microphone.',
            notAllowedError: 'Microphone access denied. Allow microphone permissions.',
            serviceNotAllowedError: 'Speech recognition service is not allowed in this context.',
            unsupportedBrowserError: 'The browser does not support the SpeechRecognition API.',
            startAriaLabel: 'Press to start speaking and transcribe your words',
            stopAriaLabel: 'Press to stop speaking and end transcription',
            startTooltipText: 'Start listening',
            stopTooltipText: 'Stop listening'
        }, this.locale);
    };
    SpeechToText.prototype.renderSpeechToText = function () {
        this.initializeLocale();
        var iconCss = !isNOU(this.buttonSettings.iconCss) && this.buttonSettings.iconCss !== '' ? this.buttonSettings.iconCss : 'e-icons e-listen-icon';
        this.buttonInst = new Button({
            iconCss: iconCss,
            isPrimary: this.buttonSettings.isPrimary,
            cssClass: this.updateButtonCssClass(),
            disabled: this.disabled,
            content: this.buttonSettings.content,
            iconPosition: this.buttonSettings.iconPosition,
            enableRtl: this.enableRtl
        });
        this.buttonInst.appendTo(this.element);
        this.updateTooltip();
        this.updateCssClass(this.cssClass, '');
        this.updateAriaLabel();
        if (!isNOU(this.htmlAttributes)) {
            this.addHtmlAttributes(this.htmlAttributes);
        }
    };
    SpeechToText.prototype.updateAriaLabel = function () {
        var ariaLabel;
        if (this.htmlAttributes && this.htmlAttributes['aria-label']) {
            ariaLabel = this.htmlAttributes['aria-label'];
        }
        else {
            ariaLabel = this.micOn ? this.l10n.getConstant('stopAriaLabel') : this.l10n.getConstant('startAriaLabel');
        }
        this.element.setAttribute('aria-label', ariaLabel);
    };
    SpeechToText.prototype.updateCssClass = function (newClass, oldClass) {
        if (oldClass) {
            removeClass([this.element], oldClass.trim().split(' '));
        }
        if (newClass) {
            addClass([this.element], newClass.trim().split(' '));
        }
    };
    SpeechToText.prototype.updateButtonCssClass = function () {
        var content = this.isClicked ? this.buttonSettings.stopContent : this.buttonSettings.content;
        var cssClass;
        if (content === '') {
            cssClass = 'e-round';
        }
        if (this.micOn) {
            cssClass += ' e-listening-state';
        }
        return cssClass;
    };
    SpeechToText.prototype.updateTooltip = function () {
        if (this.showTooltip) {
            if (this.tooltipSettings) {
                if (this.tooltipSettings.content === 'Start listening') {
                    this.tooltipSettings.content = this.l10n.getConstant('startTooltipText');
                }
                if (this.tooltipSettings.stopContent === 'Stop listening') {
                    this.tooltipSettings.stopContent = this.l10n.getConstant('stopTooltipText');
                }
            }
            this.tooltipInst = new Tooltip({
                content: this.hasStarted ? this.tooltipSettings.stopContent : this.tooltipSettings.content,
                position: this.tooltipSettings.position,
                windowCollision: true,
                cssClass: this.cssClass ? ('e-speech-to-text-tooltip ' + this.cssClass) : 'e-speech-to-text-tooltip',
                opensOn: 'Hover',
                enableRtl: this.enableRtl
            });
            this.tooltipInst.appendTo(this.element);
        }
        else {
            if (!isNOU(this.tooltipInst)) {
                this.tooltipInst.destroy();
                this.tooltipInst = null;
            }
        }
    };
    SpeechToText.prototype.handleStateChange = function () {
        if (this.disabled) {
            return;
        }
        if (this.listeningState === SpeechToTextState.Listening) {
            this.micOn = true;
            this.startSpeechRecognition();
        }
        else if (this.listeningState === SpeechToTextState.Inactive || this.listeningState === SpeechToTextState.Stopped) {
            if (this.micOn) {
                this.micOn = false;
                this.stopSpeechRecognition();
            }
            else {
                var prevOnChange = this.isProtectedOnChange;
                this.isProtectedOnChange = true;
                this.listeningState = SpeechToTextState.Inactive;
                this.isProtectedOnChange = prevOnChange;
            }
        }
    };
    SpeechToText.prototype.addHtmlAttributes = function (attrs) {
        if (attrs) {
            for (var attr in attrs) {
                if (Object.prototype.hasOwnProperty.call(attrs, attr)) {
                    this.element.setAttribute(attr, attrs[attr]);
                }
            }
        }
    };
    SpeechToText.prototype.removeHtmlAttributes = function (attrs) {
        if (attrs) {
            for (var attr in attrs) {
                if (Object.prototype.hasOwnProperty.call(attrs, attr)) {
                    this.element.removeAttribute(attr);
                }
            }
        }
    };
    SpeechToText.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.handleButtonClick, this);
    };
    SpeechToText.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'click', this.handleButtonClick);
    };
    SpeechToText.prototype.handleButtonClick = function (event) {
        this.isUserInteracted = true;
        this.micOn = !this.micOn;
        if (this.micOn) {
            this.startSpeechRecognition(event);
        }
        else {
            this.stopSpeechRecognition(event);
        }
    };
    SpeechToText.prototype.triggerUnSupportedError = function () {
        var eventArgs = {
            error: 'unsupported-browser',
            errorMessage: this.l10n.getConstant('unsupportedBrowserError')
        };
        this.trigger('onError', eventArgs);
    };
    SpeechToText.prototype.initializeSpeechRecognition = function () {
        var _this = this;
        var windowInst = window;
        var SpeechRecognition = windowInst.SpeechRecognition || windowInst.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.triggerUnSupportedError();
            return;
        }
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.lang = this.lang;
        this.recognition.interimResults = this.allowInterimResults;
        this.recognition.onstart = function (event) {
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            _this.transcript = _this.fullTranscript = '';
            _this.isProtectedOnChange = prevOnChange;
            var eventArgs = {
                cancel: false,
                listeningState: SpeechToTextState.Listening,
                event: event,
                isInteracted: _this.isUserInteracted
            };
            _this.trigger('onStart', eventArgs, function () {
                if (!eventArgs.cancel) {
                    _this.handleStartRecognition();
                }
                else {
                    _this.recognition.abort();
                    _this.micOn = false;
                }
            });
        };
        this.recognition.onend = function (event) {
            if (_this.hasStarted) {
                _this.micOn = false;
                _this.handleStopRecognition(event);
            }
        };
        this.recognition.onerror = function (event) {
            var errorMessage = '';
            switch (event.error) {
                case 'not-allowed':
                    errorMessage = _this.l10n.getConstant('notAllowedError');
                    break;
                case 'audio-capture':
                    errorMessage = _this.l10n.getConstant('audioCaptureError');
                    break;
                case 'network':
                    errorMessage = _this.l10n.getConstant('networkError');
                    break;
                case 'no-speech':
                    errorMessage = _this.l10n.getConstant('noSpeechError');
                    break;
                case 'aborted':
                    errorMessage = _this.l10n.getConstant('abortedError');
                    break;
                case 'service-not-allowed':
                    errorMessage = _this.l10n.getConstant('serviceNotAllowedError');
                    break;
                default:
                    errorMessage = _this.l10n.getConstant('defaultError');
            }
            var eventArgs = {
                event: event,
                error: event.error,
                errorMessage: errorMessage
            };
            _this.trigger('onError', eventArgs);
            _this.isUserInteracted = false;
        };
        this.recognition.onresult = function (event) {
            var result = event.results[event.resultIndex];
            var interimTranscript = '';
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            if (result.isFinal) {
                _this.fullTranscript += result[0].transcript;
                _this.transcript = _this.fullTranscript;
            }
            else {
                interimTranscript += result[0].transcript;
                _this.transcript = _this.fullTranscript + interimTranscript;
            }
            var eventArgs = {
                event: event,
                transcript: _this.transcript,
                isInterimResult: !result.isFinal
            };
            _this.trigger('transcriptChanged', eventArgs, function () {
                if (eventArgs.transcript !== _this.transcript) {
                    var prevOnChange_1 = _this.isProtectedOnChange;
                    _this.isProtectedOnChange = true;
                    _this.transcript = _this.fullTranscript = eventArgs.transcript;
                    _this.isProtectedOnChange = prevOnChange_1;
                }
            });
            _this.isProtectedOnChange = prevOnChange;
        };
    };
    SpeechToText.prototype.handleStartRecognition = function () {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.hasStarted = true;
        this.listeningState = SpeechToTextState.Listening;
        if (!isNOU(this.tooltipInst)) {
            this.tooltipInst.content = this.tooltipSettings.stopContent;
        }
        this.updateAriaLabel();
        this.isClicked = true;
        this.buttonInst.cssClass = this.updateButtonCssClass();
        this.buttonInst.content = this.buttonSettings.stopContent;
        var iconCss = !isNOU(this.buttonSettings.stopIconCss) && this.buttonSettings.stopIconCss !== '' ? this.buttonSettings.stopIconCss : 'e-icons e-listen-stop';
        this.buttonInst.iconCss = iconCss;
        this.isProtectedOnChange = prevOnChange;
    };
    SpeechToText.prototype.triggerUnSupportedStart = function (event) {
        var _this = this;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.transcript = '';
        this.isProtectedOnChange = prevOnChange;
        var eventArgs = {
            cancel: false,
            listeningState: SpeechToTextState.Listening,
            event: event,
            isInteracted: this.isUserInteracted
        };
        this.trigger('onStart', eventArgs, function () {
            if (!eventArgs.cancel) {
                _this.handleStartRecognition();
            }
        });
    };
    SpeechToText.prototype.startSpeechRecognition = function (event) {
        if (this.hasStarted) {
            return;
        }
        if (this.recognition) {
            this.recognition.start();
        }
        else {
            this.triggerUnSupportedStart(event);
        }
    };
    SpeechToText.prototype.stopSpeechRecognition = function (event) {
        if (this.recognition) {
            this.recognition.stop();
        }
        else {
            this.handleStopRecognition(event);
        }
    };
    SpeechToText.prototype.handleStopRecognition = function (event) {
        if (!this.hasStarted) {
            return;
        } // Ensure onStop is only processed if needed
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.listeningState = SpeechToTextState.Stopped;
        if (!isNOU(this.tooltipInst)) {
            this.tooltipInst.content = this.tooltipSettings.content;
        }
        this.updateAriaLabel();
        this.isClicked = false;
        this.buttonInst.cssClass = this.updateButtonCssClass();
        this.buttonInst.content = this.buttonSettings.content;
        var eventArgs = {
            listeningState: SpeechToTextState.Stopped,
            event: event,
            isInteracted: this.isUserInteracted
        };
        this.trigger('onStop', eventArgs);
        this.listeningState = SpeechToTextState.Inactive;
        var iconCss = !isNOU(this.buttonSettings.iconCss) && this.buttonSettings.iconCss !== '' ? this.buttonSettings.iconCss : 'e-icons e-listen-icon';
        this.buttonInst.iconCss = iconCss;
        this.hasStarted = false;
        this.isProtectedOnChange = prevOnChange;
    };
    SpeechToText.prototype.buttonSettingsChanges = function (oldModel, newModel) {
        if (oldModel.content !== newModel.content || oldModel.stopContent !== newModel.stopContent) {
            this.buttonInst.content = this.hasStarted ? this.buttonSettings.stopContent : this.buttonSettings.content;
            this.buttonInst.cssClass = this.updateButtonCssClass();
        }
        if (oldModel.iconCss !== newModel.iconCss || oldModel.stopIconCss !== newModel.stopIconCss) {
            var iconCss = !isNOU(this.buttonSettings.iconCss) && this.buttonSettings.iconCss !== '' ? this.buttonSettings.iconCss : 'e-icons e-listen-icon';
            var stopIconCss = !isNOU(this.buttonSettings.stopIconCss) && this.buttonSettings.stopIconCss !== '' ? this.buttonSettings.stopIconCss : 'e-icons e-listen-stop';
            this.buttonInst.iconCss = this.hasStarted ? stopIconCss : iconCss;
        }
        if (oldModel.iconPosition !== newModel.iconPosition) {
            this.buttonInst.iconPosition = this.buttonSettings.iconPosition;
        }
        if (oldModel.isPrimary !== newModel.isPrimary) {
            this.buttonInst.isPrimary = this.buttonSettings.isPrimary;
        }
    };
    SpeechToText.prototype.destroyAndNullify = function (obj) {
        if (obj) {
            obj.destroy();
            obj = null;
        }
    };
    //#endregion
    //#region Public Methods
    /**
     * Destroy the SpeechToText.
     *
     * @returns {void}
     */
    SpeechToText.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.destroyAndNullify(this.buttonInst);
        this.destroyAndNullify(this.tooltipInst);
        this.recognition = null;
        this.micOn = null;
        this.htmlAttributes = this.tooltipSettings = this.buttonSettings = null;
        this.element.classList.remove('e-rtl');
    };
    /**
     * Begins the audio capture process by listening to the user's microphone input.
     * This method initiates the speech-to-text process and continuously updates the `transcript` property with interim and final recognition results.
     *
     * @returns {void} No return value.
     */
    SpeechToText.prototype.startListening = function () {
        if (!this.disabled && !this.isClicked) {
            this.isUserInteracted = false;
            this.micOn = true;
            this.startSpeechRecognition();
        }
    };
    /**
     * Stops the audio capture process and finalizes the speech recognition.
     * This method ends the ongoing speech-to-text operation and completes the recognition process, storing the final transcription.
     * It is typically called to stop listening when the user is finished speaking.
     *
     * @returns {void} No return value.
     */
    SpeechToText.prototype.stopListening = function () {
        if (!this.disabled && this.isClicked) {
            this.isUserInteracted = false;
            this.micOn = false;
            this.stopSpeechRecognition();
        }
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {SpeechToTextModel} newProp - Specifies new properties
     * @param  {SpeechToTextModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    SpeechToText.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'lang':
                    if (this.recognition) {
                        this.recognition.lang = this.lang;
                    }
                    break;
                case 'allowInterimResults':
                    if (this.recognition) {
                        this.recognition.interimResults = this.allowInterimResults;
                    }
                    break;
                case 'buttonSettings':
                    this.buttonSettingsChanges(oldProp.buttonSettings, newProp.buttonSettings);
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'disabled':
                    this.buttonInst.disabled = this.disabled;
                    this.handleStateChange();
                    break;
                case 'htmlAttributes':
                    this.removeHtmlAttributes(oldProp.htmlAttributes);
                    this.addHtmlAttributes(newProp.htmlAttributes);
                    break;
                case 'listeningState':
                    this.handleStateChange();
                    break;
                case 'tooltipSettings':
                case 'showTooltip':
                    this.updateTooltip();
                    break;
                case 'transcript':
                    this.transcript = this.fullTranscript = newProp.transcript;
                    break;
                case 'enableRtl':
                    this.buttonInst.enableRtl = this.tooltipInst.enableRtl = this.enableRtl;
                    break;
                case 'locale':
                    this.l10n.setLocale(this.locale);
                    this.updateAriaLabel();
                    this.updateTooltip();
                    break;
            }
        }
    };
    __decorate([
        Property('')
    ], SpeechToText.prototype, "transcript", void 0);
    __decorate([
        Property('')
    ], SpeechToText.prototype, "lang", void 0);
    __decorate([
        Property(true)
    ], SpeechToText.prototype, "allowInterimResults", void 0);
    __decorate([
        Property(true)
    ], SpeechToText.prototype, "showTooltip", void 0);
    __decorate([
        Property('Inactive')
    ], SpeechToText.prototype, "listeningState", void 0);
    __decorate([
        Complex({}, ButtonSettings)
    ], SpeechToText.prototype, "buttonSettings", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], SpeechToText.prototype, "tooltipSettings", void 0);
    __decorate([
        Property(false)
    ], SpeechToText.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], SpeechToText.prototype, "cssClass", void 0);
    __decorate([
        Property({})
    ], SpeechToText.prototype, "htmlAttributes", void 0);
    __decorate([
        Event()
    ], SpeechToText.prototype, "created", void 0);
    __decorate([
        Event()
    ], SpeechToText.prototype, "onStart", void 0);
    __decorate([
        Event()
    ], SpeechToText.prototype, "onStop", void 0);
    __decorate([
        Event()
    ], SpeechToText.prototype, "onError", void 0);
    __decorate([
        Event()
    ], SpeechToText.prototype, "transcriptChanged", void 0);
    SpeechToText = __decorate([
        NotifyPropertyChanges
    ], SpeechToText);
    return SpeechToText;
}(Component));
export { SpeechToText };
