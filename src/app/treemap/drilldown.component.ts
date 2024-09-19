import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { TreeMap, TreeMapTooltip, IDrillStartEventArgs, ITreeMapTooltipRenderEventArgs, Alignment, TreeMapModule } from '@syncfusion/ej2-angular-treemap';
import { DrillDown } from './drilldown-sample';
import { ILoadEventArgs, TreeMapTheme } from '@syncfusion/ej2-angular-treemap';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
TreeMap.Inject(TreeMapTooltip);

/**
 * Default sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'drilldown.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TreeMapModule, SBActionDescriptionComponent, SBDescriptionComponent, TextBoxModule]
})
export class TreemapDrillDownComponent {
    @ViewChild('treemap')
    public treemap: TreeMap;
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    }
    public drillStart = (args: IDrillStartEventArgs) => {
        if (args.item[Object.keys(args.item)[0]].length === 1) {
            args.treemap.levels[2].showHeader = true;
        }else {
            args.treemap.levels[2].showHeader = false;
        }
    }
    tooltipRendering = (args: ITreeMapTooltipRenderEventArgs) => {
        //tslint:disable-next-line
        if (args.item['groupIndex'] !== 2 ) {
            args.cancel = true;
        }
    }
        public palette: string[] = ['#9999ff', '#CCFF99', '#FFFF99', '#FF9999', '#FF99FF', '#FFCC66'];
        public titleSettings: object = {
            text: 'List of countries by population',
            textStyle: { size: '15px'}
        };
        public dataSource: object[] = DrillDown;
        public weightValuePath: string = 'Population';
        public tooltipSettings: object = {
            visible: true,
            format: '${Name} : ${Population}'
        };
        public leafItemSettings: object = {
            labelPath: 'Name',
            showLabels: false,
            labelStyle: { size: '0px' },
            border: { color: 'black', width: 0.5 }
        };
        
        border: object = {
            color: 'black',
            width: 0.5
        };
        public change(target: any): void {
            this.treemap.breadcrumbConnector = target.value;
            this.treemap.refresh();
         }
        ngAfterViewInit(): void {
            let breadCrumbChange: EmitType<CheckBoxChangeEvents>;
            let breadCrumbCheckBox: CheckBox = new CheckBox(
             {
                 change: breadCrumbChange, checked: false
             },
            '#breadCrumb');
            breadCrumbCheckBox.change = breadCrumbChange = (e: CheckBoxChangeEvents) => {
                this.treemap.enableBreadcrumb = e.checked;
                let breadCrumbText = document.getElementById('connectorText');
                (breadCrumbText as any).ej2_instances[0].enabled = e.checked;
                this.treemap.refresh();
            };
    // Visiblity of drill-down view
             let drillChange: EmitType<CheckBoxChangeEvents>;
             let drillViewCheckBox: CheckBox = new CheckBox(
                {
                    change: drillChange, checked: false
                },
                 '#drillView');
             drillViewCheckBox.change = drillChange = (e: CheckBoxChangeEvents) => {
                this.treemap.drillDownView = e.checked;
                this.treemap.refresh();
             };
             
            let header: DropDownList = new DropDownList({
                index: 0, placeholder: 'Select layout type', width: '100%',
                change: () => {                    
                    for(let i=0;i<this.treemap.levels.length-1;i++){
                        this.treemap.levels[i].headerAlignment = <Alignment>header.value;
                    }                                            
                    this.treemap.refresh();
                }
            });
            header.appendTo('#header');
            let label: DropDownList = new DropDownList({
                index: 0, placeholder: 'Select render direction', width: '100%',
                change: () => {
                    this.treemap.levels[2].headerAlignment = <Alignment>label.value;
                    this.treemap.refresh();
                }
            });
            label.appendTo('#label');

        }
        constructor(@Inject('sourceFiles') private sourceFiles: any) {
            sourceFiles.files = ['drilldown-sample.ts' ];
        };
};