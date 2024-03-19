import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SelectionService, TreeGridComponent, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids'
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { L10n, setCulture, EmitType } from '@syncfusion/ej2-base';
import { getTradeData } from './jsontreegriddata';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'live-data.html',
    styleUrls: ['live-data.css'],
    providers: [SelectionService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, NumericTextBoxModule, ButtonModule]
})
export class LiveDataComponent implements OnInit {
    public isDataBound: boolean = true;
    public data: object[] = [];
    public dReady: boolean = false;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('update')
    public updateButton: ButtonComponent;
    @ViewChild('clear')
    public clearButton: ButtonComponent;
    @ViewChild('feeddelay')
    public feedDelayInput: NumericTextBoxComponent;

    public timerID: any;
    public initial: boolean = true;
    public updateClick(_args: any): void {
        if (!this.timerID) {
            this.updateButton.disabled = true;
            this.feedDelayInput.enabled = false;
            this.clearButton.disabled = false;
            this.timerID = setInterval(
                this.updateCellValues.bind(this),
                this.feedDelayInput.value
            );
        }
    }

    public destroyClear(_args: any): void {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    }

    public clearClick(_args: any): void {
        if (this.timerID) {
            this.updateButton.disabled = false;
            this.feedDelayInput.enabled = true;
            this.clearButton.disabled = true;
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    }

    public updateCellValues(): TimerHandler {
        let oldValue;
        for (let i = 0; i < this.treegrid.grid.currentViewData.length; i++) {
            if (this.treegrid.grid.currentViewData[i] === undefined) {
                return;
            }
            let num = Math.floor(Math.random() * 40) + 1;
            num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
            oldValue = this.treegrid.grid.currentViewData[i]['Change'];
            if (i % 2 === 0) {
                num = num * 0.25;
            } else if (i % 3 === 0) {
                num = num * 0.83;
            } else if (i % 5 === 0) {
                num = num * 0.79;
            } else if (i % 4 === 0) {
                num = num * 0.42;
            } else {
                num = num * 0.51;
            }
            this.isDataBound = true;
            const maxChange = 2 - this.treegrid.grid.currentViewData[i]['Change'];
            const minChange = -2 - this.treegrid.grid.currentViewData[i]['Change'];
            const newChange = Math.max(Math.min(num, maxChange), minChange);
            this.treegrid.grid.setCellValue(
                this.treegrid.grid.currentViewData[i]['id'],
                'Change',
                parseFloat(newChange.toFixed(2))
            );
            this.isDataBound = true;
            let newPercentageChange;
            if (this.treegrid.grid.currentViewData[i]['indexfunds'] === "NIFTY 50") {
                newPercentageChange = Math.max(Math.min(newChange, 2), -2);
            } else if (this.treegrid.grid.currentViewData[i]['indexfunds'] === "NIFTY BANK") {
                newPercentageChange = Math.max(Math.min(newChange, 4), -4);
            } else {
                const maxPercentageChange = 2 - this.treegrid.grid.currentViewData[i]['PercentageChange'];
                const minPercentageChange = -2 - this.treegrid.grid.currentViewData[i]['PercentageChange'];
                newPercentageChange = Math.max(Math.min(newChange, maxPercentageChange), minPercentageChange);
            }
            this.treegrid.grid.setCellValue(
                this.treegrid.grid.currentViewData[i]['id'],
                'PercentageChange',
                parseFloat(newPercentageChange.toFixed(2))
            );
            this.isDataBound = true;
            const val = this.treegrid.grid.currentViewData[i]['Ltp'] + newPercentageChange;
            this.treegrid.grid.setCellValue(this.treegrid.grid.currentViewData[i]['id'], 'Ltp', val);
        }
    }

    public queryCellInfoEvent: EmitType<QueryCellInfoEventArgs> = (
        args: QueryCellInfoEventArgs
    ) => {
        if (args.column.field === 'Ltp') {
            if (args.data['Ltp'] < 3000) {
                args.cell.classList.remove('e-increase');
                args.cell.classList.add('e-decrease');
            } else if (args.data['Ltp'] > 3000) {
                args.cell.classList.remove('e-decrease');
                args.cell.classList.add('e-increase');
            }
        } else if (args.column.field === 'PercentageChange') {
            if (args.data['PercentageChange'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (args.column.field === 'Change') {
            if (args.data['Change'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (args.column.field === 'indexfunds' && args.data['hasChildRecords']) {
            args.cell.getElementsByClassName('e-treecell')[0].classList.add('e-parent');
        }
        this.isDataBound = true;
    };

    public ngOnInit(): void {
        this.data = getTradeData;
    }

    public ngOnDestroy(): void {
        this.destroyClear(undefined);
    }

    ngAfterViewInit(args: any): void {
        if (this.initial) {
            document.getElementById('update').click();
            this.initial = false;
        };
        this.feedDelayInput.element.addEventListener('keypress', (e: any) => {
            if (e && e.key === 'Enter' && this.feedDelayInput.element.parentElement.classList.contains('e-input-focus')) {
                this.feedDelayInput.value = parseInt(this.feedDelayInput.element.value);
                this.feedDelayInput.focusOut();
                this.updateButton.element.click();
            }
        });
    }
}

function updateCellDetails(cell: any, className: any) {
    var div = document.createElement('div');
    var span1 = document.createElement('span');
    span1.classList.add('rowcell-left');
    div.classList.add(className);
    span1.innerHTML = cell.innerHTML;
    cell.innerHTML = '';
    div.appendChild(span1);
    cell.appendChild(div);
}