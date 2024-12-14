import { Component, ViewEncapsulation, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs, MultiSelectModel, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, RteService, MultiSelectService, RenderMode, InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { ActionEventArgs } from '@syncfusion/ej2-angular-inplace-editor';
import { RichTextEditorModel } from '@syncfusion/ej2-richtexteditor';
import { TextBoxModel } from '@syncfusion/ej2-inputs';
import { PopupSettingsModel } from '@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * In-place Editor form sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'form.html',
    styleUrls: ['form.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [RteService, MultiSelectService],
    standalone: true,
    imports: [InPlaceEditorModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class FormInplaceEditorComponent implements OnInit {

    @ViewChild('inplaceTitleEditor')
    public titleEditorObj: InPlaceEditorComponent;

    @ViewChild('inplaceCommentEditor')
    public commentEditorObj: InPlaceEditorComponent;

    @ViewChild('inplaceTagEditor')
    public tagEditorObj: InPlaceEditorComponent;

    @ViewChild('editorMode')
    public editorModeObj: DropDownListComponent;

    @ViewChild('formlayout')
    public formlayout: ElementRef;

    public date: Date = new Date();
    public titleEditorValue: String = 'Succinctly E-Book about TypeScript';
    public commentEditorValue: String = 'The extensive adoption of JavaScript for application development, and the ability to use HTML and JavaScript to create Windows Store apps, has made JavaScript a vital part of the Windows development ecosystem. Microsoft has done extensive work to make JavaScript easier to use';
    public tagEditorValue: string[] = ['TypeScript', 'JavaScript'];
    public editorModeData: string[] = ['Inline', 'Popup'];
    public multiData: string[] = ['Android', 'JavaScript', 'Jquery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];
    public scrollParent: HTMLElement;
    public titleEditorModel: TextBoxModel = {
        placeholder: 'Enter your question title'
    };
    public commentEditorModel: RichTextEditorModel = {
        toolbarSettings: {
            enableFloating: false,
            items: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|', 'OrderedList', 'UnorderedList']
        }
    };
    public tagEditorModel: MultiSelectModel = {
        mode: 'Box',
        dataSource: this.multiData,
        placeholder: 'Enter your tags'
    };
    public tagPopSettings: PopupSettingsModel = { model: { width: 'auto' } };
    public commentsPopSettings: PopupSettingsModel;
    public titleRule: { [name: string]: { [rule: string]: Object } } = {
        Title: { required: [true, 'Enter valid title'] }
    };
    public commentRule: { [name: string]: { [rule: string]: Object } } = {
        rte: { required: [true, 'Enter valid comments'] }
    };
    public tagRule: { [name: string]: { [rule: string]: Object } } = {
        Tag: { required: [true, 'Enter valid tags'] }
    };

    ngOnInit(): void {
        this.scrollParent = <HTMLElement>document.querySelector('.sb-right-pane');
        if(this.scrollParent){
            this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
        }
        
    }

    commentCreated(): void {
        this.commentsPopSettings = {
            model: {
                width: this.formlayout.nativeElement.offsetWidth
            }
        };
    }

    changeMode(e: ChangeEventArgs): void {
        /* Apply selected mode to the component */
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

    tagCreation(): void {
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
