import { Component, OnInit, ViewChild } from '@angular/core';
import { textdata, getSparkData } from './jsontreegriddata';
import { TreeGridComponent} from '@syncfusion/ej2-angular-treegrid';import { EmitType } from '@syncfusion/ej2-base';
import { Sparkline, ISparklineLoadEventArgs, SparklineTheme } from '@syncfusion/ej2-charts';
import { RowDataBoundEventArgs, getObject } from '@syncfusion/ej2-grids';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'columntemplate.html',

})
export class ColumnTemplateComponent implements OnInit {
    public data: Object[] = [];
    public sparkData: Object[] = [];

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    ngOnInit(): void {
        this.data = textdata;
        this.sparkData = getSparkData('line' + getObject('EmployeeID',textdata[0]))
        
    }
    getSparkLine (val: number) {
        return getSparkData('line', val);
    }
    getSparkColumn (val: number) {
        return getSparkData('column', val);
    }
    getSparkWinloss (val: number) {
        return getSparkData('column', val);
    }
// custom code start

     sparkload: EmitType<ISparklineLoadEventArgs> = (args: ISparklineLoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = <SparklineTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }

// custom code end
}
