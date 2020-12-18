import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';
import { KanbanComponent, CardSettingsModel, DialogEventArgs } from '@syncfusion/ej2-angular-kanban';

@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    encapsulation: ViewEncapsulation.None
})

export class RemoteDataComponent {
    @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
    public dataManger: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Kanban',
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
