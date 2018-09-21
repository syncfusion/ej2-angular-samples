import { Component, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { orderData } from './data';
import { FilterService, GridComponent,IFilter,VirtualScrollService  } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBox  } from '@syncfusion/ej2-buttons';

@Component({
    selector: 'ej-gridbatchedit',
    templateUrl: 'over-view.html',
    styleUrls: ['./overview.style.css'],
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
    private item: number[] = [1, 2, 3, 4, 5];  

    public ngOnInit(): void {
        this.data = getData(1000);
        this.filterSettings = { type: "Menu" };      
        this.filter = { type: "CheckBox" };    
       this.stTime = performance.now(); 
        this.gridInstance.on('data-ready', function () {
            this.dReady = true;
        });
        this.selectionSettings = {persistSelection: true, type: "Multiple", checkboxOnly: true };
       
    }
    
    ngAfterViewInit(args: any): void {
        
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
function getData(dataCount?: number): object {  
    let check: boolean[] = [true, false];
    let Employees: string[] = [
        'Michael', 'Kathryn', 'Tamer', 'Martin', 'Davolio', 'Nancy', 'Fuller', 'Leverling', 'Peacock',
        'Margaret', 'Buchanan', 'Janet', 'Andrew', 'Callahan', 'Laura', 'Dodsworth', 'Anne',
        'Bergs', 'Vinet', 'Anton', 'Fleet', 'Zachery', 'Van', 'King', 'Jack', 'Rose'];
    let Designation: string[] = ['Manager', 'CFO', 'Designer', 'Developer', 'Program Directory', 'System Analyst', 'Project Lead']
    let Mail: string[] = ['sample.com', 'arpy.com', 'rpy.com', 'mail.com', 'jourrapide.com']
    let category: string[] = ['Energy', 'Financial', 'Technology', 'Industrial']
    let Location: string[] = ['UK', 'USA', 'Sweden', 'France', 'Canada', 'Argentina', 'Austria', 'Germany', 'Mexico']
    let Status: string[] = ['Active', 'InActive'];
    let Trustworthiness: string[] = ['Perfect', 'Sufficient', 'InSufficient'];
    let tradeData: Object[] = [];
    let Address: string[] = ["59 rue de l'Abbaye", "Luisenstr. 48", "Rua do Paço, 67", "2, rue du Commerce", "Boulevard Tirou, 255",
        "Rua do Paço, 67", "Hauptstr. 31", "Starenweg 5", "Rua do Mercado, 12", "Carrera 22 con Ave. Carlos Soublette #8-35", "Kirchgasse 6",
        "Sierras de Granada 9993", "Mehrheimerstr. 369", "Rua da Panificadora, 12", "2817 Milton Dr.", "Kirchgasse 6", "Åkergatan 24", "24, place Kléber",
        "Torikatu 38", "Berliner Platz 43", "5ª Ave. Los Palos Grandes", "1029 - 12th Ave. S.",
        "Torikatu 38", "P.O. Box 555", "2817 Milton Dr.", "Taucherstraße 10", "59 rue de l'Abbaye", "Via Ludovico il Moro 22",
        "Avda. Azteca 123", "Heerstr. 22", "Berguvsvägen  8", "Magazinweg 7", "Berguvsvägen  8", "Gran Vía, 1", "Gran Vía, 1",
        "Carrera 52 con Ave. Bolívar #65-98 Llano Largo", "Magazinweg 7", "Taucherstraße 10", "Taucherstraße 10",
        "Av. Copacabana, 267", "Strada Provinciale 124", "Fauntleroy Circus", "Av. dos Lusíadas, 23",
        "Rua da Panificadora, 12", "Av. Inês de Castro, 414", "Avda. Azteca 123", "2817 Milton Dr."]
    let EmployeeImg = ['usermale', 'userfemale'];
    if (typeof dataCount === 'string') {
        dataCount = parseInt(dataCount);
    }
    for (let i: number = 1; i <= dataCount; i++) {
        let code = 10000;
        let Software = Math.random() * 100;
        if(Software <= 20)
            Software = Software + 30;
        tradeData.push({
            'check': check[Math.floor(Math.random() * check.length)],
            'EmployeeID': code + i,
            'Employees': Employees[Math.floor(Math.random() * Employees.length)] + '  ' + Employees[Math.floor(Math.random() * Employees.length)],
            'Designation': Designation[Math.floor(Math.random() * Designation.length)],
            'Location': Location[Math.floor(Math.random() * Location.length)],
            'Status': Status[Math.floor(Math.random() * Status.length)],
            'Trustworthiness': Trustworthiness[Math.floor(Math.random() * Trustworthiness.length)],
            'Rating': Math.floor(Math.random() * 5),
            'Software': Math.floor(Software),
            'EmployeeImg': EmployeeImg[Math.floor(Math.random() * EmployeeImg.length)],
            'CurrentSalary': Math.floor((Math.random() * 100000)),
            'Address': Address[Math.floor(Math.random() * Address.length)],
        })
        let emp = tradeData[i - 1]["Employees"];
        let sName = emp.substr(0, emp.indexOf(' ')).toLowerCase();
        tradeData[i - 1]['Mail'] = sName + (Math.floor(Math.random() * 100) + 10) + '@' + Mail[Math.floor(Math.random() * Mail.length)];
  
    }
    return tradeData;
  }
