import { Component, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { orderData } from './data';
import { FilterService, GridComponent,IFilter,VirtualScrollService  } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBox  } from '@syncfusion/ej2-buttons';
import { getData } from './data';

@Component({
    selector: 'ej-gridbatchedit',
    templateUrl: 'over-view.html',
    styleUrls: ['overview.style.css', '../../styles/Grid/style.css'],
    providers: [FilterService,VirtualScrollService]
})
export class OverViewComponent implements OnInit {   
    public dReady: boolean = false;
    public dtTime: boolean = false;
    public isDataBound: boolean = false;
    public isDataChanged: boolean = true;
    public intervalFun: any;
    public clrIntervalFun: any;
    public clrIntervalFun1: any;
    public clrIntervalFun2: any;    
    public dropSlectedIndex: number = null;
    public stTime: any;
    public data: Object;
    public filter: Object;
    public filterSettings: Object;
    public selectionSettings: Object;  
    public height: string = '240px';
    @ViewChild('sample') 
    public listObj: DropDownListComponent;
    @ViewChild('overviewgrid')
    public gridInstance : GridComponent ;  
    public ddlData: Object[] = [
        { text: '1,000 Rows and 11 Columns', value: '1000' },
        { text: '10,000 Rows and 11 Columns', value: '10000' },
        { text: '1,00,000 Rows and 11 Columns', value: '100000' }      
    ]; 
    public fields: Object = { text: 'text', value: 'value' };
    public item: number[] = [1, 2, 3, 4, 5];  

    public ngOnInit(): void {
        this.data = getData(1000);
        this.filterSettings = { type: "Menu" };      
        this.filter = { type: "CheckBox" };    
       this.stTime = performance.now();
        this.selectionSettings = {persistSelection: true, type: "Multiple", checkboxOnly: true };
       
    }
    
    ngAfterViewInit(args: any): void {
        this.gridInstance.on('data-ready', function () {
            this.dReady = true;
        });
        document.getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {  
            if (this.stTime && this.isDataChanged) {
                let msgEle = document.getElementById('msg');
                let val: any = (performance.now() - this.stTime).toFixed(0);
                this.stTime = null;                
                this.dtTime = false;
                this.isDataChanged = false;
                msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
                msgEle.classList.remove('e-hide')
           }
            })
    }
    valueChange(args:any): void {
		this.listObj.hidePopup();	
        this.gridInstance.showSpinner();
        this.dropSlectedIndex = null;
         let index: number = this.listObj.value as number;         
         clearTimeout(this.clrIntervalFun2);
         this.clrIntervalFun2 = setTimeout(() => {
             this.isDataChanged = true;
             this.stTime = null;
             let contentElement: Element = this.gridInstance.contentModule.getPanel().firstChild as Element;
             contentElement.scrollLeft = 0;
             contentElement.scrollTop = 0;
             this.gridInstance.pageSettings.currentPage = 1;
             this.stTime = performance.now();
             this.gridInstance.dataSource = getData(index);
             this.gridInstance.hideSpinner();     
         }, 100);
    }
    onDataBound(args:any):void {
        clearTimeout(this.clrIntervalFun);
        clearInterval(this.intervalFun);
        this.dtTime = true;
    }
    
}
