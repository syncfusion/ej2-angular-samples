import { Component, OnInit , ViewChild} from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent , ToolbarService, PageService, ExcelExportService, TreeGridAllModule, PdfExportService} from '@syncfusion/ej2-angular-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ChangeEventArgs, DropDownListAllModule} from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'clipboard.html',
    providers: [ ToolbarService, PageService, ExcelExportService, PdfExportService],
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent, DialogModule, DropDownListAllModule]
})
export class TreeGridClipboardComponent implements OnInit {
    public data: Object[] = [];
    public selectionSettings: object;
    public pageSettings: Object;
    public d1data: Object;
    public fields1: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('alertDialog')
    public alertDialog: DialogComponent;
    public alertHeader: string = 'Copy with Header';
    public hidden: Boolean = false;
    public target: string = '.control-section';
    public alertWidth: string = '300px';
    public alertContent: string = 'Atleast one row should be selected to copy with header';
    public showCloseIcon: Boolean = false;
    public animationSettings: Object = { effect: 'None' };
    public toolbar: Object[];
    public alertDlgBtnClick = () => {
        this.alertDialog.hide();
    }
    public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings= { pageSize: 10 },
        this.selectionSettings = { type: 'Multiple' };
        this.fields1 = { text: 'mode' , value: 'id'};
        this.d1data= [ { id: 'Parent', mode: 'Parent' },
                       { id: 'Child', mode: 'Child' },
                       { id: 'Both', mode: 'Both' },
                       { id: 'None', mode: 'None' },]
        this.toolbar = [{ text: 'Copy', tooltipText: 'Copy', prefixIcon: 'e-copy', id: 'copy' },
        { text: 'Copy With Header', tooltipText: 'Copy With Header', prefixIcon: 'e-copy', id: 'copyHeader' }];
    }
    change (e: ChangeEventArgs) : void {
        let mode: any = <string>e.value;
        this.treegrid.copyHierarchyMode = mode;
    }
    public toolbarClick(args: ClickEventArgs): void {
        if(this.treegrid.getSelectedRecords().length>0) {
            let withHeader: boolean = false;
            if (args.item.id === 'copyHeader') {
                withHeader = true;
            }
            this.treegrid.copy(withHeader);
        } else {
            this.alertDialog.show();
        }
    }

}