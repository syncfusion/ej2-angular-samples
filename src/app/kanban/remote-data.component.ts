import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';
import { KanbanComponent, CardSettingsModel, DialogEventArgs, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ KanbanModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class RemoteDataComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public dataManger: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/Kanban',
        crossDomain: true
    });
    public allowDragAndDrop: boolean = false;
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
    dialogOpen(args: DialogEventArgs): void {
        args.cancel = true;
    }
}
