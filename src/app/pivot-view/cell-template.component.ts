import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { IDataOptions, PivotView, IAxisSet, IFieldOptions, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(false);

/**
 * PivotView Cell Template Sample.
 */
declare var require: any;
let data: IDataSet[] = require('./rData.json');
@Component({
    selector: 'ej2-pivotview-container',
    styleUrls: ['cell-template.css'],
    templateUrl: 'cell-template.html',
    encapsulation: ViewEncapsulation.None
})

export class CellTemplateComponent implements OnInit {
    public dataSource: IDataOptions;
    public gridSettings: GridSettings;
    public cellTemplate: string;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['cell-template.css'];
    }

    @ViewChild('pivotview')
    public pivotGridObj: PivotView;
    onLoad(): void {
        if (data[0].Year === undefined) {
            let date: Date;
            for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
                date = new Date(data[ln].Date.toString());
                let dtYr: number = date.getFullYear();
                let dtMn: number = date.getMonth();
                let dtdv: number = (dtMn + 1) / 3;
                data[ln].Year = 'FY ' + dtYr;
                data[ln].Quarter = dtdv <= 1 ? 'Q1 ' + ('FY ' + dtYr) : dtdv <= 2 ? 'Q2 ' + ('FY ' + dtYr) :
                    dtdv <= 3 ? 'Q3 ' + ('FY ' + dtYr) : 'Q4 ' + ('FY ' + dtYr);
                data[ln].HalfYear = (dtMn + 1) / 6 <= 1 ? 'H1 ' + ('FY ' + dtYr) : 'H2 ' + ('FY ' + dtYr);
                delete (data[ln].Date);
            }
        }
        this.pivotGridObj.dataSource.data = data;
    }
    /* tslint:disable */
    /* jshint ignore:start */
    trend(): void {
        let cTable: HTMLElement[] = [].slice.call(document.getElementsByClassName("e-table"));
        let colLen: number = this.pivotGridObj.pivotValues[3].length;
        let cLen: number = cTable[3].children[0].children.length;
        let rLen: number = cTable[3].children[1].children.length;
        let rowIndx: number;

        for (let k: number = 0; k < rLen; k++) {
            if (this.pivotGridObj.pivotValues[k] && this.pivotGridObj.pivotValues[k][0] !== undefined) {
                rowIndx = ((this.pivotGridObj.pivotValues[k][0]) as IAxisSet).rowIndex;
                break;
            }
        }
        let rowHeaders: HTMLElement[] = [].slice.call(cTable[2].children[1].querySelectorAll('td'));
        let rows: IFieldOptions[] = this.pivotGridObj.dataSource.rows as IFieldOptions[];
        if (rowHeaders.length > 1) {
            for (let i: number = 0, Cnt = rows; i < Cnt.length; i++) {
                let fields: any = {};
                let fieldHeaders: any = [];
                for (let j: number = 0, Lnt = rowHeaders; j < Lnt.length; j++) {
                    let header: any = rowHeaders[j];
                    if (header.className.indexOf('e-gtot') === -1 && header.className.indexOf('e-rowsheader') > -1 && header.getAttribute('fieldname') === rows[i].name) {
                        var headerName = rowHeaders[j].getAttribute('fieldname') + '_' + rowHeaders[j].textContent;
                        fields[rowHeaders[j].textContent] = j;
                        fieldHeaders.push(rowHeaders[j].textContent);
                    }
                }
                if (i === 0) {
                    for (let rnt: number = 0, Lnt = fieldHeaders; rnt < Lnt.length; rnt++) {
                        if (rnt !== 0) {
                            let row: number = fields[fieldHeaders[rnt]];
                            let prevRow: number = fields[fieldHeaders[rnt - 1]];
                            for (let j: number = 0, ci = 1; j < cLen && ci < colLen; j++ , ci++) {
                                let node: HTMLElement = cTable[3].children[1].children[row].childNodes[j] as HTMLElement;
                                let prevNode: HTMLElement = cTable[3].children[1].children[prevRow].childNodes[j] as HTMLElement;
                                let ri: any = undefined;
                                let prevRi: any = undefined;
                                if (node) {
                                    ri = node.getAttribute("index");
                                }
                                if (prevNode) {
                                    prevRi = prevNode.getAttribute("index");
                                }
                                if (ri && ri < [].slice.call(this.pivotGridObj.pivotValues).length) {
                                    if ((this.pivotGridObj.pivotValues[prevRi][ci] as IAxisSet).value > (this.pivotGridObj.pivotValues[ri][ci]  as IAxisSet).value &&
                                     node.querySelector('.tempwrap')) {
                                        let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                        trendElement.className = trendElement.className.replace('sb-icon-neutral', 'sb-icon-loss');
                                    } else if ((this.pivotGridObj.pivotValues[prevRi][ci]  as IAxisSet).value < (this.pivotGridObj.pivotValues[ri][ci]  as IAxisSet).value &&
                                     node.querySelector('.tempwrap')) {
                                        let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                        trendElement.className = trendElement.className.replace('sb-icon-neutral', 'sb-icon-profit');
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (let rnt: number = 0, Lnt = fieldHeaders; rnt < Lnt.length; rnt++) {
                        var row = fields[fieldHeaders[rnt]];
                        for (let j: number = 0, ci = 1; j < cLen && ci < colLen; j++ , ci++) {
                            let node: HTMLElement = cTable[3].children[1].children[row].childNodes[j] as HTMLElement;
                            let prevNode: HTMLElement = cTable[3].children[1].children[row - 1].childNodes[j] as HTMLElement;
                            let ri: any = undefined;
                            let prevRi: any = undefined;
                            if (node) {
                                ri = node.getAttribute("index");
                            }
                            if (prevNode) {
                                prevRi = prevNode.getAttribute("index");
                            }
                            if (ri && ri < [].slice.call(this.pivotGridObj.pivotValues).length) {
                                let cRowFieldName: string = (cTable[2].children[1].children[row].childNodes[0] as HTMLElement).getAttribute('fieldname');
                                let prevRowFieldName: string = (cTable[2].children[1].children[row - 1].childNodes[0] as HTMLElement).getAttribute('fieldname');
                                if ((this.pivotGridObj.pivotValues[prevRi][ci] as IAxisSet).value > (this.pivotGridObj.pivotValues[ri][ci] as IAxisSet).value &&
                                 node.querySelector('.tempwrap') &&
                                    cRowFieldName === prevRowFieldName) {
                                    let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                    trendElement.className = trendElement.className.replace('sb-icon-neutral', 'sb-icon-loss');
                                } else if ((this.pivotGridObj.pivotValues[prevRi][ci] as IAxisSet).value < (this.pivotGridObj.pivotValues[ri][ci] as IAxisSet).value &&
                                 node.querySelector('.tempwrap') &&
                                    cRowFieldName === prevRowFieldName) {
                                    let trendElement: HTMLElement = node.querySelector('.tempwrap');
                                    trendElement.className = trendElement.className.replace('sb-icon-neutral', 'sb-icon-profit');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /* jshint ignore:end */

    ngOnInit(): void {
        this.cellTemplate = '<span class="tempwrap sb-icon-neutral pv-icons"></span>';
        
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        this.dataSource = {
            expandAll: true,
            enableSorting: true,
            drilledMembers: [{ name: 'Year', items: ['FY 2015', 'FY 2017', 'FY 2018'] }],
            formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
            rows: [
                { name: 'Year', caption: 'Production Year' },
                { name: 'HalfYear', caption: 'Half Year' }
            ],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            values: [
                { name: 'ProCost', caption: 'Revenue Growth' }
            ],
            filters: [],
            alwaysShowValueHeader: true,
            data: data
        };
    }
}