import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { IDataOptions, IDataSet, PivotView,PivotViewModule, DisplayOption, PivotChartService, QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-pivotview';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { Observable } from 'rxjs';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table LiveData Sample.
 */

@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'live-data.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['live-data.css'],
    providers: [PivotChartService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, NumericTextBoxModule, ButtonModule, NgClass]
})

export class LiveDataComponent implements OnInit {
    public observable = new Observable();
    public chartSettings: ChartSettings;
    public displayOption: DisplayOption;
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public colourScheme: string[] = ['bg-fade', 'bg-fade1', 'bg-fade2'];
    public timerID: any;
    public initial: boolean = true;
    public previousPivotValues: any;
    public REGIONS: any = [
        {
            "Region": "North America",
            "Countries": ["Canada", "United States", "Mexico"]
        },
        {
            "Region": "Middle East",
            "Countries": ["Turkey", "Saudi Arabia"]
        },
        {
            "Region": "Europe",
            "Countries": ["Russia", "Germany", "France", "United Kingdom", "Italy"]
        },
        {
            "Region": "Africa",
            "Countries": ["South Africa"]
        },
        {
            "Region": "Asia Pacific",
            "Countries": ["Australia", "China", "India", "Indonesia",
                "Japan", "South Korea"]
        },
        {
            "Region": "South America",
            "Countries": ["Brazil"]
        }
    ];
    public DATA: IDataSet[] = [
        {
            "Category": "Agriculture",
            "Type": "Corn",
            "Spread": 0.01,
            "Open Price": 379.50,
            "Price": 379.8026,
            "Buy": 379.7976,
            "Sell": 379.8076,
            "Change": 0.3026,
            "Change(%)": 0.0797,
            "Volume": 11266
        },
        {
            "Category": "Agriculture",
            "Type": "Rice",
            "Spread": 0.01,
            "Open Price": 11.245,
            "Price": 10.4154,
            "Buy": 10.4104,
            "Sell": 10.4204,
            "Change": -0.8296,
            "Change(%)": -7.3779,
            "Volume": 220
        },
        {
            "Category": "Agriculture",
            "Type": "Wheat",
            "Spread": 0.01,
            "Open Price": 465.50,
            "Price": 465.52,
            "Buy": 465.50,
            "Sell": 465.50,
            "Change": 0.02,
            "Change(%)": 0.0043,
            "Volume": 4318
        },
        {
            "Category": "Agriculture",
            "Type": "Soybean",
            "Spread": 0.01,
            "Open Price": 1038.00,
            "Price": 1038.6171,
            "Buy": 1038.6121,
            "Sell": 1038.6221,
            "Change": 0.6171,
            "Change(%)": 0.0595,
            "Volume": 20356
        },
        {
            "Category": "Agriculture",
            "Type": "Coffee",
            "Spread": 0.01,
            "Open Price": 125.70,
            "Price": 125.69,
            "Buy": 125.70,
            "Sell": 125.70,
            "Change": -0.01,
            "Change(%)": -0.008,
            "Volume": 1654
        },
        {
            "Category": "Agriculture",
            "Type": "Cocoa",
            "Spread": 0.01,
            "Open Price": 307.00,
            "Price": 307.03,
            "Buy": 307.00,
            "Sell": 307.00,
            "Change": 0.03,
            "Change(%)": 0.001,
            "Volume": 978
        },
    ]

    @ViewChild('pivotview')
    public pivotObj: PivotView;

    @ViewChild('update')
    public updateButton: ButtonComponent;
    @ViewChild('clear')
    public clearButton: ButtonComponent;
    @ViewChild('feeddelay')
    public feedDelayInput: NumericTextBoxComponent;

    destroyClear(_args: any): void {
        if (this.timerID) {
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    }

    generateData(): any {
        const count: number = 1000;
        const currData: Object[] = [];
        let j: number = 0;
        for (let i: number = 0; i < count; i++) {
            const rand: number = Math.floor(Math.random() * Math.floor(this.DATA.length));
            const region = this.REGIONS[j];
            for (let k = 0; k < region.Countries.length; k++) {
                const data = Object.assign({}, this.DATA[rand]);
                const dataObj = {
                    ...data,
                    Region: region.Region,
                    Country: region.Countries[k]
                };
                this.randomizeObjectData(dataObj);
                currData.push(dataObj);
            }
            j++;
            j = j > 5 ? 0 : j;
        }
        return currData;
    }

    randomizeObjectData(dataObj: any): any {
        const changeP = "Change(%)";
        const res: any = this.generateNewPrice(dataObj.Price, dataObj.Volume);
        dataObj.Change = res.Price - dataObj.Price;
        dataObj.Price = res.Price;
        dataObj[changeP] = res.ChangePercent;
        dataObj.Volume = res.Volume;
    }

    generateNewPrice(oldPrice: any, oldVolume: any): any {
        let rnd: number = Math.random();
        rnd = Math.round(rnd * 100) / 100;
        const volatility: number = 15;
        let newPrice: number = 0;
        let newVolume: number = 0;
        let changePercent: number = 2 * volatility * rnd;
        if (changePercent > volatility) {
            changePercent -= (2 * volatility);
        }
        let changeVolumnPercent: number = 2 * (volatility - 5) * rnd;
        if (changeVolumnPercent > (volatility - 5)) {
            changeVolumnPercent -= (2 * (volatility - 5));
        }
        let changeAmount: number = oldPrice * (changePercent / 100);
        newPrice = oldPrice + changeAmount;
        let changeVolume: number = oldVolume * (changeVolumnPercent / 100);
        newVolume = oldVolume + changeVolume;
        newPrice = Math.round(newPrice * 100) / 100;
        newVolume = Math.round((newVolume * 100) / 100);
        const result = { Price: 0, ChangePercent: 0, Volume: 0 };
        changePercent = Math.round(changePercent * 100) / 100;
        result.Price = newPrice;
        result.ChangePercent = changePercent;
        result.Volume = newVolume;
        return result;
    };

    updateCellValues(): void {
        if (this.pivotObj.pivotValues.length > 0) {
            if (!this.previousPivotValues) {
                this.previousPivotValues = this.pivotObj.pivotValues;
            }
            this.previousPivotValues = this.pivotObj.pivotValues;
        }
        this.pivotObj.dataSourceSettings.dataSource = this.generateData();
    };
    updateClick(): void {
        if (!this.timerID) {
            this.updateButton.disabled = true;
            this.feedDelayInput.enabled = false;
            this.clearButton.disabled = false;
            this.timerID = setInterval(this.updateCellValues.bind(this), this.feedDelayInput.value);
        }
    };
    clearClick(): void {
        if (this.timerID) {
            this.updateButton.disabled = false;
            this.feedDelayInput.enabled = true;
            this.clearButton.disabled = true;
            clearInterval(this.timerID);
            this.timerID = undefined;
        }
    };

    getCellContent(args): any {
        if (args != null && args.cellInfo) {
            if (args.cellInfo.axis === 'value') {
                if (args.cellInfo.axis === 'value' && !args.cellInfo.isGrandSum && args.cellInfo.actualText === 'Change') {
                    args.targetCell.classList.add(this.cellColour(args.cellInfo.value));
                }
                
            }
        }
    }

    cellColour(value: any): string {
        let colorIndex: number = value < 0 ? 0 : value > 0 ? 1 : 2;
        return this.colourScheme[colorIndex];
    }

    ngOnInit(): void {
        this.chartSettings = {
            value: 'Price',
            legendSettings: { visible: false },
            chartSeries: { type: "Column" },
            zoomSettings: {
                enableScrollbar: false,
                toolbarItems: [],
                enableSelectionZooming: false,
            } as any,
            load: this.observable.subscribe(args => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                (args as ILoadedEventArgs).chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            }) as any
        } as ChartSettings;

        this.displayOption = { view: 'Both' } as DisplayOption;

        this.gridSettings = {
            columnWidth: 100
        } as GridSettings;

        this.dataSourceSettings = {
            dataSource: this.generateData(),
            enableSorting: true,
            columns: [{ name: 'Type' }],
            values: [{ name: 'Volume', caption: 'Volume' }, { name: 'Price', caption: 'Price' }, { name: 'Change', type: 'Avg', caption: 'Change(%)' }],
            rows: [{ name: 'Country' }],
            filters: [{ name: 'Category' }],
            formatSettings: [{ name: 'Price', format: 'C2' }, { name: 'Open Price', format: 'C2' }, { name: 'Change', format: "###.##'%'" }, { name: 'Volume', format: 'N0' }],
            expandAll: false,
            showSubTotals: false,
            showGrandTotals: false,
            emptyCellsTextContent: 'Revising',
            sortSettings: [{name: 'Type', order: 'Ascending', membersOrder: ['Corn', 'Rice', 'Wheat', 'Soybean', 'Coffee', 'Cocoa']}]
        };
    }

    public ngOnDestroy(): void {
        this.destroyClear(undefined);
    }

    ngAfterViewInit(args: any): void {
        if (this.initial) {
            document.getElementById('update1')?.click();
            this.initial = false;
            this.feedDelayInput.element.addEventListener('keypress', (e: any) => {
                if (e && e.key === 'Enter' && (this.feedDelayInput.element.parentElement as HTMLElement).classList.contains('e-input-focus')) {
                    this.feedDelayInput.value = parseInt(this.feedDelayInput.element.value);
                    this.feedDelayInput.focusOut();
                    this.feedDelayInput.element.click();
                }
            });
        }
    }
}