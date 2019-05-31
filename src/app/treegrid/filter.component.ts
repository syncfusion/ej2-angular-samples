import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, FilterService } from '@syncfusion/ej2-angular-treegrid';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'filter.html',
    styleUrls: ['filter.style.css'],
    providers: [ FilterService ],
    encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;
    public filterSettings: Object;
    public templateOptions: object;
    public dropDownFilter: DropDownList;
    public d1data: Object;
    public fields1: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['filter.style.css'];
    }

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
        this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
        this.templateOptions = {
            create: (args: { element: Element }) => {
                let dd: HTMLInputElement = document.createElement('input');
                dd.id = 'duration';
                return dd;
            },
            write: (args: { element: Element }) => {
                let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
                this.dropDownFilter = new DropDownList({
                    dataSource: dataSource,
                    value: 'All',
                    change: (e: ChangeEventArgs) => {
                        let valuenum: any = +e.value;
                        let id: any = <string>this.dropDownFilter.element.id;
                        let value: any = <string>e.value;
                        if ( value !== 'All') {
                            this.treegrid.filterByColumn( id, 'equal', valuenum );
                        } else {
                            this.treegrid.removeFilteredColsByField(id);
                        }
                    }
                });
                this.dropDownFilter.appendTo('#duration');
         }
        };
        this.fields1 = { text: 'mode' , value: 'id'};
        this.d1data= [{ id: 'Parent', mode: 'Parent' },
                      { id: 'Child', mode: 'Child' },
                      { id: 'Both', mode: 'Both' },
                      { id: 'None', mode: 'None' },]
    }
    change (e: ChangeEventArgs) : void {
        let mode: any = <string>e.value;
        this.treegrid.filterSettings.hierarchyMode = mode;
        this.treegrid.clearFiltering();
        this.dropDownFilter.value = 'All';
    }
}
