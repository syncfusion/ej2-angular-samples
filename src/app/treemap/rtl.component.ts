import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { TreeMap, TreeMapTooltip, IDrillStartEventArgs, ITreeMapTooltipRenderEventArgs } from '@syncfusion/ej2-angular-treemap';
import { RTLData } from './rtl-data';
import { ILoadEventArgs, TreeMapTheme, Alignment, RenderingMode } from '@syncfusion/ej2-angular-treemap';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
TreeMap.Inject(TreeMapTooltip);

/**
 * Default sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    encapsulation: ViewEncapsulation.None
})
export class TreemapRTLComponent {
    @ViewChild('treemap')
    public treemap: TreeMap;
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    tooltipRendering = (args: ITreeMapTooltipRenderEventArgs) => {
        //tslint:disable-next-line
        if (args.item['groupIndex'] !== 2 ) {
            args.cancel = true;
        }
    }
        public palette: string[] = ['#5B244D', '#6F3953', ' #87525A', '#A26F63', '#BA896B', '#D5A574', '#F1C37D'];
        public titleSettings: object = {
            text: 'List of countries by unemployment rate',
            textStyle: { size: '15px'}
        };
        public dataSource: object[] = RTLData;
        public weightValuePath: string = 'Size';
        public tooltipSettings: object = {
            visible: true,
            format: '${Name} : ${Size}'
        };
        public leafItemSettings: object = {
            labelPath: 'Name',
            showLabels: true            
        };
        border: object = {
            color: 'black',
            width: 0.5
        };

        ngAfterViewInit(): void {  }
        constructor(@Inject('sourceFiles') private sourceFiles: any) {
            sourceFiles.files = ['rtl-data.ts' ];
        };
};