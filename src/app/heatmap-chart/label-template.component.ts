import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Adaptor, Tooltip, ILoadedEventArgs, HeatMapTheme, HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
HeatMap.Inject(Tooltip, Adaptor);

@Component({
    selector: 'control-content',
    templateUrl: 'label-template.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [HeatMapModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class LabelTemplateComponent {

    public jsonCellData: Object = [
        { 'rowId': 'Improbable', 'columnId': 'Negligible', 'value': '2', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Low', 'value': '4', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Moderate', 'value': '6', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Significant', 'value': '8', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Improbable', 'columnId': 'Catastrophic', 'value': '10', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Negligible', 'value': '4', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Low', 'value': '16', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Remote', 'columnId': 'Moderate', 'value': '24', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/orange-tick.png' },
        { 'rowId': 'Remote', 'columnId': 'Significant', 'value': '32', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/orange-tick.png' },
        { 'rowId': 'Remote', 'columnId': 'Catastrophic', 'value': '40', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Negligible', 'value': '6', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Occasional', 'columnId': 'Low', 'value': '24', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Moderate', 'value': '36', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/orange-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Significant', 'value': '48', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/red-tick.png' },
        { 'rowId': 'Occasional', 'columnId': 'Catastrophic', 'value': '60', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Negligible', 'value': '8', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Probable', 'columnId': 'Low', 'value': '32', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/orange-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Moderate', 'value': '48', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Significant', 'value': '64', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/red-tick.png' },
        { 'rowId': 'Probable', 'columnId': 'Catastrophic', 'value': '80', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Negligible', 'value': '10', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/green-cross.png' },
        { 'rowId': 'Frequent', 'columnId': 'Low', 'value': '40', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/orange-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Moderate', 'value': '60', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Significant', 'value': '80', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/red-tick.png' },
        { 'rowId': 'Frequent', 'columnId': 'Catastrophic', 'value': '100', 'image': 'https://ej2.syncfusion.com/angular/demos/assets/heatmap/images/red-tick.png' }
    ];
    xAxis: Object = {
        labels: ["Improbable", "Remote", "Occasional", "Probable", "Frequent"],
        textStyle: {
            fontFamily: 'inherit'
        },
        title: {
            text: 'LIKELIHOOD',
            textStyle: {
                fontFamily: 'inherit'
            }
        },
    };
    yAxis: Object = {
        labels: ["Negligible", "Low", "Moderate", "Significant", "Catastrophic"],
        textStyle: {
            fontFamily: 'inherit'
        },
        title: {
            text: 'IMPACT',
            textStyle: {
                fontFamily: 'inherit'
            }
        },
    };
    dataSource: Object = this.jsonCellData;
    dataSourceSettings: Object = {
        isJsonData: true,
        adaptorType: 'Cell',
        xDataMapping: 'rowId',
        yDataMapping: 'columnId',
        valueMapping: 'value'        
    };
    public cellSettings: Object = {
        labelTemplate: '<div><img alt="Description of the label template" src="${image}" style="width: 35px; height: 35px;"/></div>',
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public paletteSettings: Object = {
        type: 'Fixed',
        palette: [{ value: "2", color: "#61c961" },
            { value: "24", color: "#fcc81c" },
            { value: "48", color: "#ff6354" }
        ],
    };
    public legendSettings: Object = {
        visible: false
     };
    public tooltipSettings: Object = {
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark")
        .replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
    };
    constructor() {
        // code
    };
}
