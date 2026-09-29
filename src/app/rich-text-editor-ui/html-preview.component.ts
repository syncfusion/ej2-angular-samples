import { Component, ViewChild, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { ToastUtility } from '@syncfusion/ej2-notifications';
import {
    RichTextEditorUIComponent,
    RichTextEditorUIModule,
    ToolbarSettingsModel
} from '@syncfusion/ej2-angular-richtexteditor-ui';
import { SplitterComponent, SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

@Component({
    selector: 'control-content',
    templateUrl: 'html-preview.html',
    styleUrls: ['html-preview.css'],
    standalone: true,
    imports: [ RichTextEditorUIModule, SplitterModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent ]
})
export class HtmlPreviewComponent implements AfterViewInit {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;

    @ViewChild('splitter')
    public splitter: SplitterComponent;

    @ViewChild('sourcePane', { static: true })
    public sourcePane: ElementRef<HTMLElement>;

    public value: string = '<h3>Welcome to the HTML real-time live editor!</h3>' +
        '<p>Create and edit the valid HTML code simply! You don\'t worry about the HTML syntax to format your text content. ' +
        'The WYSIWYG editor (left side view) provided the toolbar to make format text and insert images, tables, and more options.</p>' +
        '<h4>Don\'t worry about syntax</h4>' +
        '<p>The content editing works bi-directional, you can write the HTML code on the right-side view (code view), ' +
        'and changes will reflect in the WYSIWYG editor.</p>';

    public toolbarSettings: ToolbarSettingsModel = {
        enableFloating: false,
        items: [
            'Bold', 'Italic', 'Underline',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'Formats',
            'Outdent', 'Indent',
            'Link', 'Image', 'Table', '|', 'Undo', 'Redo'
        ]
    };

    public paneSettings: Object[] = [
        { resizable: true, size: '50%', min: '40%' },
        { min: '40%' }
    ];

    public height: string = '450px';

    private codeMirrorObj: any;

    constructor(private ngZone: NgZone) { }

    public ngAfterViewInit(): void {
        // The Splitter's (created) handler may fire before our AfterViewInit; if not,
        // we still need to apply the device-specific orientation. We do it here
        // by binding to (created) in the template as well, but to be safe we call
        // the same handler after the editor is created.
        this.applyDeviceOrientation();
    }

    public onSplitterCreated(): void {
        this.applyDeviceOrientation();
    }

    public onEditorCreated(): void {
        this.syncEditorToCodeMirror();
    }

    public onActionComplete(): void {
        this.syncEditorToCodeMirror();
    }

    public onChange(): void {
        this.syncEditorToCodeMirror();
    }

    public onCopyHtml(): void {
        const html: string = this.codeMirrorObj ? this.codeMirrorObj.getValue() : this.editor.getHtml();
        navigator.clipboard.writeText(html).then(() => {
            ToastUtility.show({
                title: 'Success',
                icon: 'e-icons e-check',
                content: 'Content Copied successfully.',
                position: {
                    X: 'Right'
                },
                cssClass: 'e-toast-success'
            });
        }, () => {
            ToastUtility.show({
                title: 'Error',
                icon: 'e-icons e-warning',
                content: 'Failed to copy content to clipboard.',
                position: {
                    X: 'Right'
                },
                cssClass: 'e-toast-info'
            });
        });
    }

    private applyDeviceOrientation(): void {
        if (Browser.isDevice && this.splitter) {
            this.splitter.orientation = 'Vertical';
            const headerElement: HTMLElement | null = document.querySelector('.html-preview-header');
            if (headerElement) {
                headerElement.style.width = 'auto';
            }
        }
    }

    /**
     * Initialize CodeMirror if not already present, otherwise sync editor
     * content into CodeMirror while preserving the cursor position.
     */
    private syncEditorToCodeMirror(): void {
        if (!this.sourcePane || !this.sourcePane.nativeElement) { return; }
        const rteHtml: string = this.editor.getHtml();

        if (!this.codeMirrorObj) {
            // Run CodeMirror initialization outside Angular's zone to avoid
            // excessive change detection on every keystroke in the editor.
            this.ngZone.runOutsideAngular(() => {
                this.codeMirrorObj = CodeMirror(this.sourcePane.nativeElement, {
                    value: rteHtml,
                    lineNumbers: true,
                    mode: 'text/html',
                    lineWrapping: true,
                    readOnly: true
                });

                this.codeMirrorObj.on('change', () => this.handleCodeMirrorChange());
            });
        } else if (!this.codeMirrorObj.hasFocus() && this.codeMirrorObj.getValue() !== rteHtml) {
            const cursor = this.codeMirrorObj.getCursor();
            this.codeMirrorObj.setValue(rteHtml);
            this.codeMirrorObj.setCursor(cursor);
        }
    }

    private handleCodeMirrorChange(): void {
        if (this.codeMirrorObj && this.codeMirrorObj.getValue() !== this.editor.getHtml()) {
            // Push CodeMirror changes back into the RTE; the change event
            // will re-fire onActionComplete, which keeps both sides in sync.
            this.ngZone.run(() => {
                this.editor.value = this.codeMirrorObj.getValue();
                this.editor.dataBind();
            });
        }
    }
}
