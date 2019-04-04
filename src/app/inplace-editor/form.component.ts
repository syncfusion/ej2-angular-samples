import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, RteService, MultiSelectService, RenderMode } from '@syncfusion/ej2-angular-inplace-editor';
import { ActionEventArgs } from '@syncfusion/ej2-angular-inplace-editor';

/**
 * In-place Editor form sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'form.html',
    encapsulation: ViewEncapsulation.None,
    providers: [RteService, MultiSelectService]
})
export class FormInplaceEditorComponent implements OnInit {
    public date: Object = new Date();
    @ViewChild('inplaceTitleEditor')
    public titleEditorObj: InPlaceEditorComponent;
    @ViewChild('inplaceCommentEditor')
    public commentEditorObj: InPlaceEditorComponent;
    @ViewChild('inplaceTagEditor')
    public tagEditorObj: InPlaceEditorComponent;
    @ViewChild('editorMode')
    public editorModeObj: DropDownListComponent;

    public titleEditorModel: object;
    public commentEditorModel: object;
    public tagEditorModel: object;
    public settings: object;
    public titleRule: object;
    public commentRule: object;
    public tagRule: object;

    public titleEditorValue: String = 'Succinctly E-Book about TypeScript';
    public commentEditorValue: String =
        'The extensive adoption of JavaScript for application development, and the ability to use HTML and JavaScript to create Windows Store apps, has made JavaScript a vital part of the Windows development ecosystem. Microsoft has done extensive work to make JavaScript easier to use';
    public tagEditorValue: string[] = ['TypeScript', 'JavaScript'];
    public editorModeData: string[] = ['Inline', 'Popup'];
    public multiData: string[] = ['Android', 'JavaScript', 'Jquery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];
    public scrollParent: HTMLElement = <HTMLElement>document.querySelector('.sb-right-pane');

    ngOnInit(): void {
        this.titleEditorModel = {
            placeholder: 'Enter your question title'
        };
        this.commentEditorModel = {
            toolbarSettings: {
                enableFloating: false,
                items: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
                    'LowerCase', 'UpperCase', '|', 'OrderedList', 'UnorderedList']
            }
        };
        this.tagEditorModel = {
            mode: 'Box',
            dataSource: this.multiData,
            placeholder: 'Enter your tags'
        };
        this.settings = {
            model: { width: 200 }
        };
        this.titleRule = {
            Title: { required: [true, 'Enter valid title'] }
        };
        this.commentRule = {
            rte: { required: [true, 'Enter valid comments'] }
        };
        this.tagRule = {
            Tag: { required: [true, 'Enter valid tags'] }
        };
        this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
    }

    changeMode(e: ChangeEventArgs) {
        /*Apply selected mode to the component*/
        this.titleEditorObj.mode = e.value as RenderMode;
        this.tagEditorObj.mode = e.value as RenderMode;
        this.commentEditorObj.mode = e.value as RenderMode;
    }

    actiononSuccess(args: ActionEventArgs): void {
        args.value = this.chipCreation(args.value.split(','));
    }

    chipCreation(data: string[]): string {
        let value: string = '<div class="e-chip-list">';
        [].slice.call(data).forEach((val: string) => {
            value += '<div class="e-chip"> <span class="e-chip-text"> ' + val + '</span></div>';
        });
        value += '</div>';
        return value;
    }

    tagCreation() {
        this.chipOnCreate();
    }

    chipOnCreate(): void {
        this.tagEditorObj.element.querySelector('.e-editable-value').innerHTML = this.chipCreation(this.tagEditorObj.value as string[]);
    }

    hidePopup(): void {
        if (this.editorModeObj.value === 'Inline') { return; }
        if (this.titleEditorObj && this.titleEditorObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.titleEditorObj.enableEditMode = false;
        }
        if (this.tagEditorObj && this.tagEditorObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.tagEditorObj.enableEditMode = false;
        }
        if (this.commentEditorObj && this.commentEditorObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.commentEditorObj.enableEditMode = false;
        }
    }
}
