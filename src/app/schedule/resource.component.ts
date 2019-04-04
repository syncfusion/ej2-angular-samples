import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { resourceSampleData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import {
    ScheduleComponent, EventSettingsModel,
    DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'resource.html',
    /* custom code start*/
    styleUrls: ['resource.style.css'],
    /* custom code end*/
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class ResourceComponent {
    public ownerCollections: Object[] = [
        { OwnerText: 'Margaret', OwnerId: 1, Color: '#ea7a57' },
        { OwnerText: 'Robert', OwnerId: 2, Color: '#df5286' },
        { OwnerText: 'Laura', OwnerId: 3, Color: '#865fcf' }
    ];
    public resourceDataSource: Object[] = this.ownerCollections;
    public allowMultiple: Boolean = true;
    public selectedDate: Date = new Date(2018, 5, 5);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], resourceSampleData, null, true) };
    @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
    @ViewChild('ownerOneObj') ownerOneObj: CheckBoxComponent;
    @ViewChild('ownerTwoObj') ownerTwoObj: CheckBoxComponent;
    @ViewChild('ownerThreeObj') ownerThreeObj: CheckBoxComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['resource.style.css'];
    }

    onChange(): void {
        let predicate: Predicate;
        let checkBoxes: CheckBoxComponent[] = [this.ownerOneObj, this.ownerTwoObj, this.ownerThreeObj];
        checkBoxes.forEach((checkBoxObj: CheckBoxComponent) => {
            if (checkBoxObj.checked) {
                if (predicate) {
                    predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                } else {
                    predicate = new Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
            }
        });
        this.scheduleObj.eventSettings.query = new Query().where(predicate);
    }
}