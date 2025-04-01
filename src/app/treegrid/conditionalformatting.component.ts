import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { QueryCellInfoEventArgs, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TreeGridComponent, TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'conditionalformatting.html',
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent, GridAllModule]
})
export class ConditionalFormattingComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
    }

    queryCellInfo (args: QueryCellInfoEventArgs) {
        if (args.cell.innerHTML === 'High') {
            var x = document.createElement('IMG');
            x.setAttribute('src', 'https://ej2.syncfusion.com/angular/demos/assets/treegrid/images/High.png');
            x.setAttribute('height', '15px');
            var span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(x);
            args.cell.appendChild(span);
        } else if (args.cell.innerHTML === 'Critical') {
            var y = document.createElement('IMG');
            y.setAttribute('src', 'https://ej2.syncfusion.com/angular/demos/assets/treegrid/images/Critical.png');
            y.setAttribute('height', '15px');
            var span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(y);
            args.cell.appendChild(span);
        } else if (args.cell.innerHTML === 'Low') {
            var z = document.createElement('IMG');
            z.setAttribute('src', 'https://ej2.syncfusion.com/angular/demos/assets/treegrid/images/Low.png');
            z.setAttribute('height', '15px');
            var span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(z);
            args.cell.appendChild(span);
        } else if (args.cell.innerHTML === 'Normal') {
            var a = document.createElement('IMG');
            a.setAttribute('src', 'https://ej2.syncfusion.com/angular/demos/assets/treegrid/images/normal.png');
            a.setAttribute('height', '15px');
            var span = document.createElement('span');
            span.innerHTML = args.cell.innerHTML;
            span.setAttribute('style', 'padding-left:7px;');
            args.cell.innerHTML = '';
            args.cell.appendChild(a);
            args.cell.appendChild(span);
        } else if (+args.cell.innerHTML > 90 && +args.cell.innerHTML <= 100 && args.column.field === 'progress') {
            args.cell.setAttribute('style', 'background-color:#336c12;color:white;');
        } else if (+args.cell.innerHTML > 20 && args.column.field === 'progress') {
            args.cell.setAttribute('style', 'background-color:#7b2b1d;color:white;');
        }
}
}
