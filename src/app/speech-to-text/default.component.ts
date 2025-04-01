import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SpeechToTextModule, TextAreaModule, SpeechToTextComponent, TextAreaComponent, ErrorEventArgs, StopListeningEventArgs, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule, ChangeEventArgs as DDLChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchModule, ButtonModule, ChangeEventArgs, SwitchComponent, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SpeechToTextModule, TextAreaModule, SwitchModule, ButtonModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DefaultSpeechToTextComponent {

    @ViewChild('speechToText') speechToText!: SpeechToTextComponent;
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    @ViewChild('sttStylingDdl') sttStylingDdl!: DropDownListComponent;
    @ViewChild('sttLangDdl') sttLangDdl!: DropDownListComponent;
    @ViewChild('interimSwitch') interimSwitch!: SwitchComponent;
    @ViewChild('tooltipSwitch') tooltipSwitch!: SwitchComponent;
    @ViewChild('iconWithTextSwitch') iconWithTextSwitch!: SwitchComponent;

    private isSupportedBrowser: boolean = true;
    public colorsData: Object[] = [
        { text: 'Normal', value: '' },
        { text: 'Primary', value: 'e-primary' },
        { text: 'Success', value: 'e-success' },
        { text: 'Warning', value: 'e-warning' },
        { text: 'Danger', value: 'e-danger' },
        { text: 'Flat', value: 'e-flat' },
        { text: 'Info', value: 'e-info' }
    ];
    public languageData: Object[] = [
        { text: 'English, US', value: 'en-US' },
        { text: 'German, DE', value: 'de-DE' },
        { text: 'Chinese, CN', value: 'zh-CN' },
        { text: 'French, FR', value: 'fr-FR' },
        { text: 'Arabic, SA', value: 'ar-SA' }
    ];
    public fields: Object = { text: 'text', value: 'value' };
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
       if (!args.isInterimResult) {
        args.transcript += ' ';
       }
       this.outputTextarea.value = args.transcript;
       this.toggleCopyButtonState();
    }

    onMicColorChange(args: DDLChangeEventArgs): void {
        this.speechToText.cssClass = args.value.toString();
    }
    
    onLanguageChange(args: DDLChangeEventArgs): void {
        this.speechToText.lang = args.value.toString();
    }
    
    toggleInterimResults(args: ChangeEventArgs): void {
        this.speechToText.allowInterimResults = args.checked;
    }
    
    toggleTooltip(args: ChangeEventArgs): void {
        this.speechToText.showTooltip = args.checked;
    }
    
    toggleIconWithText(args: ChangeEventArgs): void {
        this.speechToText.buttonSettings = {
          content: args.checked ? 'Start Listening' : '',
          stopContent: args.checked ? 'Stop Listening' : ''
        };
    }
    onListeningStart(): void {
        if (this.isSupportedBrowser) {
            if (this.outputTextarea.value) {
                this.speechToText.transcript = this.outputTextarea.value + '\n';
            }
        }
        this.updateStatus(this.isSupportedBrowser ? 'Listening... Speak now...' : 'For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
        this.sttLangDdl.enabled = false;
        this.interimSwitch.disabled = true;
    }
    
    onListeningStop(args: StopListeningEventArgs): void {
        if (this.isSupportedBrowser) {
            if (args.isInteracted)
                this.updateStatus('Click the mic button to start speaking...');
        }
        else {
            this.updateStatus('For unsupported browsers, use event callbacks to handle Speech-to-Text actions.');
        }
        this.sttLangDdl.enabled = true;
        this.interimSwitch.disabled = false;
    }
    onErrorHandler(args: ErrorEventArgs): void {
        this.updateStatus(args.errorMessage);
        if (args.error === 'unsupported-browser')
            this.isSupportedBrowser = false;
    }
    
    updateStatus(status: string): void {
        document.querySelector('.speech-recognition-status')!.textContent = status;
    }
    
    copyTranscript(): void {
        const copyText = this.outputTextarea.value;
        const copyBtnElem = document.getElementById('transcript-copy-button');

        if (copyText && navigator.clipboard) {
            navigator.clipboard.writeText(copyText).then(() => {
            if (copyBtnElem) {
                copyBtnElem.textContent = 'Copied!';
                setTimeout(() => {
                copyBtnElem.textContent = 'Copy';
                }, 1000);
            }
            }).catch(err => {
            console.error('Clipboard write failed', err);
            });
        }
    }
    
    clearTranscript(): void {
        this.outputTextarea.value = this.speechToText.transcript = '';
        this.toggleCopyButtonState();
    }

    toggleCopyButtonState(): void {
        var hasText = this.outputTextarea.element.value.trim() !== '';
        const copyBtnElem = document.getElementById('transcript-copy-button');
        if (hasText) {
            copyBtnElem.removeAttribute('disabled');
        }
        else {
            copyBtnElem.setAttribute('disabled', 'true');
        }
    }
}
