import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { kanbanData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'show-hide.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, CheckBoxModule]
})
export class ShowHideComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    @ViewChild('checkbox') checkObj: CheckBoxComponent;
    @ViewChild('checkboxProgress') checkboxProgress: CheckBoxComponent;
    @ViewChild('checkboxReview') checkboxReview: CheckBoxComponent;
    @ViewChild('checkboxClose') checkboxClose: CheckBoxComponent;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };

    onChange(args: ChangeEventArgs): void {
        if (args.checked) {
            this.kanbanObj.showColumn(this.checkObj.element.getAttribute('data-id'));
        } else {
            this.kanbanObj.hideColumn(this.checkObj.element.getAttribute('data-id'));
        }
    }

    onChangeProgress(args: ChangeEventArgs): void {
        if (args.checked) {
            this.kanbanObj.showColumn(this.checkboxProgress.element.getAttribute('data-id'));
        } else {
            this.kanbanObj.hideColumn(this.checkboxProgress.element.getAttribute('data-id'));
        }
    }

    onChangeReview(args: ChangeEventArgs): void {
        if (args.checked) {
            this.kanbanObj.showColumn(this.checkboxReview.element.getAttribute('data-id'));
        } else {
            this.kanbanObj.hideColumn(this.checkboxReview.element.getAttribute('data-id'));
        }
    }

    onChangeClose(args: ChangeEventArgs): void {
        if (args.checked) {
            this.kanbanObj.showColumn(this.checkboxClose.element.getAttribute('data-id'));
        } else {
            this.kanbanObj.hideColumn(this.checkboxClose.element.getAttribute('data-id'));
        }
    }

}
