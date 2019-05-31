/**
 * Default sample
 */
import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { ILoadEventArgs, TreeMapTheme, TreeMap } from '@syncfusion/ej2-angular-treemap';
import { Metals } from './metals';
import { Browser } from '@syncfusion/ej2-base';

@Component({
    selector: 'control-content',
    templateUrl: 'custom.html',
    encapsulation: ViewEncapsulation.None
})
export class TreemapCustomComponent {
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
            text: 'US Gold medal categories in Summer Olympics - 2016',
            textStyle: {size: '15px'}
        };
        dataSource: object[] = Metals;
        tooltipSettings: object ={
            visible: true,
            format: '${Sport} : ${Gold}'
        };
        weightValuePath: string = 'Gold';
        leafItemSettings: object = {
            showLabels: !Browser.isDevice,
            labelPath: 'Sport',
            fill: '#993399',
            templatePosition: 'Center',
            border: { color: 'black', width: 0.5 },
            labelFormat: ' ${Sport} - ${Gold}',
             labelTemplate: '<div style="pointer-events: none;"><img src="./assets/treemap/image/{{:GameImage}}"' +
            ' style="height:{{:ItemHeight}};width:{{:ItemWidth}};"></img></div>'
        };
        constructor(@Inject('sourceFiles') private sourceFiles: any) {
            sourceFiles.files = ['metals.ts' ];
        }
};