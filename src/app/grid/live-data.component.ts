import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { VirtualScrollService, SelectionService, GridComponent, QueryCellInfoEventArgs, GridModule } from '@syncfusion/ej2-angular-grids';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { L10n, setCulture, EmitType } from '@syncfusion/ej2-base';
import { getTradeData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridlivedata',
    templateUrl: 'live-data.html',
    styleUrls: ['live-data.style.css'],
    providers: [VirtualScrollService, SelectionService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NumericTextBoxModule, ButtonModule, GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class LiveDataComponent implements OnInit {
    public isDataBound: boolean = true;
    public data: object[] = [];
    public dReady: boolean = false;
    @ViewChild('livestream')
    public gridInstance: GridComponent;
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
        let oldValue: any;
        let newValue: any;
        for (let i: number = 0; i < this.gridInstance.currentViewData.length; i++) {
            if (this.gridInstance.currentViewData[i] === undefined) {
                return;
            }
            let num: number = Math.floor(Math.random() * 99) + 1;
            num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            oldValue = this.gridInstance.currentViewData[i]['Net'];
            if (i % 2 === 0) {
                num = num * 0.25;
            } else if (i % 3 === 0) {
                num = num * 0.83;
            } else if (i % 5 == 0) {
                num = num * 0.79;
            } else if (i % 4 == 0) {
                num = num * 0.42;
            } else {
                num = num * 0.51;
            }
            this.isDataBound = true;
            this.gridInstance.setCellValue(
                this.gridInstance.currentViewData[i]['id'],
                'Net',
                parseFloat(num.toFixed(2))
            );
            this.isDataBound = true;
            newValue = parseFloat(
                (this.gridInstance.currentViewData[i]['Net'] - oldValue)
                    .toString()
                    .substring(0, 2)
            );
            this.gridInstance.setCellValue(
                this.gridInstance.currentViewData[i]['id'],
                'Change',
                parseFloat(newValue.toFixed(2))
            );
            this.isDataBound = true;
            let ratingValue: string =
                this.gridInstance.currentViewData[i]['Net'] < 0 ? 'Sell' : 'Buy';
            this.gridInstance.setCellValue(
                this.gridInstance.currentViewData[i]['id'],
                'Rating',
                ratingValue
            );
            let val = num + newValue;
            this.gridInstance.setCellValue(
                this.gridInstance.currentViewData[i]['id'],
                'NetIncome',
                val
            );
        }
    }

    public customizeRatingCell(span1: Element, span2: Element, span1_class: string[], span2_class: string, span2_text: string): void {
        span1_class.forEach((item: string) => span1.classList.add(item));
        span2.classList.add(span2_class);
        (span2 as HTMLElement).innerText = span2_text;
    }

    public queryCellInfoEvent: EmitType<QueryCellInfoEventArgs> = (
        args: QueryCellInfoEventArgs
    ) => {
        if (args.column.field === 'NetIncome') {
            if (args.data['Net'] < 0) {
                args.cell.classList.remove('e-increase');
                args.cell.classList.add('e-decrease');
            } else if (args.data['Net'] > 0) {
                args.cell.classList.remove('e-decrease');
                args.cell.classList.add('e-increase');
            }
        } else if (args.column.field === 'Change') {
            if (args.data['Change'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (args.column.field === 'Net') {
            if (args.data['Net'] < 0) {
                updateCellDetails(args.cell, 'below-0');
            } else {
                updateCellDetails(args.cell, 'above-0');
            }
        } else if (this.isDataBound) {
            if (args.column.field === 'Rating') {
                args.cell.innerHTML = '';
                const span: Element = document.createElement('span');
                const span2: Element = document.createElement('span');
                if (args.data['Change'] === 0) {
                    this.customizeRatingCell(span, span2, ['e-icons', 'e-intermediate-state-2', 'neutral', 'ic', 'side-space'], 'neutral', 'Neutral');
                } else if (args.data['Change'] < -2 && args.data['Net'] < 0) {
                    this.customizeRatingCell(span, span2, ['e-icons', 'e-negc', 'e-chevron-down-double', 'below-0', 'ic', 'side-space'], 'below-0', 'Strongly Sell');
                } else if (args.data['Net'] < 0) {
                    this.customizeRatingCell(span, span2, ['e-icons', 'e-negc', 'e-chevron-down', 'below-0', 'ic', 'side-space'], 'below-0', 'Sell');
                } else if (args.data['Change'] > 5 && args.data['Net'] > 10) {
                    this.customizeRatingCell(span, span2, ['e-icons', 'e-posc', 'e-chevron-up-double', 'above-0', 'ic', 'side-space'], 'above-0', 'Strongly Buy');
                } else {
                    this.customizeRatingCell(span, span2, ['e-icons', 'e-posc', 'e-chevron-up', 'above-0', 'ic', 'side-space'], 'above-0', 'Buy');
                }
                args.cell.appendChild(span);
                args.cell.appendChild(span2);
            }
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
