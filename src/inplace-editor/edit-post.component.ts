import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, ActionEventArgs, RenderMode } from '@syncfusion/ej2-angular-inplace-editor';
import { MultiSelectService, RteService } from '@syncfusion/ej2-angular-inplace-editor';

/**
 * Form component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'edit-post.html',
    encapsulation: ViewEncapsulation.None,
    providers: [RteService, MultiSelectService]
})
export class EditPostComponent {
    public date: Object = new Date();
    @ViewChild('title') titleObj: InPlaceEditorComponent;
    @ViewChild('comment') commentObj: InPlaceEditorComponent;
    @ViewChild('tags') tagsObj: InPlaceEditorComponent;
    @ViewChild('mode') modeObj: DropDownListComponent;

    public titleEditorModel: object;
    public commentEditorModel: object;
    public tagEditorModel: object;
    public settings: object;
    public tagPopSettings: object;
    public titleRule: object;
    public commentRule: object;
    public tagRule: object;

    public tagsValue: string[] = ['TypeScript', 'JavaScript'];
    public commentValue: String = 'The extensive adoption of JavaScript for application development, and the' +
        'ability to use HTML and JavaScript to create Windows Store apps, has made JavaScript a vital part of' +
        'the Windows development ecosystem. Microsoft has done extensive work to make JavaScript easier to use.';

    public modeData: string[] = ['Inline', 'Popup'];
    public tagsData: string[] = ['Android', 'JavaScript', 'jQuery', 'TypeScript', 'Angular', 'React', 'Vue', 'Ionic'];
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
            dataSource: this.tagsData,
            placeholder: 'Enter your tags'
        };
        this.settings = {
            model: { width: (<HTMLElement>document.querySelector('.inplace-editor-control-section.form-layout')).offsetWidth }
        };
        this.tagPopSettings = {
            model: { width: 'auto' }
        }
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

    changeMode(args: ChangeEventArgs): void {
        /*Apply selected mode to the component*/
        let mode: RenderMode = args.value as RenderMode;
        this.titleObj.mode = mode;
        this.commentObj.mode = mode;
        this.tagsObj.mode = mode;
    }

    actionSuccess(args: ActionEventArgs): void {
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
        this.tagsObj.element.querySelector('.e-editable-value').innerHTML = this.chipCreation(this.tagsObj.value as string[]);
    }

    hidePopup(): void {
        if (this.modeObj.value === 'Inline') { return; }
        if (this.titleObj && this.titleObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.titleObj.enableEditMode = false;
        }
        if (this.commentObj && this.commentObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.commentObj.enableEditMode = false;
        }
        if (this.tagsObj && this.tagsObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.tagsObj.enableEditMode = false;
        }
    }
}