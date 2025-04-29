import { INotifyPropertyChanged, Component, EmitType, ChildProperty, BaseEventArgs } from '@syncfusion/ej2-base';
import { SpeechToTextModel, TooltipSettingsModel, ButtonSettingsModel } from './speech-to-text-model';
import { IconPosition } from '@syncfusion/ej2-buttons';
/**
 * Applicable positions where the Tooltip can be displayed over SpeechToText button.
 * - TopLeft :- The tooltip appears at the top-left corner of the SpeechToText button.
 * - TopCenter :- The tooltip appears at the top-center of the SpeechToText button.
 * - TopRight :- The tooltip appears at the top-right corner of the SpeechToText button.
 * - BottomLeft :- The tooltip appears at the bottom-left corner of the SpeechToText button.
 * - BottomCenter :- The tooltip appears at the bottom-center of the SpeechToText button.
 * - BottomRight :- The tooltip appears at the bottom-right corner of the SpeechToText button.
 * - LeftTop :- The tooltip appears at the left-top corner of the SpeechToText button.
 * - LeftCenter :- The tooltip appears at the left-center of the SpeechToText button.
 * - LeftBottom :- The tooltip appears at the left-bottom corner of the SpeechToText button.
 * - RightTop :- The tooltip appears at the right-top corner of the SpeechToText button.
 * - RightCenter :- The tooltip appears at the right-center of the SpeechToText button.
 * - RightBottom :- The tooltip appears at the right-bottom corner of the SpeechToText button.
 */
export declare type TooltipPosition = 'TopLeft' | 'TopCenter' | 'TopRight' | 'BottomLeft' | 'BottomCenter' | 'BottomRight' | 'LeftTop' | 'LeftCenter' | 'LeftBottom' | 'RightTop' | 'RightCenter' | 'RightBottom';
/**
 * Configuration settings for the toggle button used in the SpeechToText component.
 */
export declare class ButtonSettings extends ChildProperty<ButtonSettings> {
    /**
     * Specifies the text content to be displayed when the SpeechToText button is in the "start" state.
     * This content appears alongside the icon or as standalone text based on the configuration.
     *
     * @type {string}
     * @default ""
     */
    content: string;
    /**
     * Specifies the text content to be displayed when the SpeechToText button is in the "stop" state.
     * This content appears alongside the icon or as standalone text based on the configuration.
     *
     * @type {string}
     * @default ""
     */
    stopContent: string;
    /**
     * Specifies the CSS classes for the icon displayed on the SpeechToText button.
     * This class determines the appearance of the button icon in "start" state.
     *
     * @type {string}
     * @default ""
     */
    iconCss: string;
    /**
     * Specifies the CSS classes for the icon displayed when the SpeechToText button is in the "stop" state.
     * This class determines the styling of the button icon in the stop state, allowing for clear visual feedback.
     *
     * @type {string}
     * @default ""
     */
    stopIconCss: string;
    /**
     * Specifies the position of the icon relative to the button text content in the SpeechToText component.
     * This property can accept either a string or an IconPosition enum to determine the position of the icon.
     *
     * @type {string | IconPosition}
     * @default "Left"
     */
    iconPosition: string | IconPosition;
    /**
     * Specifies whether the button should be styled as a primary action button in the SpeechToText component.
     * When set to `true`, the button applies primary styling.
     *
     * @type {boolean}
     * @default false
     */
    isPrimary: boolean;
}
/**
 * Configuration settings for tooltips in the SpeechToText component.
 * This allows customization of the tooltip content and its positioning.
 */
export declare class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * The text displayed when the user hovers over the button while it is in the listening state,
     * showing the start listening option.
     * @type {string}
     * @default 'Start listening'
     */
    content: string;
    /**
     * The text displayed when the user hovers over the button while listening is in progress,
     * and the button shows the stop icon.
     * @type {string}
     * @default 'Stop listening'
     */
    stopContent: string;
    /**
     * Specifies the position of the tooltip in the UI, indicating where the tooltip should appear.
     *
     * @isenumeration true
     * @asptype TooltipPosition
     * @default 'TopCenter'
     */
    position: TooltipPosition;
}
/**
 * Enum representing the operational states of the SpeechToText component.
 */
export declare enum SpeechToTextState {
    /**
     * Specifies the state where the SpeechToText component is inactive and not processing spoken input.
     */
    Inactive = "Inactive",
    /**
     * Specifies the state where the SpeechToText component is actively listening to spoken input.
     */
    Listening = "Listening",
    /**
     * Specifies the state where the SpeechToText component has stopped processing spoken input.
     */
    Stopped = "Stopped"
}
/**
 * Represents the event arguments when a listening is started in the Speech to text component.
 */
export interface StartListeningEventArgs extends BaseEventArgs {
    /**
     * Indicates whether the listening or speech action should be canceled.
     * Setting this to `true` prevents listening.
     *
     * @type {boolean}
     * @default false
     */
    cancel: boolean;
    /**
     * Specifies the event type associated with the start listening action.
     *
     * @type {Event}
     */
    event: Event;
    /**
     * Represents the current state of the component when listening starts.
     *
     * @isenumeration true
     * @asptype SpeechToTextState
     * @default 'Inactive'
     */
    listeningState: SpeechToTextState;
    /**
     * Indicates whether the listening event was triggered by user interaction (`true`)
     * or programmatically (`false`).
     *
     * @type {boolean}
     * @default false
     */
    isInteracted: boolean;
}
/**
 *  Represents the event arguments triggered when listening stops in the SpeechToText component.
 */
export interface StopListeningEventArgs extends BaseEventArgs {
    /**
     * Specifies the event type associated with the stop listening action.
     *
     * @type {Event}
     */
    event: Event;
    /**
     * Represents the current state of the component when listening stops.
     *
     * @isenumeration true
     * @asptype SpeechToTextState
     * @default 'Inactive'
     */
    listeningState: SpeechToTextState;
    /**
     * Indicates whether the listening event was triggered by user interaction (`true`)
     * or programmatically (`false`).
     * @type {boolean}
     * @default false
     */
    isInteracted: boolean;
}
/**
 * Represents the event arguments triggered when a transcript is updated in the SpeechToText component.
 */
export interface TranscriptChangedEventArgs extends BaseEventArgs {
    /**
     * Specifies the event type associated with the transcript been update in the SpeechToText component.
     * Represents the event arguments when a listening is processed in the speech to text component.
     *
     * @type {Event}
     */
    event: Event;
    /**
     * Specifies the transcribed text captured from the speech to text.
     * This property contains the text representation of recorded speech.
     *
     * @type {string}
     * @default ''
     */
    transcript: string;
    /**
     * Specifies whether the recognized speech result is interim or final.
     * Returns `true` when interim results are returned and `false` when it is a final result.
     * The value is determined based on the `allowInterimResults` property.
     *
     * @type {boolean}
     * @default true
     */
    isInterimResult: boolean;
}
/**
 * Represents the event arguments triggered when listening is disabled or exceptions are raised in the SpeechToText component.
 */
export interface ErrorEventArgs extends BaseEventArgs {
    /**
     * Specifies the data provided when an error event is triggered during speech-to-text actions.
     * This property helps identify the specific error event that occurred during listening or speaking,
     * allowing to differentiate between various issues such as microphone access failures,
     * unsupported language models, or network issues.
     *
     * @type {Event}
     */
    event?: Event;
    /**
     * Represents a string describing the error type that occurred during speech-to-text actions.
     * This value indicates what went wrong, such as 'audio-capture' or 'not-allowed', and helps to find
     * the cause of the failure for better troubleshooting.
     *
     * @type {string}
     * @default ''
     */
    error: string;
    /**
     * A message providing further details about the error.
     * This message gives more context or clarification on the error that occurred,
     * helping user to better understand the issue.
     * It could include user-facing messages or more technical error details.
     *
     * @type {string}
     * @default ''
     */
    errorMessage: string;
}
export declare class SpeechToText extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * The transcribed text from the speech-to-text process.
     * This property updates dynamically during speech recognition, providing both interim and final results.
     * It can be used to display or process the transcribed speech.
     *
     * @type {string}
     * @default ''
     */
    transcript: string;
    /**
     * The language and locale used for speech recognition.
     * This ensures proper transcription by selecting the correct language model.
     * Common formats: 'en-US' (English, United States), 'es-ES' (Spanish, Spain), 'fr-FR' (French, France).
     *
     * @type {string}
     * @default ''
     */
    lang: string;
    /**
     * Determines whether interim results should be provided during speech recognition.
     * If true, partial results are delivered in real-time, allowing for a dynamic user experience.
     * If false, only final results will be provided after the recognition process is complete.
     *
     * @type {boolean}
     * @default true
     */
    allowInterimResults: boolean;
    /**
     * Determines whether the tooltip should be displayed on hover over the SpeechToText button.
     * If true, the tooltip will be shown to provide additional information about the current state or action.
     *
     * @type {boolean}
     * @default true
     */
    showTooltip: boolean;
    /**
     * Represents the current operational state of the component.
     * This state helps manage transitions and control the component's behavior.
     * Possible values:
     * - 'Inactive': Component is idle.
     * - 'Listening': The component is actively listening for speech input.
     * - 'Stopped': Listening has stopped.
     *
     * @isenumeration true
     * @asptype SpeechToTextState
     * @default 'Inactive'
     */
    listeningState: SpeechToTextState;
    /**
     * Customizes the appearance and functionality of the record button.
     * This allows for customization of button content, icons, and positions.
     * Use it to adjust the button's visual and functional properties according to your needs.
     *
     * @default null
     * @type {ButtonSettingsModel}
     */
    buttonSettings: ButtonSettingsModel;
    /**
     * Defines tooltip content and positioning for guiding user interactions.
     * Tooltips provide helpful instructions or descriptions for button actions, improving user experience.
     *
     * @default null
     * @type {TooltipSettingsModel}
     */
    tooltipSettings: TooltipSettingsModel;
    /**
     * Indicates whether the component is disabled.
     * When true, all interactions with the component (e.g., clicking, listening) are disabled.
     * Useful for preventing user interaction in specific states, such as during processing or error handling.
     *
     * @type {boolean}
     * @default false
     */
    disabled: boolean;
    /**
     * Specifies additional CSS classes for customizing the component's appearance.
     * Allows applying custom styles to match application requirements
     * This property can be used to extend the component's default style.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
    /**
     * Allows additional HTML attributes to be added to the root element of the SpeechToText button.
     * This property accepts a key-value pair format for attributes such as name, aria-label, and others.
     * This helps to make the button more accessible and adaptable to specific requirements.
     *
     * @type {Object}
     * @default null
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Triggered when the SpeechToText component is initialized and ready for interaction.
     * This event indicates that the component is fully loaded and can start processing user input.
     * Use this event to execute initialization logic or show the component's ready state.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Triggered when speech recognition begins listening for audio input.
     * This event fires when the user starts the speech-to-text process.
     * Use this event to execute logic or display feedback (e.g., a "Listening..." message).
     *
     * @param {StartListeningEventArgs} args - The event arguments containing the state and context information for the start of the listening process.
     * @event onStart
     */
    onStart: EmitType<StartListeningEventArgs>;
    /**
     * Triggered when speech recognition stops listening for audio input.
     * This event marks the end of the listening session, either due to user action or completion of recognition.
     * Use this event to trigger post-processing logic or indicate that listening has ended (e.g., show "Listening stopped").
     *
     * @param {StopListeningEventArgs} args - The event arguments containing the state and context information for the stop action.
     * @event onStop
     */
    onStop: EmitType<StopListeningEventArgs>;
    /**
     * Triggered when an error occurs during speech recognition or listening, this event provides details to handle exceptions, display messages, and troubleshoot issues like microphone failures, network errors, or unsupported browsers and language models.
     *
     * Common error strings may include:
     * - `no-speech`: No speech detected. Please speak into the microphone.
     * - `aborted`: Speech recognition was aborted.
     * - `audio-capture`: No microphone detected. Ensure your microphone is connected.
     * - `not-allowed`: Microphone access denied. Allow microphone permissions.
     * - `service-not-allowed`: Speech recognition service is not allowed in this context.
     * - `network`: Network error occurred. Check your internet connection.
     * - `unsupported-browser`: The browser does not support the SpeechRecognition API.
     *
     * In addition to handling common speech recognition errors, it is essential to handle unsupported browser errors. For example, if the browser does not support the `SpeechRecognition` API, the `unsupported-browser` error string will be triggered. This can help notify users to switch to a compatible browser.
     *
     * For more details on the error strings and how to handle them, refer to the documentation:
     * [SpeechRecognitionErrorEvent error](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionErrorEvent/error)
     *
     * @param {ErrorEventArgs} args - The event arguments containing the error details:
     *    - `error`: The error string representing the specific issue that occurred.
     *    - `message`: A brief message describing the error.
     *    - `event`: The event object that triggered the error (contains details like the type of error event).
     *
     * @event onError
     */
    onError: EmitType<ErrorEventArgs>;
    /**
     * Triggered when the transcript is updated during the speech recognition process.
     * This event delivers updated text as the user speaks. It can be used to update the UI with real-time transcription.
     * The event provides both interim and final transcript results, depending on the configuration.
     *
     * @param {TranscriptChangedEventArgs} args - The event arguments containing the latest transcript text.
     * @event transcriptChanged
     */
    transcriptChanged: EmitType<TranscriptChangedEventArgs>;
    /**
     * Constructor for creating the component
     *
     * @param {SpeechToTextModel} options - Specifies the SpeechToTextModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: SpeechToTextModel, element?: string | HTMLElement);
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    protected getDirective(): string;
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    protected getPersistData(): string;
    protected render(): void;
    private recognition;
    private micOn;
    private buttonInst;
    private tooltipInst;
    private fullTranscript;
    private isClicked;
    private isUserInteracted;
    private hasStarted;
    private l10n;
    private initializeLocale;
    private renderSpeechToText;
    private updateAriaLabel;
    private updateCssClass;
    private updateButtonCssClass;
    private updateTooltip;
    private handleStateChange;
    private addHtmlAttributes;
    private removeHtmlAttributes;
    private wireEvents;
    private unWireEvents;
    private handleButtonClick;
    private triggerUnSupportedError;
    private initializeSpeechRecognition;
    private handleStartRecognition;
    private triggerUnSupportedStart;
    private startSpeechRecognition;
    private stopSpeechRecognition;
    private handleStopRecognition;
    private buttonSettingsChanges;
    private destroyAndNullify;
    /**
     * Destroy the SpeechToText.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * Begins the audio capture process by listening to the user's microphone input.
     * This method initiates the speech-to-text process and continuously updates the `transcript` property with interim and final recognition results.
     *
     * @returns {void} No return value.
     */
    startListening(): void;
    /**
     * Stops the audio capture process and finalizes the speech recognition.
     * This method ends the ongoing speech-to-text operation and completes the recognition process, storing the final transcription.
     * It is typically called to stop listening when the user is finished speaking.
     *
     * @returns {void} No return value.
     */
    stopListening(): void;
    /**
     * Called if any of the property value is changed.
     *
     * @param  {SpeechToTextModel} newProp - Specifies new properties
     * @param  {SpeechToTextModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: SpeechToTextModel, oldProp?: SpeechToTextModel): void;
}
