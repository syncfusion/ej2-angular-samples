import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { kanbanData } from './data';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip-template.html',
    styleUrls: ['tooltip-template.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [],
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent, CheckBoxModule]
})
export class TooltipTemplateComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public kanbanData: Object[] = extend([], kanbanData, null, true) as Object[];
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    public temp: string = '<div class="e-kanbantooltiptemp"><table><tr><td class="details"><table>' +
        '<colgroup><col style="width:30%"><col style="width:70%"></colgroup>' +
        '<tbody><tr><td class="CardHeader">Assignee:</td><td>${Assignee}</td></tr>' +
        '<tr><td class="CardHeader">Type:</td><td>${Type}</td></tr><tr>' +
        '<td class="CardHeader">Estimate:</td><td>${Estimate}</td></tr>' +
        '<tr><td class="CardHeader">Summary:</td><td>${Summary}</td></tr></tbody></table>' +
        '</td></tr></table></div>';

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['tooltip-template.style.css'];
    }

    onChange(args: ChangeEventArgs): void {
        this.kanbanObj.enableTooltip = args.checked;
    }

    onTemplateChange(args: ChangeEventArgs): void {
        this.kanbanObj.tooltipTemplate = args.checked ? this.temp : '';
        this.kanbanObj.dataBind();
    }

}
