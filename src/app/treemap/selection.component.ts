/**
 * Selection and highglight sample
 */
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { TreeMap, TreeMapHighlight, TreeMapSelection, HighLightMode, SelectionMode } from '@syncfusion/ej2-angular-treemap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ILoadEventArgs, TreeMapTheme } from '@syncfusion/ej2-angular-treemap';
import { EmitType } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
TreeMap.Inject(TreeMapHighlight, TreeMapSelection);

@Component({
    selector: 'control-content',
    templateUrl: 'selection.html',
    encapsulation: ViewEncapsulation.None
})
export class TreemapSelectComponent {
   @ViewChild('treemap')
   public treemap: TreeMap;
   // custom code start
   public load = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
}
// custom code end
titleSettings: object = {
    text: 'Import and Export details of US'
};
selectionSettings: object = {
    enable: true,
    fill: '#58a0d3',
    border: { width: 0.3, color: 'black' },
    opacity: '1'
};
highlightSettings: object = {
    enable: true,
    fill: '#71b0dd',
    border: { width: 0.3, color: 'black' },
    opacity: '1'
};
    leafItemSettings: object = {
        labelPath: 'type',
        fill: '#8ebfe2',
        labelPosition: 'Center',
        gap: 10
    };
    dataSource: object[] =  [
        { dataType: 'Import', type: 'Animal products', product: '2010', sales: 20839332874 },
        { dataType: 'Import', type: 'Animal products',   product: '2011', sales: 23098635589 },
        { dataType: 'Import', type: 'Chemical products', product: '2010', sales: 141637951510 },
        { dataType: 'Import', type: 'Chemical products', product: '2011', sales: 161550338209 },
        { dataType: 'Import', type: 'Base metals',  product: '2010', sales: 86079439944 },
        { dataType: 'Import', type: 'Base metals', product: '2011', sales: 103821671535 },
        { dataType: 'Import', type: 'Textile articles',  product: '2010', sales: 97126140830 },
        { dataType: 'Import', type: 'Textile articles', product: '2011', sales: 104980750811 },
        { dataType: 'Export', type: 'Animal products',   product: '2010', sales:  15845503378 },
        { dataType: 'Export', type: 'Animal products',   product: '2011', sales:  20650111620 },
        { dataType: 'Export', type: 'Chemical products', product: '2010', sales: 136100054087 },
        { dataType: 'Export', type: 'Chemical products', product: '2011', sales: 146341672411 },
        { dataType: 'Export', type: 'Base metals', product: '2010', sales: 59060592813 },
        { dataType: 'Export', type: 'Base metals', product: '2011', sales: 71785882641 },
        { dataType: 'Export', type: 'Textile articles', product: '2010', sales: 20982380561 },
        { dataType: 'Export', type: 'Textile articles', product: '2011', sales: 26016143783 }
];
    weightValuePath: string = 'sales';
    headerStyle: object = {
        size: '16px'
    };
    ngAfterViewInit() {
        let highlightChange: EmitType<CheckBoxChangeEvents>;
        let highlightCheckBox: CheckBox = new CheckBox(
        {
            change: highlightChange, checked: true
        },
        '#highlightEnable');
        let selectionChange: EmitType<CheckBoxChangeEvents>;
        let selectionCheckBox: CheckBox = new CheckBox(
        {
            change: selectionChange, checked: true
        },
        '#SelectionEnable');
        highlightCheckBox.change = highlightChange = (e: CheckBoxChangeEvents) => {
            this.treemap.highlightSettings.enable = e.checked;
            this.treemap.refresh();
        };
        selectionCheckBox.change = selectionChange = (e: CheckBoxChangeEvents) => {
            this.treemap.selectionSettings.enable = e.checked;
            this.treemap.refresh();
        };
        let highlightMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select highlight type',
        width: 80,
        change: () => {
            this.treemap.highlightSettings.mode = <HighLightMode>highlightMode.value;
            this.treemap.refresh();
        }
    });
        highlightMode.appendTo('#highlightMode');
        let selectionMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Selection selection type',
        width: 100,
        change: () => {
            this.treemap.selectionSettings.mode = <SelectionMode>selectionMode.value;
            this.treemap.refresh();
        }
    });
        selectionMode.appendTo('#selectionMode');
}
constructor() {
    //code
};

    };