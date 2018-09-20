/**
 * layout sample.
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { TreeMap, TreeMapTooltip, LayoutMode, TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-angular-treemap';
import { econmics } from '../treemap/treemap-date/econmics';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
TreeMap.Inject(TreeMapTooltip);

@Component({
    selector: 'control-content',
    templateUrl: 'layout.html',
    encapsulation: ViewEncapsulation.None
})
export class TreemapLayoutComponent {
    @ViewChild('treemap')
    public treemap: TreeMap;
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
        public titleSettings: object = {
            text: 'Top 10 countries by GDP Nominal - 2015',
            textStyle: {size: '15px'}
        };
        dataSource: object[] = econmics;
        weightValuePath: string = 'GDP';
        public tooltipSettings: object = {
            visible: true,
            format: '${State}<br>Rank : ${Rank}'

        };
        rangeColorValuePath: string = 'GDP';
        public leafItemSettings: object = {
            labelPath: 'State',
            labelFormat: '${State}<br>$${GDP} Trillion<br>(${percentage} %)',
            labelStyle: {
                color: '#000000'
            },
            border: {
                color: '#000000',
                width: 0.5
            },
            colorMapping: [
                {
                    from: 1550,
                    to: 17946,
                    color: '#9cbb59',
                    minOpacity: 0.7,
                    maxOpacity: 1,
                }
            ]
        };
        ngAfterViewInit(): void {
            let layout: DropDownList = new DropDownList({
                index: 0, placeholder: 'Select layout type', width: 120,
                change: () => {
                    this.treemap.layoutType = <LayoutMode>layout.value;
                    this.treemap.refresh();
                }
            });
            layout.appendTo('#layoutMode');
        }
        constructor() {
          //code
        }
    };