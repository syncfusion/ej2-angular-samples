/**
 * RTE Event functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { ActionBeginEventArgs, ActionCompleteEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, RichTextEditorModel } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'client-side-events.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['events.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class EventsComponent {
    @ViewChild('RTEevents') rteObj: RichTextEditorComponent;
    public tools: object = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|',
        'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
    };
    //Display event log
    appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    //Handler for created event trace
    onCreate(): void {
        this.appendElement('RichTextEditor <b>create</b> event called<hr>');
    }
    //Handler for changed event trace
    onChange(): void {
        this.appendElement('RidhTextEditor <b>change</b> event called<hr>');
    }
    begin(args: ActionBeginEventArgs): void {
        this.appendElement('<b>' + args.requestType + '</b> action is called<hr>');
        this.handleFullScreen(args);
    }
    complete(args: ActionCompleteEventArgs): void {
        this.appendElement('<b>' + args.requestType + '</b> action is completed<hr>');
        this.actionCompleteHandler();
    }
    focus(): void {
        this.appendElement('RichTextEditor <b>focus</b> event called<hr>');
    }
    blur(): void {
        this.appendElement('RichTextEditor <b>blur</b> event called<hr>');
    }
    toolbarClick(): void {
        this.appendElement('RidhTextEditor <b>toolbar click</b> event called<hr>');
    }

    onClear(): void {
        document.getElementById('EventLog').innerHTML = '';
    }
    handleFullScreen(e: any): void {
        let leftBar: HTMLElement = document.querySelector('#left-sidebar');
        if (e.targetItem === 'Maximize') {
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
        } else if (e.targetItem === 'Minimize') {
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
            addClass([leftBar], ['e-open']); }
        }
    }
    actionCompleteHandler(): void {
        setTimeout(() => { this.rteObj.toolbarModule.refreshToolbarOverflow(); }, 400);
    }
}